import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "./Index/components/Hero";
import { MarqueeSection } from "./Index/components/MarqueeSection";
import { OnboardingDialog } from "./Index/components/OnboardingDialog";
import { FormData } from "./Index/components/OnboardingDialog/types";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    dietaryPreferences: [],
    allergens: "",
    likedIngredients: "",
    city: "",
    state: "",
    plan: "basic",
    notifications: {
      recipeReminders: true,
      meditationReminders: true,
      produceUpdates: true,
    },
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const loadTestData = async () => {
    try {
      console.log("Attempting authentication with:", {
        email: "test@mealmagi.com",
        passwordLength: "testpassword123".length,
      });

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: "test@mealmagi.com",
          password: "testpassword123",
        });

      if (authError) {
        console.error("Authentication error details:", {
          message: authError.message,
          status: authError.status,
          name: authError.name,
        });
        throw authError;
      }

      console.log("Authentication successful:", {
        userId: authData.user?.id,
        userEmail: authData.user?.email,
        userCreatedAt: authData.user?.created_at,
        sessionExpiry: authData.session?.expires_at,
      });

      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", {
          message: profileError.message,
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint,
        });
        throw profileError;
      }

      console.log("Successfully fetched profile data:", profileData);

      const { data: notifData, error: notifError } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", authData.user.id)
        .single();

      if (notifError) {
        console.error("Notification preferences fetch error:", notifError);
        throw notifError;
      }

      console.log("Successfully fetched notification data:", notifData);

      const allergens = Array.isArray(profileData.allergens)
        ? profileData.allergens.join(", ")
        : "";

      const likedIngredients = Array.isArray(profileData.liked_ingredients)
        ? profileData.liked_ingredients.join(", ")
        : "";

      setFormData({
        email: authData.user.email || "",
        password: "testpassword123",
        dietaryPreferences: [], // We don't store this in the current schema
        allergens,
        likedIngredients,
        city: profileData.city || "",
        state: profileData.state || "",
        plan: "basic",
        notifications: {
          recipeReminders: notifData.recipe_reminders,
          meditationReminders: notifData.meditation_reminders,
          produceUpdates: notifData.local_produce_updates,
        },
      });

      handleNext();

      toast({
        title: "Test Data Loaded",
        description: "You can now proceed through the onboarding flow with test data.",
      });
    } catch (error) {
      console.error("Error loading test data:", error);
      console.error("Raw error object:", JSON.stringify(error, null, 2));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load test data. Please try again.",
      });
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      navigate("/dashboard");
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

      <Hero />
      <MarqueeSection />

      <OnboardingDialog
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        onBack={handleBack}
        onNext={handleNext}
        onComplete={() => navigate("/dashboard")}
        loadTestData={loadTestData}
        onOpenChange={() => setCurrentStep(-1)}
      />
    </div>
  );
};

export default Index;
