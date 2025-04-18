"use server";
import { PutObjectCommand} from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/do-spaces-config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadSignedUrl(
  shotSlug: string,
  userId: string,
  shotRandomShortId: string,
  attachmentsId: string,
  fileType: string,
  isThumbnail: boolean,
  isVideo: boolean
) {
  const FileKey = `${userId}/${attachmentsId}/${shotRandomShortId}-${shotSlug}${
    isThumbnail ? "-thumbnail" : ""
  }.${fileType}`; // Unique key for the file
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_DO_SPACES_BUCKET_NAME!,
      Key: FileKey,
      // ACL: "public-read",
      // ContentType: isVideo ? "video/mp4" : "image/jpeg",
    });
    console.log('isVideo: ', isVideo);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 100 });
    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw new Error("Failed to generate signed URL.");
  }
}
