
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthModalProps } from "./types";
import { AuthForm } from "./AuthForm";
import { useAuthModal } from "@/hooks/useAuthModal";

export const AuthModal = ({ 
  open, 
  onOpenChange, 
  showSignIn = true,
  onComplete,
  preferences 
}: AuthModalProps) => {
  const {
    loading,
    handleSignIn,
    handleSignUp,
  } = useAuthModal();

  const handleSubmit = async (values: any) => {
    if (showSignIn) {
      await handleSignIn(values);
      onComplete?.();
    } else {
      await handleSignUp(values, preferences);
      onComplete?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showSignIn ? "Sign In" : "Complete Your Registration"}
          </DialogTitle>
        </DialogHeader>

        <AuthForm
          loading={loading}
          onSubmit={handleSubmit}
          onGoogleSignIn={async () => {}}
          showSignIn={showSignIn}
        />
      </DialogContent>
    </Dialog>
  );
};
