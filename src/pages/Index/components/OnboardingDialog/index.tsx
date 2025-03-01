
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { steps } from "./constants";
import { FormData } from "./types";
import { StepContent } from "./StepContent";
import { useEffect } from "react";

interface OnboardingDialogProps {
  currentStep: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
  onBack: () => void;
  onNext: () => void;
  onOpenChange: (open: boolean) => void;
}

export const OnboardingDialog = ({
  currentStep,
  formData,
  setFormData,
  onBack,
  onNext,
  onOpenChange,
}: OnboardingDialogProps) => {
  const getProgressPercentage = () => ((currentStep + 1) / steps.length) * 100;

  // Add debugging effect for this component
  useEffect(() => {
    console.log("[DEBUG] OnboardingDialog - Current step:", currentStep);
    console.log("[DEBUG] OnboardingDialog - Dialog open:", currentStep > -1);
  }, [currentStep]);

  const isStepValid = () => {
    let valid = false;
    
    switch (currentStep) {
      case 0:
        valid = Boolean(
          formData.userInfo.height &&
          formData.userInfo.weight &&
          formData.userInfo.gender &&
          formData.userInfo.city &&
          formData.userInfo.state
        );
        break;
      case 1:
        valid = (
          formData.allergens.selected.length > 0 ||
          formData.allergens.custom.length > 0
        );
        break;
      case 2:
        valid = (
          formData.preferences.liked.length > 0 ||
          formData.preferences.disliked.length > 0
        );
        break;
      default:
        valid = false;
    }
    
    console.log("[DEBUG] Step", currentStep, "validation result:", valid);
    return valid;
  };

  const handleNextClick = () => {
    console.log("[DEBUG] Next button clicked on step", currentStep);
    console.log("[DEBUG] Current form data:", JSON.stringify(formData, null, 2));
    onNext();
  };

  const handleBackClick = () => {
    console.log("[DEBUG] Back button clicked on step", currentStep);
    onBack();
  };

  const handleOpenChange = (open: boolean) => {
    console.log("[DEBUG] Dialog open state changing to:", open);
    onOpenChange(open);
  };

  return (
    <Dialog open={currentStep > -1} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="space-y-4">
            <Progress value={getProgressPercentage()} className="h-2" />
            <DialogTitle>{steps[currentStep]?.title}</DialogTitle>
            <DialogDescription className="text-base">
              {steps[currentStep]?.message}
            </DialogDescription>
          </div>
        </DialogHeader>

        <StepContent
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
        />

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBackClick} disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={handleNextClick} disabled={!isStepValid()}>
            {currentStep === steps.length - 1 ? "Complete" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
