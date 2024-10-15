import React, { useState } from "react";
import ConsentPopup from "./popup";
import CameraComponent from "./CameraComponent";
import Details from "./details";
import ResetButton from "./ResetButton";
import "./App.css";

const App = () => {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [newsLetter, setNewsletter] = useState(false);

  const handleAgreement = (newsLetterConsert) => {
    setHasAgreed(true);
    setNewsletter(newsLetterConsert);
  };

  const handleImageCapture = (imageUrl) => {
    setCapturedImage(imageUrl);
  };

  const handleContinue = () => {
    if (capturedImage) {
      // Ensure capturedImage is not null
      console.log("Μετάβαση στη σελίδα Λεπτομερειών");
      setShowDetails(true);
    } else {
      console.error(
        "Δεν υπάρχει διαθέσιμη καταγεγραμμένη εικόνα για να συνεχίσετε."
      );
    }
  };

  const handleBackToCamera = () => {
    setCapturedImage(null);
    setShowDetails(false);
    console.log("Επιστρέφει στην κάμερα.");
  };

  const resetApp = () => {
    setHasAgreed(false);
    setCapturedImage(null);
    setShowDetails(false);
    setShowThankYou(false);
    setNewsletter(false);
  };

  return (
    <div>
      {!hasAgreed ? (
        <ConsentPopup onAgree={handleAgreement} />
      ) : showThankYou ? (
        <ResetButton onReset={resetApp} />
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
              onReset={resetApp}
              newsLetter={newsLetter}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
