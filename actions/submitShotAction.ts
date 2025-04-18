"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { shots } from "@/db/schema/shots";
import { attachments } from "@/db/schema/attachments";
import { AcceptedFile, ShotData } from "@/lib/types";
import { nanoid } from "nanoid";

export const submitShotAction = async (
  shotData: ShotData,
  // thumbnail: AcceptedFile
) => {
  const shotId = nanoid();
  // const attachmentsId = nanoid();
  const commentsId = nanoid();
  const reactsId = nanoid();
  const viewsId = nanoid();
  const creatorId = nanoid();

  try {
    // const thumbnail_url = await uploadThumbnail(
    //   thumbnail,
    //   shotData.slug,
    //   creatorId,
    //   attachmentsId
    // );
    // if (thumbnail_url) {
      await db.insert(shots).values({
        id: shotId,
        creator_id: creatorId,
        slug: shotData.slug,
        title: shotData.title,
        description: shotData.description,
        thumbnail_url: shotData.thumbnailUrl,
        attachments_id: shotData.attachmentsId,
        comments_id: commentsId,
        reacts_id: reactsId,
        views_id: viewsId,
        tags: shotData.tags,
        is_published: shotData.isPublished,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await db.insert(attachments).values({
        id: shotData.attachmentsId,
        shot_id: shotId,
        attachments: shotData.attachments,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_published: shotData.isPublished,
      });
    // }
    return {"success": true};
  } catch (error) {
    console.error("Error submitting shot: ", error);
  }
  
  // try {

  //   console.log("Attachments submitted successfully: ", shotData.attachmentsId);
  //   return {"success": true};
  // }catch (error) {
  //   console.error("Error submitting attachments: ", error);
  // }
  revalidatePath("/");
};
