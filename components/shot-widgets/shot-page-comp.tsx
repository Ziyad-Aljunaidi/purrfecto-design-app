"use client";

import { useState} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { chivo } from "@/components/fonts";
import type {  Shot} from "@/lib/definitions";
import { SelectProfile } from "@/db/schema/profile";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ShotAttachment from "@/components/shot-widgets/shot-attachments";
import { SaveButtonWrapper } from "@/components/metrics-buttons/save-button-wrapper";
import { LikeButtonWrapper } from "@/components/metrics-buttons/like-button-wrapper";

// Add keyframe animations for the lightbox
// const fadeIn = `@keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }`

// const fadeOut = `@keyframes fadeOut {
//   from { opacity: 1; }
//   to { opacity: 0; }
// }`

export default function ShotPageComp({
  creator,
  shot,
  likes,
  // views,
  is_liked,
  is_saved,
  userId,
}: {
  creator: SelectProfile;
  shot: Shot;
  likes: number;
  // views?: number;
  is_liked?: boolean;
  is_saved?: boolean;
  userId?: string | null;
}) {
  const [isLiked, setIsLiked] = useState(is_liked || false);
  const [isSaved, setIsSaved] = useState<boolean>(is_saved || false);
  const [totalLikes, setTotalLikes] = useState(likes || 0);

  // Fallback if no shot data
  if (!shot) {
    return notFound();
  }

  return (
    <>
      <main className="max-w-5xl mx-auto">
        {/* Creator Header - Bold and prominent */}
        <div className="flex mx-auto items-center justify-between gap-4 bg-background border-b space-y-2 flex-shrink-0 py-6 px-2 md:px-0">
          <div className="flex items-center gap-4 justify-between">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={creator.avatar_url[0] || "/placeholder.svg"}
                alt={creator.name}
              />
              <AvatarFallback className="text-lg font-bold">
                {creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-md lg:text-xl font-extrabold tracking-tight">
                {creator.name}
              </h2>
              <p className="text-smlg:text-md font-medium text-foreground/50">
                @{creator.displayUsername}
              </p>
            </div>
          </div>
          <Button className="bg-primary py-2 px-4 text-md font-semibold text-primary-foreground rounded-full hover:bg-primary/90">
            Follow
          </Button>
        </div>
        <div className="flex items-center justify-between mt-8 mb-2 lg:mb-6">
          <div className=" px-4 md:px-0">
            <h1
              className={`text-3xl md:text-5xl font-semibold tracking-tighter break-all ${chivo.className}`}
            >
              {shot.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 mr-2 md:mr-0">
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
            <SaveButtonWrapper
              shotId={shot.id}
              creatorId={creator.id}
              type="drawer"
              isAlreadySaved={isSaved}
              isAlreadySavedSetter={setIsSaved}
              userId={userId}
            />
          </div>
        </div>

        {/* Shot Description - Clear and concise */}
        <div className="p-0 mb-12">
          <ShotAttachment attachmentId={shot.attachment_id} />
          {/* Description section */}
          <div className="my-8 px-4 md:px-0">
            <h3
              className={cn(
                "text-2xl font-semibold mb-2 underline underline-offset-8 decoration-[#ff4aa0] decoration-4 underline-green-500",
                chivo.className
              )}
            >
              About this shot
            </h3>
            <h2 className="text-foreground text-lg font-medium mb-2 tracking-tighter break-all ">
              {shot.description || "No description available"}
            </h2>
          </div>

          {/* Tagss used section */}
          <div className="my-8 px-4 md:px-0">
            <h3
              className={cn(
                "text-2xl font-semibold mb-2 underline underline-offset-8 decoration-[#ff4aa0] decoration-4 underline-green-500",
                chivo.className
              )}
            >
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {shot.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 mt-4 py-2 bg-muted rounded-full text-md font-semibold transition-all duration-50 ease-in-out hover:bg-violet-500/15 hover:text-violet-500 hover:outline-2 hover:outline-violet-500 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
