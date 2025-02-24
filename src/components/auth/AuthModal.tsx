
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthModalProps, authSchema } from "./types";
import { AuthForm } from "./AuthForm";
import { PreferencesForm } from "./PreferencesForm";
import { z } from "zod";

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    allergens: "",
    dislikedIngredients: "",
    likedIngredients: "",
    city: "",
    state: "",
  });

  const handleAuth = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
      
      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (!signInError) {
        navigate("/dashboard");
        return;
      }

      // If sign in fails, try to sign up
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
        email: user.email || '',
        allergens: preferences.allergens.split(",").map((item) => item.trim()),
        disliked_ingredients: preferences.dislikedIngredients.split(",").map((item) => item.trim()),
        liked_ingredients: preferences.likedIngredients.split(",").map((item) => item.trim()),
        city: preferences.city,
        state: preferences.state,
        height_ft: 5, // Default value
        height_in: 8, // Default value
        gender: 'human' // Default value
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showPreferences ? "Set Your Preferences" : "Welcome to MealMagi"}
          </DialogTitle>
        </DialogHeader>

        {!showPreferences ? (
          <AuthForm
            loading={loading}
            onSubmit={handleAuth}
            onGoogleSignIn={handleGoogleSignIn}
          />
        ) : (
          <PreferencesForm
            loading={loading}
            preferences={preferences}
            selectedDiets={selectedDiets}
            onPreferencesChange={(newPrefs) => setPreferences({ ...preferences, ...newPrefs })}
            onDietsChange={setSelectedDiets}
            onSubmit={handlePreferencesSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
