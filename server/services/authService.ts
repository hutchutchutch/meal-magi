import { supabase } from '../integrations/supabase/client';

export const authService = {
  /**
   * Get the current user session
   */
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  /**
   * Sign in a user with email/password
   */
  signInWithPassword: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  /**
   * Sign in a user with OTP (One-Time Password/Magic Link)
   */
  signInWithOtp: async (email: string, shouldCreateUser: boolean = true) => {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser,
      },
    });
  },

  /**
   * Sign in a user with Google OAuth
   */
  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  },

  /**
   * Sign up a new user
   */
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  /**
   * Get the current user
   */
  getUser: async () => {
    return await supabase.auth.getUser();
  },
};
