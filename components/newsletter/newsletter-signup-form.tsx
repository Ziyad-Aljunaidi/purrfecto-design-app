import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

export default function NewsletterSignUpForm() {
  const id = useId();
  return (
    <div>
      <div className="hidden lg:block *:not-first:my-2">
        <Label htmlFor={id}>Sign up for our newsletter</Label>
        <div className="flex rounded-md">
          <Input
            id={id}
            className="px-8 flex-1 rounded-e-none focus-visible:z-10 h-12 rounded-l-lg text-lg"
            placeholder="Email"
            type="email"
          />
          <button className="text-lg border-input bg-background text-foreground hover:bg-lime-400 hover:text-zinc-950 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-lg border px-8 font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50">
            Join Now
          </button>
        </div>
      </div>

      <div className="block lg:hidden  *:not-first:my-2">
        <Label htmlFor={id}>Sign up for our newsletter</Label>
        <div className="flex flex-col rounded-md gap-2">
          <Input
            id={id}
            className=" focus-visible:z-10 h-11  rounded-lg text-lg"
            placeholder="Email"
            type="email"
          />
          <Button variant={"default"} className="text-lg hover:bg-lime-400 hover:text-zinc-950 focus-visible:border-ring active:text-zinc-950 active:bg-lime-400 focus-visible:ring-ring/50 inline-flex items-center rounded-lg border h-10 font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50">
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
}
