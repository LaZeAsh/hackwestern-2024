import React, { useRef, useState, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CameraPermissionError from "./CameraPermissionError";

interface CameraCaptureProps {
  onCapture?: (image: string) => void;
  onError?: (error: string) => void;
  isActive?: boolean;
}

const CameraCapture = ({
  onCapture = () => {},
  onError = () => {},
  isActive = true,
}: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  useEffect(() => {
    if (isActive) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError("");
      setIsPermissionDenied(false);
    } catch (err) {
      setStream(null);
      setError("Failed to access camera");
      setIsPermissionDenied(true);
      onError("Camera access denied");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        onCapture(imageData);
      }
    }
  };

  const handleRetry = () => {
    startCamera();
  };

  if (isPermissionDenied) {
    return <CameraPermissionError onRetry={handleRetry} />;
  }

  return (
    <Card className="w-full max-w-[400px] bg-background p-4">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        {stream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={stopCamera}
                className="rounded-full bg-background/80 backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleCapture}
                className="rounded-full bg-background/80 backdrop-blur-sm"
              >
                Take Photo
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Camera className="h-8 w-8 text-muted-foreground" />
            <Button onClick={startCamera}>Start Camera</Button>
          </div>
        )}
      </div>
      {error && !isPermissionDenied && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </Card>
  );
};

export default CameraCapture;
