import {useState, ChangeEvent} from "react";
import { CreateShotTag } from "@/lib/types";

export const TagField = ({ tags, addTag, removeTag, maxTags }: CreateShotTag) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or new line creation

      if (
        userInput.trim() !== "" &&
        userInput.length <= 12 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput(""); // Clear the input after adding a tag
      }
    }
  };

  return (
    <div className="flex flex-col w-auto m-4">
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
            className="inline-flex items-start justify-start px-3 py-2 rounded-lg text-sm shadow-sm font-medium bg-blue-100 text-blue-600 mr-2"
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
    </div>
  );
};