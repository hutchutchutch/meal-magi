import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
  /**
   * Get a user profile
   */
  getUserProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const userProfile = await userService.getUserProfile(userId);
      
      return res.status(200).json({
        data: userProfile,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while fetching user profile' });
    }
  },

  /**
   * Create a new user profile
   */
  createUserProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id; // req.user would be set by auth middleware
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const { 
        city, 
        state, 
        gender, 
        height_ft, 
        height_in, 
        weight,
        allergens,
        liked_ingredients,
        disliked_ingredients
      } = req.body;
      
      // Basic validation
      if (!city || !state) {
        return res.status(400).json({ error: 'City and state are required' });
      }
      
      const newProfile = await userService.createUserProfile({
        id: userId,
        email: req.user?.email || '',
        city,
        state,
        gender: gender || 'male',
        height_ft: height_ft || 5,
        height_in: height_in || 10,
        weight: weight || null,
        allergens: allergens || null,
        liked_ingredients: liked_ingredients || null,
        disliked_ingredients: disliked_ingredients || null,
      });
      
      return res.status(201).json({
        message: 'User profile created successfully',
        data: newProfile,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while creating user profile' });
    }
  },

  /**
   * Update a user profile
   */
  updateUserProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const { 
        city, 
        state, 
        gender, 
        height_ft, 
        height_in, 
        weight,
        allergens,
        liked_ingredients,
        disliked_ingredients
      } = req.body;
      
      // Build update object with only the fields that were provided
      const updates: any = {};
      if (city !== undefined) updates.city = city;
      if (state !== undefined) updates.state = state;
      if (gender !== undefined) updates.gender = gender;
      if (height_ft !== undefined) updates.height_ft = height_ft;
      if (height_in !== undefined) updates.height_in = height_in;
      if (weight !== undefined) updates.weight = weight;
      if (allergens !== undefined) updates.allergens = allergens;
      if (liked_ingredients !== undefined) updates.liked_ingredients = liked_ingredients;
      if (disliked_ingredients !== undefined) updates.disliked_ingredients = disliked_ingredients;
      
      const updatedProfile = await userService.updateUserProfile(userId, updates);
      
      return res.status(200).json({
        message: 'User profile updated successfully',
        data: updatedProfile,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while updating user profile' });
    }
  },

  /**
   * Update user allergens
   */
  updateAllergens: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      const { allergens } = req.body;
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if (!allergens || !Array.isArray(allergens)) {
        return res.status(400).json({ error: 'Allergens must be an array' });
      }
      
      const updatedProfile = await userService.updateUserAllergens(userId, allergens);
      
      return res.status(200).json({
        message: 'Allergens updated successfully',
        data: updatedProfile,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while updating allergens' });
    }
  },

  /**
   * Update food preferences
   */
  updateFoodPreferences: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user?.id; // req.user would be set by auth middleware
      const { liked, disliked } = req.body;
      
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      if ((!liked || !Array.isArray(liked)) && (!disliked || !Array.isArray(disliked))) {
        return res.status(400).json({ error: 'Liked and disliked ingredients must be arrays' });
      }
      
      const updatedProfile = await userService.updateFoodPreferences(
        userId, 
        Array.isArray(liked) ? liked : [], 
        Array.isArray(disliked) ? disliked : []
      );
      
      return res.status(200).json({
        message: 'Food preferences updated successfully',
        data: updatedProfile,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while updating food preferences' });
    }
  },
};
