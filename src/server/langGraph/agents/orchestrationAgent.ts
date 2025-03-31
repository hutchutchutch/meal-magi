/**
 * Orchestration Agent - Coordinates the workflow between all specialized agents
 */
import { RunnableSequence } from "@langchain/langgraph/runnables";
import { StateGraph, END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import {
  OrchestrationRequest,
  OrchestrationResponse,
  ProfileAgentRequest,
  RecipeGenerationRequest,
  MeditationGenerationRequest,
  SeasonalProduceRequest,
  PantryOptimizationRequest,
  MealPlanRequest
} from "./agentTypes";

// Import agent modules
import { getUserProfile } from "./userProfileAgent";
import { generateRecipe } from "./recipeGenerationAgent";
import { generateMeditation } from "./meditationGenerationAgent";
import { getSeasonalProduce } from "./seasonalProduceAgent";
import { optimizePantry } from "./pantryOptimizationAgent";

// Model configuration
const model = new ChatOpenAI({
  modelName: "gpt-4-turbo-preview",
  temperature: 0.2,
});

// State interface for the orchestration workflow
interface OrchestrationState {
  request: OrchestrationRequest;
  response: Partial<OrchestrationResponse>;
  currentStep: string;
  completedSteps: string[];
  errors: {
    agentType: string;
    errorMessage: string;
  }[];
}

/**
 * Determines the next steps in the orchestration workflow based on the request type and current state
 */
function determineNextSteps(state: OrchestrationState): string[] {
  const { request, completedSteps } = state;
  const nextSteps: string[] = [];

  // Handle different request types
  switch (request.requestType) {
    case "profile":
      if (!completedSteps.includes("profile")) {
        nextSteps.push("profile");
      }
      break;

    case "recipe":
      if (!completedSteps.includes("profile")) {
        nextSteps.push("profile");
      }
      if (request.recipeRequest?.useSeasonalProduce && !completedSteps.includes("seasonalProduce")) {
        nextSteps.push("seasonalProduce");
      }
      if (request.recipeRequest?.usePantryItems && !completedSteps.includes("pantryOptimization")) {
        nextSteps.push("pantryOptimization");
      }
      if (!completedSteps.includes("recipe")) {
        nextSteps.push("recipe");
      }
      break;

    case "meditation":
      if (!completedSteps.includes("meditation") && request.meditationRequest) {
        nextSteps.push("meditation");
      }
      break;

    case "seasonalProduce":
      if (!completedSteps.includes("seasonalProduce")) {
        nextSteps.push("seasonalProduce");
      }
      break;

    case "pantryOptimization":
      if (!completedSteps.includes("profile")) {
        nextSteps.push("profile");
      }
      if (!completedSteps.includes("pantryOptimization")) {
        nextSteps.push("pantryOptimization");
      }
      break;

    case "mealPlan":
      if (!completedSteps.includes("profile")) {
        nextSteps.push("profile");
      }
      if (request.mealPlanRequest?.useSeasonalProduce && !completedSteps.includes("seasonalProduce")) {
        nextSteps.push("seasonalProduce");
      }
      if (request.mealPlanRequest?.usePantryItems && !completedSteps.includes("pantryOptimization")) {
        nextSteps.push("pantryOptimization");
      }
      // Recipe generation will be handled as part of the meal plan process
      if (!completedSteps.includes("mealPlan")) {
        nextSteps.push("mealPlan");
      }
      if (request.mealPlanRequest?.includeMeditations && !completedSteps.includes("meditation")) {
        nextSteps.push("meditation");
      }
      break;
  }

  return nextSteps;
}

/**
 * Process user profile information
 */
async function processUserProfile(state: OrchestrationState): Promise<OrchestrationState> {
  try {
    const { request } = state;
    const profileRequest: ProfileAgentRequest = request.profileRequest || {
      userId: request.userId,
      includeHealthMetrics: true,
      includePantryItems: request.requestType === "pantryOptimization" || 
                          (request.recipeRequest?.usePantryItems === true) ||
                          (request.mealPlanRequest?.usePantryItems === true)
    };

    // Call user profile agent
    const profileResponse = await getUserProfile(profileRequest);

    return {
      ...state,
      response: {
        ...state.response,
        profileResponse
      },
      completedSteps: [...state.completedSteps, "profile"],
      currentStep: "profile_complete"
    };
  } catch (error: any) {
    return {
      ...state,
      errors: [
        ...state.errors, 
        { 
          agentType: "profile", 
          errorMessage: error.message || "Error processing user profile" 
        }
      ],
      currentStep: "profile_error"
    };
  }
}

/**
 * Process seasonal produce information
 */
async function processSeasonalProduce(state: OrchestrationState): Promise<OrchestrationState> {
  try {
    const { request, response } = state;
    
    // Get user location from profile response or request
    const userProfile = response.profileResponse?.userProfile;
    const region = userProfile?.state || 
                  request.seasonalProduceRequest?.region || 
                  "Unknown";
    
    // Current month if not specified
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    
    const seasonalProduceRequest: SeasonalProduceRequest = request.seasonalProduceRequest || {
      region,
      month: request.seasonalProduceRequest?.month || currentMonth
    };

    // Call seasonal produce agent
    const seasonalProduceResponse = await getSeasonalProduce(seasonalProduceRequest);

    return {
      ...state,
      response: {
        ...state.response,
        seasonalProduceResponse
      },
      completedSteps: [...state.completedSteps, "seasonalProduce"],
      currentStep: "seasonalProduce_complete"
    };
  } catch (error: any) {
    return {
      ...state,
      errors: [
        ...state.errors, 
        { 
          agentType: "seasonalProduce", 
          errorMessage: error.message || "Error processing seasonal produce" 
        }
      ],
      currentStep: "seasonalProduce_error"
    };
  }
}

/**
 * Process pantry optimization
 */
async function processPantryOptimization(state: OrchestrationState): Promise<OrchestrationState> {
  try {
    const { request, response } = state;
    
    // Ensure we have the necessary profile data
    if (!response.profileResponse) {
      throw new Error("Profile data required for pantry optimization");
    }
    
    const pantryItems = response.profileResponse.pantryItems || [];
    const userPreferences = response.profileResponse.userProfile;
    
    const pantryOptimizationRequest: PantryOptimizationRequest = request.pantryOptimizationRequest || {
      userId: request.userId,
      pantryItems,
      userPreferences,
      prioritizeExpiring: true,
      includeRecipeSuggestions: true
    };
    
    // Call pantry optimization agent
    const pantryOptimizationResponse = await optimizePantry(pantryOptimizationRequest);
    
    return {
      ...state,
      response: {
        ...state.response,
        pantryOptimizationResponse
      },
      completedSteps: [...state.completedSteps, "pantryOptimization"],
      currentStep: "pantryOptimization_complete"
    };
  } catch (error: any) {
    return {
      ...state,
      errors: [
        ...state.errors, 
        { 
          agentType: "pantryOptimization", 
          errorMessage: error.message || "Error processing pantry optimization" 
        }
      ],
      currentStep: "pantryOptimization_error"
    };
  }
}

/**
 * Process recipe generation
 */
async function processRecipeGeneration(state: OrchestrationState): Promise<OrchestrationState> {
  try {
    const { request, response } = state;
    
    // Ensure we have the necessary profile data
    if (!response.profileResponse) {
      throw new Error("Profile data required for recipe generation");
    }
    
    const userProfile = response.profileResponse.userProfile;
    const pantryItems = response.profileResponse.pantryItems;
    const seasonalProduce = response.seasonalProduceResponse?.seasonalProduce;
    
    const recipeRequest: RecipeGenerationRequest = request.recipeRequest || {
      userProfile,
      pantryItems,
      seasonalProduce,
      mealType: request.recipeRequest?.mealType || "dinner",
      numberOfServings: request.recipeRequest?.numberOfServings || 2,
      difficultyLevel: request.recipeRequest?.difficultyLevel || "medium"
    };
    
    // Call recipe generation agent
    const recipeResponse = await generateRecipe(recipeRequest);
    
    return {
      ...state,
      response: {
        ...state.response,
        recipeResponse
      },
      completedSteps: [...state.completedSteps, "recipe"],
      currentStep: "recipe_complete"
    };
  } catch (error: any) {
    return {
      ...state,
      errors: [
        ...state.errors, 
        { 
          agentType: "recipe", 
          errorMessage: error.message || "Error generating recipe" 
        }
      ],
      currentStep: "recipe_error"
    };
  }
}

/**
 * Process meditation generation
 */
async function processMeditationGeneration(state: OrchestrationState): Promise<OrchestrationState> {
  try {
    const { request, response } = state;
    
    // For direct meditation requests
    if (request.requestType === "meditation" && request.meditationRequest) {
      const meditationResponse = await generateMeditation(request.meditationRequest);
      
      return {
        ...state,
        response: {
          ...state.response,
          meditationResponse
        },
        completedSteps: [...state.completedSteps, "meditation"],
        currentStep: "meditation_complete"
      };
    }
    
    // For recipe-related meditations
    if (response.recipeResponse) {
      const recipe = response.recipeResponse.recipe;
      
      const meditationRequest: MeditationGenerationRequest = {
        recipe,
        focusArea: "cooking",
        duration: 5
      };
      
      const meditationResponse = await generateMeditation(meditationRequest);
      
      return {
        ...state,
        response: {
          ...state.response,
          meditationResponse
        },
        completedSteps: [...state.completedSteps, "meditation"],
        currentStep: "meditation_complete"
      };
    }
    
    throw new Error("Recipe is required for meditation generation");
  } catch (error: any) {
    return {
      ...state,
      errors: [
        ...state.errors, 
        { 
          agentType: "meditation", 
          errorMessage: error.message || "Error generating meditation" 
        }
      ],
      currentStep: "meditation_error"
    };
  }
}

/**
 * Process meal plan generation
 */
async function processMealPlan(state: OrchestrationState): Promise<OrchestrationState> {
  // Meal plan generation would be implemented here
  // This would coordinate multiple recipe generations and organize them into a cohesive meal plan
  return state;
}

/**
 * Check if the workflow has been completed
 */
function checkWorkflowCompletion(state: OrchestrationState): boolean {
  const { request, completedSteps } = state;
  
  switch (request.requestType) {
    case "profile":
      return completedSteps.includes("profile");
    
    case "recipe":
      return completedSteps.includes("recipe");
    
    case "meditation":
      return completedSteps.includes("meditation");
    
    case "seasonalProduce":
      return completedSteps.includes("seasonalProduce");
    
    case "pantryOptimization":
      return completedSteps.includes("pantryOptimization");
    
    case "mealPlan":
      const requiredSteps = ["profile", "mealPlan"];
      if (request.mealPlanRequest?.includeMeditations) {
        requiredSteps.push("meditation");
      }
      return requiredSteps.every(step => completedSteps.includes(step));
    
    default:
      return false;
  }
}

/**
 * Build the state graph for the orchestration workflow
 */
function buildWorkflow() {
  // Create the state graph
  const workflow = new StateGraph<OrchestrationState>({
    channels: {
      request: {},
      response: {},
      currentStep: {},
      completedSteps: {},
      errors: {},
    },
  });

  // Add nodes for each step in the process
  workflow.addNode("profile", processUserProfile);
  workflow.addNode("seasonalProduce", processSeasonalProduce);
  workflow.addNode("pantryOptimization", processPantryOptimization);
  workflow.addNode("recipe", processRecipeGeneration);
  workflow.addNode("meditation", processMeditationGeneration);
  workflow.addNode("mealPlan", processMealPlan);

  // Add conditional routing
  workflow.addConditionalEdges(
    // Starting point
    workflow.getStartNode(),
    (state: OrchestrationState) => {
      const nextSteps = determineNextSteps(state);
      return nextSteps.length > 0 ? nextSteps[0] : END;
    }
  );

  // Add edges between nodes
  workflow.addConditionalEdges(
    "profile",
    (state: OrchestrationState) => {
      const nextSteps = determineNextSteps(state);
      return nextSteps.length > 0 ? nextSteps[0] : END;
    }
  );

  workflow.addConditionalEdges(
    "seasonalProduce",
    (state: OrchestrationState) => {
      const nextSteps = determineNextSteps(state);
      return nextSteps.length > 0 ? nextSteps[0] : END;
    }
  );

  workflow.addConditionalEdges(
    "pantryOptimization",
    (state: OrchestrationState) => {
      const nextSteps = determineNextSteps(state);
      return nextSteps.length > 0 ? nextSteps[0] : END;
    }
  );

  workflow.addConditionalEdges(
    "recipe",
    (state: OrchestrationState) => {
      const nextSteps = determineNextSteps(state);
      return nextSteps.length > 0 ? nextSteps[0] : END;
    }
  );

  workflow.addConditionalEdges(
    "meditation",
    (state: OrchestrationState) => {
      const nextSteps = determineNextSteps(state);
      return nextSteps.length > 0 ? nextSteps[0] : END;
    }
  );

  workflow.addConditionalEdges(
    "mealPlan",
    (state: OrchestrationState) => {
      const nextSteps = determineNextSteps(state);
      return nextSteps.length > 0 ? nextSteps[0] : END;
    }
  );

  // Add an edge for the final state
  workflow.addEdge("final", END);

  return workflow.compile();
}

/**
 * Processes an orchestration request through the workflow
 */
export async function processOrchestrationRequest(
  request: OrchestrationRequest
): Promise<OrchestrationResponse> {
  // Initialize the workflow state
  const initialState: OrchestrationState = {
    request,
    response: {
      status: "success"
    },
    currentStep: "init",
    completedSteps: [],
    errors: []
  };

  // Build and execute the workflow
  const workflow = buildWorkflow();
  const result = await workflow.invoke(initialState);

  // Prepare the response
  const hasErrors = result.errors.length > 0;
  const allRequiredStepsCompleted = checkWorkflowCompletion(result);
  
  const status = hasErrors 
    ? (allRequiredStepsCompleted ? "partial" : "error")
    : "success";

  return {
    ...result.response,
    status,
    errors: result.errors.length > 0 ? result.errors : undefined
  };
}