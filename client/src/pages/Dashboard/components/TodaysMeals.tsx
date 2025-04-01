
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Soup } from "lucide-react";

interface MealCardProps {
  type: 'Breakfast' | 'Lunch' | 'Dinner';
  title: string;
  cookTime: string;
  meditationTime: string;
}

const MealCard = ({ type, title, cookTime, meditationTime }: MealCardProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{type}</h3>
      <Card className="h-full">
        <CardContent className="p-3">
          <h4 className="font-medium mb-2 text-sm line-clamp-2">{title}</h4>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {cookTime}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Soup className="h-3 w-3" />
              {meditationTime}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TodaysMeals = () => {
  // This would typically come from your meal plan data
  const todaysMeals = [
    {
      type: 'Breakfast' as const,
      title: 'Mindful Morning Oatmeal',
      cookTime: '15 min',
      meditationTime: '5 min'
    },
    {
      type: 'Lunch' as const,
      title: 'Zen Garden Salad',
      cookTime: '20 min',
      meditationTime: '7 min'
    },
    {
      type: 'Dinner' as const,
      title: 'Peaceful Pasta Primavera',
      cookTime: '30 min',
      meditationTime: '10 min'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
      <div className="grid grid-cols-3 gap-4">
        {todaysMeals.map((meal) => (
          <MealCard key={meal.type} {...meal} />
        ))}
      </div>
    </div>
  );
};
