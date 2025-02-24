
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AuthModalProps } from "./types";
import { AuthForm } from "./AuthForm";
import { useAuthModal } from "@/hooks/useAuthModal";

export const AuthModal = ({ open, onOpenChange, showSignIn, onComplete }: AuthModalProps) => {
  const {
    loading,
    handleAuth,
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
            Sign In or Sign Up
          </DialogTitle>
        </DialogHeader>

        <AuthForm
          loading={loading}
          onSubmit={handleAuthComplete}
          onGoogleSignIn={async () => {}}
          showSignIn={showSignIn}
        />
      </DialogContent>
    </Dialog>
  );
};
