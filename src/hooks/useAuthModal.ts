
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
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<PreferencesFormData>({
    allergens: "",
    dislikedIngredients: "",
    likedIngredients: "",
    city: "",
    state: "",
  });

  const handleAuth = async (values: z.infer<typeof authSchema>, isSignIn: boolean = false) => {
    try {
      setLoading(true);
      
      // Normalize the email
      const normalizedEmail = values.email.trim().toLowerCase();
      
      if (isSignIn) {
        // Handle sign in flow
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: 'temp-password',
        });

        if (signInError) {
          console.log('Sign in error:', signInError);
          throw new Error('Invalid email or password. Please try again.');
        }
      } else {
        // Handle sign up flow
        const { error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password: 'temp-password',
        });

        if (signUpError) {
          console.log('Sign up error:', signUpError);
          if (signUpError.message.includes('already registered')) {
            throw new Error('An account with this email already exists. Please sign in instead.');
          }
          throw signUpError;
        }
      }

      toast({
        title: "Success",
        description: isSignIn ? "You have been signed in." : "Account created successfully.",
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

  const handlePreferencesSubmit = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("user_profiles").upsert({
        id: user.id,
        email: user.email || '',
        allergens: preferences.allergens.split(",").map((item) => item.trim()),
        disliked_ingredients: preferences.dislikedIngredients.split(",").map((item) => item.trim()),
        liked_ingredients: preferences.likedIngredients.split(",").map((item) => item.trim()),
        city: preferences.city,
        state: preferences.state,
        height_ft: 5, // Default values
        height_in: 8,
        gender: 'human'
      });

      if (error) throw error;

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
    showPreferences,
    preferences,
    selectedDiets,
    handleAuth,
    handlePreferencesSubmit,
    handleGoogleSignIn,
    setPreferences,
    setSelectedDiets,
  };
};
