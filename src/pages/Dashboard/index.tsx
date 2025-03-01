
import React, { useEffect } from 'react';
import { UserProfile } from './components/UserProfile';
import { UserPreferences } from './components/UserPreferences';
import { SavedRecipes } from './components/SavedRecipes';
import { WeeklyMealPlans } from './components/WeeklyMealPlans';
import { SeasonalProduce } from './components/SeasonalProduce';
import { GroceryList } from './components/GroceryList';
import { Pantry } from './components/Pantry';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { toast } = useToast();

  useEffect(() => {
    console.log("[DEBUG] Dashboard component mounted");
    
    // Check for stored preferences
    const storedPreferences = localStorage.getItem('userPreferences');
    console.log("[DEBUG] Retrieved stored preferences:", storedPreferences);
    
    // Check authentication status
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("[DEBUG] Auth session in Dashboard:", data.session);
    };
    
    checkAuth();
    
    // Show welcome toast
    toast({
      title: "Welcome to Your Dashboard",
      description: "Your personalized meal planning experience awaits!",
    });
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Left Column */}
      <div className="w-1/4 border-r p-4 flex flex-col">
        <UserProfile />
        <div className="flex-1">
          <SavedRecipes />
        </div>
        <UserPreferences />
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
