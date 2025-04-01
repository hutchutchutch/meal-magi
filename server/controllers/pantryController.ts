import { Request, Response } from 'express';
import { pantryService } from '../services/pantryService';

export const pantryController = {
  /**
   * Get all pantry items for a user
   */
  getPantryItems: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const pantryItems = await pantryService.getPantryItems(userId);
      
      return res.status(200).json({
        data: pantryItems,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while fetching pantry items' });
    }
  },

  /**
   * Add a new pantry item
   */
  addPantryItem: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      const { item_name, quantity } = req.body;
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if (!item_name || !quantity) {
        return res.status(400).json({ error: 'Item name and quantity are required' });
      }
      
      const newItem = await pantryService.addPantryItem(userId, { item_name, quantity });
      
      return res.status(201).json({
        message: 'Pantry item added successfully',
        data: newItem,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while adding pantry item' });
    }
  },

  /**
   * Update a pantry item
   */
  updatePantryItem: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      const { itemId } = req.params;
      const { item_name, quantity } = req.body;
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if (!itemId) {
        return res.status(400).json({ error: 'Item ID is required' });
      }
      
      // Only update fields that are provided
      const updates: { item_name?: string; quantity?: string } = {};
      if (item_name !== undefined) updates.item_name = item_name;
      if (quantity !== undefined) updates.quantity = quantity;
      
      const updatedItem = await pantryService.updatePantryItem(userId, itemId, updates);
      
      return res.status(200).json({
        message: 'Pantry item updated successfully',
        data: updatedItem,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while updating pantry item' });
    }
  },

  /**
   * Delete a pantry item
   */
  deletePantryItem: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      const { itemId } = req.params;
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if (!itemId) {
        return res.status(400).json({ error: 'Item ID is required' });
      }
      
      await pantryService.deletePantryItem(userId, itemId);
      
      return res.status(200).json({
        message: 'Pantry item deleted successfully',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while deleting pantry item' });
    }
  },
};
