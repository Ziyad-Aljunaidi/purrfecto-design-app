import { clsx } from "clsx";

export default function ShotTitle({
  ShotTitleHandler,
  ShotTitleError,
}: {
  ShotTitleHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ShotTitleError: string;
}) {
  return (
    <div>
      <h1
        className={`text-2xl ${clsx({
          "text-red-500": ShotTitleError,
          "text-primary": !ShotTitleError,
        })} font-bold mb-2`}
      >
        Shot Title
      </h1>
      <input
        placeholder="My Awesome Project"
        onChange={ShotTitleHandler}
        // value={ShotTitle}
        className="text-2xl px-4 py-6 rounded-xl bg-transparent border-2 border-input w-full"
      />
      <div className="mt-2">
        {ShotTitleError && <p className="text-red-500">{ShotTitleError}</p>}
      </div>
    </div>
  );
}
