
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Hero } from "./components/Hero";
import { MarqueeSection } from "./components/MarqueeSection";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { OnboardingDialog } from "./components/OnboardingDialog";
import { FormData } from "./components/OnboardingDialog/types";

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
      // Store form data in localStorage for dashboard access
      localStorage.setItem('userPreferences', JSON.stringify(formData));
      
      // Navigate directly to dashboard instead of showing auth modal
      navigate("/dashboard");
      
      toast({
        title: "Welcome!",
        description: "You can now explore the dashboard. Sign up later to save your preferences.",
      });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
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
          onClick={() => {
            setShowSignIn(true);
            setIsAuthOpen(true);
          }}
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
