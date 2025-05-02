"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { shot, comments, likes, views, attachment } from "@/db/schema/shot";
import { ShotData } from "@/lib/types";
import { nanoid } from "nanoid";

export default async function submitShotAction(shotData: ShotData) {
  const shotId = nanoid();
  const commentsId = nanoid();
  const likesId = nanoid();
  const viewsId = nanoid();

  try {
    await db.insert(shot).values({
      id: shotId,
      creator_id: shotData.creatorId,
      slug: shotData.slug,
      title: shotData.title,
      description: shotData.description,
      thumbnail_url: shotData.thumbnailUrl,
      attachments_id: shotData.attachmentsId,
      comments_id: commentsId,
      likes_id: likesId,
      views_id: viewsId,
      tags: shotData.tags,
      is_published: shotData.isPublished,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await db.insert(attachment).values({
      id: shotData.attachmentsId,
      shot_id: shotId,
      attachments: shotData.attachments,
      createdAt: new Date(),
      updatedAt: new Date(),
      is_published: shotData.isPublished,
    });

    try {
      revalidatePath('/', 'page');
      console.log("Path revalidated successfully");
    } catch (revalidationError) {
      console.error("Error during path revalidation: ", revalidationError);
    }
    return { success: true };
  } catch (error) {
    console.error("Error submitting shot: ", error);
    return { success: false };
  }
};
