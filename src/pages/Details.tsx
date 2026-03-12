import React, { useRef, useState } from "react";

function AuditCapture() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [step, setStep] = useState("start"); // "start" | "camera" | "captured"

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            videoRef.current.srcObject = stream;
            setStep("camera");
        } 
        catch (err) {
            console.error("Camera access denied:", err);
        }
    };

    const capturePhoto = () => {
        const cvs = canvasRef.current;
        const vid = videoRef.current;
        // Set canvas dimensions and draw video frame
        cvs.width = vid.videoWidth;
        cvs.height = vid.videoHeight;
        cvs.getContext("2d").drawImage(vid, 0, 0);
        // Stop the camera tracks to turn off the webcam light
        vid.srcObject.getTracks().forEach(track => track.stop());
        setStep("captured");
    };

    const draw = (e) => {
        if (step !== "captured" || (e.type.includes("mouse") && e.buttons !== 1)) return;
        e.preventDefault();
        const ctx = canvasRef.current.getContext("2d");
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        if (e.type === "mousedown" || e.type === "touchstart") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
        {/* 1. Start Button */}
        {step === "start" && (
            <button onClick={startCamera} className="px-4 py-2 bg-blue-500 text-white rounded">
            Open Camera
            </button>
        )}

        {/* 2. Live Camera Feed */}
        <video ref={videoRef} autoPlay playsInline className={`w-full max-w-md rounded shadow-lg ${step === "camera" ? "block" : "hidden"}`} />
        {step === "camera" && (
            <button onClick={capturePhoto} className="px-4 py-2 bg-blue-500 text-white rounded">
            Capture Photo
            </button>
        )}

        {/* 3. Signature Canvas & Save */}
        <canvas ref={canvasRef}
            className={`w-full max-w-md border-2 border-gray-300 rounded touch-none ${step === "captured" ? "block" : "hidden"}`}
            onMouseDown={draw} onMouseMove={draw} onTouchStart={draw} onTouchMove={draw} />
        
        {step === "captured" && (
            <button onClick={() => canvasRef.current.toBlob(b => onSave(URL.createObjectURL(b)), "image/png")} 
                className="px-4 py-2 bg-green-500 text-white rounded">
            Save Signed Audit
            </button>
        )}
        </div>
    );
}

export default AuditCapture