"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark,
  // Eye,
  // Book,
} from "lucide-react";
import type { Creator, Shot, Attachment } from "@/lib/definitions";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  shotAttachments,
  likes,
}: {
  creator: Creator;
  shot: Shot;
  shotAttachments: Attachment;
  likes: number;

}) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Check if we have valid attachments
  const hasAttachments =
    shotAttachments &&
    shotAttachments.attachments &&
    shotAttachments.attachments.length > 0;

  // Debugging - log the data to help identify issues
  useEffect(() => {
    console.log("Creator:", creator);
    console.log("Shot:", shot);
    console.log("Shot Attachments:", shotAttachments);
    console.log("Has Attachments:", hasAttachments);
  }, [creator, shot, shotAttachments, hasAttachments]);

  const openLightbox = (index: number) => {
    if (!hasAttachments) return;
    setActiveImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = "auto";
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null || !hasAttachments) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, hasAttachments, ]);

  const navigateImage = (direction: "prev" | "next") => {
    if (activeImageIndex === null || !hasAttachments) return;

    const attachmentsLength = shotAttachments?.attachments?.length;

    if (direction === "prev") {
      setActiveImageIndex((prev) =>
        prev === 0 ? (attachmentsLength ?? 0) - 1 : (prev ?? 0) - 1
      );
    } else {
      setActiveImageIndex((prev) =>
        (prev ?? 0) === (attachmentsLength ?? 0) - 1 ? 0 : (prev ?? 0) + 1
      );
    }
  };

  // Fallback if no shot data
  if (!shot) {
    return notFound();
  }

  return (
    <>
      <main className="flex flex-col w-full max-w-5xl mx-auto bg-background">
        {/* Creator Header - Bold and prominent */}
        <div className="flex items-center justify-between w-full border-b border-accent py-6 px-4 md:px-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ">
              <AvatarImage
                src={creator?.avatar_url?.[0] || "/placeholder.svg"}
                alt={creator?.name || "Creator"}
              />
              <AvatarFallback className="text-lg font-bold">
                {creator?.name?.substring(0, 2).toUpperCase() || "CN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-md lg:text-xl font-extrabold tracking-tight">
                {creator?.name || "Creator"}
              </h2>
              <p className="text-smlg:text-md font-medium text-muted-foreground">
                @{creator?.displayUsername || "username"}
              </p>
            </div>
          </div>
          <Button className="bg-primary h-14 text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl font-bold text-lg">
            Follow
          </Button>
        </div>

        {/* Shot Title - Large and impactful */}
        <div className="flex items-center justify-between mt-8 mb-2 lg:mb-6">
          <div className=" px-4 md:px-0">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter break-words">
              {shot.title}
            </h1>
          </div>
          <div className="flex items-center gap-4 px-4 md:px-0">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                // size="md"
                className="w-auto h-10 rounded-full flex items-center gap-1 px-2"
              >
                <Heart
                  size={48}
                  className={cn(
                    "h-8 w-8"
                    // isLiked ? "fill-zinc-950 dark:fill-white" : ""
                  )}
                />
                <span className="text-xs">{likes}</span>
              </Button>
              <div className="flex items-center gap-1 hover:bg-accent/50 p-3 rounded-full transistion-all duration-200 ease-in-out">
              
                <Bookmark

                  className={cn(
                    "h-8 w-8"
                    // isLiked ? "fill-zinc-950 dark:fill-white" : ""
                  )}
                />
                
              </div>
            </div>
          </div>
        </div>

        {/* Shot Images - Bold presentation with clickable functionality */}
        <div className="grid grid-cols-1 gap-0 mb-10">
          {hasAttachments ? (
            shotAttachments?.attachments?.map((attachment, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 cursor-pointer "
                onClick={() => openLightbox(index)}
              >
                <div className="relative  w-full">
                  {attachment.type === "video" ? (
                    <video
                      src={attachment.source || "/placeholder.svg"}
                      className="w-full h-full object-cover lg:rounded-xl max"
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <Image
                      src={attachment.source || "/placeholder.svg"}
                      alt={`Shot image ${index + 1}`}
                      width={1200}
                      height={0}
                      // fill
                      className="object-cover lg:rounded-xl w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  )}

                  {/* <Image
                    src={attachment.source || "/placeholder.svg"}
                    alt={`Shot image ${index + 1}`}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  /> */}
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 border border-dashed rounded-xl">
              <p className="text-muted-foreground">
                No images available for this shot
              </p>
            </div>
          )}
        </div>

        {/* Description - Rich text section */}
        <div className="px-4 md:px-0 mb-10">
          <h3 className="text-2xl font-bold mb-4 tracking-tight">
            About this shot
          </h3>
          <div className="prose prose-lg max-w-5xl">
            <p className="text-xl leading-relaxed break-words overflow-hidden">
              {shot.description}
            </p>
          </div>
        </div>

        {/* Tags - Bold styling */}
        {shot.tags && shot.tags.length > 0 && (
          <div className="px-4 md:px-0 mb-12">
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {shot.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="text-base px-4 py-2 font-semibold bg-primary hover:bg-primary/80 rounded-lg cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Image Lightbox Overlay */}
      {activeImageIndex !== null && hasAttachments && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full h-full max-w-[1200px] max-h-[90vh] mx-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {shotAttachments?.attachments?.map((attachment, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center ${
                  activeImageIndex === index
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="relative w-[90%] h-[80%] md:w-[80%] md:h-[80%] flex items-center justify-center">
                  {attachment.type === "video" ? (
                    <video
                      src={attachment.source || "/placeholder.svg"}
                      className="w-full h-full object-cover "
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <Image
                      src={attachment.source || "/placeholder.svg"}
                      alt={`Shot image ${index + 1}`}
                      width={1200}
                      height={0}
                      className="object-cover rounded-xl "
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Navigation Controls */}
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-5 py-2 rounded-full font-bold">
              {activeImageIndex + 1} / {shotAttachments?.attachments?.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
