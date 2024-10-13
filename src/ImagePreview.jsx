import React, { useState } from "react";
import "./ImagePreview.css";
const ImagePreview = ({ capturedImage, onBack, onContinue }) => {
  return (
    <>
      {" "}
      <div className="image-container">
        <img className="image-preview" src={capturedImage} alt="Captured" />
        <div className="poweredby">
          <div
            className="mukul"
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "80%",
            }}
          >
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
