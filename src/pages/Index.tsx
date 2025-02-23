
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { ChefHat, Sprout, Brain, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FeatureCard } from "./Index/components/FeatureCard";
import { OnboardingDialog } from "./Index/components/OnboardingDialog";
import { FormData } from "./Index/components/OnboardingDialog/types";

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
      <section className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative">
        {/* Top right CTAs */}
        <div className="absolute top-4 right-4 flex gap-4 z-30">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 px-8"
            asChild
          >
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>

        {/* Title and sparkles */}
        <h1 className="md:text-7xl text-4xl lg:text-9xl font-bold text-center text-white relative z-20">
          MealMagi
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-px w-1/4" />

          {/* Core sparkles component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
        
        {/* Marquee section at the bottom of hero */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="relative">
            {/* Main background gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black to-transparent" />
            
            {/* Marquee fade edges */}
            <div className="pointer-events-none absolute left-0 z-10 w-[100px] h-full bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 z-10 w-[100px] h-full bg-gradient-to-l from-black to-transparent" />
            
            <Marquee gradientWidth={0} speed={30}>
              <div className="flex gap-8 px-8">
                <FeatureCard
                  icon={ChefHat}
                  title="Personalized Recipes"
                  description="Healthy whole food recipes curated to your diet and palate preferences"
                />
                <FeatureCard
                  icon={Sprout}
                  title="Local Produce"
                  description="Identifying seasonal available produce based on your local region"
                />
                <FeatureCard
                  icon={Brain}
                  title="Informative Tips"
                  description="Helpful tidbits of information for each step of the process so you learn as you go"
                />
                <FeatureCard
                  icon={Bell}
                  title="Guided Meditations"
                  description="Developing a spiritual connection with the food you consume amplifies the nourishment"
                />
                <FeatureCard
                  icon={ChefHat}
                  title="Meal Planning"
                  description="Weekly shopping lists generated to simpilfy the hassle of meal prep"
                />
                <FeatureCard
                  icon={Sprout}
                  title="Pantry Purification"
                  description="Utilize ingredients you already have, no more discovering expired foods on your shelf"
                />
                <FeatureCard
                  icon={Brain}
                  title="Curated Favorites"
                  description="Label your favorite recipes as quick & easy, budget friendly, clean and revitalizing"
                />
              </div>
            </Marquee>
          </div>
        </div>
      </section>

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
