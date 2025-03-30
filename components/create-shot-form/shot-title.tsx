import { clsx } from "clsx";
import { CreateShotErrors } from "@/lib/types";

export default function ShotTitle({
  shotTitleSetter,
  shotTitleSlugSetter,
  errorsSetter,
  errorsGetter,
}: {
  // ShotTitleHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // ShotTitleError: string;
  shotTitleSetter: React.Dispatch<React.SetStateAction<string>>;
  shotTitleSlugSetter: React.Dispatch<React.SetStateAction<string>>;
  errorsSetter: React.Dispatch<React.SetStateAction<CreateShotErrors | null>>;
  errorsGetter: CreateShotErrors | null;
}) {

    function handleShotTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
      errorsSetter({ shotTitleError: "" });
      const value = e.target.value;
      if (!value) {
        errorsSetter({ shotTitleError: "Shot title is required" });
      }
      if (value.trim().length < 3 || value.trim().length > 50) {
        errorsSetter({
          shotTitleError: "Shot title must be between 3 and 50 characters",
        });
      }
      const slug = value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");
      // const slugId = slug + "-" + (Date.now() * Math.floor(Math.random() * 1000)).toString();
      // console.log(slugId);
  
      shotTitleSetter(value);
      shotTitleSlugSetter(slug);
    }
  return (
    <div>
      <h1
        className={`text-2xl ${clsx({
          "text-red-500": errorsGetter?.shotTitleError,
          "text-primary": !errorsGetter?.shotTitleError,
        })} font-bold mb-2`}
      >
        Shot Title
      </h1>
      <input
        placeholder="My Awesome Project"
        onChange={handleShotTitleChange}
        // value={ShotTitle}
        className="text-2xl px-4 py-6 rounded-xl bg-transparent border-2 border-input w-full"
      />
      <div className="mt-2">
        {errorsGetter && <p className="text-red-500">{errorsGetter.shotTitleError}</p>}
      </div>
    </div>
  );
}
