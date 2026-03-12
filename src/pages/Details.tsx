import React, { useRef, useState } from "react";

export default function AuditCapture({ onSave }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    // We track where the user is in the process: "start" -> "camera" -> "captured"
    const [step, setStep] = useState("start"); 

    // A simple dictionary to keep our UI text organized and out of the JSX below
    const stepContent = {
        start: { title: "Audit Verification", subtitle: "We need to capture your image." },
        camera: { title: "Take a Photo", subtitle: "Ensure your face is clearly visible." },
        captured: { title: "Sign Your Name", subtitle: "Draw your signature directly over the image." }
    };

    // 1. Let's ask the user for permission to turn on their webcam
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            videoRef.current.srcObject = stream;
            setStep("camera");
        } catch (error) {
            console.error("Oops! Camera access was denied:", error);
            alert("Please allow camera access to continue the audit.");
        }
    };

    // 2. Snap the photo and shut down the camera to save battery/privacy
    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        // Ensure our canvas has the exact same resolution as the video feed
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // "Stamp" the current video frame onto the canvas
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0);
        
        // Turn off the webcam so the green recording light goes off
        const stream = video.srcObject;
        stream.getTracks().forEach(track => track.stop());
        
        setStep("captured");
    };

    // 3. Handle the signature drawing (works for both mouse and touch screens)
    const handleDrawing = (event) => {
        // Only allow drawing if we are on the final step, and ensure the left mouse button is held down
        if (step !== "captured") return;
        if (event.type.includes("mouse") && event.buttons !== 1) return;
        
        event.preventDefault(); // Stop mobile browsers from scrolling while the user is trying to sign

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();

        // Figure out exactly where the user clicked or touched on the screen
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;

        // Because CSS (w-full) resizes the canvas, we need to scale the coordinates 
        // to match the actual internal pixel size of the image.
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        // Setup our "pen" style
        context.strokeStyle = "red";
        context.lineWidth = 4;
        context.lineCap = "round";

        // If they just pressed down, start a new line. Otherwise, keep drawing.
        if (event.type === "mousedown" || event.type === "touchstart") {
            context.beginPath();
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
            context.stroke();
        }
    };

    // 4. Package up the final image and send it to the parent component
    const handleSave = () => {
        canvasRef.current.toBlob((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            onSave(imageUrl);
        }, "image/png");
    };

    return (
        <div className="w-full max-w-lg mt-20 mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
    
            {/* Dynamic Header */}
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">{stepContent[step].title}</h2>
                <p className="text-sm text-gray-500 mt-1">{stepContent[step].subtitle}</p>
            </div>
    
            {/* UI: Step 1 - Waiting to start */}
            {step === "start" && (
                <div className="w-full aspect-[3/4] sm:aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <button 
                        onClick={startCamera} 
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold rounded-lg shadow-sm"
                    >
                        Open Camera
                    </button>
                </div>
            )}
    
            {/* UI: Step 2 - Live Camera Feed */}
            <div className={`w-full relative rounded-xl overflow-hidden shadow-md bg-black ${step === "camera" ? "block" : "hidden"}`}>
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-auto object-cover" 
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button 
                        onClick={capturePhoto} 
                        className="px-6 py-2.5 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        📸 Capture
                    </button>
                </div>
            </div>
    
            {/* UI: Step 3 - Signing the Photo */}
            <div className={`w-full flex-col gap-5 ${step === "captured" ? "flex" : "hidden"}`}>
                <div className="relative w-full rounded-xl overflow-hidden shadow-sm border-2 border-indigo-100 bg-gray-50 cursor-crosshair">
                    
                    <canvas 
                        ref={canvasRef}
                        className="w-full h-auto touch-none"
                        onMouseDown={handleDrawing} 
                        onMouseMove={handleDrawing} 
                        onTouchStart={handleDrawing} 
                        onTouchMove={handleDrawing} 
                    />
                    
                    <div className="absolute top-3 left-3 pointer-events-none bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md">
                        Draw signature below
                    </div>
                </div>
                
                <button 
                    onClick={handleSave} 
                    className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-bold rounded-xl shadow-sm"
                >
                    Save & Continue
                </button>
            </div>
            
        </div>
    );
}