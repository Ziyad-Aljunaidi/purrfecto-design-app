"use client";
import { useState, useEffect } from "react";
import CreateShotTitle from "./create-shot-title";
import CreateFormMediaPicker from "./media-picker";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { outfit } from "@/components/fonts";
// import Image from "next/image";
import { useShotErrors } from "@/hooks/use-errors";
import SortableShotList from "./sortable-shot-list";
import { type Tag } from "emblor";

// import { Button } from "../ui/button";
import { TagsInput } from "./tags-input";
import ArrowButton from "../arrow-button";

export default function CreateFormWrapper() {
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [mediaFiles, setMediaFiles] = useState<FileWithPreview[] | undefined>();
  const [sortableMediaFiles, setSortableMediaFiles] = useState<
    FileWithPreview[]
  >([]);
  const [formSteps, setFormSteps] = useState<1 | 2>(1);

  useEffect(() => {
    if (mediaFiles) {
      setSortableMediaFiles(mediaFiles);
    }
  }, [mediaFiles]);

  const { errors } = useShotErrors();

  return (
    <main
      className={cn(
        "flex flex-col justify-center items-center w-full max-w-5xl mx-auto my-8 gap-8 px-4 md:px-0",
        outfit.className
      )}
    >
      {/* STEP 1 */}
      {formSteps === 1 && (
        <div className="flex flex-col justify-center items-center w-full max-w-5xl mx-auto my-8 gap-8 px-4 md:px-0">
          <CreateShotTitle titleGetter={title} titleSetter={setTitle} />

          {/* <div> */}
          <CreateFormMediaPicker mediaFileSetter={setMediaFiles} />
          <TagsInput minTags={5} maxTags={25} heading="Tags" tagsSetter={setTags} />
          {/* </div> */}
          {sortableMediaFiles && sortableMediaFiles.length > 0 && (
            <SortableShotList
              heading="Preview"
              ShotItems={sortableMediaFiles}
              ShotItemsSetter={setSortableMediaFiles}
            />
          )}
        </div>
      )}


      {/* STEP 2 */}
      {formSteps === 2 &&(
      <div></div>
      )}
      {/* NAVIGATION BUTTONS & SUBMIT */}
      <div className="flex items-center justify-between w-full">
      <ArrowButton onSide="left" onClick={() => setFormSteps(1)} variant="ghost">Back</ArrowButton>
       <ArrowButton onSide="right" onClick={() => setFormSteps(2)}  >Next</ArrowButton>
      </div>
      {/* ERRORS */}
      {errors.title && <p className="text-rose-500">{errors.title}</p>}
      {errors.media && <p className="text-rose-500">{errors.media}</p>}
      {errors.tags && <p className="text-rose-500">{errors.tags}</p>}
      {tags && (tags.map((tag)=><p key={tag.id} className="text-rose-500">{tag.text}</p>))}
    </main>
  );
}
