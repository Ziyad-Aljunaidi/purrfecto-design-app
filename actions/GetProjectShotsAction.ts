"use server";
import { desc,eq, count, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { shot, likes, views, comments, attachment } from "@/db/schema/shot";
import { profile } from "@/db/schema/profile";


export const getLatestShots = async () => {
  try {
    const projectShots = await db
      .select()
      .from(shot)
      // .where(eq(shots.project_id, projectId))
      .orderBy(desc(shot.createdAt));
    return projectShots;
  } catch (error) {
    console.error("Error fetching project shots: ", error);
    throw new Error("Failed to fetch project shots");
  }
}

export const getProjectMetrics = async (shotId: string) => {
  try {
    const [totalLikes] = await db
    .select({ count: sql<number>`count(*)` })
    .from(likes)
    .where(eq(likes.shot_id, shotId));

    const [totalViews] = await db
    .select({ count: sql<number>`count(*)` })
    .from(views)
    .where(eq(views.shot_id, shotId));

    const [totalComments] = await db
    .select({ count: sql<number>`count(*)` })
    .from(comments)
    .where(eq(comments.shot_id, shotId));
    return { totalLikes: totalLikes.count, totalViews: totalViews.count, totalComments: totalComments.count };

    // return totalLikes.count;
  }catch (error) {
    console.error("Error fetching project metrics: ", error);
    throw new Error("Failed to fetch project metrics");
  }
}

export const getShotCreator = async (creatorId: string) => {
  try {
    const [creator] = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, creatorId));
    return creator;
  } catch (error) {
    console.error("Error fetching project metrics: ", error);
    throw new Error("Failed to fetch project metrics");
  }
}

export const getShotAttachment = async (shotId: string) => {
  try {
    const [attachments] = await db
      .select()
      .from(attachment)
      .where(eq(shot.id, shotId));
    return attachments;
    } catch (error) {
      console.error("Error fetching project attachments: ", error);
      throw new Error("Error fetching project attachments:");
    }

}