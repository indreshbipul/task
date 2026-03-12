import React, { useRef, useState } from "react";

function Details() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Handle camera/photo input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(file);
  };

  // Drawing handlers
  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setLastPos({
      x: e.clientX - rect.left || e.touches[0].clientX - rect.left,
      y: e.clientY - rect.top || e.touches[0].clientY - rect.top,
    });
  };

  const stopDrawing = () => setIsDrawing(false);

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches[0].clientX - rect.left;
    const y = e.clientY - rect.top || e.touches[0].clientY - rect.top;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPos({ x, y });
  };

  // Save merged image
  const saveImage = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      console.log("Merged Blob:", blob);

      // Optional: Base64
      const reader = new FileReader();
      reader.onloadend = () => console.log("Base64:", reader.result);
      reader.readAsDataURL(blob);
    }, "image/png");
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="user"
        height="90px"
        width="90px"
        onChange={handleImageChange}
      />

      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #000", display: "block", marginTop: 10 }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
      />

      <button onClick={saveImage} style={{ marginTop: 10 }}>
        Save Merged Image
      </button>
    </div>
  );
}

export default Details;