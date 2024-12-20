import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Pencil } from "lucide-react";

interface FormPreviewProps {
  photoUrl?: string;
  formData?: {
    name: string;
    dateOfBirth: string;
    cityOfBirth: string;
  };
  onEdit?: () => void;
  onConfirm?: () => void;
}

const FormPreview = ({
  photoUrl = "https://dummyimage.com/400x300/cccccc/666666&text=No+Photo",
  formData = {
    name: "John Doe",
    dateOfBirth: "1990-01-01",
    cityOfBirth: "New York",
  },
  onEdit = () => {},
  onConfirm = () => {},
}: FormPreviewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleConfirm = async () => {
    try {
      // First, detect if this face matches any existing records
      const detectResponse = await fetch('http://localhost:5000/detect_face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          img_url: photoUrl,
        }),
      });

      if (!detectResponse.ok) {
        throw new Error(`HTTP error! status: ${detectResponse.status}`);
      }

      const matchData = await detectResponse.json();
      
      if (matchData.name === "Match Not Found") {
        // If no match found, upload the new face
        const uploadResponse = await fetch('http://localhost:5000/upload_face', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            img_url: photoUrl,
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            cityOfBirth: formData.cityOfBirth,
          }),
        });

        if (!uploadResponse.ok) {
          throw new Error(`HTTP error! status: ${uploadResponse.status}`);
        }
      }

      onConfirm(); // Call the original onConfirm handler
    } catch (error) {
      console.error('Error:', error);
      // You might want to add error handling here
    }
  };

  return (
    <Card className="w-full max-w-[800px] bg-background p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={photoUrl}
              alt="ID Photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Full Name</Label>
              <p className="text-lg font-medium">{formData.name}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Date of Birth</Label>
              <p className="text-lg font-medium">
                {formatDate(formData.dateOfBirth)}
              </p>
            </div>

            <div>
              <Label className="text-muted-foreground">City of Birth</Label>
              <p className="text-lg font-medium">{formData.cityOfBirth}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1" onClick={onEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button className="flex-1" onClick={handleConfirm}>
              <Check className="h-4 w-4 mr-2" />
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FormPreview;
