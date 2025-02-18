
import { Button } from "@/components/ui/button";
import { ChefHat, Sprout, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    title: "Welcome!",
    message: "Let's start your mindful cooking journey together.",
  },
  {
    title: "Your Preferences",
    message: "Tell us what makes your meals special.",
  },
  {
    title: "Almost There!",
    message: "A few more details to personalize your experience.",
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
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [allergens, setAllergens] = useState("");

  const getProgressPercentage = () => ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen">
      <Dialog open={currentStep > 0} onOpenChange={() => setCurrentStep(0)}>
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
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Select your dietary preferences</Label>
                <div className="grid grid-cols-2 gap-4">
                  {dietTypes.map((diet) => (
                    <div key={diet.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={diet.id}
                        checked={selectedDiets.includes(diet.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDiets([...selectedDiets, diet.id]);
                          } else {
                            setSelectedDiets(
                              selectedDiets.filter((id) => id !== diet.id)
                            );
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
                  value={allergens}
                  onChange={(e) => setAllergens(e.target.value)}
                />
              </div>

              <Button
                type="button"
                className="w-full"
                onClick={() => setCurrentStep(2)}
              >
                Continue
              </Button>
            </div>
          )}
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
