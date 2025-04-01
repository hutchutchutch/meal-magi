/**
 * Type definitions for the LangGraph agents in the Meal Magi system
 */

// Common types used across multiple agents
export interface UserPreference {
  userId: string;
  allergens: string[];
  dietaryRestrictions: string[];
  likedIngredients: string[];
  dislikedIngredients: string[];
  city: string;
  state: string;
  healthGoals?: string[];
}

export interface PantryItem {
  id: string;
  itemName: string;
  quantity: string;
  dateAdded: string;
  expirationDate?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  notes?: string;
  isOptional?: boolean;
  substitutions?: string[];
  isSeasonal?: boolean;
  isFromPantry?: boolean;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  tips?: string;
  timer?: number; // in minutes
  techniques?: string[];
}

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficultyLevel: "easy" | "medium" | "hard";
  mealType: "breakfast" | "lunch" | "dinner" | "snack" | "dessert";
  cuisineType?: string;
  tags: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
  tips?: string;
  imageUrl?: string;
  meditationId?: string;
}

export interface Meditation {
  id?: string;
  recipeId: string;
  textContent: string;
  focusArea: "preparation" | "cooking" | "eating" | "appreciation";
  duration: number; // in minutes
  audioUrl?: string;
}

export interface SeasonalProduce {
  name: string;
  season: "spring" | "summer" | "fall" | "winter" | "year-round";
  region: string;
  months: number[]; // 1-12 representing months
  peakMonth?: number;
  nutritionalBenefits?: string[];
  storageInfo?: string;
}

export interface MealPlan {
  id?: string;
  userId: string;
  weekStart: string;
  recipes: {
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
    meals: {
      type: "breakfast" | "lunch" | "dinner" | "snack";
      recipeId: string;
      recipeTitle: string;
    }[];
  }[];
}

export interface ShoppingListItem {
  item: string;
  amount: string;
  grocerySection?: string;
  estimatedPrice?: number;
  mealPlanId: string;
  isPurchased?: boolean;
}

// Agent-specific request types
export interface ProfileAgentRequest {
  userId: string;
  includeHealthMetrics?: boolean;
  includePantryItems?: boolean;
}

export interface RecipeGenerationRequest {
  userProfile: UserPreference;
  pantryItems?: PantryItem[];
  seasonalProduce?: SeasonalProduce[];
  mealType?: "breakfast" | "lunch" | "dinner" | "snack" | "dessert";
  numberOfServings?: number;
  maxPrepTime?: number;
  maxCookTime?: number;
  difficultyLevel?: "easy" | "medium" | "hard";
  specificIngredients?: string[];
  cuisineType?: string;
}

export interface MeditationGenerationRequest {
  recipe: Recipe;
  focusArea?: "preparation" | "cooking" | "eating" | "appreciation";
  duration?: number;
  includeAudio?: boolean;
}

export interface SeasonalProduceRequest {
  region: string;
  month?: number; // 1-12 representing months
  season?: "spring" | "summer" | "fall" | "winter";
}

export interface PantryOptimizationRequest {
  userId: string;
  pantryItems: PantryItem[];
  userPreferences: UserPreference;
  prioritizeExpiring?: boolean;
  includeRecipeSuggestions?: boolean;
}

export interface MealPlanRequest {
  userId: string;
  weekStart: string;
  numberOfDays?: number;
  mealsPerDay?: number;
  includeMealTypes?: ("breakfast" | "lunch" | "dinner" | "snack")[];
  dietaryPreferences?: UserPreference;
  usePantryItems?: boolean;
  useSeasonalProduce?: boolean;
  includeMeditations?: boolean;
}

// Agent-specific response types
export interface ProfileAgentResponse {
  userProfile: UserPreference;
  pantryItems?: PantryItem[];
  healthMetrics?: {
    height?: {
      feet: number;
      inches: number;
    };
    weight?: number;
    gender?: string;
    calculatedBMI?: number;
    recommendedCalories?: number;
  };
}

export interface RecipeGenerationResponse {
  recipe: Recipe;
  usedPantryItems?: string[];
  usedSeasonalProduce?: string[];
  shoppingListItems?: string[];
}

export interface MeditationGenerationResponse {
  meditation: Meditation;
}

export interface SeasonalProduceResponse {
  seasonalProduce: SeasonalProduce[];
  inSeasonNow: string[];
  comingSoonInSeason: string[];
  localMarkets?: {
    name: string;
    address?: string;
    openingHours?: string;
  }[];
}

export interface PantryOptimizationResponse {
  expiringItems: PantryItem[];
  recommendedRecipes?: {
    recipeId: string;
    title: string;
    usedItems: string[];
    percentOfIngredientsAvailable: number;
  }[];
  shoppingRecommendations?: {
    item: string;
    reason: string;
  }[];
  wasteReductionTips?: string[];
}

export interface MealPlanResponse {
  mealPlan: MealPlan;
  recipes: Recipe[];
  shoppingList: ShoppingListItem[];
  meditations?: Meditation[];
}

// Orchestration types
export interface OrchestrationRequest {
  requestType: "profile" | "recipe" | "meditation" | "seasonalProduce" | "pantryOptimization" | "mealPlan";
  userId: string;
  profileRequest?: ProfileAgentRequest;
  recipeRequest?: RecipeGenerationRequest;
  meditationRequest?: MeditationGenerationRequest;
  seasonalProduceRequest?: SeasonalProduceRequest;
  pantryOptimizationRequest?: PantryOptimizationRequest;
  mealPlanRequest?: MealPlanRequest;
}

export interface OrchestrationResponse {
  status: "success" | "partial" | "error";
  profileResponse?: ProfileAgentResponse;
  recipeResponse?: RecipeGenerationResponse;
  meditationResponse?: MeditationGenerationResponse;
  seasonalProduceResponse?: SeasonalProduceResponse;
  pantryOptimizationResponse?: PantryOptimizationResponse;
  mealPlanResponse?: MealPlanResponse;
  errors?: {
    agentType: string;
    errorMessage: string;
  }[];
}