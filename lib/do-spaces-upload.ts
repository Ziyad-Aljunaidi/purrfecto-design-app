import { AcceptedFile } from "./types";
import { uploadSignedUrl } from "./do-spaces-operations";
import { nanoid } from "nanoid";


export const uploadToSpaces = async (
  file: AcceptedFile,
  shotSlug: string,
  isThumbnail: boolean = false,
  userId: string,
  attachmentsId: string
) => {
  // const userId = nanoid();
  const shotRandomShortId = nanoid(8);

  const fileType = file.name.split(".").pop() || "png";
  try {
    const url = await uploadSignedUrl(
      shotSlug,
      userId,
      shotRandomShortId,
      attachmentsId,
      fileType,
      isThumbnail,
      file.type === "video/mp4"
    );
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "x-amz-acl": "public-read",
      },
      body: file,
    });
    console.log(url);
    const fileUrl = `${
      process.env.NEXT_PUBLIC_DO_SPACES_CDN_URL
    }/${userId}/${attachmentsId}/${shotRandomShortId}-${shotSlug}${
      isThumbnail ? "-thumbnail" : ""
    }.${fileType}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to Spaces:", error);
    throw new Error("Failed to upload file to Spaces.");
  }
};
