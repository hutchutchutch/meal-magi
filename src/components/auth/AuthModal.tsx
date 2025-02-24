
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthModalProps } from "./types";
import { AuthForm } from "./AuthForm";
import { PreferencesForm } from "./PreferencesForm";
import { useAuthModal } from "@/hooks/useAuthModal";

export const AuthModal = ({ open, onOpenChange, showSignIn, onComplete }: AuthModalProps) => {
  const {
    loading,
    showPreferences,
    preferences,
    selectedDiets,
    handleAuth,
    handlePreferencesSubmit,
    handleGoogleSignIn,
    setPreferences,
    setSelectedDiets,
  } = useAuthModal();

  // Use this to handle completion of the auth flow
  const handleAuthComplete = async (values: any) => {
    await handleAuth(values);
    if (showSignIn) {
      onComplete?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showPreferences ? "Set Your Preferences" : (showSignIn ? "Welcome Back" : "Welcome to MealMagi")}
          </DialogTitle>
        </DialogHeader>

        {!showPreferences ? (
          <AuthForm
            loading={loading}
            onSubmit={handleAuthComplete}
            onGoogleSignIn={handleGoogleSignIn}
            showSignIn={showSignIn}
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
