// ORIGIN UI COMPONENT: https://originui.com/textarea
import { useId } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CreateShotErrors } from "@/lib/types";

export default function DescriptionTextarea({

  descriptionSetter,
  error,
  errorSetter,
}: {

  descriptionSetter: React.Dispatch<React.SetStateAction<string>>;
  error: CreateShotErrors | null;
  errorSetter: React.Dispatch<React.SetStateAction<CreateShotErrors | null>>;
}) {


  function shotDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    errorSetter({ descriptionError: "" });
    if (!value) {
      errorSetter({ descriptionError: "Shot description is required" });
    }
    if (value.trim().length < 10) {
      errorSetter({
        descriptionError: "Shot description is too short",
      });
    }
    if (value.trim().length > 500) {
      errorSetter({
        descriptionError: "Shot description is too long"
      });
    }
    descriptionSetter(e.target.value);
    // 

  }
  const id = useId();
  return (
    <div className="*:not-first:mt-2 m-0 lg:m-4">
      <h1 className={`text-2xl font-bold mb-4 ${error?.descriptionError && "text-red-500"}`}>Description</h1>
      <Textarea
        id={id}
        className="border-2 border-input h-64 text-xl p-4 rounded-xl"
        placeholder="Write a detailed description of your shot"
        onChange={shotDescriptionChange}
        // value={description}
        // error={error}
      />
      <div className="mt-2">
        {error && <p className="text-red-500">{error.descriptionError}</p>}
      </div>
    </div>
  );
}
