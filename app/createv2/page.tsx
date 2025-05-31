import CreateFormWrapper from "@/components/create-shot-form-v2/create-fom-wrapper";
import { cn } from "@/lib/utils";
import { outfit } from "@/components/fonts";
import { ShotErrorsProvider } from "@/hooks/use-errors";

export default function Pgae() {
  return (
    <ShotErrorsProvider>
    <main
      className={cn(
        "flex flex-col justify-center items-center w-full max-w-5xl mx-auto my-8",
        outfit.className
      )}
    >
      <CreateFormWrapper />
    </main>
    </ShotErrorsProvider>
  );
}
