import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  /**
   * Sign in a user
   */
  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // Check if this is the special demo account
      if (email.toLowerCase() === 'hutch@mealmagi.com') {
        const { data, error } = await authService.signInWithOtp(email);
        
        if (error) {
          return res.status(400).json({ error: error.message });
        }
        
        return res.status(200).json({
          message: 'Magic link sign-in initiated. No password needed!',
          data,
        });
      }
      
      const { data, error } = await authService.signInWithPassword(email, password);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(200).json({
        message: 'Successfully signed in',
        data,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred during sign-in' });
    }
  },

  /**
   * Sign up a new user
   */
  signUp: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // Check if this is the special demo account
      if (email.toLowerCase() === 'hutch@mealmagi.com') {
        const { data, error } = await authService.signInWithOtp(email);
        
        if (error) {
          return res.status(400).json({ error: error.message });
        }
        
        return res.status(200).json({
          message: 'Special account activated! No password needed.',
          data,
        });
      }
      
      const { data, error } = await authService.signUp(email, password);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(201).json({
        message: 'Account created successfully',
        data,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred during sign-up' });
    }
  },

  /**
   * Sign in with Google OAuth
   */
  signInWithGoogle: async (req: Request, res: Response) => {
    try {
      const { data, error } = await authService.signInWithGoogle();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(200).json({
        data,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred during Google sign-in' });
    }
  },

  /**
   * Sign out the current user
   */
  signOut: async (req: Request, res: Response) => {
    try {
      const { error } = await authService.signOut();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(200).json({
        message: 'Successfully signed out',
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred during sign-out' });
    }
  },

  /**
   * Get the current session
   */
  getSession: async (req: Request, res: Response) => {
    try {
      const { data, error } = await authService.getSession();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(200).json({
        data,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'An error occurred while fetching session' });
    }
  },
};
