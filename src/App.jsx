import React, { useState } from 'react';
import ConsentPopup from './popup';
import CameraComponent from './CameraComponent';
import Details from './details';
import ThankYou from './ThankYou';  
import './App.css';

const App = () => {
    const [hasAgreed, setHasAgreed] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false); 

    const handleAgreement = () => {
        setHasAgreed(true);
    };

    const handleImageCapture = (imageUrl) => {
        setCapturedImage(imageUrl);
    };

    const handleContinue = () => {
        if (capturedImage) {  // Ensure capturedImage is not null
            console.log('Navigating to Details page');
            setShowDetails(true);
        } else {
            console.error('No captured image available to continue.');
        }
    };

    const handleBackToCamera = () => {
        setCapturedImage(null);
        setShowDetails(false);
        console.log("its' triggering badck to camera");
    };

    const shareImage = async (emailAddress) => {
        if (capturedImage) {
            const blob = await fetch(capturedImage).then(res => res.blob());
            const file = new File([blob], 'captured-image.png', { type: 'image/png' });

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Check out this image!',
                        text: `Here is the image I captured. Send it to: ${emailAddress}`,
                        files: [file],
                        url: window.location.href
                    });
                    console.log('Image shared successfully');
                    setShowThankYou(true); 
                } catch (error) {
                    console.error('Error sharing the image:', error);
                    openEmailClient(emailAddress);
                    setShowThankYou(true); 
                }
            } else {
                openEmailClient(emailAddress); 
                setShowThankYou(true);  
            }
        }
    };

  
    const resetApp = () => {
        setHasAgreed(false);
        setCapturedImage(null);
        setShowDetails(false);
        setShowThankYou(false); 
    };

    return (
        <div>
            {!hasAgreed ? (
                <ConsentPopup onAgree={handleAgreement} />
            ) : showThankYou ? (  
                <ThankYou onReset={resetApp} />  
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
                            onReset={resetApp} 
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default App;
