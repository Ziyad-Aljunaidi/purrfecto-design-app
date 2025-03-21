"use client";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, ImageUp } from "lucide-react";
import { Badge } from "../ui/badge";
import { AcceptedFile } from "@/lib/types";
import clsx from "clsx";


export default function MediaPicker() {
  const [files, setFiles] = useState<AcceptedFile[]>([]);
  const [thumbnail, setThumbnail] = useState<AcceptedFile | null>(null);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  function filesValidator(file: File) {
    const isDuplicate = files.some((f) => f.name === file.name);
    if (isDuplicate) {
      return {
        code: "duplicate-file",
        message: "File with the same name already exists.",
      };
    }
    if(file.size > 10 * 1024 * 1024) {
      return {
        code: "file-size",
        message: "File size exceeds 10MB limit.",
      };
    }

    if(files.length >= 5) {
      return {
        code: "max-files",
        message: "Maximum 5 files allowed.",
      };
    }
    return null;
  }

  const removeFile = (name: string) => {
    setFiles((files) => {
      const updatedFiles = files.filter((file) => file.name !== name);
      return updatedFiles;
    });
    if(thumbnail?.name === name) {
      setThumbnailHandler(files[0]);
      console.log("thumbnail removed");
    }
  };

  const setThumbnailHandler = (file: AcceptedFile) => {
    setThumbnail(file);
  };

  
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
        setThumbnail(Object.assign(acceptedFiles[0]));
        console.log(thumbnail);
      }
      if (rejectedFiles?.length > 0) {
        setRejectedFiles(rejectedFiles);
        console.log(rejectedFiles);
      }
    },
    
    [setFiles, setRejectedFiles, rejectedFiles, setThumbnail,thumbnail]
  );

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
            <p>Drag &#39;n&#39; drop some files here, or click to select files</p>
          )}
          <span className="text-sm text-gray-500">Max file size: 10MB</span>
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (

              <li key={file.name} className={`relative h-52 rounded-lg ${clsx({ "outline-4 outline-primary ": file === thumbnail })}`}>
            <div onClick={() => setThumbnailHandler(file)} >
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
              <button
                type="button"
                className="absolute top-2 right-2 bg-lime-100 rounded-full p-1 cursor-pointer"
                onClick={() => removeFile(file.name)}
              >
                <X size={16} />
              </button>
              {file.name === thumbnail?.name && (
                <Badge className="absolute bottom-2 right-2 bg-lime-400 text-black">
                  Thumbnail
                </Badge>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
