import React, { useState } from "react";
import ConsentPopup from "./popup";
import CameraComponent from "./CameraComponent";
import Details from "./details";
import ThankYou from "./ThankYou"; // Import the new ThankYou component
import "./App.css";

const App = () => {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false); // State to show Thank You component

  const handleAgreement = () => {
    setHasAgreed(true);
  };

  const handleImageCapture = (imageUrl) => {
    setCapturedImage(imageUrl);
  };

  const handleContinue = () => {
    setShowDetails(true);
  };

  const handleBackToCamera = () => {
    setCapturedImage(null);
    setShowDetails(false);
  };

  const shareImage = async (emailAddress) => {
    if (capturedImage) {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const file = new File([blob], "captured-image.png", {
        type: "image/png",
      });

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Check out this image!",
            text: `Here is the image I captured. Send it to: ${emailAddress}`,
            files: [file],
            url: window.location.href,
          });
          console.log("Image shared successfully");
          setShowThankYou(true); // Show the Thank You component after sharing
        } catch (error) {
          console.error("Error sharing the image:", error);
          openEmailClient(emailAddress); // Fallback
          setShowThankYou(true); // Show Thank You even if the fallback is used
        }
      } else {
        openEmailClient(emailAddress); // Fallback
        setShowThankYou(true); // Show Thank You after fallback
      }
    }
  };

  // Reset function to go back to the beginning
  const resetApp = () => {
    setHasAgreed(false);
    setCapturedImage(null);
    setShowDetails(false);
    setShowThankYou(false); // Reset Thank You screen
  };

  return (
    <div>
      {!hasAgreed ? (
        <ConsentPopup onAgree={handleAgreement} />
      ) : showThankYou ? ( // If Thank You is true, show the Thank You component
        <ThankYou onReset={resetApp} /> // Pass resetApp to Thank You component
      ) : (
        <>
          {!showDetails ? (
            <CameraComponent
              onImageCapture={handleImageCapture}
              capturedImage={capturedImage}
              onBackToCamera={handleBackToCamera}
              onContinue={handleContinue}
            />
          ) : (
            <Details
              capturedImage={capturedImage}
              onShare={shareImage}
              onReset={resetApp} // Pass the reset function to Details
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
