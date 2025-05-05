"use client";

import type React from "react";

import { useState, useRef, startTransition, useOptimistic } from "react";
import { Bookmark, Heart, Eye, MessageCircle } from "lucide-react";
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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  toggleShotLike,
  toggleShotSave,
} from "@/actions/ProjectShotMetricsAction";

type DesignCardProps = React.ComponentProps<typeof Card> & {
  imageUrl?: string;
  title?: string;
  shotId: string;
  creator_Id: string;
  authorName?: string;
  // authorRole?: string;
  authorAvatar?: string;
  likes?: number;
  views?: number;
  userId?: string | null;
  is_liked?: boolean;
  is_saved?: boolean;
};

export function DesignCard({
  className,
  shotId,
  creator_Id,
  imageUrl = "/placeholder.svg?height=400&width=600",
  title = "Minimal Dashboard Design",
  authorName = "Sarah Johnson",
  // authorRole = "designer",
  authorAvatar = "/placeholder.svg?height=40&width=40",
  likes = 142,
  views = 1024,
  userId = null,
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
            <DrawerHeader className="sticky top-0 z-10 bg-background border-b">
              <DrawerTitle className="font-medium text-2xl">
                {title}
              </DrawerTitle>
              <DrawerDescription className="flex items-center gap-2 text-foreground font-medium">
                <Avatar>
                  <AvatarImage
                    src={authorAvatar}
                    alt={authorName}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {authorName}
              </DrawerDescription>
            </DrawerHeader>

            <div className="overflow-y-auto max-h-[calc(90vh-10rem)]">
              <div className="p-4">
                <div className="w-full bg-muted rounded-lg flex items-center justify-center mb-6">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    width={1920}
                    height={50}
                    // fill
                    className="object-cover  max-h-full w-full rounded-lg"
                    onClick={() => console.log(imageUrl)}
                  />
                </div>
                <div className="w-full bg-muted rounded-lg flex items-center justify-center mb-6">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    width={800}
                    height={600}
                    // fill
                    className="object-cover  max-h-full w-full rounded-lg"
                  />
                </div>

                {/* Description section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    This is a detailed description of the design. It showcases
                    the thought process, design decisions, and the overall
                    concept behind this creative work. The designer has put
                    careful consideration into every element to create a
                    cohesive and functional design that meets the project
                    requirements.
                  </p>
                </div>

                {/* Tools used section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-2">Tools Used</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">
                      Figma
                    </span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">
                      Photoshop
                    </span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">
                      Illustrator
                    </span>
                  </div>
                </div>

                {/* Comments section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-2 flex gap-2 items-center"><MessageCircle size={16} className="h-4 w-4" />Comments</h3>
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
                </div>

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

            <DrawerFooter className="sticky bottom-0 z-10 bg-background border-t">
              <div className="flex justify-between w-full mb-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Like</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Bookmark className="h-4 w-4" />
                    <span>Save</span>
                  </Button>
                </div>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
