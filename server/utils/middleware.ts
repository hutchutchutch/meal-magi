import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

/**
 * Middleware to check if the user is authenticated
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await authService.getSession();
    
    if (error || !data.session) {
      return res.status(401).json({ 
        error: 'You must be logged in to access this resource' 
      });
    }
    
    // Add user data to the request object
    req.user = data.session.user;
    
    next();
  } catch (error: any) {
    return res.status(500).json({ 
      error: error.message || 'An error occurred while checking authentication'
    });
  }
};

/**
 * Middleware to handle errors
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  return res.status(statusCode).json({ 
    error: message 
  });
};

// Add request type definition
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        app_metadata?: any;
        user_metadata?: any;
        aud?: string;
      };
    }
  }
}