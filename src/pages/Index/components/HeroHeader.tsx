
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const HeroHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 right-4 flex gap-4 z-30">
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white px-8"
        onClick={() => navigate("/auth")}
      >
        Get Free Meal Plan
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
  );
};

