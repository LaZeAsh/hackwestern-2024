import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ValidationErrorProps {
  message?: string;
  errors?: string[];
}

const ValidationError = ({
  message = "Please correct the following errors:",
  errors = ["Required field is missing", "Invalid format"],
}: ValidationErrorProps) => {
  return (
    <div className="w-full max-w-[400px] bg-background">
      <Alert variant="destructive" className="mb-2">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">
          {message}
          {errors.length > 0 && (
            <ul className="list-disc list-inside mt-2 space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ValidationError;
