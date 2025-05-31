"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useShotErrors } from "@/hooks/use-errors";

export const TitleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(80, { message: "Title must be at most 80 characters long" }),
});

type TitleFormValues = z.infer<typeof TitleSchema>;

export default function CreateShotTitle({
  titleGetter,
  titleSetter,
  className = "",
}: {
  titleGetter: string;
  titleSetter: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  const {setError, clearError} = useShotErrors();

  const form = useForm<TitleFormValues>({
    resolver: zodResolver(TitleSchema),
    defaultValues: {
      title: titleGetter,
    },
    mode: "onChange", // Validate on every change
  });

  // Watch for title changes and update parent state
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.title) {
        titleSetter(value.title);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, titleSetter]);

  useEffect(() => {
    if (form.formState.errors.title) {
      setError("title", form.formState.errors.title?.message ?? "Unknown error");
    } else {
      clearError("title");
    }
  }, [form.formState.errors.title])

  // Update form when titleGetter changes from parent
  useEffect(() => {
    form.reset({ title: titleGetter });
  }, [titleGetter, form]);

  return (
    <div className={cn("w-full text-xl",className)}>
      <span className="text-xl font-bold ">Give your purrfect shot a title</span>
      <Input
        {...form.register("title")}
        className={cn("py-8 text-2xl border-2 shadow-none rounded-xl mt-2",form.formState.errors.title ? "border-rose-500" : "")}
        placeholder="Enter your title..."
      />
      {form.formState.errors.title && (
        <div
          className="text-rose-500 flex items-center gap-1 text-sm mt-1"
          role="alert"
        >
          <AlertCircleIcon className="size-5 shrink-0" />
          <span>{form.formState.errors.title.message}</span>
        </div>
      )}
    </div>
  );
}