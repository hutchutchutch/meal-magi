import { FormData } from "./types";
import { PersonalDetailsStep } from "./steps/PersonalDetailsStep";
import { AllergensStep } from "./steps/AllergensStep";
import { PreferencesStep } from "./steps/PreferencesStep";

interface StepContentProps {
  currentStep: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const StepContent = ({
  currentStep,
  formData,
  setFormData,
}: StepContentProps) => {
  switch (currentStep) {
    case 0:
      return <PersonalDetailsStep formData={formData} setFormData={setFormData} />;
    case 1:
      return <AllergensStep formData={formData} setFormData={setFormData} />;
    case 2:
      return <PreferencesStep formData={formData} setFormData={setFormData} />;
    default:
      return null;
  }
};