import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { z } from "zod";
import { authSchema, PreferencesFormData } from "@/components/auth/types";
import { auth } from "@/client/api";
import { supabase } from "@/client/integrations/supabase/client";

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
      // We need to use Supabase client directly for this auth flow
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

      // Normal sign in through our API
      const response = await auth.signIn(normalizedEmail, 'temp-password');
      
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
      // We need to use Supabase client directly for this auth flow
      if (isSpecialEmail(normalizedEmail)) {
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

      // Normal sign up through our API
      const response = await auth.signUp(normalizedEmail, 'temp-password');

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
      // For OAuth, we still need to use Supabase client directly
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