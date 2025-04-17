"use client";
import { useState, useEffect } from "react";
import ShotTitle from "./shot-title";
import MediaPicker from "./media-picker";
import { Button } from "../ui/button";
import { AcceptedFile, ShotItem, ShotData } from "@/lib/types";
import SortableShotList from "./sortable-shot-list";
import clsx from "clsx";
import { CreateShotErrors } from "@/lib/types";
import CreateShotStepTwo from "@/components/create-shot-form/create-shot-step-two";
import { uploadToSpaces } from "@/lib/do-spaces-upload";
import { submitShotAction } from "@/actions/submitShotAction";
import { desc } from "drizzle-orm";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";

export default function CreateShotWrapper() {
  const [shotTitle, setShotTitle] = useState<string>("");
  const [shotTitleSlug, setShotTitleSlug] = useState<string>("");
  const [shotDescription, setShotDescription] = useState<string>("");
  const [shotTags, setShotTags] = useState<string[]>([]);
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
    console.log("Shot Description: ", shotDescription);
    console.log("Shot Tags: ", shotTags);
    const thumbnail_url = await uploadToSpaces(thumbnail!, shotTitleSlug!);

    try {
      const ShotData: ShotData = {
        // Replace with actual user ID
        slug: shotTitleSlug,
        title: shotTitle,
        description: shotDescription, // Add description if needed
        thumbnailUrl: thumbnail_url!,
        tags: shotTags,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      submitShotAction(ShotData);
      console.log("Shot Data: ", ShotData);
    } catch (error) {
      throw new Error("Error submitting shot: " + error);
      console.error("Error submitting shot: ", error);
    }

    // console.log("Thumbnail URL: ", thumbnail_url);
  }

  return (
    <main className="font-[family-name:var(--font-noto-sans)]">
      <div className={`space-y-8 ${clsx(isStepOne ? "block" : "hidden")}`}>
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

      <div className={`space-y-8 ${clsx(isStepOne ? "hidden" : "block")}`}>
        {thumbnail && (
          <CreateShotStepTwo
            thumbnailImage={thumbnail}
            thumbnailSetter={setThumbnail}
            shotDescriptionSetter={setShotDescription}
            shotTagsSetter={setShotTags}
            errorsSetter={setErrors}
            errors={errors}
          />
        )}
      </div>
      <nav
        className={`flex flex-wrap gap-4 md:flex-nowrap ${
          isStepOne ? "justify-end" : "justify-between"
        }`}
      >
        <Button
          className="font-[family-name:var(--font-schibsted-grotesk)] rounded-full w-full md:w-auto p-6 px-12 text-lg cursor-pointer"
          onClick={ToggleSteps}
          disabled={
            !!errors?.shotTitleError ||
            !!errors?.mediaFilesError ||
            !!errors?.thumbnailError ||
            !shotTitle ||
            !mediaFiles.length ||
            !thumbnail
          }
        >
          {isStepOne ? "Next" : "Back"}
        </Button>
        {!!mediaFiles.length &&
        !!thumbnail &&
        !!shotTitle &&
        shotDescription &&
        !!shotTags.length ? (
          <Button
            className={`font-[family-name:var(--font-schibsted-grotesk)] rounded-full w-full md:w-auto p-6 px-12 text-lg cursor-pointer ${clsx(
              isStepOne ? "hidden" : "flex"
            )}`}
            onClick={handleShotSubmit}
            disabled={
              !!errors?.shotTitleError ||
              !!errors?.mediaFilesError ||
              !!errors?.thumbnailError ||
              !!errors?.descriptionError ||
              !!errors?.tagsError
            }
          >
            Submit
          </Button>
        ) : null}
      </nav>
    </main>
  );
}
