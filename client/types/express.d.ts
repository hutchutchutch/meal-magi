import 'express';

declare module 'express' {
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