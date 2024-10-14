import React from "react";
import "./LiveCamera.css";

const LiveCamera = ({ canvasRef, isCameraReady }) => {
  return (
    <div className="camera-container">
      <canvas
        ref={canvasRef}
        className={isCameraReady ? "canvas-visible" : "canvas-hidden"}
      />
      <img
        src="/buttons/Dark BG.png"
        alt="Overlay Image"
        className="overlay-image"
      />
      {!isCameraReady && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading camera...</div>
        </div>
      )}
    </div>
  );
};

export default LiveCamera;