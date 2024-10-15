import React, { useEffect, useRef, useState, useCallback } from "react";
import { bootstrapCameraKit } from "@snap/camera-kit";
import LiveCamera from "./LiveCamera";
import CaptureControls from "./CaptureCamera";
import html2canvas from "html2canvas";
import ImagePreview from "./ImagePreview";
import { toPng } from "html-to-image";
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
  const cameraContainerRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState(null); // State for captured image URL

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
    setError(null);

    const permissionState = await requestMotionPermission();
    if (permissionState !== "granted") {
      setError(
        "Motion and Orientation permission is required for this feature to work."
      );
      return;
    }

    try {
      const cameraKit = await bootstrapCameraKit({
        apiToken:
          "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI4NzE5MjU0LCJzdWIiOiI5M2RiN2U3ZS1hMGRmLTRhODctYjM4NC0xMWE5Yzk5MDVjZDB-U1RBR0lOR35iNDRiZjVmMS0wMzhmLTQ5YTctOWQ1OS1iNmE0ZDJmYTkyZmQifQ.WbSMYa3UMUC79e_Tq8Y-I4FeuMc1DvQMz8Im66cJNg0",
      });

      const session = await cameraKit.createSession({
        liveRenderTarget: canvasRef.current,
      });
      sessionRef.current = session;

      const videoConstraints = {
        width: { ideal: 1280, min: 640, max: 1920 },
        height: { ideal: 720, min: 480, max: 1080 },
        facingMode: cameraFacingMode,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
      });
      mediaStreamRef.current = mediaStream;

      await session.setSource(mediaStream);
      await session.play();

      setIsCameraReady(true);
      console.log("camera setup completed");

      try {
        const lens = await cameraKit.lensRepository.loadLens(
          "8da5d561-1b8d-4391-8ea2-32906c0c718f",
          "f029c812-af38-419f-a7dc-5c953e78ea98"
        );
        await session.applyLens(lens);
        console.log("Lens applied successfully");
      } catch (error) {
        console.error("Failed to apply lens:", error);
      }
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
        const mediaStream = mediaStreamRef.current;
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
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

  const handleCaptureImage = async () => {
    if (cameraContainerRef.current) {
      try {
        const dataUrl = await toPng(cameraContainerRef.current, {
          cacheBust: true,
          useCors: true,
          filter: (node) => {
            if (
              node.tagName === "DIV" &&
              node.classList.contains("capture-button-container")
            ) {
              return false;
            }
            return true;
          },
        });

        setCapturedImageUrl(dataUrl); // Store the captured image URL
        onImageCapture(dataUrl);
      } catch (error) {
        console.error("Error capturing image:", error);
        setError("Failed to capture image. Please try again.");
      }
    }
  };

  const toggleCamera = async () => {
    setCameraFacingMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
    if (sessionRef.current) {
      const mediaStream = mediaStreamRef.current;
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      await sessionRef.current.destroy();
      sessionRef.current = null;
    }
    setupCamera();
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
        } catch (error) {
          console.error("Error sharing the image:", error);
        }
      }
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {capturedImage ? (
        <ImagePreview
          capturedImage={capturedImage}
          onBack={onBackToCamera}
          onShare={() => shareImage(email)}
          onContinue={() => {
            onContinue();
          }}
        />
      ) : (
        <div ref={cameraContainerRef} className="camera-container">
          <LiveCamera canvasRef={canvasRef} isCameraReady={isCameraReady} />
          <CaptureControls
            onCapture={handleCaptureImage}
            onToggleCamera={toggleCamera}
          />
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
