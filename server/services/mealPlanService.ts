import { supabase } from '../integrations/supabase/client';
import { Database } from '../integrations/supabase/types';

type MealPlan = Database['public']['Tables']['meal_plans']['Row'];
type MealPlanInsert = Database['public']['Tables']['meal_plans']['Insert'];

export const mealPlanService = {
  /**
   * Get all meal plans for a user
   */
  getMealPlans: async (userId: string) => {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('user_id', userId)
      .order('week_start', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  /**
   * Get a specific meal plan by ID
   */
  getMealPlanById: async (planId: string, userId: string) => {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('id', planId)
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    return data;
  },

  /**
   * Get the current week's meal plan
   */
  getCurrentWeekMealPlan: async (userId: string) => {
    // Get the start of the current week
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start', startOfWeek.toISOString().split('T')[0])
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows returned'
    return data;
  },

  /**
   * Create a new meal plan
   */
  createMealPlan: async (mealPlan: MealPlanInsert) => {
    const { data, error } = await supabase
      .from('meal_plans')
      .insert([{
        ...mealPlan,
        date_created: new Date().toISOString(),
      }])
      .select();
      
    if (error) throw error;
    return data;
  },

  /**
   * Update a meal plan
   */
  updateMealPlan: async (planId: string, userId: string, recipes: any) => {
    const { data, error } = await supabase
      .from('meal_plans')
      .update({
        recipes,
        date_updated: new Date().toISOString(),
      })
      .eq('id', planId)
      .eq('user_id', userId)
      .select();
      
    if (error) throw error;
    return data;
  },

  /**
   * Delete a meal plan
   */
  deleteMealPlan: async (planId: string, userId: string) => {
    const { error } = await supabase
      .from('meal_plans')
      .delete()
      .eq('id', planId)
      .eq('user_id', userId);
      
    if (error) throw error;
    return { success: true };
  },
};
