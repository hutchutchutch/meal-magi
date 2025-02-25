
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

  const handleAuth = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
      
      // Normalize the email (trim and lowercase)
      const normalizedEmail = values.email.trim().toLowerCase();
      
      // First check if the email exists in user_profiles using ILIKE for case-insensitive matching
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('email')
        .ilike('email', normalizedEmail)
        .maybeSingle();

      // Log the results and query details to help with debugging
      console.log('Auth attempt details:', { 
        normalizedEmail,
        profileData,
        profileError
      });

      if (profileError) {
        throw profileError;
      }

      if (!profileData) {
        toast({
          variant: "destructive",
          title: "Account not found",
          description: "No account exists with this email address. Please sign up instead.",
        });
        return;
      }

      // If email exists, attempt to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: 'temp-password', // We'll need to implement proper password handling later
      });

      if (signInError) {
        throw signInError;
      }

      toast({
        title: "Success",
        description: "You have been signed in.",
      });
      
      // Navigate to dashboard on successful sign in
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
