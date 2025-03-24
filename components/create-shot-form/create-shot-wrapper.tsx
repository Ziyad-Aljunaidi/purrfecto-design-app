"use client";
import {useState, useEffect } from "react";
import ShotTitle from "./shot-title";
import MediaPicker from "./media-picker";
import { Button } from "../ui/button";
import { AcceptedFile, ShotItem } from "@/lib/types";
// import Image from "next/image";
// import Tiptap from "../Tiptap";
import SortableShotList from "./sortable-shot-list";


type Errors = {
  shotTitleError: string;
};

// type CreateShotWrapperProps = {
//   ShotItems: ShotItem[];
// };
export default function CreateShotWrapper() {
  const [shotTitle, setShotTitle] = useState<string>("");
  const [shotTitleSlug, setShotTitleSlug] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<AcceptedFile[]>([]);
  const [shotItems, setShotItems] = useState<ShotItem[]>([]);
  const [errors, setErrors] = useState<Errors | null>(null);

  useEffect(() => {
      const updatedMediaFiles = mediaFiles.map((file, index) => {
        const type = file.type.startsWith("image") ? "image" as const : "video" as const;
        return {
          id: index,
          type,
          content: file,
        };
      });
      console.log(updatedMediaFiles);
      setShotItems(updatedMediaFiles);
    }, [mediaFiles]);
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

  function handleShotSubmit(){
    console.log("Shot Title: ", shotTitle);
    console.log("Shot Slug: ", shotTitleSlug);
  }

  return (
    <div className="space-y-8">
      <ShotTitle
        ShotTitleHandler={handleShotTitleChange}
        ShotTitleError={errors?.shotTitleError || ""}
      />

      

      <MediaPicker mediaFilesSetter={setMediaFiles}/>
      {/* <Tiptap description="" onChange={() => {}} /> */}
      <SortableShotList ShotItems={shotItems} />
      <Button className="font-[family-name:var(--font-geist-sans)] rounded-full w-full md:w-auto p-6 text-md" onClick={handleShotSubmit}>Create Shot</Button>
    </div>
  );
}
