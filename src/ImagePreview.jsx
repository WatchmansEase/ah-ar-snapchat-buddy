import React, { useState } from "react";
import "./ImagePreview.css";
const ImagePreview = ({ capturedImage, onBack, onContinue, onShare }) => {
  const handleShare = () => {
    if (capturedImage) {
      onShare();
    } else {
      alert("No image available to share.");
    }
  };

  return (
    <>
      {" "}
      <div className="image-container">
        <img className="image-preview" src={capturedImage} alt="Captured" />
        <img
          src="/buttons/Dark BG.png"
          alt="Overlay Image"
          className="overlay-image"
        />
        <div className="poweredby">
          <div className="mukul">
            <div className="button-container">
              <img
                src="\buttons\fretryAsset 13.png"
                alt="retry"
                className="back-button"
                onClick={onBack}
              />
              <img
                src="\buttons\fcontinueAsset 14.png"
                alt="Continue"
                className="continue-button"
                onClick={onContinue}
              />
            </div>
          </div>
          <img
            src="\buttons\Dark BG.png"
            alt="Overlaytr Image"
            className="poweredby-image"
          />
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
