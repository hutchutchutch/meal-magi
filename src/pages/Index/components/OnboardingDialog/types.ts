
export interface FormData {
  email: string;
  password: string;
  dietaryPreferences: string[];
  allergens: string;
  likedIngredients: string;
  city: string;
  state: string;
  plan: string;
  notifications: {
    recipeReminders: boolean;
    meditationReminders: boolean;
    produceUpdates: boolean;
  };
}

