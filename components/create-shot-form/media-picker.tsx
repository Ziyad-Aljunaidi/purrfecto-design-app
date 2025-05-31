"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, ImageUp} from "lucide-react";
import { Badge } from "../ui/badge";
import { AcceptedFile } from "@/lib/types";
import clsx from "clsx";
import { toast } from "sonner";
import { CreateShotErrors } from "@/lib/types";

export default function MediaPicker({
  mediaFilesSetter,
  thumbnailSetter,
  errorsSetter,
  errorsGetter,
}: {
  mediaFilesSetter: React.Dispatch<React.SetStateAction<AcceptedFile[]>>;
  thumbnailSetter: React.Dispatch<React.SetStateAction<AcceptedFile | null>>;
  errorsSetter: React.Dispatch<React.SetStateAction<CreateShotErrors | null>>;
  errorsGetter: CreateShotErrors | null;
}) {
  const [files, setFiles] = useState<AcceptedFile[]>([]);
  const [thumbnail, setThumbnail] = useState<AcceptedFile | null>(null);
  // const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    mediaFilesSetter(files);
    thumbnailSetter(thumbnail);
    // console.log(thumbnail)
  }, [files, mediaFilesSetter, thumbnail, thumbnailSetter]);

  function filesValidator(file: File) {
    const isDuplicate = files.some((f) => f.name === file.name);
    if (isDuplicate) {
      // setErrors("File with the same name already exists.");
      errorsSetter({ mediaFilesError: "File with the same name already exists." });
      return {
        code: "duplicate-file",
        message: "File with the same name already exists.",
      };
    }
    if (file.size > 10 * 1024 * 1024) {
      // setErrors("File size exceeds 10MB limit.");
      errorsSetter({ mediaFilesError: "File size exceeds 10MB limit." });
      return {
        code: "file-size",
        message: "File size exceeds 10MB limit.",
      };
    }

    if (files.length >= 5) {
      // setErrors("Maximum 5 files allowed.");
      errorsSetter({ mediaFilesError: "Maximum 5 files allowed." });
      return {
        code: "max-files",
        message: "Maximum 5 files allowed.",
      };
    }
    return null;
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (
        acceptedFiles?.length > 0 &&
        files.length + acceptedFiles.length <= 5
      ) {
        setFiles((prevFiles: AcceptedFile[]) => [
          ...prevFiles,
          ...acceptedFiles.map((file: File) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);

        // setErrors(null);
        errorsSetter({ mediaFilesError: "" });
      } else {

        // setErrors("Maximum 5 files allowed.");
        errorsSetter({ mediaFilesError: "Maximum 5 files allowed." });
      }

      if (thumbnail === null && acceptedFiles.length > 0) {
        setThumbnailHandler(Object.assign(acceptedFiles[0]));
      }

      if (fileRejections?.length > 0) {
        toast.error("Some files were rejected", {
          description: (
            <span className="text-primary">
              {fileRejections[0].errors[0].message}
            </span>
          ),
        });
      }
    },

    [setFiles, thumbnail, files.length, errorsSetter]
  );

  const removeFile = (name: string) => {
    // console.log(name === thumbnail?.name);
    setFiles((files) => {
      const updatedFiles = files.filter((file) => file.name !== name);
      if (updatedFiles.length > 0 && thumbnail?.name === name) {
        setThumbnail(Object.assign(updatedFiles[0]));
        // console.log("thumbnail removed");
      }

      if (updatedFiles.length === 0) {
        setThumbnail(null);
      }
      return updatedFiles;
    });
  };

  const setThumbnailHandler = (file: AcceptedFile) => {
    if (file.type.startsWith("video")) {
      toast.error("Video files cannot be set as thumbnails", {
        description: (
          <span className="text-primary">Please select an image file</span>
        ),
      });
      return;
    }
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
      <h1
        className={`text-2xl text-primary font-bold mb-2 ${clsx(
          errorsGetter?.mediaFilesError && "text-red-500"
        )}`}
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
        <div className="flex flex-col text-center items-center space-y-2">
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

      {errorsGetter?.mediaFilesError && <p className="text-red-500 my-2">{errorsGetter.mediaFilesError}</p>}

      <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {files.map((file) => (
          <li
            key={file.name}
            className={`relative h-52 rounded-lg ${clsx({
              "outline-4 outline-lime-400 outline-offset-4 ":
                file === thumbnail,
            })}`}
          >
            {file.type.startsWith("image") && (
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

                {file.name === thumbnail?.name && (
                  <div>
                  <Badge className="absolute top-2 left-2 bg-lime-400 text-black">
                    Thumbnail
                  </Badge>
                  </div>
                )}
              </div>
            )}
            {file.type.startsWith("video") && (
              <div onClick={() => setThumbnailHandler(file)}>
                <video
                  src={file.preview}
                  className="h-full w-full object-cover rounded-lg aspect-[4/3] absolute"
                  autoPlay={false}
                  loop={true}
                  muted={true}
                  
                />

                {file.name === thumbnail?.name && (
                  <Badge className="absolute bottom-2 right-2 bg-lime-400 text-black">
                    Thumbnail
                  </Badge>
                )}
              </div>
            )}
            <button
              type="button"
              className="absolute top-2 bg-white hover:bg-rose-500 right-2 rounded-md p-1 cursor-pointer"
              onClick={() => removeFile(file.name)}
            >
              <X size={16} className="text-black"/>
            </button>
          </li>
        ))}
      </ul>
      {/* <button onClick={() => console.log(thumbnail, files)}>Clickme</button> */}
      {/* <CropThumbnailModal thumbnailImage={thumbnail} /> */}
    </div>
  );
}
