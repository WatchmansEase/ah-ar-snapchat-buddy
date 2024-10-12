import React from 'react';
import "./LiveCamera.css"
const CaptureControls = ({ onCapture}) => {
    return (
        <div className='capture-button-container'>
            <img 
                src="/buttons/fcameraAsset 12@2x.png"  
                alt="Capture"
                className="capture-button"
                onClick={onCapture}
                style={{ 
                    cursor: 'pointer',width:'40px',height:'40px'
                }} 
            />
        </div>
    );
};

export default CaptureControls;
