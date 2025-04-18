import { useState, useEffect, ChangeEvent } from "react";
import { CreateShotTag, CreateShotErrors } from "@/lib/types";

interface ExtendedCreateShotTag extends CreateShotTag {
  errorSetter: React.Dispatch<React.SetStateAction<CreateShotErrors | null>>;
  error: CreateShotErrors | null;
  tagsSetter: React.Dispatch<React.SetStateAction<string[]>>;
}
export const TagField = ({
  tags,
  addTag,
  removeTag,
  maxTags,
  tagsSetter,
  errorSetter,
  error,
}: ExtendedCreateShotTag) => {
  const [userInput, setUserInput] = useState<string>("");

  useEffect(() => {
    errorSetter({ tagsError: "" });
    if (tags.length > 0 && tags.length < 5) {
      errorSetter({ tagsError: "You must add at least 5 tags" });
    }
    tagsSetter(tags);
  }, [tags, tagsSetter, errorSetter]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault(); // Prevent form submission or new line creation

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput(""); // Clear the input after adding a tag
        errorSetter({ tagsError: "" });
      }
    }
  };

  return (
    <div className="flex flex-col w-auto m-4">
      <h1
        className={`my-4 font-bold text-primary text-2xl ${
          error?.tagsError && "text-red-500"
        }`}
      >
        Add Tags
      </h1>
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Add a tag"
            : `You can only enter max. of ${maxTags} tags`
        }
        className=" border-2 border-input  rounded-xl px-4 py-2"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      {/* ===== Render the tags here ===== */}

      <div className="flex flex-row flex-wrap gap-3 mt-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="inline-flex items-start justify-start px-4 py-2 rounded-full text-md shadow-sm font-medium bg-primary text-secondary mr-2"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      {error && <p className="text-red-500">{error.tagsError}</p>}
    </div>
  );
};
