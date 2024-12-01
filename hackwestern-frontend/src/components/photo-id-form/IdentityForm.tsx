import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ValidationError from "./ValidationError";

interface IdentityFormData {
  name: string;
  dateOfBirth: string;
  cityOfBirth: string;
}

interface IdentityFormProps {
  onSubmit?: (data: IdentityFormData) => void;
  initialData?: Partial<IdentityFormData>;
  errors?: string[];
  showValidationErrors?: boolean;
  apiEndpoint?: string;
}

const IdentityForm = ({
  onSubmit = () => {},
  initialData = {
    name: "",
    dateOfBirth: "",
    cityOfBirth: "",
  },
  errors = [],
  showValidationErrors = false,
  // apiEndpoint = '/api/identity',
}: IdentityFormProps) => {
  const [formData, setFormData] = React.useState<IdentityFormData>({
    name: initialData.name || "",
    dateOfBirth: initialData.dateOfBirth || "",
    cityOfBirth: initialData.cityOfBirth || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-[400px] bg-background p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cityOfBirth">City of Birth</Label>
            <Input
              id="cityOfBirth"
              name="cityOfBirth"
              placeholder="Enter your city of birth"
              value={formData.cityOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>

        {showValidationErrors && errors.length > 0 && (
          <ValidationError errors={errors} />
        )}

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default IdentityForm;
