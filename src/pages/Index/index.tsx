
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error('No user found');

        const { error: profileError } = await supabase.from('user_profiles').upsert({
          id: user.id,
          email: user.email || '',
          height_ft: parseInt(formData.userInfo.height.feet),
          height_in: parseInt(formData.userInfo.height.inches),
          weight: parseInt(formData.userInfo.weight),
          gender: formData.userInfo.gender,
          city: formData.userInfo.city,
          state: formData.userInfo.state,
          allergens: [...formData.allergens.selected, ...formData.allergens.custom],
          liked_ingredients: formData.preferences.liked,
          disliked_ingredients: formData.preferences.disliked,
        });

        if (profileError) throw profileError;

        navigate("/dashboard");
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
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
          onClick={() => setIsAuthOpen(true)}
        >
          Get Free Meal Plan
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-white text-white hover:bg-white/10 px-8"
          onClick={() => setIsAuthOpen(true)}
        >
          Sign In
        </Button>
      </div>

      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
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
