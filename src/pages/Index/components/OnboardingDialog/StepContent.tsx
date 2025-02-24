import { useState, KeyboardEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { FormData, AllergenOption } from "./types";
import { allergenOptions, US_STATES } from "./constants";

interface StepContentProps {
  currentStep: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const StepContent = ({
  currentStep,
  formData,
  setFormData,
}: StepContentProps) => {
  const [allergenInput, setAllergenInput] = useState('');
  const [likedInput, setLikedInput] = useState('');
  const [dislikedInput, setDislikedInput] = useState('');

  const handleChipInput = (
    e: KeyboardEvent<HTMLInputElement>,
    type: 'allergens' | 'liked' | 'disliked'
  ) => {
    const value = e.currentTarget.value.trim();
    if ((e.key === ',' || e.key === 'Tab') && value) {
      e.preventDefault();
      const cleanValue = value.replace(/,/g, '');
      
      if (type === 'allergens') {
        setFormData({
          ...formData,
          allergens: {
            ...formData.allergens,
            custom: [...formData.allergens.custom, cleanValue],
          },
        });
        setAllergenInput('');
      } else if (type === 'liked') {
        setFormData({
          ...formData,
          preferences: {
            ...formData.preferences,
            liked: [...formData.preferences.liked, cleanValue],
          },
        });
        setLikedInput('');
      } else {
        setFormData({
          ...formData,
          preferences: {
            ...formData.preferences,
            disliked: [...formData.preferences.disliked, cleanValue],
          },
        });
        setDislikedInput('');
      }
    }
  };

  const removeChip = (
    type: 'allergens' | 'liked' | 'disliked',
    value: string
  ) => {
    if (type === 'allergens') {
      setFormData({
        ...formData,
        allergens: {
          ...formData.allergens,
          custom: formData.allergens.custom.filter(item => item !== value),
        },
      });
    } else if (type === 'liked') {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          liked: formData.preferences.liked.filter(item => item !== value),
        },
      });
    } else {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          disliked: formData.preferences.disliked.filter(item => item !== value),
        },
      });
    }
  };

  switch (currentStep) {
    case 0:
      return (
        <div className="space-y-6">
          <div className="flex gap-6 items-start">
            <div className="space-y-2">
              <Label>Height</Label>
              <div className="flex gap-2 items-end">
                <div className="space-y-2">
                  <Label htmlFor="feet" className="text-sm text-muted-foreground">
                    Feet
                  </Label>
                  <Input
                    id="feet"
                    type="number"
                    min="3"
                    max="7"
                    placeholder="5"
                    value={formData.userInfo.height.feet}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        userInfo: {
                          ...formData.userInfo,
                          height: {
                            ...formData.userInfo.height,
                            feet: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-16 text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inches" className="text-sm text-muted-foreground">
                    Inches
                  </Label>
                  <Input
                    id="inches"
                    type="number"
                    min="0"
                    max="11"
                    placeholder="10"
                    value={formData.userInfo.height.inches}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        userInfo: {
                          ...formData.userInfo,
                          height: {
                            ...formData.userInfo.height,
                            inches: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-16 text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <Label>Weight</Label>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm text-muted-foreground">
                  Pounds
                </Label>
                <Input
                  id="weight"
                  type="number"
                  min="50"
                  max="500"
                  placeholder="150"
                  value={formData.userInfo.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userInfo: { ...formData.userInfo, weight: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <Tabs
              value={formData.userInfo.gender}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  userInfo: {
                    ...formData.userInfo,
                    gender: value as 'male' | 'female' | 'human',
                  },
                })
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 border rounded-lg p-1 bg-muted/20">
                <TabsTrigger 
                  value="male"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded"
                >
                  Male
                </TabsTrigger>
                <TabsTrigger 
                  value="female"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded"
                >
                  Female
                </TabsTrigger>
                <TabsTrigger 
                  value="human"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded"
                >
                  Human
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={formData.userInfo.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userInfo: { ...formData.userInfo, city: e.target.value },
                  })
                }
              />
            </div>

            <div className="w-1/3 space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.userInfo.state}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    userInfo: { ...formData.userInfo, state: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="allergens">Add Custom Allergens</Label>
            <Input
              id="allergens"
              placeholder="Type and press Tab or Comma to add"
              value={allergenInput}
              onChange={(e) => setAllergenInput(e.target.value)}
              onKeyDown={(e) => handleChipInput(e, 'allergens')}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.allergens.custom.map((allergen) => (
                <Badge
                  key={allergen}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeChip('allergens', allergen)}
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

    case 2:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="liked">Foods You Love</Label>
            <Input
              id="liked"
              placeholder="Type and press Tab or Comma to add"
              value={likedInput}
              onChange={(e) => setLikedInput(e.target.value)}
              onKeyDown={(e) => handleChipInput(e, 'liked')}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.preferences.liked.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeChip('liked', item)}
                >
                  {item}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disliked">Foods You Don't Enjoy</Label>
            <Input
              id="disliked"
              placeholder="Type and press Tab or Comma to add"
              value={dislikedInput}
              onChange={(e) => setDislikedInput(e.target.value)}
              onKeyDown={(e) => handleChipInput(e, 'disliked')}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.preferences.disliked.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeChip('disliked', item)}
                >
                  {item}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
