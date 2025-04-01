
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock } from "lucide-react";
import { MealChart } from './MealChart';
import { ExpandedMealPlan } from './ExpandedMealPlan';
import { TodaysMeals } from './TodaysMeals';
import { format } from 'date-fns';

export const WeeklyMealPlans = () => {
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);
  const isExpanded = expandedWeek === '2024-02-04';
  const today = new Date();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-muted-foreground">
          {format(today, 'EEEE, MMMM d, yyyy')}
        </h2>
      </div>

      <TodaysMeals />
      
      <h1 className="text-2xl font-bold mb-6">Weekly Meal Plans</h1>
      <Card 
        className="mb-6 hover:shadow-lg transition-shadow cursor-pointer" 
        onClick={() => setExpandedWeek(isExpanded ? null : '2024-02-04')}
      >
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>2/4 - 2/11</span>
            <div className="text-sm text-muted-foreground">
              <span className="mr-4">Breakfast: 3</span>
              <span className="mr-4">Lunch: 5</span>
              <span>Dinner: 7</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MealChart />
            
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div>
                <span className="text-sm font-medium">Grocery List</span>
                <span className="text-xs text-muted-foreground ml-2">32 items</span>
              </div>
              <span className="text-sm font-medium">$145.20</span>
            </div>

            {isExpanded && <ExpandedMealPlan />}
          </div>
        </CardContent>
      </Card>
    </>
  );
}; 
