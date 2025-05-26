"use server";
import { follows } from "@/db/schema/follows";
import { getUserId } from "./UserAction";
import { eq, sql, and,} from "drizzle-orm";
import { db } from "@/db/drizzle";
import { revalidatePath } from "next/cache";

export async function isFollowing(followingId: string) {
  const userId = await getUserId();
  if (!userId) {
    const response = {
      success: false,
      code: 403,
      follow: null,
      message: "user not logged in",
    };
    return response;
  }

  try {
    const result = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.followerId, userId),
          eq(follows.followingId, followingId)
        )
      )
      .limit(1);

    if (
      result.length > 0 &&
      result[0].followerId === userId &&
      result[0].followingId === followingId
    ) {
      const response = {
        success: true,
        code: 200,
        follow: true,
        message: "user is following",
      };
      return response;
    } else {
      const response = {
        success: true,
        code: 200,
        follow: false,
        message: "user is not following",
      };
      return response;
    }
  } catch (error) {
    console.error(error);
    const response = {
      success: false,
      code: 500,
      follow: null,
      message: "internal server error",
    };
    return response;
  }
}

export async function toggleFollow(followingId: string) {
  const userId = await getUserId();
  if (!userId) {
    const response = {
      success: true,
      code: 403,
      follow: null,
      message: "user not logged in",
    };
    return response;
  }

  try {
    const isAlreadyFollowing = await isFollowing(followingId);
    if (isAlreadyFollowing.success && isAlreadyFollowing.follow === true) {
      await db
        .delete(follows)
        .where(
          and(
            eq(follows.followerId, userId),
            eq(follows.followingId, followingId)
          )
        );

      const response = {
        success: true,
        code: 200,
        follow: false,
        message: "user unfollowed successfully",
      };
      revalidatePath(`/profile/${followingId}`)
      return response;
    } else if (
      isAlreadyFollowing.success &&
      isAlreadyFollowing.follow === false
    ) {
      await db.insert(follows).values({
        followerId: userId,
        followingId,
      });
      const response = {
        success: true,
        code: 200,
        follow: true,
        message: "user followed successfully",
      };
      revalidatePath(`/profile/${followingId}`)
      return response;
    }
  } catch (error) {
    console.error(error);
    const response = {
      success: false,
      code: 500,
      follow: null,
      message: "internal server error",
    };
    return response;
  }
}

// export async function followUser(followingId: string) {
//   //current User Id
//   const userId = await getUserId();
//   if (!userId) {
//     const response = {
//       success: false,
//       code: 403,
//       message: "user not logged in",
//     };
//     return response;
//   }

//   try {
//     const existing = await db
//       .select()
//       .from(follows)
//       .where(
//         and(
//           eq(follows.followerId, userId),
//           eq(follows.followingId, followingId)
//         )
//       )
//       .limit(1);

//     if (existing.length > 0) {
//       const response = {
//         success: false,
//         code: 409,
//         follow: true,
//         message: "already following mate",
//       };
//       return response;
//     }

//     await db.insert(follows).values({
//       followerId: userId,
//       followingId,
//     });

//     const response = {
//       success: true,
//       code: 200,
//       follow: true,
//       message: "user followed",
//     };
//     return response;
//   } catch (error) {
//     console.error(error);
//     const response = {
//       success: false,
//       code: 500,
//       message: "internal server error",
//     };
//     return response;
//   }
// }

// export async function unfollowUser(followingId: string) {
//   const userId = await getUserId();
//   const userData = await getUserData();
//   if (!userId) {
//     const response = {
//       success: false,
//       code: 403,
//       message: "user not logged in",
//     };
//     return response;
//   }
//   console.log(userId);
//   console.log(userData);
//   console.log(followingId);
//   const isAlreadyFollowing = isFollowing(followingId);
//   if (!isAlreadyFollowing) {
//     const response = {
//       success: false,
//       code: 409,
//       follow: false,
//       message: "not following",
//     };
//     return response;
//   }
//   try {
//     await db
//       .delete(follows)
//       .where(
//         and(
//           eq(follows.followerId, userId),
//           eq(follows.followingId, followingId)
//         )
//       );

//     const response = {
//       success: true,
//       code: 200,
//       follow: false,
//       message: "user unfollowed mate",
//     };
//     return response;
//   } catch (error) {
//     console.error(error);
//     const response = {
//       success: false,
//       code: 500,

//       message: "internal server error",
//     };
//     return response;
//   }
// }

export async function getFollowings(userId: string) {
  return await db.select().from(follows).where(eq(follows.followerId, userId));
}

export async function getFollowers(userId: string) {
  return await db.select().from(follows).where(eq(follows.followingId, userId));
}

export async function getFollowStats(userId: string) {
  const [followersResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(follows)
    .where(eq(follows.followingId, userId));

  const [followingsResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(follows)
    .where(eq(follows.followerId, userId));

  return {
    followers: Number(followersResult.count),
    followings: Number(followingsResult.count),
  };
}
