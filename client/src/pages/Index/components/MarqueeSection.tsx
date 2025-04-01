
import { 
  ChefHat, 
  Bookmark, 
  Lightbulb, 
  SunSnow, 
  AlarmClockPlus, 
  Sparkles, 
  ListChecks, 
  Soup,
  ShoppingCart 
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { FeatureCard } from "./FeatureCard";

export const MarqueeSection = () => {
  return (
    <div className="absolute bottom-8 left-0 right-0">
      <div className="text-center mb-8">
        <p className="text-2xl relative text-primary">
          Connect with your food
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black to-transparent" />
        
        <div className="pointer-events-none absolute left-0 z-10 w-[100px] h-full bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 z-10 w-[100px] h-full bg-gradient-to-l from-black to-transparent" />
        
        <Marquee gradientWidth={0} speed={30} pauseOnHover>
          <div className="flex gap-8 px-8">
            <FeatureCard
              icon={Bookmark}
              title="Favorite Recipes"
              description="Save and organize your most loved recipes for quick access"
            />
            <FeatureCard
              icon={Lightbulb}
              title="Chef Tips"
              description="Professional cooking insights and techniques at your fingertips"
            />
            <FeatureCard
              icon={ChefHat}
              title="Personalized Recipes"
              description="AI-curated recipes tailored to your preferences and dietary needs"
            />
            <FeatureCard
              icon={SunSnow}
              title="Seasonal Produce"
              description="Stay connected with nature's rhythm through seasonal ingredients"
            />
            <FeatureCard
              icon={AlarmClockPlus}
              title="20-min Meals"
              description="Quick and delicious recipes for busy schedules"
            />
            <FeatureCard
              icon={Sparkles}
              title="Pantry Purification"
              description="Smart organization and optimal ingredient usage"
            />
            <FeatureCard
              icon={ListChecks}
              title="Simple Steps"
              description="Clear and concise cooking instructions for every skill level"
            />
            <FeatureCard
              icon={Soup}
              title="Guided Meditations"
              description="Mindful cooking experiences for spiritual nourishment"
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Curated Groceries"
              description="Smart shopping lists based on your meal plans"
            />
          </div>
        </Marquee>
      </div>
    </div>
  );
};

