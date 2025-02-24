
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserProfileData {
  height_feet: number;
  height_inches: number;
  weight: number;
}

export const UserProfile = () => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const { toast } = useToast();

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
          .select('height_feet, height_inches, weight')
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

  return (
    <div className="flex items-center space-x-4 mb-8">
      <Avatar className="h-16 w-16">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback>H</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-semibold">Hutch</h2>
        {profileData && (
          <p className="text-xs text-muted-foreground">
            {profileData.height_feet}'{profileData.height_inches}" - {profileData.weight}lbs
          </p>
        )}
      </div>
    </div>
  );
};
