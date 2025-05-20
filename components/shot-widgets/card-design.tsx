"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Eye } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Shot } from "@/lib/definitions";
import { SelectProfile } from "@/db/schema/profile";
import ShotDrawer from "./shot-drawer";
import { LikeButtonWrapper } from "../metrics-buttons/like-button-wrapper";
import { SaveButtonWrapper } from "../metrics-buttons/save-button-wrapper";

type DesignCardProps = React.ComponentProps<typeof Card> & {
  userId?: string | null;
  shot: Shot;
  creator: SelectProfile;
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
  const [isLiked, setIsLiked] = useState(is_liked || false);
  const [isSaved, setIsSaved] = useState<boolean>(is_saved || false);
  const [totalLikes, setTotalLikes] = useState(likes || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

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
          "w-full max-w-md overflow-hidden shadow-none transition-all duration-300 rounded-none border-none p-0 gap-3 mx-auto",
          className
        )}
        {...props}
      >
        <div
          ref={imageRef}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg cursor-pointer"
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
            <div className="self-end pointer-events-auto">
              <SaveButtonWrapper
                shotId={shot.id}
                creatorId={creator.id}
                type="card"
                isAlreadySaved={isSaved}
                isAlreadySavedSetter={setIsSaved}
                userId={userId}
              />
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
              <LikeButtonWrapper
                likes={totalLikes}
                likesSetter={setTotalLikes}
                isAlreadyLiked={isLiked}
                isAlreadyLikedSetter={setIsLiked}
                userId={userId}
                shotId={shot.id}
                creatorId={creator.id}
                type="card"
              />

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
        likesSetter={setTotalLikes}
        isAlreadyLiked={isLiked}
        isAlreadyLikedSetter={setIsLiked}
        isAlreadySaved={isSaved}
        isAlreadySavedSetter={setIsSaved}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </>
  );
}
