import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export const SeasonalProduce = () => {
  return (
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
  );
}; 