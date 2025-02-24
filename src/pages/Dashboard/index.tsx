import React from 'react';
import { UserProfile } from './components/UserProfile';
import { SavedRecipes } from './components/SavedRecipes';
import { WeeklyMealPlans } from './components/WeeklyMealPlans';
import { SeasonalProduce } from './components/SeasonalProduce';
import { GroceryList } from './components/GroceryList';
import { Pantry } from './components/Pantry';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Column */}
      <div className="w-1/4 border-r p-4 flex flex-col">
        <UserProfile />
        <SavedRecipes />
      </div>

      {/* Center Column */}
      <div className="w-2/4 p-4 overflow-auto">
        <WeeklyMealPlans />
      </div>

      {/* Right Column */}
      <div className="w-1/4 border-l p-4 space-y-6">
        <SeasonalProduce />
        <GroceryList />
        <Pantry />
      </div>
    </div>
  );
};

export default Dashboard; 