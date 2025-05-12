"use client";

import { useEffect, useState } from "react";
import { getShotAttachment } from "@/actions/GetProjectShotsAction";
import Image from "next/image";
import ShotAttachmentLoading from "../skeletons/shot-attachments-loading";
import { Attachment } from "@/lib/definitions";


export default function ShotAttachment({
  attachmentId,
}: {
  attachmentId: string;
}) {
  const [attachments, setAttachments] = useState<Attachment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <ShotAttachmentLoading />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {!!attachments &&
        attachments.flatMap(
          (attachment) =>
            attachment.attachments?.map((source) => {
              if (source.type === "image") {
                return (
                  <div
                    key={source.source}
                    className="w-full rounded-lg overflow-hidden lg:max-w-[50vw] py-4 mx-auto"
                  >
                    <Image
                      src={source.source || "/placeholder.svg"}
                      alt={source.type || "Image"}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                );
              } else if (source.type === "video") {
                return (
                  <div
                    key={source.source}
                    className="w-full rounded-lg overflow-hidden max-w-3xl py-4 mx-auto"
                  >
                    <video
                      src={source.source || "/placeholder.svg"}
                      className="h-full w-full object-cover rounded-lg"
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
    </div>
  );
}
