
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
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (!signInError) {
        navigate("/dashboard");
        return;
      }

      if (signInError.message.includes("Invalid login credentials")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (signUpError) throw signUpError;

        if (signUpData.user) {
          setShowPreferences(true);
        }
      }
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
        height_ft: 5,
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
