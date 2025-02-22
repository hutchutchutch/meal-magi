import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserProfile = () => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Avatar className="h-16 w-16">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-semibold">Jane Smith</h2>
        <p className="text-sm text-muted-foreground">Pacific Northwest</p>
      </div>
    </div>
  );
}; 