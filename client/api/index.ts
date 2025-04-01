// Client-side API functions to interact with the server
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Generic request function
const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }
      
      return data;
    }
    
    if (!response.ok) {
      throw new Error('An error occurred');
    }
    
    return await response.text();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const auth = {
  signIn: async (email: string, password: string) => {
    return request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  signUp: async (email: string, password: string) => {
    return request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  signInWithGoogle: async () => {
    return request('/auth/signin/google', {
      method: 'POST',
    });
  },
  
  signOut: async () => {
    return request('/auth/signout', {
      method: 'POST',
    });
  },
  
  getSession: async () => {
    return request('/auth/session');
  },
};

// User profile API
export const profiles = {
  getProfile: async () => {
    return request('/profiles');
  },
  
  createProfile: async (profileData: any) => {
    return request('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },
  
  updateProfile: async (profileData: any) => {
    return request('/profiles', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
  
  updateAllergens: async (allergens: string[]) => {
    return request('/profiles/allergens', {
      method: 'PUT',
      body: JSON.stringify({ allergens }),
    });
  },
  
  updateFoodPreferences: async (liked: string[], disliked: string[]) => {
    return request('/profiles/preferences', {
      method: 'PUT',
      body: JSON.stringify({ liked, disliked }),
    });
  },
};

// Pantry API
export const pantry = {
  getPantryItems: async () => {
    return request('/pantry');
  },
  
  addPantryItem: async (item: { item_name: string; quantity: string }) => {
    return request('/pantry', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },
  
  updatePantryItem: async (itemId: string, updates: { item_name?: string; quantity?: string }) => {
    return request(`/pantry/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
  
  deletePantryItem: async (itemId: string) => {
    return request(`/pantry/${itemId}`, {
      method: 'DELETE',
    });
  },
};

// Meal plans API
export const mealPlans = {
  getMealPlans: async () => {
    return request('/meal-plans');
  },
  
  getCurrentWeekMealPlan: async () => {
    return request('/meal-plans/current');
  },
  
  getMealPlanById: async (planId: string) => {
    return request(`/meal-plans/${planId}`);
  },
  
  createMealPlan: async (mealPlan: any) => {
    return request('/meal-plans', {
      method: 'POST',
      body: JSON.stringify(mealPlan),
    });
  },
  
  updateMealPlan: async (planId: string, recipes: any) => {
    return request(`/meal-plans/${planId}`, {
      method: 'PUT',
      body: JSON.stringify({ recipes }),
    });
  },
  
  deleteMealPlan: async (planId: string) => {
    return request(`/meal-plans/${planId}`, {
      method: 'DELETE',
    });
  },
};

// Recipes API
export const recipes = {
  getRecipes: async () => {
    return request('/recipes');
  },
  
  getRecipeById: async (recipeId: string) => {
    return request(`/recipes/${recipeId}`);
  },
  
  saveRecipe: async (recipeId: string) => {
    return request(`/recipes/${recipeId}/save`, {
      method: 'POST',
    });
  },
  
  unsaveRecipe: async (recipeId: string) => {
    return request(`/recipes/${recipeId}/save`, {
      method: 'DELETE',
    });
  },
};

// Seasonal produce API
export const produce = {
  getSeasonalProduce: async () => {
    return request('/produce/seasonal');
  },
};

// Export all APIs
export default {
  auth,
  profiles,
  pantry,
  mealPlans,
  recipes,
  produce,
};