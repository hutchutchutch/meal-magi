import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock } from "lucide-react";

export const ExpandedMealPlan = () => {
  return (
    <>
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
    </>
  );
}; 