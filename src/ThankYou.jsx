import React from 'react';

const ThankYou = ({ onReset }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Thank You!</h1>
            <p>Your image has been shared successfully.</p>
            <button 
                onClick={onReset} 
                style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
                Reset
            </button>
        </div>
    );
};

export default ThankYou;
