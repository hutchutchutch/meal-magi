import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { PantryItem } from '../types';

interface AddPantryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (item: PantryItem) => void;
}

export const AddPantryDialog = ({ open, onOpenChange, onAdd }: AddPantryDialogProps) => {
  const [newPantryItem, setNewPantryItem] = useState<Omit<PantryItem, 'id'>>({
    name: '',
    amount: '',
  });
  const [date, setDate] = useState<Date>();

  const handleAddPantryItem = () => {
    if (newPantryItem.name.trim()) {
      onAdd({
        id: Math.random().toString(36).substr(2, 9),
        ...newPantryItem,
        expirationDate: date
      });
      setNewPantryItem({ name: '', amount: '' });
      setDate(undefined);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Pantry Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newPantryItem.name}
              onChange={(e) => setNewPantryItem({ ...newPantryItem, name: e.target.value })}
              placeholder="Enter item name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (optional)</Label>
            <Input
              id="amount"
              value={newPantryItem.amount}
              onChange={(e) => setNewPantryItem({ ...newPantryItem, amount: e.target.value })}
              placeholder="e.g., 2 cups, 500ml"
            />
          </div>
          <div className="grid gap-2">
            <Label>Expiration Date (optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddPantryItem}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 