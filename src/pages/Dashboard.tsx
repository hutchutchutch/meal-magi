
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronDown, 
  Settings, 
  Plus, 
  Clock,
  Brain,
  Leaf,
  ShoppingCart,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PantryItem {
  id: string;
  name: string;
  amount?: string;
  expirationDate?: Date;
}

const Dashboard = () => {
  const [isAddPantryOpen, setIsAddPantryOpen] = useState(false);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: '1', name: 'Arborio Rice', amount: '2 cups', expirationDate: new Date('2024-03-31') },
    { id: '2', name: 'Olive Oil', amount: '500ml', expirationDate: new Date('2024-03-31') },
  ]);
  const [newPantryItem, setNewPantryItem] = useState<Omit<PantryItem, 'id'>>({
    name: '',
    amount: '',
  });
  const [date, setDate] = useState<Date>();

  const handleAddPantryItem = () => {
    if (newPantryItem.name.trim()) {
      setPantryItems([...pantryItems, {
        id: Math.random().toString(36).substr(2, 9),
        ...newPantryItem,
        expirationDate: date
      }]);
      setNewPantryItem({ name: '', amount: '' });
      setDate(undefined);
      setIsAddPantryOpen(false);
    }
  };

  const handleRemovePantryItem = (id: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Column - User Profile & Saved Recipes */}
      <div className="w-1/4 border-r p-4 flex flex-col">
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">Jane Smith</h2>
            <p className="text-sm text-muted-foreground">Pacific Northwest</p>
          </div>
        </div>
        
        <ScrollArea className="flex-grow">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Saved Recipes</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Leaf className="mr-2 h-4 w-4" />
                  Mains
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Leaf className="mr-2 h-4 w-4" />
                  Sides
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Leaf className="mr-2 h-4 w-4" />
                  Desserts
                </Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Center Column - Meal Plans */}
      <div className="w-2/4 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Weekly Meal Plans</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Week of 2/4/2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Sunday', 'Monday', 'Tuesday'].map((day) => (
                <div key={day} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{day}</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Seasonal Vegetable Risotto</h4>
                        <Badge variant="secondary">
                          <Brain className="h-3 w-3 mr-1" />
                          5min meditation
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        30 minutes
                        <span className="mx-2">•</span>
                        6 ingredients
                      </div>
                      <p className="text-sm text-muted-foreground">
                        As you stir the risotto, observe how each grain of rice slowly absorbs the warm broth...
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Produce, Grocery, Pantry */}
      <div className="w-1/4 border-l p-4 space-y-6">
        {/* Seasonal Produce */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Seasonal Produce</h2>
          <div className="space-y-4">
            {['Asparagus', 'Strawberries'].map((item) => (
              <div key={item} className="flex items-center justify-between p-2 border rounded-lg">
                <div>
                  <p className="font-medium">{item}</p>
                  <div className="flex gap-2 mt-1">
                    {['Spring', 'Summer'].map((season) => (
                      <Badge key={season} variant="outline" className="text-xs">
                        {season}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Grocery List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Grocery List</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="produce">
              <AccordionTrigger>Produce ($24.50)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Asparagus (1 bunch)</span>
                    <span className="text-muted-foreground">$4.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cherry Tomatoes (1 pint)</span>
                    <span className="text-muted-foreground">$3.99</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Pantry */}
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
        </div>
      </div>

      {/* Add Pantry Item Dialog */}
      <Dialog open={isAddPantryOpen} onOpenChange={setIsAddPantryOpen}>
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
            <Button variant="outline" onClick={() => setIsAddPantryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPantryItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
