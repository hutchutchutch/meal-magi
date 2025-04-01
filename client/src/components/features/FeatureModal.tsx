import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SparklesCore } from "@/components/ui/sparkles";
import { LucideIcon } from "lucide-react";

interface FeatureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
}

export const FeatureModal = ({
  open,
  onOpenChange,
  icon: Icon,
  title,
  description,
  details,
}: FeatureModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <div className="relative">
          {/* Sparkles Background */}
          <div className="absolute inset-0 h-full w-full">
            <SparklesCore
              id="tsparticles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleColor="#ffffff"
              className="w-full h-full"
              particleDensity={100}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 bg-background/80 backdrop-blur-sm rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold whitespace-pre-line">{title}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="border-t pt-4">
              <p className="text-sm leading-relaxed">{details}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 