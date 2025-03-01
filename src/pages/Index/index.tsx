
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Hero } from "./components/Hero";
import { MarqueeSection } from "./components/MarqueeSection";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { OnboardingDialog } from "./components/OnboardingDialog";
import { FormData } from "./components/OnboardingDialog/types";
import { supabase } from "@/integrations/supabase/client";

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

  const handleNext = async () => {
    if (currentStep === 2) {
      try {
        // Store form data in localStorage for dashboard access
        localStorage.setItem('userPreferences', JSON.stringify(formData));
        
        // Auto sign in with the predefined email
        await autoSignIn();
        
        // Navigate to dashboard
        navigate("/dashboard");
      } catch (error: any) {
        console.error("Error during auto sign-in:", error);
        toast({
          variant: "destructive",
          title: "Sign-in Error",
          description: "Could not automatically sign you in. Continuing as guest.",
        });
        
        // Still navigate to dashboard even if sign-in fails
        navigate("/dashboard");
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const autoSignIn = async () => {
    const email = "hutch@mealmagi.com";
    
    // First check if user is already signed in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // User is already signed in, nothing to do
      toast({
        title: "Welcome Back!",
        description: "You're already signed in. Enjoy the dashboard.",
      });
      return;
    }
    
    // Use magic link sign-in (no password needed)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Skip the email verification step
        shouldCreateUser: true,
      }
    });
    
    if (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
    
    toast({
      title: "Welcome!",
      description: "You've been automatically signed in as hutch@mealmagi.com",
    });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSpecificEmailSignIn = async () => {
    try {
      await autoSignIn();
      navigate("/dashboard");
    } catch (error: any) {
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
