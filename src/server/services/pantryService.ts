import { supabase } from '../integrations/supabase/client';

export const pantryService = {
  /**
   * Get all pantry items for a user
   */
  getPantryItems: async (userId: string) => {
    const { data, error } = await supabase
      .from('pantry_items')
      .select('id, item_name, quantity, date_added')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  },

  /**
   * Add a new pantry item for a user
   */
  addPantryItem: async (userId: string, item: { item_name: string; quantity: string }) => {
    const { data, error } = await supabase
      .from('pantry_items')
      .insert([
        {
          user_id: userId,
          item_name: item.item_name,
          quantity: item.quantity,
          date_added: new Date().toISOString(),
        },
      ])
      .select();
      
    if (error) throw error;
    return data;
  },

  /**
   * Update a pantry item
   */
  updatePantryItem: async (userId: string, itemId: string, updates: { item_name?: string; quantity?: string }) => {
    const { data, error } = await supabase
      .from('pantry_items')
      .update({
        ...updates,
        date_updated: new Date().toISOString(),
      })
      .eq('id', itemId)
      .eq('user_id', userId)
      .select();
      
    if (error) throw error;
    return data;
  },

  /**
   * Delete a pantry item
   */
  deletePantryItem: async (userId: string, itemId: string) => {
    const { error } = await supabase
      .from('pantry_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', userId);
      
    if (error) throw error;
    return { success: true };
  },
};
