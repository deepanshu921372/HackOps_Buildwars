// client/src/components/Camera.jsx
import React, { useRef, useState, useEffect } from 'react';

const Camera = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  // Request camera permission and start stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use back camera if available
        audio: false,
      });
      
      setStream(stream);
      setPermission(true);
      setIsCameraOn(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setPermission(false);
    }
  };
  
  // Stop camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setIsCameraOn(false);
    }
  };
  
  // Capture image from video stream
  const captureImage = () => {
    if (!isCameraOn && capturedImage) {
      // If camera is off and we have an image, retake
      setCapturedImage(null);
      startCamera();
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get data URL from canvas
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
      
      // Stop the camera
      stopCamera();
    }
  };
  
  // Handle continue button click
  const handleContinue = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  
  return (
    <div className="camera-container bg-gray-100 rounded-lg overflow-hidden">
      {/* Permission request screen */}
      {!permission && !isCameraOn && (
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium mb-4">Camera Access Needed</h3>
          <p className="mb-4">Please allow access to your camera to scan waste items.</p>
          <button
            onClick={startCamera}
            className="btn-primary"
          >
            Grant Camera Access
          </button>
        </div>
      )}
      
      {/* Camera view or captured image */}
      <div className="relative aspect-video bg-black">
        {/* Video element for camera stream */}
        {isCameraOn && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Display captured image */}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured item"
            className="w-full h-full object-contain"
          />
        )}
        
        {/* Canvas for capturing frames (hidden) */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      {/* Control buttons */}
      <div className="p-4 flex justify-between">
        <button
          onClick={onClose || stopCamera}
          className="btn-outline"
        >
          {onClose ? 'Close Camera' : 'Stop Camera'}
        </button>
        
        {permission && (
          <button
            onClick={captureImage}
            className="btn-primary"
          >
            {isCameraOn ? 'Click' : 'Retake'}
          </button>
        )}
        
        {capturedImage && (
          <button
            onClick={handleContinue}
            className="btn-secondary"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Camera;