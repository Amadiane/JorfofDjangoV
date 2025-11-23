import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropComplete, aspect = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative w-full h-[300px] bg-black">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        cropShape="rect"
        showGrid={true}
      />
      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(e.target.value)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2"
      />
    </div>
  );
};

export default ImageCropper;
