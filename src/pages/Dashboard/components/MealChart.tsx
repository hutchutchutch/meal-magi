import React from 'react';

export const MealChart = () => {
  return (
    <div className="meal-chart grid grid-cols-7 gap-1 mb-4">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="text-center">
          <div className="text-xs mb-1">{day}</div>
          <div className="space-y-1">
            <div className="h-2 bg-primary/20 rounded-full" />
            <div className="h-2 bg-primary rounded-full" />
            <div className="h-2 bg-primary/50 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}; 