import React, { useState } from "react";
import CameraCapture from "./photo-id-form/CameraCapture";
import PhotoPreview from "./photo-id-form/PhotoPreview";
import IdentityForm from "./photo-id-form/IdentityForm";
import FormPreview from "./photo-id-form/FormPreview";
import ChoiceScreen from "./photo-id-form/ChoiceScreen";
import SearchPerson from "./photo-id-form/SearchPerson";

interface FormData {
  name: string;
  dateOfBirth: string;
  cityOfBirth: string;
}

type Step =
  | "choice"
  | "search-camera"
  | "search-preview"
  | "search-results"
  | "camera"
  | "preview"
  | "form"
  | "final";

const Home = () => {
  const [step, setStep] = useState<Step>("choice");
  const [photo, setPhoto] = useState<string>("");
  const [searchPhoto, setSearchPhoto] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dateOfBirth: "",
    cityOfBirth: "",
  });

  const handlePhotoCapture = (imageData: string) => {
    if (step === "search-camera") {
      setSearchPhoto(imageData);
      setStep("search-preview");
    } else {
      setPhoto(imageData);
      setStep("preview");
    }
  };

  const handlePhotoAccept = () => {
    if (step === "search-preview") {
      setStep("search-results");
    } else {
      setStep("form");
    }
  };

  const handlePhotoRetake = () => {
    if (step === "search-preview") {
      setStep("search-camera");
    } else {
      setStep("camera");
    }
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setStep("final");
  };

  const handleEdit = () => {
    setStep("form");
  };

  const handleConfirm = () => {
    // Handle final confirmation here
    console.log("Form submitted:", { photo, formData });
    setStep("choice");
  };

  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Photo ID System</h1>

        <div className="flex justify-center">
          {step === "choice" && (
            <ChoiceScreen
              onRegisterNew={() => setStep("camera")}
              onFindPerson={() => setStep("search-camera")}
            />
          )}

          {(step === "camera" || step === "search-camera") && (
            <CameraCapture
              onCapture={handlePhotoCapture}
              onError={(error) => console.error(error)}
            />
          )}

          {(step === "preview" || step === "search-preview") && (
            <PhotoPreview
              photoUrl={step === "search-preview" ? searchPhoto : photo}
              onAccept={handlePhotoAccept}
              onRetake={handlePhotoRetake}
            />
          )}

          {step === "search-results" && (
            <SearchPerson
              searchPhoto={searchPhoto}
              onBack={() => setStep("choice")}
            />
          )}

          {step === "form" && (
            <IdentityForm onSubmit={handleFormSubmit} initialData={formData} />
          )}

          {step === "final" && (
            <FormPreview
              photoUrl={photo}
              formData={formData}
              onEdit={handleEdit}
              onConfirm={handleConfirm}
            />
          )}
        </div>

        <div className="text-center text-base text-muted-foreground">
          {step === "choice" && "Choose an option"}
          {step === "search-camera" && "Take a photo to search"}
          {step === "search-preview" && "Review search photo"}
          {step === "search-results" && "Search results"}
          {step === "camera" && "Step 1: Take your photo"}
          {step === "preview" && "Step 2: Review your photo"}
          {step === "form" && "Step 3: Enter your information"}
          {step === "final" && "Step 4: Review and confirm"}
        </div>
      </div>
    </div>
  );
};

export default Home;
