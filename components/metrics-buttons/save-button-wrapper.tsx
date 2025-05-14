"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SaveButton from "./save-button";

export function SaveButtonWrapper({
  isAlreadySaved,
  isAlreadySavedSetter,
  userId,
  shotId,
  creatorId,
  type,
}: {
  isAlreadySaved: boolean;
  isAlreadySavedSetter: React.Dispatch<React.SetStateAction<boolean >>;
  userId: string | null | undefined;
  shotId: string;
  creatorId: string;
  type: "card" | "drawer" | "page" | "card v2";
}) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-1 px-2" asChild>
        <SaveButton shotId={shotId}  isAlreadySaved={isAlreadySaved} isAlreadySavedSetter={isAlreadySavedSetter} userId={userId} creatorId={creatorId} type={type} isOpenSetter={setIsOpen} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-foreground">
            Want to Save this shot?
          </DialogTitle>
          <DialogDescription className="text-md text-foreground">
            You need to be Signed in to Save this shot. Please Sign in or Sign
            up to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="text-md" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button variant="outline" className="text-md" asChild>
            <Link href="/auth/signup">Sign up</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

