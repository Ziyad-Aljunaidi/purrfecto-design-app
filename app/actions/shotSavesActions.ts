"use server";
import { eq,and } from "drizzle-orm";
import { db } from "@/db/drizzle";
import {savedShots } from "@/db/schema/shot";
import { getUserId } from "./UserAction";

export async function toggleShotSave({shotId, creatorId}: { shotId: string;  creatorId: string }) {
  const userId = await getUserId();
  if (!userId) {
    const response = {
      success: false,
      code: 401,
      message: "User not logged in",
    };
    return response;
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
        const response = {
      success: true,
      code: 200,
      message: "Save Operation was successful",
    };
    return response;
  } catch (error) {
    console.error("Error Saving project shot: ", error);
        const response = {
      success: false,
      code: 500,
      message: "Failed to save project shot",
    };
    return response;
  }
}
export async function isShotSaved({shotId}: { shotId: string;}) {
  const userId = await getUserId();
  if (!userId) {
    const response = {
      success: false,
      code: 401,
      message: "User not logged in",
    };
    return response;
  }
  try {
    const isAlreadySaved = await db
      .select()
      .from(savedShots)
      .where( and (eq(savedShots.shot_id, shotId), eq(savedShots.user_id, userId)))

    if (isAlreadySaved.length > 0) {
          const response = {
      success: true,
      code: 200,
      message: "Success",
    };
    return response;
    } else {
                const response = {
      success: true,
      code: 200,
      message: "Success",
    };
    return response;
    }
  } catch (error) {
    console.error("Error checking if project shot is liked: ", error);
              const response = {
      success: false,
      code: 400,
      message: "Failed to check if project shot is liked",
    };
    return response;
  }
}