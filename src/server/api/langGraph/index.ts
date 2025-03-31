import { Router } from 'express';
import { processOrchestrationRequest } from '../../langGraph/agents/orchestrationAgent';
import { requireAuth } from '../../utils/middleware';

const router = Router();

/**
 * Generate a meal plan
 * POST /api/langgraph/meal-plan
 */
router.post('/meal-plan', requireAuth, async (req, res) => {
  try {
    const { userId } = req.user!;
    const { weekStart, numberOfDays, mealsPerDay, includeMealTypes, usePantryItems, useSeasonalProduce, includeMeditations } = req.body;

    const orchestrationRequest = {
      requestType: "mealPlan",
      userId,
      mealPlanRequest: {
        userId,
        weekStart,
        numberOfDays: numberOfDays || 7,
        mealsPerDay: mealsPerDay || 3,
        includeMealTypes: includeMealTypes || ["breakfast", "lunch", "dinner"],
        usePantryItems: usePantryItems !== false,
        useSeasonalProduce: useSeasonalProduce !== false,
        includeMeditations
      }
    };

    const result = await processOrchestrationRequest(orchestrationRequest);

    return res.status(200).json({
      status: result.status,
      data: result.mealPlanResponse,
      errors: result.errors
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to generate meal plan"
    });
  }
});

/**
 * Generate a recipe
 * POST /api/langgraph/recipe
 */
router.post('/recipe', requireAuth, async (req, res) => {
  try {
    const { userId } = req.user!;
    const { 
      mealType, 
      numberOfServings, 
      maxPrepTime, 
      maxCookTime, 
      difficultyLevel, 
      specificIngredients,
      cuisineType,
      usePantryItems,
      useSeasonalProduce
    } = req.body;

    const orchestrationRequest = {
      requestType: "recipe",
      userId,
      recipeRequest: {
        mealType,
        numberOfServings,
        maxPrepTime,
        maxCookTime,
        difficultyLevel,
        specificIngredients,
        cuisineType,
        usePantryItems: usePantryItems !== false,
        useSeasonalProduce: useSeasonalProduce !== false
      }
    };

    const result = await processOrchestrationRequest(orchestrationRequest);

    return res.status(200).json({
      status: result.status,
      data: result.recipeResponse,
      errors: result.errors
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to generate recipe"
    });
  }
});

/**
 * Generate a meditation for a recipe
 * POST /api/langgraph/meditation
 */
router.post('/meditation', requireAuth, async (req, res) => {
  try {
    const { userId } = req.user!;
    const { recipeId, focusArea, duration } = req.body;

    if (!recipeId) {
      return res.status(400).json({
        status: "error",
        message: "Recipe ID is required"
      });
    }

    // First fetch the recipe to pass to the meditation generator
    // This would typically come from your recipe service
    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        status: "error",
        message: "Recipe not found"
      });
    }

    const orchestrationRequest = {
      requestType: "meditation",
      userId,
      meditationRequest: {
        recipe,
        focusArea,
        duration: duration || 5
      }
    };

    const result = await processOrchestrationRequest(orchestrationRequest);

    return res.status(200).json({
      status: result.status,
      data: result.meditationResponse,
      errors: result.errors
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to generate meditation"
    });
  }
});

/**
 * Get seasonal produce information
 * GET /api/langgraph/seasonal-produce
 */
router.get('/seasonal-produce', requireAuth, async (req, res) => {
  try {
    const { userId } = req.user!;
    const { region, month, season } = req.query;

    const orchestrationRequest = {
      requestType: "seasonalProduce",
      userId,
      seasonalProduceRequest: {
        region: region as string || "",
        month: month ? parseInt(month as string) : undefined,
        season: season as "spring" | "summer" | "fall" | "winter" | undefined
      }
    };

    const result = await processOrchestrationRequest(orchestrationRequest);

    return res.status(200).json({
      status: result.status,
      data: result.seasonalProduceResponse,
      errors: result.errors
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to get seasonal produce information"
    });
  }
});

/**
 * Get pantry optimization recommendations
 * GET /api/langgraph/pantry-optimization
 */
router.get('/pantry-optimization', requireAuth, async (req, res) => {
  try {
    const { userId } = req.user!;
    const { prioritizeExpiring, includeRecipeSuggestions } = req.query;

    const orchestrationRequest = {
      requestType: "pantryOptimization",
      userId,
      pantryOptimizationRequest: {
        userId,
        prioritizeExpiring: prioritizeExpiring !== "false",
        includeRecipeSuggestions: includeRecipeSuggestions !== "false"
      }
    };

    const result = await processOrchestrationRequest(orchestrationRequest);

    return res.status(200).json({
      status: result.status,
      data: result.pantryOptimizationResponse,
      errors: result.errors
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to get pantry optimization"
    });
  }
});

// Helper function to get a recipe by ID - would be implemented in your recipe service
async function getRecipeById(recipeId: string) {
  // This would be implemented to fetch a recipe from your database
  // For now, it's a placeholder
  return {
    id: recipeId,
    title: "Sample Recipe",
    // other recipe details would go here
  };
}

export default router;