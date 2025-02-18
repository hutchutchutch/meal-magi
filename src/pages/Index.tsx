import { Button } from "@/components/ui/button";
import { ChefHat, Sprout, Brain, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const dietTypes = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

const steps = [
  {
    title: "Welcome to MealMagi!",
    message: "Let's get you started on your mindful cooking journey.",
  },
  {
    title: "Your Food Preferences",
    message: "Tell us about your dietary needs and preferences.",
  },
  {
    title: "Your Location",
    message: "Help us find the freshest local ingredients for you.",
  },
  {
    title: "Choose Your Plan",
    message: "Select the perfect plan for your cooking adventure.",
  },
  {
    title: "Stay Connected",
    message: "Let us know how you'd like to receive updates.",
  },
];

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="feature-card p-6 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <Icon className="feature-icon mx-auto" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    dietaryPreferences: [] as string[],
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
        passwordLength: "testpassword123".length
      });

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: "test@mealmagi.com",
        password: "testpassword123",
      });

      if (authError) {
        console.error("Authentication error details:", {
          message: authError.message,
          status: authError.status,
          name: authError.name
        });
        throw authError;
      }

      console.log("Authentication successful:", {
        userId: authData.user?.id,
        userEmail: authData.user?.email,
        userCreatedAt: authData.user?.created_at,
        sessionExpiry: authData.session?.expires_at
      });

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", {
          message: profileError.message,
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint
        });
        throw profileError;
      }

      console.log("Successfully fetched profile data:", profileData);

      const { data: notifData, error: notifError } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', authData.user.id)
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

      const [city, state] = (profileData.preferred_location || "").split(", ");

      setFormData({
        email: authData.user.email || "",
        password: "testpassword123",
        dietaryPreferences: [],  // We don't store this in the current schema
        allergens,
        likedIngredients,
        city: city || "",
        state: state || "",
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
      console.error('Error loading test data:', error);
      console.error('Raw error object:', JSON.stringify(error, null, 2));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load test data. Please try again.",
      });
    }
  };

  const getProgressPercentage = () => ((currentStep) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      navigate('/dashboard');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    const testingLink = (
      <button
        onClick={loadTestData}
        className="absolute bottom-2 right-2 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        Testing
      </button>
    );

    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 relative">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••���••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Or continue with social login
              </p>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                Continue with Google
              </Button>
            </div>
            {testingLink}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 relative">
            <div className="space-y-4">
              <Label>Select your dietary preferences</Label>
              <div className="grid grid-cols-2 gap-4">
                {dietTypes.map((diet) => (
                  <div key={diet.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={diet.id}
                      checked={formData.dietaryPreferences.includes(diet.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            dietaryPreferences: [...formData.dietaryPreferences, diet.id],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            dietaryPreferences: formData.dietaryPreferences.filter(
                              (id) => id !== diet.id
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={diet.id}>{diet.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergens">Allergens (comma-separated)</Label>
              <Input
                id="allergens"
                placeholder="e.g., peanuts, shellfish, eggs"
                value={formData.allergens}
                onChange={(e) =>
                  setFormData({ ...formData, allergens: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="likedIngredients">
                Favorite ingredients (optional)
              </Label>
              <Input
                id="likedIngredients"
                placeholder="e.g., avocado, quinoa, sweet potato"
                value={formData.likedIngredients}
                onChange={(e) =>
                  setFormData({ ...formData, likedIngredients: e.target.value })
                }
              />
            </div>
            {testingLink}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 relative">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </div>
            </div>
            {testingLink}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 relative">
            <RadioGroup
              value={formData.plan}
              onValueChange={(value) =>
                setFormData({ ...formData, plan: value })
              }
            >
              <div className="flex items-center space-x-2 space-y-2">
                <RadioGroupItem value="basic" id="basic" />
                <Label htmlFor="basic">
                  <div className="font-medium">Basic Plan</div>
                  <p className="text-sm text-muted-foreground">
                    Access to basic recipes and features
                  </p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-y-2">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium">
                  <div className="font-medium">Premium Plan</div>
                  <p className="text-sm text-muted-foreground">
                    Full access to all features and premium content
                  </p>
                </Label>
              </div>
            </RadioGroup>
            {testingLink}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recipe Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new recipe suggestions
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.recipeReminders}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        recipeReminders: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Meditation Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily mindful cooking reminders
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.meditationReminders}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        meditationReminders: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Local Produce Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about seasonal ingredients
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.produceUpdates}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        produceUpdates: checked,
                      },
                    })
                  }
                />
              </div>
            </div>
            {testingLink}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Dialog open={currentStep > -1} onOpenChange={() => setCurrentStep(-1)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="space-y-4 mb-4">
              <Progress value={getProgressPercentage()} className="h-2" />
              <DialogTitle>{steps[currentStep]?.title}</DialogTitle>
              <DialogDescription>
                {steps[currentStep]?.message}
              </DialogDescription>
            </div>
          </DialogHeader>
          {renderStepContent()}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={currentStep === steps.length - 1 ? handleComplete : handleNext}
            >
              {currentStep === steps.length - 1 ? "Complete" : "Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
              AI-powered meal planning with mindful cooking experiences. Get personalized recipes, guided meditations, and local produce recommendations.
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

      <section className="py-20 px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={ChefHat}
              title="Personalized Recipes"
              description="AI-generated recipes based on your dietary preferences and pantry items."
            />
            <FeatureCard
              icon={Sprout}
              title="Local Produce"
              description="Discover and cook with in-season ingredients from your area."
            />
            <FeatureCard
              icon={Brain}
              title="Guided Meditations"
              description="Connect deeply with your food through personalized cooking meditations."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
