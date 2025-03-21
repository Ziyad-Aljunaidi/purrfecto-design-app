"use client";
import { useState } from "react";
import ShotTitle from "./shot-title";
import MediaPicker from "./media-picker";
import { AcceptedFile } from "@/lib/types";
import { Button } from "../ui/button";
import Image from "next/image";

type Errors = {
  shotTitleError: string;
};
export default function CreateShotWrapper() {
  const [shotTitle, setShotTitle] = useState<string>("");
  const [shotTitleSlug, setShotTitleSlug] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<AcceptedFile[]>([]);
  const [thumbnail, setThumbnail] = useState<AcceptedFile>({} as AcceptedFile);
  const [errors, setErrors] = useState<Errors | null>(null);

  // function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {

  // }

  function handleShotTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors({ shotTitleError: "" });
    const value = e.target.value;
    if (!value) {
      setErrors({ shotTitleError: "Shot title is required" });
    }
    if(value.trim().length < 3 || value.trim().length > 50) {
      setErrors({ shotTitleError: "Shot title must be between 3 and 50 characters" });
    }
    const slug = value
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");

    setShotTitle(value);
    setShotTitleSlug(slug);
  }

  return (
    <div className="space-y-8">
      <ShotTitle
        ShotTitleHandler={handleShotTitleChange}
        ShotTitleError={errors?.shotTitleError || ""}
      />
      <MediaPicker mediaFiles={mediaFiles} />
      {mediaFiles.length > 0 && (
        mediaFiles.map((file) => {
          return (
          <Image key={file.name} src={file.preview} alt={file.name} width={200} height={200} />
          )
        })
      )}
      <Button className="font-[family-name:var(--font-jetbrains-mono)] rounded-full">Create Shot</Button>
    </div>
  );
}
