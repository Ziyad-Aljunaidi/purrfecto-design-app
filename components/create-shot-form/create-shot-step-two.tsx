import { useState } from "react";
import { AcceptedFile, CreateShotErrors } from "@/lib/types";
import Image from "next/image";
import { Pen } from "lucide-react";
import { TagField } from "@/components/tags-input";
import useTagInput from "@/hooks/useTag";
// import Tiptap from "../Tiptap";
import CropThumbnail from "@/components/create-shot-form/crop-thumbnail";
import DescriptionTextarea from "@/components/create-shot-form/description-textarea";

export default function CreateShotStepTwo({
  thumbnailImage,
  thumbnailSetter,
  shotDescriptionSetter,
  shotTagsSetter,
  errors,
  errorsSetter,
}: {
  thumbnailImage: AcceptedFile;
  thumbnailSetter: React.Dispatch<React.SetStateAction<AcceptedFile | null>>;
  shotTagsSetter: React.Dispatch<React.SetStateAction<string[]>>;
  shotDescriptionSetter: React.Dispatch<React.SetStateAction<string>>;
  errors: CreateShotErrors | null;
  errorsSetter: React.Dispatch<React.SetStateAction<CreateShotErrors | null>>;
}) {
  const { tags, handleAddTag, handleRemoveTage } = useTagInput(25);
  const [isCropOpen, setIsCropOpen] = useState(false);

  // useEffect(() => {
  //   if(tags.length > 0 && tags.length < 5) {
  //     errorsSetter({tagsError:" must be at least 5 tags long"});
  //   }
  //   shotTagsSetter(tags);
  // }, [tags, shotTagsSetter]);

  function handleToggleCrop(isCropOpenBool: boolean) {
    setIsCropOpen(isCropOpenBool);
  }

  return (
    <main className="gap-4 mb-6 space-y-4">
      <div className="flex flex-wrap md:flex-nowrap w-full h-full gap-4">
        <div className="w-full md:w-1/3 relative">
          <Image
            src={thumbnailImage.preview}
            alt="Thumbnail"
            width={1200}
            height={900}
            className="object-cover aspect-[4/3] rounded-xl shadow-lg "
          />
          <button
            type="button"
            className="absolute top-4 right-4 bg-gray-950 rounded-lg p-2 hover:bg-gray-800 transition duration-200 cursor-pointer"
            onClick={() => handleToggleCrop(true)}
          >
            <Pen className="text-white" size={24} />
          </button>
          <h3 className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm">
            Shot Thumbnail
          </h3>
        </div>
        <div className="w-full md:w-2/3 bg-accent/30 rounded-lg ">
          <TagField
            tags={tags}
            addTag={handleAddTag}
            removeTag={handleRemoveTage}
            maxTags={25}
            tagsSetter={shotTagsSetter}
            errorSetter={errorsSetter}
            error={errors}
          />
        </div>
        {isCropOpen && (
          <CropThumbnail
            thumbnailImage={thumbnailImage}
            thumbnailSetter={thumbnailSetter}
            handleToggleCrop={handleToggleCrop}
          />
        )}
      </div>
      <div className=" bg-accent/30 rounded-xl p-4">
        {/* <h2 className="my-4 lg:m-4 font-bold text-primary text-lg">Add Description</h2> */}
        {/* <Tiptap description="" onChange={() => {}} /> */}
        <DescriptionTextarea
          descriptionSetter={shotDescriptionSetter}
          error={errors}
          errorSetter={errorsSetter}
        />
      </div>
    </main>
  );
}
