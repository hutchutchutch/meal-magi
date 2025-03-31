
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { authSchema, PreferencesFormData } from "@/components/auth/types";

export const useAuthModal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<PreferencesFormData>({
    allergens: "",
    dislikedIngredients: "",
    likedIngredients: "",
    city: "",
    state: "",
  });

  const isSpecificEmail = (email: string) => {
    return email.toLowerCase() === "hutch@mealmagi.com";
  };

  const handleSignIn = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
      const normalizedEmail = values.email.trim().toLowerCase();

      // Special case for hutch@mealmagi.com - passwordless sign in
      if (isSpecificEmail(normalizedEmail)) {
        const { error } = await supabase.auth.signInWithOtp({
          email: normalizedEmail,
          options: {
            shouldCreateUser: true,
          }
        });

        if (error) {
          console.error('Sign in error:', error);
          throw new Error('Error signing in. Please try again.');
        }

        toast({
          title: "Success",
          description: "You have been signed in successfully. No password needed!",
        });
        
        navigate("/dashboard");
        return;
      }

      // Normal sign in for other accounts
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: 'temp-password', // We'll implement proper password handling later
      });

      if (error) {
        console.error('Sign in error:', error);
        throw new Error('Invalid email or password. Please try again.');
      }

      toast({
        title: "Success",
        description: "You have been signed in successfully.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values: z.infer<typeof authSchema>, userPreferences?: any) => {
    try {
      setLoading(true);
      const normalizedEmail = values.email.trim().toLowerCase();

      // Special case for hutch@mealmagi.com - passwordless sign in
      if (isSpecificEmail(normalizedEmail)) {
        const { error } = await supabase.auth.signInWithOtp({
          email: normalizedEmail,
          options: {
            shouldCreateUser: true,
          }
        });

        if (error) {
          console.error('Sign in error:', error);
          throw new Error('Error signing in. Please try again.');
        }

        toast({
          title: "Success",
          description: "Special account activated! No password needed.",
        });
        
        navigate("/dashboard");
        return;
      }

      // First check if user already exists
      const { data: { user: existingUser } } = await supabase.auth.getUser();

      if (existingUser) {
        throw new Error('An account with this email already exists. Please sign in instead.');
      }

      // Create new user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: 'temp-password', // We'll implement proper password handling later
      });

      if (signUpError) {
        throw signUpError;
      }

      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to verify your account.",
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      throw error; // Re-throw to handle in the calling component
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return {
    loading,
    preferences,
    handleSignIn,
    handleSignUp,
    handleGoogleSignIn,
    setPreferences,
  };
};
