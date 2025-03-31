import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { FormData } from "../types";
import { allergenOptions } from "../constants";

interface AllergensStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const AllergensStep = ({
  formData,
  setFormData,
}: AllergensStepProps) => {
  const [allergenInput, setAllergenInput] = useState('');

  const handleAllergenInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if ((e.key === ',' || e.key === 'Tab') && value) {
      e.preventDefault();
      const cleanValue = value.replace(/,/g, '');
      setFormData({
        ...formData,
        allergens: {
          ...formData.allergens,
          custom: [...formData.allergens.custom, cleanValue],
        },
      });
      setAllergenInput('');
    }
  };

  const removeAllergen = (value: string) => {
    setFormData({
      ...formData,
      allergens: {
        ...formData.allergens,
        custom: formData.allergens.custom.filter(item => item !== value),
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="allergens">Add Custom Allergens</Label>
        <Input
          id="allergens"
          placeholder="Type and press Tab or Comma to add"
          value={allergenInput}
          onChange={(e) => setAllergenInput(e.target.value)}
          onKeyDown={handleAllergenInput}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.allergens.custom.map((allergen) => (
            <Badge
              key={allergen}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removeAllergen(allergen)}
            >
              {allergen}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {allergenOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              formData.allergens.selected.includes(option.id)
                ? 'bg-primary/10 border-primary'
                : 'hover:bg-muted'
            }`}
            onClick={() => {
              const selected = formData.allergens.selected.includes(option.id)
                ? formData.allergens.selected.filter((id) => id !== option.id)
                : [...formData.allergens.selected, option.id];
              setFormData({
                ...formData,
                allergens: { ...formData.allergens, selected },
              });
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{option.icon}</span>
              <h3 className="font-semibold">{option.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {option.foods.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};