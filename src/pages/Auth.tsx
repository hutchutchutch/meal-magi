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

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [allergens, setAllergens] = useState("");

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/onboarding/preferences");
      }
    });
  }, [navigate]);

  const handleSignUp = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We sent you a verification link to complete your registration.",
      });
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

  const handleSignIn = async (values: z.infer<typeof authSchema>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;
      navigate("/onboarding/preferences");
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

  const getProgressPercentage = () => ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to MealMagi</h2>
          <p className="mt-2 text-muted-foreground">
            Sign up or sign in to start your mindful cooking journey
          </p>
        </div>

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

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSignUp)}>
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

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                Sign Up
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={loading}
                onClick={form.handleSubmit(handleSignIn)}
              >
                Sign In
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

              <button
                type="button"
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors text-center"
                onClick={() => setCurrentStep(1)}
              >
                Test User
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
