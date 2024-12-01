import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check } from "lucide-react";

interface PhotoPreviewProps {
  photoUrl?: string;
  onAccept?: () => void;
  onRetake?: () => void;
}

const PhotoPreview = ({
  photoUrl = "https://dummyimage.com/400x300/cccccc/666666&text=No+Photo",
  onAccept = () => {},
  onRetake = () => {},
}: PhotoPreviewProps) => {
  return (
    <Card className="w-full max-w-[400px] bg-background p-4">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        <img
          src={photoUrl}
          alt="Captured photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          <Button
            variant="secondary"
            onClick={onRetake}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake
          </Button>
          <Button
            onClick={onAccept}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Check className="h-4 w-4 mr-2" />
            Accept
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PhotoPreview;
