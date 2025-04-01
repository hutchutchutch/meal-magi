
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSignIn?: boolean;
  onComplete?: () => void;
  preferences?: any; // Add this to support passing preferences during signup
}

export interface PreferencesFormData {
  allergens: string;
  dislikedIngredients: string;
  likedIngredients: string;
  city: string;
  state: string;
}

export const dietTypes = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
];
