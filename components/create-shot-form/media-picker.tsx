"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, ImageUp } from "lucide-react";
import { Badge } from "../ui/badge";
import { AcceptedFile } from "@/lib/types";
import clsx from "clsx";

export default function MediaPicker({
  mediaFilesSetter,
}: {
  mediaFilesSetter: React.Dispatch<React.SetStateAction<AcceptedFile[]>>;
}) {
  const [files, setFiles] = useState<AcceptedFile[]>([]);
  const [thumbnail, setThumbnail] = useState<AcceptedFile | null>(null);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  useEffect(() => {
    mediaFilesSetter(files);
  }, [files, mediaFilesSetter]);

  function filesValidator(file: File) {
    const isDuplicate = files.some((f) => f.name === file.name);
    if (isDuplicate) {
      return {
        code: "duplicate-file",
        message: "File with the same name already exists.",
      };
    }
    if (file.size > 10 * 1024 * 1024) {
      return {
        code: "file-size",
        message: "File size exceeds 10MB limit.",
      };
    }

    if (files.length >= 5) {
      return {
        code: "max-files",
        message: "Maximum 5 files allowed.",
      };
    }
    return null;
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        setFiles((prevFiles: AcceptedFile[]) => [
          ...prevFiles,
          ...acceptedFiles.map((file: File) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      }
      if (thumbnail === null && acceptedFiles.length > 0) {
        setThumbnailHandler(Object.assign(acceptedFiles[0]));
        console.log("rand");
      }

      if (rejectedFiles?.length > 0) {
        setRejectedFiles(rejectedFiles);
        console.log(rejectedFiles);
      }
      console.log("hehe");
    },

    [setFiles, setRejectedFiles, rejectedFiles, thumbnail]
  );

  const removeFile = (name: string) => {
    console.log(name === thumbnail?.name);
    setFiles((files) => {
      const updatedFiles = files.filter((file) => file.name !== name);
      if (updatedFiles.length > 0 && thumbnail?.name === name) {
        setThumbnail(Object.assign(updatedFiles[0]));
        console.log("thumbnail removed");
      }

      if (updatedFiles.length === 0) {
        setThumbnail(null);
      }
      return updatedFiles;
    });
  };

  const setThumbnailHandler = (file: AcceptedFile) => {
    setThumbnail(file);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "image/webp": [],
      "image/gif": [],
      "video/mp4": [],
      "video/webm": [],
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    validator: filesValidator,
  });

  return (
    <div>
      <h1 className={`text-2xl text-primary font-bold mb-2`}>Upload Media</h1>
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed border-input bg-gray-50 dark:bg-transparent rounded-xl min-h-[200px] flex flex-col items-center justify-center p-4 mt-4",
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <ImageUp className="text-primary/80" size={48} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag &#39;n&#39; drop some files here, or click to select files
            </p>
          )}
          <span className="text-sm text-gray-500">Max file size: 10MB</span>
          <span className="text-sm text-gray-500">Recommended Ratio 4:3</span>
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <li
            key={file.name}
            className={`relative h-52 rounded-lg ${clsx({
              "outline-4 outline-primary ": file === thumbnail,
            })}`}
          >
            <div onClick={() => setThumbnailHandler(file)}>
              <Image
                src={file.preview}
                alt={file.name}
                width={500}
                height={500}
                className="h-full w-full object-cover rounded-lg aspect-[4/3] absolute"
                onLoad={() => {
                  // URL.revokeObjectURL(file.preview);
                  console.log("Image loaded");
                }}
              />
              {/* {file.name} */}

              {file.name === thumbnail?.name && (
                <Badge className="absolute bottom-2 right-2 bg-lime-400 text-black">
                  Thumbnail
                </Badge>
              )}
            </div>
            <button
              type="button"
              className="absolute top-2 bg-input right-2 rounded-full p-1 cursor-pointer"
              onClick={() => removeFile(file.name)}
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
      {/* <button onClick={() => console.log(thumbnail, files)}>Clickme</button> */}
    </div>
  );
}
