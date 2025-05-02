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
import  submitShotAction  from "@/actions/submitShotAction";
import { nanoid } from "nanoid";
import { getUserId } from "@/actions/UserAction";

// const userId = await getUserId();


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
    const userId = await getUserId();
    if (!userId) {
      console.error("User ID not found");
      throw new Error("User ID not found");
    }
    const attachmentId = nanoid();
    const thumbnail_url = await uploadToSpaces(thumbnail!, shotTitleSlug!, true, userId,attachmentId);
    const attachments_urls = await Promise.all(
      shotItems.map((item) =>
        uploadToSpaces(item.content, shotTitleSlug!, false, userId, attachmentId)
      )
    )
    const attachmentsJson = attachments_urls.map((url, index) => ({
      type: shotItems[index].type,
      source: url,
    }));
    console.log("Attachments URLs: ", attachments_urls);
    console.log("Thumbnail URL: ", thumbnail_url);
    try {
      const ShotData: ShotData = {
        creatorId: userId,
        slug: shotTitleSlug,
        title: shotTitle,
        description: shotDescription,
        thumbnailUrl: thumbnail_url!,
        tags: shotTags,
        isPublished: true,
        attachmentId: attachmentId,
        attachments: attachmentsJson,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      submitShotAction(ShotData);
      console.log("Shot Data: ", ShotData);
    } catch (error) {
      throw new Error("Error submitting shot: " + error);
    }
  }

  return (
    <main className="font-[family-name:var(--font-noto-sans)]">
      <div className={`space-y-8 ${clsx(isStepOne ? "block" : "hidden")}`}>
        <ShotTitle
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
        <SortableShotList ShotItems={shotItems}  ShotItemsSetter={setShotItems} />
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
