import React from 'react';

const PreviewComponent = ({ capturedImage, onBack, onContinue }) => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Captured Image:</h3>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="preview-button back-button" onClick={onBack}>Back to Camera</button>
                <button className="preview-button continue-button" onClick={onContinue}>Continue</button>
            </div>
            <style>
                {`
                    .preview-button {
                        padding: 12px 24px;
                        font-size: 16px;
                        margin-top: 20px;
                        border: none; 
                        border-radius: 5px;
                        cursor: pointer;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                    }

                    .back-button {
                        background-color: rgba(255, 255, 255, 0.9);
                        color: #333;
                    }

                    .continue-button {
                        background-color: #4CAF50;
                        color: white;
                    }

                    .back-button:hover {
                        background-color: rgba(255, 255, 255, 1);
                    }

                    .continue-button:hover {
                        background-color: #45a049;
                    }

                    @media (max-width: 600px) {
                        .preview-button {
                            font-size: 14px;
                            padding: 10px 20px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PreviewComponent;