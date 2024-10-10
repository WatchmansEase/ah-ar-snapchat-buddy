import React from 'react';

const CaptureControls = ({ onCapture, onToggleCamera }) => {
    return (
        <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 1 }}>
            <img 
                src="\buttons\fcameraAsset 12.png" 
                alt="Capture"
                className="capture-button"
                onClick={onCapture}
                style={{ cursor: 'pointer', width: '60px', height: '60px' }} 
            />
        </div>
    );
};

export default CaptureControls;