
export interface PantryItem {
  id: string;
  name: string;
  amount: string;
  expirationDate?: Date;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: any[];
  steps: any[];
  tip?: string;
}

export interface MealPlan {
  id: string;
  weekStart: string;
  recipes: Recipe[];
}

export interface GroceryItem {
  id: string;
  item: string;
  amount: string;
  estimatedPrice?: number;
  grocerySection?: string;
}
