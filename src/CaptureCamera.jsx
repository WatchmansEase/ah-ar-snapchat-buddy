import React from "react";
import "./LiveCamera.css";

const CaptureControls = ({ onCapture }) => {
  const playClickSound = () => {
    const audio = new Audio("../public/sound/iphone-camera-click.wav");
    audio.play();
  };

  const handleCaptureClick = () => {
    playClickSound();
    onCapture();
  };
  return (
    <div className="capture-button-container">
      <img
        src="/buttons/fcameraAsset 12@2x.png"
        alt="Capture"
        className="capture-button"
        onClick={handleCaptureClick}
        style={{
          // cursor: "pointer",
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
};

export default CaptureControls;
