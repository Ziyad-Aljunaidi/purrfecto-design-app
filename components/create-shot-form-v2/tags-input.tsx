"use client";

import type React from "react";
import { useId, useState } from "react";
import { type Tag, TagInput } from "emblor";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useShotErrors } from "@/hooks/use-errors";
// import { tags } from "@/db/schema";

export function TagsInput({
  minTags,
  maxTags,
  heading,
  tagsSetter,
  tagsGetter,
}: {
  minTags: number;
  maxTags: number;
  heading?: string;
  tagsSetter: React.Dispatch<React.SetStateAction<Tag[]>>;
  tagsGetter: Tag[];
}) {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(tagsGetter);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const { setError: setParentError, clearError } = useShotErrors();

  const handleTagsChange = (newTags: Tag[] | ((prevTags: Tag[]) => Tag[])) => {
    // Handle both direct value and function updates
    const updatedTags =
      typeof newTags === "function" ? newTags(exampleTags) : newTags;

    // Clear previous errors
    setError("");
    clearError("tags");


    // Check maximum limit
    if (updatedTags.length > maxTags) {
      setError(`Maximum ${maxTags} tags allowed`);
      setParentError("tags", `Maximum ${maxTags} tags allowed`);
      return;
    }

    // Always update the tags (allow deletion even below minimum)
    setExampleTags(updatedTags);
    tagsSetter(updatedTags);

    // Show appropriate error messages
    if (updatedTags.length < minTags) {
      setError(`Minimum ${minTags} tags required`);
      setParentError("tags", `Minimum ${minTags} tags required`);
    } else if (updatedTags.length >= minTags && updatedTags.length <= maxTags) {
      setError("");
      clearError("tags");
    }
  };

  const validateOnBlur = () => {
    if (exampleTags.length < minTags) {
      setError(`Minimum ${minTags} tags required`);
      setParentError("tags", `Minimum ${minTags} tags required`);
    } else if (exampleTags.length > maxTags) {
      setError(`Maximum ${maxTags} tags allowed`);
      setParentError("tags", `Maximum ${maxTags} tags allowed`);
    } else {
      setError("");
      clearError("tags");
    }
  };

  return (
    <div className="w-full space-y-3">
      <Label
        htmlFor={id}
        className="w-full flex items-baseline justify-between"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
          {heading && (
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {heading}
            </h2>
          )}
          <span className="text-muted-foreground text-xs sm:text-sm font-medium">
            ({exampleTags.length}/{maxTags} tags, min: {minTags})
          </span>
        </div>
        {/* <TagIcon className="size-5" /> */}
      </Label>

      <TagInput
        id={id}
        tags={exampleTags}
        setTags={handleTagsChange}
        placeholder={
          exampleTags.length >= maxTags ? "Maximum tags reached" : "Add a tag"
        }
        onBlur={validateOnBlur}
        styleClasses={{
          inlineTagsContainer: `border-2 border-input rounded-xl bg-background shadow-none transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 min-h-[4rem] sm:min-h-[4.5rem] p-2 sm:p-3 gap-1.5 sm:gap-2 ${
            error
              ? "border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500/50"
              : ""
          }`,
          input:
            "w-full min-w-[80px] sm:min-w-[120px] shadow-none px-2 sm:px-3 h-8 sm:h-10 outline-none border-none text-sm sm:text-base placeholder:text-muted-foreground",
          tag: {
            body: "h-7 sm:h-8 relative bg-background border-2 border-input hover:bg-lime-400/5 hover:border-lime-400 rounded-md font-medium text-xs sm:text-sm ps-2 sm:ps-3 pe-7 sm:pe-8 transition-colors",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-6 sm:size-7.5 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground hover:bg-accent/50",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />

      {error && (
        <div className="flex items-start gap-2">
          <p
            className="text-rose-500 text-xs sm:text-sm font-medium"
            role="alert"
          >
            {error}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <p className="text-muted-foreground text-xs sm:text-sm">
          <span className="hidden sm:inline">Example: </span>
          <span className="sm:hidden">Ex: </span>
          illustration, design, creative
        </p>

        <div className="text-xs sm:text-sm">
          {exampleTags.length < minTags && (
            <span className="text-rose-500 font-medium">
              <span className="hidden sm:inline">
                Need {minTags - exampleTags.length} more tags
              </span>
              <span className="sm:hidden">
                +{minTags - exampleTags.length} needed
              </span>
            </span>
          )}
          {exampleTags.length >= minTags && exampleTags.length <= maxTags && (
            <span className="text-lime-500 font-medium dark:text-lime-400 flex gap-1 items-center">
              <Check className="size-3 sm:size-4" />
              <span className="hidden sm:inline">Valid range</span>
              <span className="sm:hidden">Valid</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
