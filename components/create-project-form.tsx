"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Tiptap from "./Tiptap";



const formSchema = z.object({
  Title: z
    .string()
    .nonempty()
    .min(3)
    .max(20)
    .regex(/^[A-Za-z0-9\s]+$/, {
      message: "Only alphabets and spaces are allowed",
    }),
  Description: z.string().nonempty().trim().min(17).max(200),
});

export default function CreateProjectForm() {
  const [filesErrorMessages, setFilesErrorMessages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // values.Files = onFilesSelected;
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 font-[family-name:var(--font-jetbrains-mono)]"
      >
        <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">
                Give your project a title
              </FormLabel>
              <FormControl>
                <input
                  placeholder="My Awesome Project"
                  {...field}
                  className="text-xl px-4 py-6 rounded-md bg-transparent border-2 border-input "
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Description</FormLabel>
              <FormControl>
                <Tiptap description={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-4 space-y-4">
          <Button
            type="submit"
            className="cursor-pointer w-full p-6 md:w-auto md:p-4 space-x-4"
          >
            Submit
          </Button>
          <Button
            onClick={() => console.log("clicked on draft button")}
            className="cursor-pointer w-full p-6 md:w-auto md:p-4 antialiased"
            variant="secondary"
          >
            Save As Draft
          </Button>
        </div>
      </form>
    </Form>
  );
  // <Form
}
