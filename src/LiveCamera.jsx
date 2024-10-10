import React, { useEffect, useRef } from 'react';

const LiveCamera = ({ setupCamera, cameraFacingMode }) => {
    const liveRenderTargetRef = useRef(null);

    useEffect(() => {
        setupCamera(liveRenderTargetRef);
    }, [setupCamera, cameraFacingMode]);

    return (
        <canvas ref={liveRenderTargetRef} id="canvas" style={{ width: '100%', height: '100%' }} />
    );
};

export default LiveCamera;

