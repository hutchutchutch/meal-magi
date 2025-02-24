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

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.userInfo.height &&
          formData.userInfo.weight &&
          formData.userInfo.gender &&
          formData.userInfo.city &&
          formData.userInfo.state
        );
      case 1:
        return (
          formData.allergens.selected.length > 0 ||
          formData.allergens.custom.length > 0
        );
      case 2:
        return (
          formData.preferences.liked.length > 0 ||
          formData.preferences.disliked.length > 0
        );
      default:
        return false;
    }
  };

  return (
    <Dialog open={currentStep > -1} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={onBack} disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!isStepValid()}>
            {currentStep === steps.length - 1 ? "Complete" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

