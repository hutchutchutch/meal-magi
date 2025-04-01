
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const SeasonalProduce = () => {
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user.id) return null;

      const { data } = await supabase
        .from('user_profiles')
        .select('city, state')
        .eq('id', sessionData.session.user.id)
        .maybeSingle();

      return data;
    }
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Seasonal Produce for {userProfile?.city}, {userProfile?.state}
      </h2>
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
