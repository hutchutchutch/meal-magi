import { supabase } from '../integrations/supabase/client';
import { Database } from '../integrations/supabase/types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update'];

export const userService = {
  /**
   * Get a user profile by ID
   */
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  },

  /**
   * Create a new user profile
   */
  createUserProfile: async (profile: Omit<UserProfile, 'id' | 'date_created' | 'date_updated'>) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{
        ...profile,
        date_created: new Date().toISOString(),
      }])
      .select();
      
    if (error) throw error;
    return data;
  },

  /**
   * Update a user profile
   */
  updateUserProfile: async (userId: string, updates: UserProfileUpdate) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        date_updated: new Date().toISOString(),
      })
      .eq('id', userId)
      .select();
      
    if (error) throw error;
    return data;
  },

  /**
   * Update user allergens
   */
  updateUserAllergens: async (userId: string, allergens: string[]) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        allergens,
        date_updated: new Date().toISOString(),
      })
      .eq('id', userId)
      .select();
      
    if (error) throw error;
    return data;
  },

  /**
   * Update user food preferences
   */
  updateFoodPreferences: async (userId: string, liked: string[], disliked: string[]) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        liked_ingredients: liked,
        disliked_ingredients: disliked,
        date_updated: new Date().toISOString(),
      })
      .eq('id', userId)
      .select();
      
    if (error) throw error;
    return data;
  },
};
