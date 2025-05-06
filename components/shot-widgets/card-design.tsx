"use client";

import type React from "react";

import { useState, useRef, startTransition, useOptimistic } from "react";
import { Bookmark, Heart, Eye,  X } from "lucide-react";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  toggleShotLike,
  toggleShotSave,
} from "@/actions/ProjectShotMetricsAction";

import ShotAttachment from "./shot-attachments";

type DesignCardProps = React.ComponentProps<typeof Card> & {
  imageUrl: string;
  title: string;
  shotId: string;
  creator_Id: string;
  authorName?: string;
  authorUsername: string;
  authorAvatar?: string;
  likes?: number;
  views?: number;
  description?: string | null;
  tags?: string[];
  userId?: string | null;
  is_liked?: boolean;
  is_saved?: boolean;
  attachment_id: string;
};

export function DesignCard({
  className,
  shotId,
  creator_Id,
  imageUrl,
  title,
  authorName,
  authorUsername,
  authorAvatar,
  likes,
  views,
  userId,
  description,
  tags,
  is_liked,
  is_saved,
  attachment_id,
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
          "w-full max-w-md overflow-hidden shadow-none transition-all duration-300 rounded-xl border-none p-0",
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
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
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
              {title}
            </h2>
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
              )}

              <div className="flex items-center gap-1 px-2">
                <Eye className="h-4 w-4" />
                <span className="text-xs">{views}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drawer component separate from the card */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <div className="mx-auto w-full max-w-7xl">
            <DrawerHeader className="sticky top-0 z-10 bg-background border-b space-y-2">
              <DrawerTitle className="font-medium text-2xl flex items-center justify-between">
                {title}
                <DrawerClose asChild>
                  <Button variant="ghost" className="rounded-full">
                    <X size={16} />
                  </Button>
                </DrawerClose>
              </DrawerTitle>
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={authorAvatar} alt={authorName} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-md font-medium">{authorName}</h2>
                  <p className="text-sm font-medium text-accent-foreground">
                    @{authorUsername}
                  </p>
                </div>
              </div>
            </DrawerHeader>

            <div className="overflow-y-auto max-h-[calc(90vh-10rem)]">
              <div className="p-4">
                {/* <div className="  rounded-lg flex items-center justify-center mb-6"> */}
                  <ShotAttachment attachmentId={attachment_id} />
                {/* </div> */}
                <div className="relative rounded-lg flex items-center justify-center mb-6">
                  {/* <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    width={800}
                    height={600}
                    // fill
                    className=" w-full rounded-lg "
                  /> */}
                </div>

                {/* Description section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <h2 className="text-foreground text-lg font-medium mb-2">
                    {description || "No description available"}
                  </h2>
                </div>

                {/* Tools used section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-muted rounded-full text-md font-semibold transition-all duration-50 ease-in-out hover:outline-2 hover:outline-accent-foreground cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                    {/* <span className="px-3 py-1 bg-muted rounded-full text-sm">
                      Illustrator
                    </span> */}
                  </div>
                </div>

                {/* Comments section */}
                {/* <div className="mb-8">
                  <h3 className="text-lg font-medium mb-2 flex gap-2 items-center">
                    <MessageCircle size={16} className="h-4 w-4" />
                    Comments
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">User {i}</div>
                          <p className="text-sm text-muted-foreground">
                            Great work! I love the attention to detail in this
                            design.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* More from this designer section */}
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    More from {authorName}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden"
                      >
                        <Image
                          src={imageUrl}
                          alt={`More work ${i}`}
                          fill
                          className="object-cover"
                          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <DrawerFooter className="sticky bottom-0 z-10 bg-background border-t  ">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
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
                            Want to Like this shot?
                          </DialogTitle>
                          <DialogDescription className="text-md text-foreground">
                            You need to be Signed in to Like this shot. Please
                            Sign in or Sign up to continue.
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
                          size={24}
                          className={cn(
                            "h-12 w-12",
                            optimisticSaved
                              ? "fill-zinc-950 dark:fill-white"
                              : ""
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
                            You need to be Signed in to Save this shot. Please
                            Sign in or Sign up to continue.
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
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
