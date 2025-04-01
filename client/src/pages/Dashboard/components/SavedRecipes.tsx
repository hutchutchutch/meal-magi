import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Settings } from "lucide-react";

export const SavedRecipes = () => {
  return (
    <ScrollArea className="flex-grow">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Saved Recipes</h3>
          <div className="space-y-2">
            {['Mains', 'Sides', 'Desserts'].map((category) => (
              <Button key={category} variant="ghost" className="w-full justify-start">
                <Leaf className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <Button variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </ScrollArea>
  );
}; 