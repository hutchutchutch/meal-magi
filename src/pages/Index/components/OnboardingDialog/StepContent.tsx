import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormData } from "./types";

interface StepContentProps {
  currentStep: number;
  formData: FormData;
  setFormData: (data: FormData) => void;
  loadTestData: () => Promise<void>;
}

export const StepContent = ({
  currentStep,
  formData,
  setFormData,
  loadTestData,
}: StepContentProps) => {
  const handleChange = (
    field: keyof FormData,
    value: string | string[] | boolean | { [key: string]: boolean }
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  switch (currentStep) {
    case 0:
      return (
        <div className="flex justify-center">
          <Button variant="outline" onClick={loadTestData}>
            Load Test Data
          </Button>
        </div>
      );
    case 1:
      return (
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
      );
    default:
      return null;
  }
};
