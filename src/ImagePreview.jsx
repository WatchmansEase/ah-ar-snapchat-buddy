const ImagePreview = ({ capturedImage, onBack, onContinue }) => {
  const handleBack = async () => {
    try {
      await onBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleContinue = async () => {
    try {
      await onContinue();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="image-container">
        <img
          className="image-preview"
          src={capturedImage}
          alt="Captured"
          loading="lazy"
        />
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
                onClick={handleBack}
              />
              <img
                src="\buttons\fcontinueAsset 14.png"
                alt="Continue"
                className="continue-button"
                onClick={handleContinue}
              />
            </div>
          </div>
          <img
            src="\buttons\Dark BG.png"
            alt="Overlay Image"
            className="poweredby-image"
          />
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
