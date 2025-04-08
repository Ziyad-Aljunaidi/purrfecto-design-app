"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/do-spaces-config";
import { AcceptedFile } from "./types";

// testing UserId
import { userIdTest } from "./definitions";

export async function uploadThumbnail(file: AcceptedFile, shotSlug: string) {
  const bucketName = process.env.DO_SPACES_BUCKET_NAME!;
  const key = `${userIdTest}/${shotSlug}-${Date.now()}-thumbnail.${file.name.split(".").pop()}`; // Unique key for the file
  console.log("Buffer: ", file);
  if (file.type === "image/jpeg" || file.type === "image/png") {
    
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer); // Convert ArrayBuffer to Buffer
    
    try {
      // Use the file directly as the Body
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer, // Use the ArrayBuffer as the body
        ContentType: file.type, // Set the content type
        ACL: "public-read", // Optional: Make the file publicly accessible
      });

      // Disable body signing to avoid hash calculation issues
      // (command as any).disableBodySigning = true;

      await s3Client.send(command);

      // Return the public URL of the uploaded file
      return `${process.env.DO_SPACES_CDN_URL}/${key}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      // throw new Error("Failed to upload file.");
    }
  }
}
