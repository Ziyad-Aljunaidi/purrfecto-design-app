import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { AcceptedFile } from "@/lib/types";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

export default function CropThumbnail({
  thumbnailImage,
  thumbnailSetter,
  handleToggleCrop
}: {
  thumbnailImage: AcceptedFile;
  thumbnailSetter: React.Dispatch<React.SetStateAction<AcceptedFile | null>>;
  handleToggleCrop: (isCropOpen: boolean) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onCropComplete = useCallback(
    (_croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropImage = async () => {
    if (!thumbnailImage || !croppedAreaPixels) return;

    const image = new Image();
    image.src = thumbnailImage.preview;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) return;

        const croppedFile = new File([blob], thumbnailImage.name, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });

        const croppedPreview = URL.createObjectURL(croppedFile);

        thumbnailSetter({ ...croppedFile, preview: croppedPreview });
      }, "image/jpeg");
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-accent rounded-xl shadow-lg w-[90%] max-w-2xl p-6 relative">
        <h2 className="text-xl font-semibold mb-2">Crop Thumbnail</h2>
        <div className="relative aspect-[4/3] bg-gray-300 rounded-xl overflow-hidden">
          <Cropper
            image={thumbnailImage?.preview || ""}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="horizontal-cover"
            showGrid={false}
          />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-zinc-500/50 rounded-lg p-2 shadow-md">
            <Slider
              value={[zoom]}
              min={1}
              max={10}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="w-64 bg-amber-500"
              aria-label="Zoom"
            />
            </div>
        </div>
        <div className="flex  justify-between items-center mt-4">

          <div className="flex space-x-2">
            <Button
              className="cursor-pointer bg-primary rounded-full px-6 py-2 hover:bg-gray-400 transition duration-200"
              onClick={() => handleToggleCrop(false)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer bg-primary rounded-full px-6 py-2 hover:bg-lime-500 transition duration-200"
              onClick={handleCropImage}
            >
              Crop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
