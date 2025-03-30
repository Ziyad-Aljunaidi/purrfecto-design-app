import React, { useState } from "react";

const useTagInput = (maxTags: number) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTage = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return {
    tags,
    handleAddTag,
    handleRemoveTage,
  };
};

export default useTagInput;