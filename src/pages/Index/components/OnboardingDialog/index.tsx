
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  onComplete: () => void;
  loadTestData: () => Promise<void>;
  onOpenChange: (open: boolean) => void;
}

export const OnboardingDialog = ({
  currentStep,
  formData,
  setFormData,
  onBack,
  onNext,
  onComplete,
  loadTestData,
  onOpenChange,
}: OnboardingDialogProps) => {
  const getProgressPercentage = () => ((currentStep) / (steps.length - 1)) * 100;

  return (
    <Dialog open={currentStep > -1} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="space-y-4 mb-4">
            <Progress value={getProgressPercentage()} className="h-2" />
            <DialogTitle>{steps[currentStep]?.title}</DialogTitle>
            <DialogDescription>{steps[currentStep]?.message}</DialogDescription>
          </div>
        </DialogHeader>
        <StepContent
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
          loadTestData={loadTestData}
        />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack} disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={currentStep === steps.length - 1 ? onComplete : onNext}>
            {currentStep === steps.length - 1 ? "Complete" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

