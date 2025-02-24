
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PreferencesFormData, dietTypes } from "./types";

interface PreferencesFormProps {
  loading: boolean;
  preferences: PreferencesFormData;
  selectedDiets: string[];
  onPreferencesChange: (preferences: Partial<PreferencesFormData>) => void;
  onDietsChange: (diets: string[]) => void;
  onSubmit: () => void;
}

export const PreferencesForm = ({
  loading,
  preferences,
  selectedDiets,
  onPreferencesChange,
  onDietsChange,
  onSubmit,
}: PreferencesFormProps) => {
  return (
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
                    onDietsChange([...selectedDiets, diet.id]);
                  } else {
                    onDietsChange(selectedDiets.filter((id) => id !== diet.id));
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
            value={preferences[field as keyof PreferencesFormData]}
            onChange={(e) =>
              onPreferencesChange({ [field]: e.target.value })
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
              onPreferencesChange({ city: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={preferences.state}
            onChange={(e) =>
              onPreferencesChange({ state: e.target.value })
            }
          />
        </div>
      </div>

      <Button
        className="w-full"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Complete Setup"}
      </Button>
    </div>
  );
};
