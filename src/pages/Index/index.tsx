import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "./components/Hero";
import { MarqueeSection } from "./components/MarqueeSection";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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
    </div>
  );
};

export default Index;
