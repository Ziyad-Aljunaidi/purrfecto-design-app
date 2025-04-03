"use client";
import { useState, useEffect } from "react";
import ShotTitle from "./shot-title";
import MediaPicker from "./media-picker";
import { Button } from "../ui/button";
import { AcceptedFile, ShotItem } from "@/lib/types";
// import Image from "next/image";
// import Tiptap from "../Tiptap";
import SortableShotList from "./sortable-shot-list";
import clsx from "clsx";
import { CreateShotErrors } from "@/lib/types";
import CreateShotStepTwo from "@/components/create-shot-form/create-shot-step-two";
import { uploadFile } from "@/lib/do-spaces-operations";

export default function CreateShotWrapper() {
  const [shotTitle, setShotTitle] = useState<string>("");
  const [shotTitleSlug, setShotTitleSlug] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<AcceptedFile[]>([]);
  const [thumbnail, setThumbnail] = useState<AcceptedFile | null>(null);
  const [shotItems, setShotItems] = useState<ShotItem[]>([]);
  const [errors, setErrors] = useState<CreateShotErrors | null>(null);
  const [isStepOne, setIsStepOne] = useState<boolean>(true);

  useEffect(() => {
    const updatedMediaFiles = mediaFiles.map((file, index) => {
      const type = file.type.startsWith("image")
        ? ("image" as const)
        : ("video" as const);
      return {
        id: index,
        type,
        content: file,
      };
    });
    console.log(updatedMediaFiles);
    setShotItems(updatedMediaFiles);
  }, [mediaFiles]);



  function ToggleSteps() {
    setIsStepOne(!isStepOne);
  }
  async function handleShotSubmit() {
    console.log("Shot Title: ", shotTitle);
    console.log("Shot Slug: ", shotTitleSlug);
    const url = await uploadFile(thumbnail!);
    
    console.log("Thumbnail URL: ", url);
  }

  return (
    <main className="font-[family-name:var(--font-noto-sans)]">
      <div className={`space-y-8 ${clsx(isStepOne ? 'block' : 'hidden')}`}>
        <ShotTitle
          // ShotTitleHandler={handleShotTitleChange}
          // ShotTitleError={errors?.shotTitleError || ""}
          shotTitleSetter={setShotTitle}
          shotTitleSlugSetter={setShotTitleSlug}
          errorsSetter={setErrors}
          errorsGetter={errors}
        />

        <MediaPicker
          mediaFilesSetter={setMediaFiles}
          thumbnailSetter={setThumbnail}
          errorsSetter={setErrors}
          errorsGetter={errors}
        />
        {/* <Tiptap description="" onChange={() => {}} /> */}
        <SortableShotList ShotItems={shotItems} />
      </div>

      <div className={`space-y-8 ${clsx(isStepOne ? 'hidden' : 'block')}`}>
        {thumbnail && <CreateShotStepTwo thumbnailImage={thumbnail} thumbnailSetter={setThumbnail} />}
      </div>
      <nav className={`flex flex-wrap gap-4 md:flex-nowrap ${(isStepOne ? 'justify-end' : 'justify-between')}`}>
        <Button
          className="font-[family-name:var(--font-schibsted-grotesk)] rounded-full w-full md:w-auto p-6 px-12 text-lg cursor-pointer"
          onClick={ToggleSteps}
          disabled={!!errors?.shotTitleError || !!errors?.mediaFilesError || !!errors?.thumbnailError || !shotTitle || !mediaFiles.length || !thumbnail}
        >
          {isStepOne ? "Next" : "Back"}
        </Button>
        <Button
          className={`font-[family-name:var(--font-schibsted-grotesk)] rounded-full w-full md:w-auto p-6 px-12 text-lg cursor-pointer ${clsx(isStepOne ? 'hidden' : 'flex')}`}
          onClick={handleShotSubmit}
        >
          Submit
        </Button>
      </nav>
    </main>
  );
}
