import { Button } from "@/components/ui/button";

interface HeroHeaderProps {
  setCurrentStep: (step: number) => void;
}

export const HeroHeader = ({ setCurrentStep }: HeroHeaderProps) => {
  return (
    <div className="absolute top-4 right-4 flex gap-4 z-30">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white px-8"
        onClick={() => setCurrentStep(0)}
      >
        Get Free Meal Plan
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="bg-transparent border-white text-white hover:bg-white/10 px-8"
        onClick={() => setCurrentStep(0)}
      >
        Sign In
      </Button>
    </div>
  );
};

