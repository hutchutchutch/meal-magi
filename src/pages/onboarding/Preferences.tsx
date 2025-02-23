
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const dietTypes = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

const Preferences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [allergens, setAllergens] = useState("");
  const [dislikedIngredients, setDislikedIngredients] = useState("");
  const [likedIngredients, setLikedIngredients] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      // Create user profile with preferences
      const { error } = await supabase.from("user_profiles").upsert({
        id: user.id,
        allergens: allergens.split(",").map((item) => item.trim()),
        disliked_ingredients: dislikedIngredients.split(",").map((item) => item.trim()),
        liked_ingredients: likedIngredients.split(",").map((item) => item.trim()),
        city,
        state
      });

      if (error) throw error;

      navigate("/onboarding/location");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Dietary Preferences</h2>
          <p className="mt-2 text-muted-foreground">
            Help us personalize your cooking experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                        setSelectedDiets(selectedDiets.filter((id) => id !== diet.id));
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

          <div className="space-y-2">
            <Label htmlFor="disliked">Disliked ingredients (comma-separated)</Label>
            <Input
              id="disliked"
              placeholder="e.g., cilantro, olives, mushrooms"
              value={dislikedIngredients}
              onChange={(e) => setDislikedIngredients(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liked">Favorite ingredients (comma-separated)</Label>
            <Input
              id="liked"
              placeholder="e.g., garlic, tomatoes, basil"
              value={likedIngredients}
              onChange={(e) => setLikedIngredients(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
