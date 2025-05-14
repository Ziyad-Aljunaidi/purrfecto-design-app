"use client";

import type React from "react";

import { useState, useRef, startTransition, useOptimistic } from "react";
import { Bookmark, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  toggleShotLike,
  toggleShotSave,
} from "@/actions/ProjectShotMetricsAction";

import { Shot, Creator } from "@/lib/definitions";
import ShotDrawer from "./shot-drawer";
import { LikeButtonWrapper } from "../metrics-buttons/like-button-wrapper";

type DesignCardProps = React.ComponentProps<typeof Card> & {
  userId?: string | null;
  shot: Shot;
  creator: Creator;
  likes?: number;
  views?: number;
  is_liked?: boolean;
  is_saved?: boolean;
};

export function DesignCard({
  className,
  userId,
  shot,
  creator,
  likes,
  views,
  is_liked,
  is_saved,
  ...props
}: DesignCardProps) {
  const [isImageHovering, setIsImageHovering] = useState(false);
  const [isLiked, setIsLiked] = useState(is_liked);
  const [isSaved, setIsSaved] = useState(is_saved);
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  function handleLike() {
    if (!userId) {
      return { success: false, error: "User not logged in" };
    }
    setIsLiked(!isLiked);
    startTransition(async () => {
      setTotalLikes((prev) => Number(prev) + (isLiked ? -1 : 1));
      setOptimisticLikes(isLiked);

      try {
        await toggleShotLike({
          shotId: shot.id,
          userId,
          creatorId: creator.id,
        });
      } catch (err) {
        console.error("Error liking project shot: ", err);
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
      try {
        await toggleShotSave({
          shotId: shot.id,
          userId,
          creatorId: creator.id,
        });
      } catch (err) {
        console.error("Error saving project shot: ", err);
        setIsSaved(isSaved);
      }
    });
  }

  const handleImageClick = (e: React.MouseEvent) => {
    // Only open drawer if the click is directly on the image element, not on the overlay or buttons
    if (
      e.target === imageRef.current ||
      e.target === imageRef.current?.querySelector("img")
    ) {
      setDrawerOpen(true);
    }
  };

  return (
    <>
      <Card
        className={cn(
          "w-full max-w-md overflow-hidden shadow-none transition-all duration-300 rounded-xl border-none p-0 gap-3",
          className
        )}
        {...props}
      >
        <div
          ref={imageRef}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl cursor-pointer"
          onMouseEnter={() => setIsImageHovering(true)}
          onMouseLeave={() => setIsImageHovering(false)}
          onClick={handleImageClick}
        >
          <Image
            src={shot.thumbnail_url || "/placeholder.svg"}
            alt={shot.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-103"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay - separate from the clickable image */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-between transition-opacity duration-300 pointer-events-none",
              isImageHovering ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Make only the buttons clickable within the overlay */}
            <div className="self-end pointer-events-auto">
              {userId && (
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
              )}
              {!userId && (
                <Dialog>
                  <DialogTrigger className="flex items-center gap-1 p-3 rounded-full bg-background backdrop-blur-sm hover:bg-accent">
                    <Bookmark
                      size={16}
                      className={cn(
                        "h-4 w-4",
                        optimisticSaved ? "fill-zinc-950 dark:fill-white" : ""
                      )}
                    />
                    <span className="sr-only">Save to collection</span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-xl font-medium text-foreground">
                        Want to Save this shot?
                      </DialogTitle>
                      <DialogDescription className="text-md text-foreground">
                        You need to be Signed in to Save this shot. Please Sign
                        in or Sign up to continue.
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
              )}
            </div>

            <h2 className="text-white font-medium text-lg pointer-events-none">
              {shot.title}
            </h2>
          </div>
        </div>

        <CardContent className="p-0 bg-white dark:bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-7 w-7 border ">
                <AvatarImage
                  src={creator.avatar_url[0] || "/placeholder.svg"}
                  alt={creator.name}
                />
                <AvatarFallback>{creator.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="">
                <h3 className="font-medium leading-none">{creator.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-0">
              {/* {userId && (
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
              )} */}
              <LikeButtonWrapper
                likes={likes}
                isAlreadyLiked={is_liked}
                userId={userId}
                shotId={shot.id}
                creatorId={creator.id}
                type="card"
                />
              {/* {!userId && (
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
                        Want to Like this shot?
                      </DialogTitle>
                      <DialogDescription className="text-md text-foreground">
                        You need to be Signed in to Like this shot. Please Sign
                        in or Sign up to continue.
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
              )} */}
              {/* <LikeButtonWrapper shotId={shot.id} creatorId={creator.id} type="card" /> */}
              <div className="flex items-center gap-1 px-2">
                <Eye className="h-4 w-4" />
                <span className="text-xs">{views}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ShotDrawer 
        userId={userId}
        shot={shot}
        creator={creator}
        likes={totalLikes}
        isLiked={isLiked}
        handleLike={handleLike}
        handleSave={handleSave}
        optimisticLikes={optimisticLikes}
        optimisticSaved={optimisticSaved}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </>
  );
}
