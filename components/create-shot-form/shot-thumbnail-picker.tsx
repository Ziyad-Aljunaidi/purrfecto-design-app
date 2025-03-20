import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import { toast } from "sonner";
import Image from "next/image";

interface FileWithPreview extends File {
  preview: string;
}

export default function ShotThumbnailPicker() {
  const [selectedMainImage, setSelectedMainImage] = useState<FileWithPreview[]>(
    []
  );

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const filteredFiles = acceptedFiles
        .filter((file) => {
          if (file.type.startsWith("image/")) {
            return (
              file.size <= 10 * 1024 * 1024 &&
              (file.type === "image/jpeg" || file.type === "image/png")
            );
          } else if (file.type.startsWith("video/")) {
            return (
              file.size <= 20 * 1024 * 1024 &&
              (file.type === "video/mp4" || file.type === "image/gif")
            );
          }

          fileRejections.push({
            file,
            errors: [
              { message: "file-invalid-type", code: "file-invalid-type" },
            ],
          });
          return false;
        })
        .map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      setSelectedMainImage(filteredFiles);
      if (fileRejections.length > 0) {
        toast.error(
          "The selected image/video is invalid. Please select a valid image or video file."
        );
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "video/mp4": [],
        "image/gif": [],
      },
    });
  return (
    <>
      <h1 className={`text-2xl text-primary font-bold mb-2`}>
        Add Shot Thumbnail
      </h1>
      <div
        {...getRootProps()}
        className="border-2 bg-transparent min-h-[150px] border-dashed border-input p-8 rounded-xl text-center mt-4 flex items-center justify-center"
      >
        <input {...getInputProps()} multiple={true} />

        {selectedMainImage.length > 0 ? null : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <div className="  grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {selectedMainImage.map((file, index) => (
            <div key={index} className="relative w-96 h-96">
              {file.type.startsWith("image/") ? (
                <Image
                  src={file.preview}
                  alt={file.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <video className="rounded-lg" width="100%" height="100%" controls={false} autoPlay={true} loop={true}>
                  <source src={file.preview} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
