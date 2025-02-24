import { useState } from 'react';
import { LucideIcon } from "lucide-react";
import { FeatureModal } from "@/components/features/FeatureModal";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const getFeatureDetails = (title: string): string => {
  const details: { [key: string]: string } = {
    "Favorite Recipes": "Save your go-to recipes for quick access. Our smart tagging system helps you organize recipes by cuisine, dietary preferences, and cooking time. You can also create custom collections and share them with friends and family.",
    "Chef Tips": "Get professional cooking insights right when you need them. Our AI analyzes your cooking patterns and provides personalized tips to improve your techniques. Learn about knife skills, temperature control, and ingredient substitutions.",
    "Personalized Recipes": "Our AI learns your taste preferences, dietary restrictions, and cooking skill level to suggest recipes you'll love. We also consider your available ingredients and time constraints to make cooking stress-free.",
    "Seasonal Produce": "Stay connected with local farmers and markets. Get notifications about seasonal ingredients, their peak freshness periods, and storage tips. We also suggest recipes that make the most of seasonal produce.",
    "20-min Meals": "Quick doesn't mean compromising on quality. These recipes are carefully crafted to maximize flavor while minimizing prep time. Perfect for busy weeknights or when you're short on time.",
    "Pantry Purification": "Smart inventory management helps you track expiration dates and suggests recipes to use ingredients before they spoil. Reduce food waste and save money with our intelligent pantry organization system.",
    "Simple Steps": "Each recipe is broken down into clear, manageable steps with visual guides and timing cues. Perfect for beginners or when you want to cook without overthinking.",
    "Guided Meditations": "Transform cooking into a mindful experience with our guided meditations. These short sessions help you focus on the present moment, reduce stress, and develop a deeper connection with your food.",
    "Curated Groceries": "Generate smart shopping lists based on your meal plans and current pantry inventory. Get price comparisons from local stores and optimize your grocery budget.",
  };
  return details[title] || "Feature details coming soon...";
};

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 w-[300px] hover:bg-black/30 transition-all cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white whitespace-pre-line">{title}</h3>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      <FeatureModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        icon={Icon}
        title={title}
        description={description}
        details={getFeatureDetails(title)}
      />
    </>
  );
};
