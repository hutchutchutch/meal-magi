
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { dietTypes } from "./constants";
import { FormData } from "./types";

interface StepContentProps {
  currentStep: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
  loadTestData: () => Promise<void>;
}

export const StepContent = ({ currentStep, formData, setFormData, loadTestData }: StepContentProps) => {
  const testingLink = (
    <button
      onClick={loadTestData}
      className="absolute bottom-2 right-2 text-xs text-muted-foreground hover:text-primary transition-colors"
    >
      Testing
    </button>
  );

  switch (currentStep) {
    case 0:
      return (
        <div className="space-y-6 relative">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Or continue with social login
            </p>
            <Button variant="outline" className="w-full" onClick={() => {}}>
              Continue with Google
            </Button>
          </div>
          {testingLink}
        </div>
      );

    case 1:
      return (
        <div className="space-y-6 relative">
          <div className="space-y-4">
            <Label>Select your dietary preferences</Label>
            <div className="grid grid-cols-2 gap-4">
              {dietTypes.map((diet) => (
                <div key={diet.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={diet.id}
                    checked={formData.dietaryPreferences.includes(diet.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({
                          ...formData,
                          dietaryPreferences: [...formData.dietaryPreferences, diet.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          dietaryPreferences: formData.dietaryPreferences.filter(
                            (id) => id !== diet.id
                          ),
                        });
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
              value={formData.allergens}
              onChange={(e) =>
                setFormData({ ...formData, allergens: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="likedIngredients">
              Favorite ingredients (optional)
            </Label>
            <Input
              id="likedIngredients"
              placeholder="e.g., avocado, quinoa, sweet potato"
              value={formData.likedIngredients}
              onChange={(e) =>
                setFormData({ ...formData, likedIngredients: e.target.value })
              }
            />
          </div>
          {testingLink}
        </div>
      );

    case 2:
      return (
        <div className="space-y-6 relative">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="Enter your state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>
          </div>
          {testingLink}
        </div>
      );

    case 3:
      return (
        <div className="space-y-6 relative">
          <RadioGroup
            value={formData.plan}
            onValueChange={(value) =>
              setFormData({ ...formData, plan: value })
            }
          >
            <div className="flex items-center space-x-2 space-y-2">
              <RadioGroupItem value="basic" id="basic" />
              <Label htmlFor="basic">
                <div className="font-medium">Basic Plan</div>
                <p className="text-sm text-muted-foreground">
                  Access to basic recipes and features
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-y-2">
              <RadioGroupItem value="premium" id="premium" />
              <Label htmlFor="premium">
                <div className="font-medium">Premium Plan</div>
                <p className="text-sm text-muted-foreground">
                  Full access to all features and premium content
                </p>
              </Label>
            </div>
          </RadioGroup>
          {testingLink}
        </div>
      );

    case 4:
      return (
        <div className="space-y-6 relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Recipe Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new recipe suggestions
                </p>
              </div>
              <Switch
                checked={formData.notifications.recipeReminders}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    notifications: {
                      ...formData.notifications,
                      recipeReminders: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Meditation Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Daily mindful cooking reminders
                </p>
              </div>
              <Switch
                checked={formData.notifications.meditationReminders}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    notifications: {
                      ...formData.notifications,
                      meditationReminders: checked,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Local Produce Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Stay informed about seasonal ingredients
                </p>
              </div>
              <Switch
                checked={formData.notifications.produceUpdates}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    notifications: {
                      ...formData.notifications,
                      produceUpdates: checked,
                    },
                  })
                }
              />
            </div>
          </div>
          {testingLink}
        </div>
      );

    default:
      return null;
  }
};
