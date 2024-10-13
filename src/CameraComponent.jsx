import React, { useEffect, useRef, useState, useCallback } from "react";
import { bootstrapCameraKit } from "@snap/camera-kit";
import LiveCamera from "./LiveCamera";
import CaptureControls from "./CaptureCamera";
import html2canvas from "html2canvas";
import ImagePreview from "./ImagePreview";
import "./snapstyle.css";

const CameraComponent = ({
  onImageCapture,
  capturedImage,
  onBackToCamera,
  onContinue,
}) => {
  const [cameraFacingMode, setCameraFacingMode] = useState("user");
  const sessionRef = useRef(null);
  const canvasRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const requestMotionPermission = async () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      try {
        const permissionState = await DeviceMotionEvent.requestPermission();
        return permissionState;
      } catch (error) {
        console.error(
          "Error requesting Motion and Orientation permission:",
          error
        );
        return "error";
      }
    }
    return "granted";
  };

  const setupCamera = useCallback(async () => {
    console.log("setting up camera");
    setError(null); // Clear any previous errors

    // Request motion permission for iOS devices
    const permissionState = await requestMotionPermission();
    if (permissionState !== "granted") {
      setError(
        "Motion and Orientation permission is required for this feature to work."
      );
      return;
    }

    try {
      // Initialize the Snap Camera Kit with the API token
      const cameraKit = await bootstrapCameraKit({
        apiToken:
          "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI4NzE5MjU0LCJzdWIiOiI5M2RiN2U3ZS1hMGRmLTRhODctYjM4NC0xMWE5Yzk5MDVjZDB-U1RBR0lOR35iNDRiZjVmMS0wMzhmLTQ5YTctOWQ1OS1iNmE0ZDJmYTkyZmQifQ.WbSMYa3UMUC79e_Tq8Y-I4FeuMc1DvQMz8Im66cJNg0",
      });

      console.log("creating session");
      const session = await cameraKit.createSession({
        liveRenderTarget: canvasRef.current,
      });
      sessionRef.current = session; // Store the session reference for later cleanup

      // Define video constraints
      const videoConstraints = {
        width: { ideal: 1280, min: 640, max: 1920 },
        height: { ideal: 720, min: 480, max: 1080 },
        facingMode: cameraFacingMode,
      };

      console.log("getting user media");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
      });
      console.log("setting source");
      await session.setSource(mediaStream);

      // Debugging logs
      console.log("Media Stream:", mediaStream);
      console.log("Canvas Reference:", canvasRef.current);

      console.log("playing session");
      await session.play();

      // Mark camera as ready
      setIsCameraReady(true);
      console.log("camera setup completed");

      // Optionally apply a lens after some delay
      setTimeout(async () => {
        try {
          const lens = await cameraKit.lensRepository.loadLens(
            "8da5d561-1b8d-4391-8ea2-32906c0c718f", // Group ID
            "f029c812-af38-419f-a7dc-5c953e78ea98" // Lens ID
          );
          await session.applyLens(lens); // Apply the lens to the camera session
          console.log("lens applied successfully");
        } catch (error) {
          console.error("Failed to apply lens:", error);
        }
      }, 200);
    } catch (error) {
      console.error("Failed to initialize camera:", error);
      setError(
        "Failed to initialize camera. Please check your permissions and try again."
      );
    }
  }, [cameraFacingMode]);
  useEffect(() => {
    setupCamera();

    return () => {
      if (sessionRef.current) {
        console.log("stopping camera session");
        sessionRef.current.destroy();
        sessionRef.current = null;
      }
    };
  }, [setupCamera]);
  useEffect(() => {
    if (!capturedImage) {
      setupCamera();
    }
  }, [capturedImage, setupCamera]);

  const handleCaptureImage = () => {
    if (canvasRef.current) {
      const imageUrl = canvasRef.current.toDataURL("image/png");
      onImageCapture(imageUrl);
    }
  };

  const toggleCamera = async () => {
    setCameraFacingMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
    if (sessionRef.current) {
      await sessionRef.current.destroy();
      sessionRef.current = null;
    }
    setupCamera();
  };

  return (
    // <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
    <div>
      {error && <div className="error-message">{error}</div>}
      {capturedImage ? (
        <ImagePreview
          capturedImage={capturedImage}
          onBack={onBackToCamera}
          onContinue={() => {
            onContinue();
          }}
        />
      ) : (
        <>
          <LiveCamera canvasRef={canvasRef} isCameraReady={isCameraReady} />
          <CaptureControls
            onCapture={handleCaptureImage}
            onToggleCamera={toggleCamera}
          />
        </>
      )}
    </div>
  );
};

export default CameraComponent;
