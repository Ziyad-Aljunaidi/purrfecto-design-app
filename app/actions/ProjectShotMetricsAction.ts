"use server";
import { eq,and } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { likes, savedShots } from "@/db/schema/shot";

export async function toggleShotLike({shotId, userId, creatorId}: { shotId: string; userId: string | null, creatorId: string }) {
  if(userId === null) {
    return { success: false, error: "User not logged in" };
  }
  try {
    const isAlreadyLiked = await db
      .select()
      .from(likes)
      .where( and (eq(likes.shot_id, shotId), eq(likes.user_id, userId)))

    if (isAlreadyLiked.length > 0) {
      await db.delete(likes).where(and (eq(likes.shot_id, shotId), eq(likes.user_id, userId)));
    } else {
      await db.insert(likes).values({ shot_id: shotId, user_id: userId, creator_id: creatorId });
    }
    return { success: true };
  } catch (error) {
    console.error("Error liking project shot: ", error);
    return { success: false, error: "Failed to like project shot" };
  }
  // throw new Error("Not implemented yet");
}

export async function isShotLiked({shotId, userId}: { shotId: string; userId: string | null; }) {
  if(userId === null) {
    return false;
  }

  try {
    const isAlreadyLiked = await db
      .select()
      .from(likes)
      .where( and (eq(likes.shot_id, shotId), eq(likes.user_id, userId)))

    if (isAlreadyLiked.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking if project shot is liked: ", error);
    return false;
  }
}

export async function toggleShotSave({shotId, userId, creatorId}: { shotId: string; userId: string | null, creatorId: string }) {
  if(userId === null) {
    return { success: false, error: "User not logged in" };
  }
  try {
    const isAlreadySaved = await db
      .select()
      .from(savedShots)
      .where( and (eq(savedShots.shot_id, shotId), eq(savedShots.user_id, userId)))

    if (isAlreadySaved.length > 0) {
      await db.delete(savedShots).where(and (eq(savedShots.shot_id, shotId), eq(savedShots.user_id, userId)));
    } else {
      await db.insert(savedShots).values({ shot_id: shotId, user_id: userId, creator_id: creatorId });
    }
    return { success: true };
  } catch (error) {
    console.error("Error Saving project shot: ", error);
    return { success: false, error: "Failed to Save project shot" };
  }
}
export async function isShotSaved({shotId, userId}: { shotId: string; userId: string | null; }) {
  if(userId === null) {
    return false;
  }

  try {
    const isAlreadySaved = await db
      .select()
      .from(savedShots)
      .where( and (eq(savedShots.shot_id, shotId), eq(savedShots.user_id, userId)))

    if (isAlreadySaved.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking if project shot is liked: ", error);
    return false;
  }
}