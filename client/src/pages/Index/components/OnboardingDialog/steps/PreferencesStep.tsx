
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { FormData } from "../types";

interface PreferencesStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const PreferencesStep = ({
  formData,
  setFormData,
}: PreferencesStepProps) => {
  const [likedInput, setLikedInput] = useState('');
  const [dislikedInput, setDislikedInput] = useState('');

  const handleInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'liked' | 'disliked'
  ) => {
    const value = e.currentTarget.value.trim();
    if ((e.key === ',' || e.key === 'Tab') && value) {
      e.preventDefault();
      const cleanValue = value.replace(/,/g, '');
      
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [type]: [...formData.preferences[type], cleanValue],
        },
      });
      
      if (type === 'liked') {
        setLikedInput('');
      } else {
        setDislikedInput('');
      }
    }
  };

  const removePreference = (type: 'liked' | 'disliked', value: string) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [type]: formData.preferences[type].filter(item => item !== value),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="liked">Foods You Love</Label>
        <Input
          id="liked"
          placeholder="Type and press Tab or Comma to add"
          value={likedInput}
          onChange={(e) => setLikedInput(e.target.value)}
          onKeyDown={(e) => handleInput(e, 'liked')}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.preferences.liked.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removePreference('liked', item)}
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
          onKeyDown={(e) => handleInput(e, 'disliked')}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.preferences.disliked.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removePreference('disliked', item)}
            >
              {item}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
