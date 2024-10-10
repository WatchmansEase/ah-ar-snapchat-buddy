import React, { useState } from 'react';

const ImagePreview = ({ capturedImage, onBack, onContinue, onShare }) => {
   

    const handleShare = () => {
        if (capturedImage) {
            onShare(); 
        } else {
            alert('No image available to share.');
        }
    };
    

    return (
        <>
            <img className='image-preview' src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ 
                position: 'absolute', 
                bottom: '40px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 4, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                width: '80%'
            }}>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%' }}>
                    
                    <img  style={{ cursor: 'pointer', width: '60px', height: '60px' }}src="\buttons\fretryAsset 13.png" alt="retry" className='back-button' onClick={onBack} />
                    {/* <button className="share-button" onClick={handleShare}>Share2</button> */}
                    <img src="\buttons\fcontinueAsset 14.png"  // Update the path to your image
                    alt="Continue"
                className="continue-button"
                onClick={onContinue}
                style={{ cursor: 'pointer', width: '60px', height: '60px' }} // Adjust the size as needed
            />
                    
                </div>
            </div>
        </>
    );
};

export default ImagePreview;