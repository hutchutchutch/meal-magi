
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const dietTypes = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  allergens: z.string(),
  dislikedIngredients: z.string(),
  likedIngredients: z.string(),
  city: z.string(),
  state: z.string(),
});

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      allergens: "",
      dislikedIngredients: "",
      likedIngredients: "",
      city: "",
      state: "",
    },
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleAuth = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
      
      // First try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      // If there's no sign in error, update preferences and navigate
      if (!signInError) {
        await updateUserPreferences(signInData.user!.id, values);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in",
        });
        navigate("/dashboard");
        return;
      }

      // If sign in failed, attempt to sign up
      if (signInError.message.includes("Invalid login credentials")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (signUpError) {
          if (signUpError.message.includes("User already registered")) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Wrong password",
            });
            return;
          }
          throw signUpError;
        }

        if (signUpData.user) {
          await updateUserPreferences(signUpData.user.id, values);
          toast({
            title: "Account created",
            description: "Welcome to MealMagi!",
          });
          navigate("/dashboard");
          return;
        }
      }

      throw signInError;
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserPreferences = async (userId: string, values: z.infer<typeof authSchema>) => {
    const { error } = await supabase.from("user_profiles").upsert({
      id: userId,
      allergens: values.allergens.split(",").map(item => item.trim()),
      disliked_ingredients: values.dislikedIngredients.split(",").map(item => item.trim()),
      liked_ingredients: values.likedIngredients.split(",").map(item => item.trim()),
      dietary_preferences: selectedDiets,
      city: values.city,
      state: values.state,
    });

    if (error) throw error;
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to MealMagi</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in or sign up to start your mindful cooking journey
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleAuth)}>
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

            <Separator className="my-6" />

            <div className="space-y-4">
              <Label>Dietary Preferences</Label>
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

            <FormField
              control={form.control}
              name="allergens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergens (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., peanuts, shellfish, eggs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dislikedIngredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disliked ingredients (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., cilantro, olives, mushrooms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="likedIngredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite ingredients (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., garlic, tomatoes, basil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Your state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
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
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
