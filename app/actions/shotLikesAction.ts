"use server";
import { eq, sql, and } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { likes} from "@/db/schema/shot";
import { getUserId } from "@/app/actions/UserAction";

export async function toggleShotLike({
  shotId,
  creatorId,
}: {
  shotId: string;
  creatorId: string;
}) {
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
    const isAlreadyLiked = await db
      .select()
      .from(likes)
      .where(and(eq(likes.shot_id, shotId), eq(likes.user_id, userId)));

    if (isAlreadyLiked.length > 0) {
      await db
        .delete(likes)
        .where(and(eq(likes.shot_id, shotId), eq(likes.user_id, userId)));
    } else {
      await db
        .insert(likes)
        .values({ shot_id: shotId, user_id: userId, creator_id: creatorId });
    }
    const response = { success: true, code: 200, message: "Success" };
    return response;
  } catch (error) {
    console.error("Error liking project shot: ", error);
    const response = {
      success: false,
      code: 500,
      message: "Could not Proccess Request",
    };
    return response;
  }
  // throw new Error("Not implemented yet");
}

export const getShotLikes = async (shotId: string) => {
  try {
    const [totalLikes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(likes)
      .where(eq(likes.shot_id, shotId));

    const response = {
      success: true,
      code: 200,
      message: "Success",
      totalLikes: totalLikes.count,
    };
    return response;

  } catch (error) {
    console.error("Error fetching project metrics: ", error);
    const response = {
      success: false,
      code: 500,
      message: "Failed to fetch project metrics",
      totalLikes: null,
    };
    return response;
  }
};

export async function isShotLiked({ shotId }: { shotId: string }) {
  const userId = await getUserId();
  if (!userId) {
    const response = {
      success: false,
      code: 401,
      message: "User not logged in",
    };
    return response;
  }
  if (!shotId) {
    const response = {
      success: false,
      code: 400,
      message: "Shot ID is required",
    };
    return response;
  }

  try {
    const isAlreadyLiked = await db
      .select()
      .from(likes)
      .where(and(eq(likes.shot_id, shotId), eq(likes.user_id, userId)));

    if (isAlreadyLiked.length > 0) {
      const response = { success: true, code: 200, message: "Shot is liked" };
      return response;
    } else {
      const response = {
        success: false,
        code: 200,
        message: "Shot is not liked",
      };
      return response;
    }
  } catch (error) {
    console.error("Error checking if project shot is liked: ", error);
    const response = {
      success: false,
      code: 500,
      message: "Could not check if shot is liked",
    };
    return response;
  }
}
