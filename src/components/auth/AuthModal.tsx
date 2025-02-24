import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const dietTypes = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    allergens: "",
    dislikedIngredients: "",
    likedIngredients: "",
    city: "",
    state: "",
  });

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAuth = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
      
      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (!signInError) {
        navigate("/dashboard");
        return;
      }

      // If sign in fails, try to sign up
      if (signInError.message.includes("Invalid login credentials")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (signUpError) throw signUpError;

        if (signUpData.user) {
          setShowPreferences(true);
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesSubmit = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("user_profiles").upsert({
        id: user.id,
        email: user.email || '',
        allergens: preferences.allergens.split(",").map((item) => item.trim()),
        disliked_ingredients: preferences.dislikedIngredients.split(",").map((item) => item.trim()),
        liked_ingredients: preferences.likedIngredients.split(",").map((item) => item.trim()),
        city: preferences.city,
        state: preferences.state,
        gender: 'human', // Default value
        height_feet: 5, // Default value
        height_inches: 8, // Default value
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showPreferences ? "Set Your Preferences" : "Welcome to MealMagi"}
          </DialogTitle>
        </DialogHeader>

        {!showPreferences ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAuth)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Continue"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                Sign in with Google
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Select your dietary preferences</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
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

            {["allergens", "dislikedIngredients", "likedIngredients"].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field === "allergens" && "Allergens (comma-separated)"}
                  {field === "dislikedIngredients" && "Disliked ingredients (comma-separated)"}
                  {field === "likedIngredients" && "Favorite ingredients (comma-separated)"}
                </Label>
                <Input
                  id={field}
                  value={preferences[field as keyof typeof preferences]}
                  onChange={(e) =>
                    setPreferences({ ...preferences, [field]: e.target.value })
                  }
                  placeholder={
                    field === "allergens"
                      ? "e.g., peanuts, shellfish, eggs"
                      : field === "dislikedIngredients"
                      ? "e.g., cilantro, olives, mushrooms"
                      : "e.g., garlic, tomatoes, basil"
                  }
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={preferences.city}
                  onChange={(e) =>
                    setPreferences({ ...preferences, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={preferences.state}
                  onChange={(e) =>
                    setPreferences({ ...preferences, state: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handlePreferencesSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Complete Setup"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
