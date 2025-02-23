
import { Button } from "@/components/ui/button";
import { ChefHat, Sprout, Brain, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FeatureCard } from "./components/FeatureCard";
import { OnboardingDialog } from "./components/OnboardingDialog";
import { FormData } from "./components/OnboardingDialog/types";

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

      <section className="hero-section min-h-[80vh] flex items-center justify-center text-white p-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Transform Your
              <br />
              Cooking Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              AI-powered meal planning with mindful cooking experiences. Get
              personalized recipes, guided meditations, and local produce
              recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => setCurrentStep(1)}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-8 bg-background overflow-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute left-0 z-10 w-[100px] h-full bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 z-10 w-[100px] h-full bg-gradient-to-l from-background to-transparent" />
          <Marquee gradientWidth={0} speed={30}>
            <div className="flex gap-4 px-4">
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
      </section>
    </div>
  );
};

export default Index;
