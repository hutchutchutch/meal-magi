import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { format } from "date-fns";
import { AddPantryDialog } from './AddPantryDialog';
import { PantryItem } from '../types';

export const Pantry = () => {
  const [isAddPantryOpen, setIsAddPantryOpen] = useState(false);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: '1', name: 'Arborio Rice', amount: '2 cups', expirationDate: new Date('2024-03-31') },
    { id: '2', name: 'Olive Oil', amount: '500ml', expirationDate: new Date('2024-03-31') },
  ]);

  const handleRemovePantryItem = (id: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Pantry</h2>
        <Button variant="outline" size="icon" onClick={() => setIsAddPantryOpen(true)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {pantryItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.amount} • Expires {item.expirationDate ? format(item.expirationDate, 'MM/yyyy') : 'No date'}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleRemovePantryItem(item.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <AddPantryDialog 
        open={isAddPantryOpen}
        onOpenChange={setIsAddPantryOpen}
        onAdd={(item) => setPantryItems([...pantryItems, item])}
      />
    </div>
  );
}; 