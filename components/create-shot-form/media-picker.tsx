"use client";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, ImageUp } from "lucide-react";
import { Badge } from "../ui/badge";
import { AcceptedFile } from "@/lib/types";


export default function MediaPicker() {
  const [files, setFiles] = useState<AcceptedFile[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length > 0) {
        setFiles((prevFiles: AcceptedFile[]) => [
          ...prevFiles,
          ...acceptedFiles.map((file: File, index: number) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              thumbnail: false,
            })
          ),
        ]);

        setFiles((currentFiles) => {
          currentFiles[0].thumbnail = true;
          return currentFiles;
        });
      }

      if (rejectedFiles?.length > 0) {
        setRejectedFiles(rejectedFiles);
      }
    },
    []
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
  });

  const removeFile = (name: string) => {
    setFiles((files) => {
      const updatedFiles = files.filter((file) => file.name !== name);
      if (updatedFiles.length > 0) {
        updatedFiles[0].thumbnail = true;
      }
      return updatedFiles;
    });
  };
  return (
    <div>
      <h1
        className={`text-2xl text-primary font-bold mb-2`}
      >
        Upload Media
      </h1>
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed border-input bg-gray-50 dark:bg-transparent rounded-xl min-h-[200px] flex flex-col items-center justify-center p-4 mt-4",
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <ImageUp size={48} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          <span className="text-sm text-gray-500">Max file size: 10MB</span>
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <li key={file.name} className="relative h-52 rounded-lg shadow-lg ">
            <Image
              src={file.preview}
              alt={file.name}
              fill={true}
              className="h-full w-full object-cover rounded-md aspect-[4/3]"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
            {/* {file.name} */}
            <button
              type="button"
              className="absolute top-2 right-2 bg-input rounded-full p-1 cursor-pointer"
              onClick={() => removeFile(file.name)}
            >
              <X size={16} />
            </button>
            <Badge className="absolute bottom-2 right-2 font-[family-name:var(--font-jetbrains-mono)]">
              {file.thumbnail ? "Thumbnail" : "Not Thumbnail"}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
