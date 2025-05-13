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
import LikeButton from "@/components/metrics-buttons/like-button";
import { useState } from "react";

export function LikeButtonWrapper({
  shotId,
  creatorId,
  type,
}: {
  shotId: string;
  creatorId: string;
  type: "card" | "drawer" | "page" | "card v2";
}) {
  const [isOpen, setIsOpen] = useState(false);

  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-1 px-2" asChild>
        <LikeButton shotId={shotId} creatorId={creatorId} type={type} isOpenSetter={setIsOpen} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-foreground">
            Want to Like this shot?
          </DialogTitle>
          <DialogDescription className="text-md text-foreground">
            You need to be Signed in to Like this shot. Please Sign in or Sign
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
