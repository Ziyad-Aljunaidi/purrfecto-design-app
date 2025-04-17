"use server";
import { PutObjectCommand} from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/do-spaces-config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { AcceptedFile } from "./types";

export async function uploadSignedUrl(
  shotSlug: string,
  userId: string,
  attachmentsId: string,
  fileType: string,
  isThumbnail: boolean,
  isVideo: boolean
) {
  const FileKey = `${userId}/${attachmentsId}-${shotSlug}${
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

// export async function uploadThumbnail(file: AcceptedFile, shotSlug: string,userId: string, attachmentsId: string) {
//   const bucketName = process.env.NEXT_PUBLIC_DO_SPACES_BUCKET_NAME!;
//   const key = `${userId}/${attachmentsId}-${shotSlug}-thumbnail.${file.name.split(".").pop()}`; // Unique key for the file
//   console.log("Buffer: ", file);
//   if (file.type === "image/jpeg" || file.type === "image/png") {

//     const fileBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(fileBuffer); // Convert ArrayBuffer to Buffer

//     try {
//       // Use the file directly as the Body
//       const command = new PutObjectCommand({
//         Bucket: bucketName,
//         Key: key,
//         Body: buffer, // Use the ArrayBuffer as the body
//         ContentType: file.type, // Set the content type
//         ACL: "public-read", // Optional: Make the file publicly accessible
//       });

//       // Disable body signing to avoid hash calculation issues
//       // (command as any).disableBodySigning = true;

//       await s3Client.send(command);

//       // Return the public URL of the uploaded file
//       return `${process.env.DO_SPACES_CDN_URL}/${key}`;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       // throw new Error("Failed to upload file.");
//     }
//   }
// }
