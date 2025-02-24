
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface UserProfileData {
  city: string;
  state: string;
  height_feet: number;
  height_inches: number;
  weight: number;
}

export const UserProfile = () => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (!sessionData.session?.user.id) {
          throw new Error('No user session found');
        }

        const { data, error } = await supabase
          .from('user_profiles')
          .select('city, state, height_feet, height_inches, weight')
          .eq('id', sessionData.session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }

        setProfileData(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile",
        });
      }
    };

    fetchUserProfile();
  }, [toast]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main profile section */}
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">Hutch</h2>
          <p className="text-sm text-muted-foreground">
            {profileData ? `${profileData.city}, ${profileData.state}` : 'Loading...'}
          </p>
          {profileData && (
            <p className="text-xs text-muted-foreground">
              {profileData.height_feet}'{profileData.height_inches}" - {profileData.weight}lbs
            </p>
          )}
        </div>
      </div>

      {/* Settings section - at the bottom */}
      <div className="mt-auto space-y-2 border-t pt-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>

        {showSettings && (
          <Card className="mt-2">
            <CardContent className="space-y-2 pt-4">
              <div className="text-sm text-muted-foreground">
                <div className="mb-2">
                  <span className="font-semibold">Location:</span> {profileData?.city}, {profileData?.state}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Height:</span> {profileData?.height_feet}'{profileData?.height_inches}"
                </div>
                <div>
                  <span className="font-semibold">Weight:</span> {profileData?.weight}lbs
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
