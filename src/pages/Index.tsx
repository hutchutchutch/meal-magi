
import { Button } from "@/components/ui/button";
import { ChefHat, Sprout, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen">
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
                asChild
              >
                <Link to="/auth">Get Started</Link>
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
