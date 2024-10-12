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
  const [newsLetter, setNewsletter] = useState(false);

  const handleAgreement = (newsLetterConsert) => {
    setHasAgreed(true);
    setNewsletter(newsLetterConsert);
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

  const shareImage = async () => {
    if (capturedImage) {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const file = new File([blob], "captured-image.png", {
        type: "image/png",
      });

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Check out this image!",
            text: "Here is the image I captured.",
            files: [file],
            url: window.location.href,
          });
          console.log("Image shared successfully");
          setShowThankYou(true);
        } catch (error) {
          console.error("Error sharing the image:", error);
          setShowThankYou(true);
        }
      }
    }
  };

  // Reset function to go back to the beginning
  const resetApp = () => {
    setHasAgreed(false);
    setCapturedImage(null);
    setShowDetails(false);
    setShowThankYou(false); // Reset Thank You screen
    setNewsletter(false);
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
              newsLetter={newsLetter}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
