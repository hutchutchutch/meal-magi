
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PreferenceSection = ({ 
  title, 
  items = [], 
  onEdit 
}: { 
  title: string; 
  items?: string[]; 
  onEdit: () => void; 
}) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold">{title}</h3>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
    {items.length > 0 ? (
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-muted-foreground italic">No items added yet</p>
    )}
  </div>
);

export const UserPreferences = () => {
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

  const handleEdit = (section: string) => {
    console.log(`Editing ${section}`);
    // TODO: Implement edit functionality
  };

  return (
    <div className="border-t pt-4 mt-4">
      <PreferenceSection
        title="Allergens"
        items={userProfile?.allergens as string[]}
        onEdit={() => handleEdit('allergens')}
      />
      <PreferenceSection
        title="Liked Foods"
        items={userProfile?.liked_ingredients as string[]}
        onEdit={() => handleEdit('liked')}
      />
      <PreferenceSection
        title="Disliked Foods"
        items={userProfile?.disliked_ingredients as string[]}
        onEdit={() => handleEdit('disliked')}
      />
    </div>
  );
};

