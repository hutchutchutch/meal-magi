
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PreferenceSection = ({ 
  title, 
  items = [], 
  onAdd,
  onRemove,
  type
}: { 
  title: string; 
  items?: string[]; 
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  type: 'allergens' | 'liked' | 'disliked';
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem('');
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Add ${type === 'allergens' ? 'an allergen' : 'an ingredient'}`}
              className="flex-1"
            />
            <Button type="submit" size="sm">Add</Button>
          </div>
        </form>
      )}
      <div className="flex flex-wrap gap-2">
        {items?.length > 0 ? (
          items.map((item, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="pr-2 flex items-center gap-1"
            >
              {item}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onRemove(item)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic">No items added yet</p>
        )}
      </div>
    </div>
  );
};

export const UserPreferences = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user.id) return null;

      const { data } = await supabase
        .from('user_profiles')
        .select('allergens, liked_ingredients, disliked_ingredients')
        .eq('id', sessionData.session.user.id)
        .maybeSingle();

      return data;
    }
  });

  const updatePreference = async (type: 'allergens' | 'liked_ingredients' | 'disliked_ingredients', items: string[]) => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user.id) return;

    const { error } = await supabase
      .from('user_profiles')
      .update({ [type]: items })
      .eq('id', sessionData.session.user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive"
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    }
  };

  const handleAdd = (type: 'allergens' | 'liked_ingredients' | 'disliked_ingredients', newItem: string) => {
    const currentItems = userProfile?.[type] as string[] || [];
    if (!currentItems.includes(newItem)) {
      updatePreference(type, [...currentItems, newItem]);
    }
  };

  const handleRemove = (type: 'allergens' | 'liked_ingredients' | 'disliked_ingredients', itemToRemove: string) => {
    const currentItems = userProfile?.[type] as string[] || [];
    updatePreference(type, currentItems.filter(item => item !== itemToRemove));
  };

  return (
    <div className="border-t pt-4 mt-4">
      <PreferenceSection
        title="Allergens"
        items={userProfile?.allergens as string[]}
        onAdd={(item) => handleAdd('allergens', item)}
        onRemove={(item) => handleRemove('allergens', item)}
        type="allergens"
      />
      <PreferenceSection
        title="Liked Foods"
        items={userProfile?.liked_ingredients as string[]}
        onAdd={(item) => handleAdd('liked_ingredients', item)}
        onRemove={(item) => handleRemove('liked_ingredients', item)}
        type="liked"
      />
      <PreferenceSection
        title="Disliked Foods"
        items={userProfile?.disliked_ingredients as string[]}
        onAdd={(item) => handleAdd('disliked_ingredients', item)}
        onRemove={(item) => handleRemove('disliked_ingredients', item)}
        type="disliked"
      />
    </div>
  );
};
