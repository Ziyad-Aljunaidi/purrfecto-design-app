"use client";
import { useState } from "react";
import ShotTitle from "./shot-title";
import MediaPicker from "./media-picker";

type Errors = {
  shotTitleError: string;
};
export default function CreateShotWrapper() {
  const [shotTitle, setShotTitle] = useState<string>("");
  const [shotTitleSlug, setShotTitleSlug] = useState<string>("");
  const [errors, setErrors] = useState<Errors | null>(null);



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
    // const slugId = slug + "-" + (Date.now() * Math.floor(Math.random() * 1000)).toString();
    // console.log(slugId);

    setShotTitle(value);
    setShotTitleSlug(slug);
  }

  return (
    <div className="space-y-8">
      <ShotTitle
        ShotTitleHandler={handleShotTitleChange}
        ShotTitleError={errors?.shotTitleError || ""}
      />
      <MediaPicker />
    </div>
  );
}
