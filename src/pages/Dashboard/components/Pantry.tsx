
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { format } from "date-fns";
import { AddPantryDialog } from './AddPantryDialog';
import { PantryItem } from '../types';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

export const Pantry = () => {
  const [isAddPantryOpen, setIsAddPantryOpen] = useState(false);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (!sessionData.session?.user) {
          navigate('/auth');
          return;
        }

        const { data, error } = await supabase
          .from('pantry_items')
          .select('id, item_name, quantity, date_added')
          .eq('user_id', sessionData.session.user.id);

        if (error) {
          throw error;
        }

        setPantryItems(
          data.map((item) => ({
            id: item.id,
            name: item.item_name,
            amount: item.quantity,
            expirationDate: new Date(item.date_added), // Using date_added as expiration for now
          }))
        );
      } catch (error) {
        console.error('Error fetching pantry items:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load pantry items",
        });
      }
    };

    fetchPantryItems();
  }, [toast, navigate]);

  const handleRemovePantryItem = async (id: string) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session?.user) {
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('pantry_items')
        .delete()
        .eq('id', id)
        .eq('user_id', sessionData.session.user.id);

      if (error) {
        throw error;
      }

      setPantryItems(pantryItems.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Item removed from pantry",
      });
    } catch (error) {
      console.error('Error removing pantry item:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item",
      });
    }
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
