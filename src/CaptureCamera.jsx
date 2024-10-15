import React, { useEffect, useRef } from "react";
import "./LiveCamera.css";

const CaptureControls = ({ onCapture }) => {
  const clickSoundRef = useRef(null);

  // Preload the audio file when the component mounts
  useEffect(() => {
    clickSoundRef.current = new Audio("/sound/camera-click.mp3");
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play();
    }
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
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
};

export default CaptureControls;
