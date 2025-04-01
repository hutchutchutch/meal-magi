import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Hero } from "./components/Hero";
import { MarqueeSection } from "./components/MarqueeSection";
import { AuthModal } from "@/client/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { OnboardingDialog } from "./components/OnboardingDialog";
import { FormData } from "./components/OnboardingDialog/types";
import { supabase } from "@/client/integrations/supabase/client";
import { auth } from "@/client/api";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showSignIn, setShowSignIn] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userInfo: {
      height: {
        feet: '',
        inches: '',
      },
      weight: '',
      gender: 'male',
      city: '',
      state: '',
    },
    allergens: {
      selected: [],
      custom: [],
    },
    preferences: {
      liked: [],
      disliked: [],
    },
  });

  // Add debugging effect to monitor state changes
  useEffect(() => {
    console.log("[DEBUG] Current step:", currentStep);
    console.log("[DEBUG] Form data state:", formData);
  }, [currentStep, formData]);

  const handleNext = async () => {
    console.log("[DEBUG] handleNext called, current step:", currentStep);
    
    if (currentStep === 2) {
      try {
        console.log("[DEBUG] Final step completed, preparing to navigate to dashboard");
        
        // Store form data in localStorage for dashboard access
        localStorage.setItem('userPreferences', JSON.stringify(formData));
        console.log("[DEBUG] User preferences saved to localStorage");
        
        // Check if we're signed in already
        const sessionData = await auth.getSession();
        console.log("[DEBUG] Current session:", sessionData);
        
        if (!sessionData.data?.session) {
          console.log("[DEBUG] No active session, attempting auto sign-in");
          try {
            // Try auto sign in but continue regardless
            await autoSignIn();
            console.log("[DEBUG] Auto sign-in completed successfully");
          } catch (error: any) {
            console.error("[DEBUG] Auto sign-in failed but continuing:", error);
            // Continue without sign-in
          }
        } else {
          console.log("[DEBUG] User already signed in");
        }
        
        // Show success toast
        toast({
          title: "Onboarding Complete!",
          description: "Navigating to your personalized dashboard...",
        });
        
        console.log("[DEBUG] About to navigate to dashboard...");
        // Force navigation to dashboard
        window.location.href = "/dashboard";
      } catch (error: any) {
        console.error("[DEBUG] Critical error during final step:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was a problem loading your dashboard. Please try again.",
        });
      }
    } else {
      console.log("[DEBUG] Moving to next step:", currentStep + 1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const autoSignIn = async () => {
    const email = "hutch@mealmagi.com";
    console.log("[DEBUG] Attempting auto sign-in with:", email);
    
    // First check if user is already signed in
    const { data } = await supabase.auth.getSession();
    
    if (data.session) {
      console.log("[DEBUG] User already has a session, no need to sign in again");
      toast({
        title: "Welcome Back!",
        description: "You're already signed in. Enjoy the dashboard.",
      });
      return;
    }
    
    console.log("[DEBUG] No existing session, sending OTP sign-in request");
    // Use magic link sign-in (no password needed)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Skip the email verification step
        shouldCreateUser: true,
      }
    });
    
    if (error) {
      console.error("[DEBUG] Sign-in error:", error);
      throw error;
    }
    
    console.log("[DEBUG] OTP sign-in request sent successfully");
    toast({
      title: "Welcome!",
      description: "You've been automatically signed in as hutch@mealmagi.com",
    });
  };

  const handleBack = () => {
    console.log("[DEBUG] Going back from step:", currentStep);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSpecificEmailSignIn = async () => {
    console.log("[DEBUG] Specific email sign-in button clicked");
    try {
      await autoSignIn();
      console.log("[DEBUG] Sign-in successful, navigating to dashboard");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("[DEBUG] Sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Sign-in Error",
        description: error.message || "An error occurred during sign-in",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 flex gap-4 z-30">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8"
          onClick={() => {
            setShowSignIn(false);
            setCurrentStep(0); // Start onboarding flow
          }}
        >
          Get Free Meal Plan
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-white text-white hover:bg-white/10 px-8"
          onClick={handleSpecificEmailSignIn}
        >
          Sign In
        </Button>
      </div>

      <AuthModal 
        open={isAuthOpen} 
        onOpenChange={setIsAuthOpen} 
        showSignIn={showSignIn}
        preferences={formData}
      />
      <Hero setCurrentStep={setCurrentStep} />
      <MarqueeSection />
      
      <OnboardingDialog
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        onBack={handleBack}
        onNext={handleNext}
        onOpenChange={(open) => !open && setCurrentStep(-1)}
      />
    </div>
  );
};

export default Index;