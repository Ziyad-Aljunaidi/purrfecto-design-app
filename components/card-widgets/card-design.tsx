"use client";
import type React from "react";
import { useState, useOptimistic, startTransition } from "react";
import { Bookmark, Heart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  toggleShotLike,
  toggleShotSave,
} from "@/actions/ProjectShotMetricsAction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DesignCardProps = React.ComponentProps<typeof Card> & {
  shotId: string;
  creator_Id: string;
  imageUrl: string;
  title: string;
  authorName?: string;

  authorAvatar?: string;
  likes?: number;
  is_liked?: boolean;
  is_saved?: boolean;

  views?: number;
  userId?: string | null;
};

export function DesignCard({
  className,
  shotId,
  creator_Id,
  imageUrl,
  title,
  authorName,

  authorAvatar,
  likes,
  is_liked,
  is_saved,

  views,
  userId,
  ...props
}: DesignCardProps) {
  const [isImageHovering, setIsImageHovering] = useState(false);
  const [isSaved, setIsSaved] = useState(is_saved);

  const [isLiked, setIsLiked] = useState(is_liked);
  const [totalLikes, setTotalLikes] = useState(likes || 0);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    totalLikes || 0,
    (currentLikes, isLiked) => {
      if (isLiked) {
        return Number(currentLikes) - 1;
      } else {
        return Number(currentLikes) + 1;
      }
    }
  );

  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    isSaved,
    (currentSaved, isSaved) => {
      if (isSaved) {
        return false;
      } else {
        return true;
      }
    }
  );

  function handleLike() {
    if (!userId) {
      return { success: false, error: "User not logged in" };
    }
    setIsLiked(!isLiked);
    startTransition(async () => {
      setTotalLikes((prev) => Number(prev) + (isLiked ? -1 : 1));
      setOptimisticLikes(isLiked);

      const { success, error } = await toggleShotLike({
        shotId,
        userId,
        creator_Id,
      });
      if (!success) {
        console.error("Error liking project shot: ", error);
        setIsLiked(isLiked);
        setTotalLikes((prev) => Number(prev) + (isLiked ? +1 : -1));
      }
    });
  }

  function handleSave() {
    if (!userId) {
      return { success: false, error: "User not logged in" };
    }
    setIsSaved(!isSaved);
    startTransition(async () => {
      setOptimisticSaved(isSaved);

      const { success, error } = await toggleShotSave({
        shotId,
        userId,
        creator_Id,
      });
      if (!success) {
        console.error("Error saving project shot: ", error);
        setIsSaved(isSaved);
      }
    });
  }

  return (
    <Card
      className={cn(
        "w-full max-w-md overflow-hidden shadow-none transition-all duration-300 rounded-xl border-none",
        // isHovering ? "border" : "border-transparent",
        className
      )}
      {...props}
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
        onMouseEnter={() => setIsImageHovering(true)}
        onMouseLeave={() => setIsImageHovering(false)}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Image overlay with title and save button */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-between transition-opacity duration-300",
            isImageHovering ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="self-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background backdrop-blur-sm"
              onClick={handleSave}
            >
              <Bookmark
                size={16}
                className={cn(
                  "h-4 w-4",
                  optimisticSaved ? "fill-zinc-950 dark:fill-white" : ""
                )}
              />
              <span className="sr-only">Save to collection</span>
            </Button>
          </div>

          <h2 className="text-white font-medium text-lg">{title}</h2>
        </div>
      </div>

      <CardContent className="p-0 bg-white dark:bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border ">
              <AvatarImage
                src={authorAvatar || "/placeholder.svg"}
                alt={authorName}
              />
              <AvatarFallback>{authorName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="">
              <h3 className="font-medium leading-none">{authorName}</h3>
              {/* <p className="text-xs font-bold text-muted-foreground">@{authorRole}</p> */}
            </div>
          </div>

          <div className="flex items-center gap-0">
            {userId && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 px-2"
                onClick={handleLike}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isLiked ? "fill-zinc-950 dark:fill-white" : ""
                  )}
                />
                <span className="text-xs">{optimisticLikes}</span>
              </Button>
            )}
            {!userId && (
              <Dialog>
                <DialogTrigger className="flex items-center gap-1 px-2">
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isLiked ? "fill-zinc-950 dark:fill-white" : ""
                    )}
                  />
                  <span className="text-xs">{likes}</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-medium text-foreground">
                      Want to like this shot?
                    </DialogTitle>
                    <DialogDescription className="text-md text-foreground">
                      You need to be logged in to like this shot. Please Sign in
                      or Sign up to continue.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction> */}
                    <Button variant="ghost" className="text-md" asChild>
                      <Link href="/auth/signin">Sign in</Link>
                    </Button>
                    <Button variant="ghost" className="text-md" asChild>
                      <Link href="/auth/signup">Sign up</Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <div className="flex items-center gap-1 px-2">
              <Eye className="h-4 w-4" />
              <span className="text-xs">{views}22k</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
