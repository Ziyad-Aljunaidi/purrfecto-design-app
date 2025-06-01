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
// import Tiptap from "@/components/Tiptap";
import RichTextEditor from "@/components/create-shot-form-v2/rich-text-editor-tiptap";

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

  const handleContentChange = (jsonContent: string, isValid: boolean) => {
    console.log("JSON Content:", jsonContent)
    console.log("Is valid:", isValid)

    // Example of parsing the JSON if needed
    try {
      const parsedContent = JSON.parse(jsonContent)
      console.log("Parsed content:", parsedContent)
    } catch (error) {
      console.error("Error parsing JSON:", error)
    }
  }

  return (
    <main
      className={cn(
        "flex flex-col justify-center items-center w-full max-w-5xl mx-auto my-8 gap-8 md:px-0",
        outfit.className
      )}
    >
      {/* STEP 1 */}
      <div
        className={cn(
          formSteps === 1 ? "flex" : "hidden",
          "flex-col justify-center items-center w-full max-w-5xl mx-auto my-8 gap-8 px-4 md:px-0"
        )}
      >
        <CreateShotTitle titleGetter={title} titleSetter={setTitle} />

        {/* <div> */}
        <CreateFormMediaPicker mediaFilesSetter={setMediaFiles} />
        <TagsInput
          minTags={5}
          maxTags={25}
          heading="Tags"
          tagsSetter={setTags}
          tagsGetter={tags}
        />

        
        <RichTextEditor
          initialContent="<p>Start typing your content here...</p>"
          onChange={handleContentChange}
          className="w-full"
        />
        {/* <Tiptap description="" onChange={() => {}} />  */}
        {/* </div> */}
        {sortableMediaFiles && sortableMediaFiles.length > 0 && (
          <SortableShotList
            heading="Preview"
            ShotItems={sortableMediaFiles}
            ShotItemsSetter={setSortableMediaFiles}
          />
        )}
      </div>

      {/* STEP 2 */}
      {formSteps === 2 && <div></div>}

      {/* NAVIGATION BUTTONS & SUBMIT */}
      <div
        className={cn(
          "flex items-center w-full px-4 md:px-0",
          formSteps === 1 ? "justify-end" : "justify-between"
        )}
      >
        {formSteps === 2 && (
          <ArrowButton
            onSide="left"
            onClick={() => setFormSteps(1)}
            variant="ghost"
            className="text-xl pr-8 pl-5 py-5 rounded-lg"
          >
            Back
          </ArrowButton>
        )}

        <ArrowButton
          onSide="right"
          onClick={() => setFormSteps(2)}
          className="text-xl pl-8 pr-5 py-5 rounded-lg"
        >
          Next
        </ArrowButton>
      </div>
      {/* ERRORS */}
      {errors.title && <p className="text-rose-500">{errors.title}</p>}
      {errors.media && <p className="text-rose-500">{errors.media}</p>}
      {errors.tags && <p className="text-rose-500">{errors.tags}</p>}
      {errors.description && <p className="text-rose-500">{errors.description}</p>}
      {tags &&
        tags.map((tag) => (
          <p key={tag.id} className="text-rose-500">
            {tag.text}
          </p>
        ))}
    </main>
  );
}
