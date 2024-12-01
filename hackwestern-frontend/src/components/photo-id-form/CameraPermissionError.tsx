import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface CameraPermissionErrorProps {
  onRetry?: () => void;
  message?: string;
}

const CameraPermissionError = ({
  onRetry = () => {},
  message = "Camera access was denied. Please grant permission to use your camera.",
}: CameraPermissionErrorProps) => {
  return (
    <div className="w-full max-w-[400px] bg-background p-4 rounded-lg">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Camera Access Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default CameraPermissionError;
