"use client";

import { useEffect, useState } from "react";
import { getShotAttachment } from "@/app/actions/GetProjectShotsAction";
import Image from "next/image";
import ShotAttachmentLoading from "../skeletons/shot-attachments-loading";
import { Attachment } from "@/lib/definitions";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ShotAttachment({
  attachmentId,
}: {
  attachmentId: string;
}) {
  const [attachments, setAttachments] = useState<Attachment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  useEffect(() => {
    async function fetchAttachments() {
      try {
        setLoading(true);
        const data = await getShotAttachment(attachmentId);
        if (data) {
          setAttachments(data);
        }
      } catch (err) {
        setError("Failed to load attachments");
        console.error("Error fetching attachments: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAttachments();
  }, [attachmentId]);

  // Check if we have valid attachments
  const hasAttachments =
    attachments &&
    attachments[0].attachments &&
    attachments[0].attachments.length > 0;

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
  }, [activeImageIndex, hasAttachments]);

  const navigateImage = (direction: "prev" | "next") => {
    if (activeImageIndex === null || !hasAttachments) return;

    const attachmentsLength = attachments[0]?.attachments?.length;

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

  if (loading) return <ShotAttachmentLoading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      {!!attachments &&
        attachments.flatMap(
          (attachment) =>
            attachment.attachments?.map((source, index) => {
              if (source.type === "image") {
                return (
                  <div
                    key={source.source}
                    className="w-full overflow-hidden py-2 mx-auto"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={source.source || "/placeholder.svg"}
                      alt={source.type || "Image"}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover "
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              } else if (source.type === "video") {
                return (
                  <div
                    key={source.source}
                    className="relative  w-full"
                    onClick={() => openLightbox(index)}
                  >
                    <video
                      src={source.source || "/placeholder.svg"}
                      className="w-full h-full object-cover max"
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                );
              } else {
                return null; // for non-image/video types
              }
            }) || [] // fallback if attachment.attachments is undefined
        )}

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
            {attachments[0]?.attachments?.map((attachment, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center ${
                  activeImageIndex === index
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="relative w-full max-w-[100vw] h-auto max-h-[100vh] flex items-center justify-center overflow-hidden">
                  {attachment.type === "video" ? (
                    <video
                      src={attachment.source || "/placeholder.svg"}
                      className="w-full h-auto max-h-[80vh] object-contain"
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
                      className="w-full h-auto max-h-[90vh] object-contain"
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
              {activeImageIndex + 1} / {attachments[0]?.attachments?.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
