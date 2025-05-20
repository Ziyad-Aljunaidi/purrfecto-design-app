"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq} from "drizzle-orm";
import { db } from "@/db/drizzle";
import { profile } from "@/db/schema/profile";

export async function getUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return session.session.userId;
}

export async function getUserData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return session.user;
}

export async function getUserPublicDataById(userId: string) {
  try {
    const data = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, userId));
    if (data.length > 0) {
      const response = {
        success: true,
        data: data[0],
        code: 200,
        message: "Profile data fetched successfully",
      };
      return response;
    } else {
      const response = {
        success: false,
        data: null,
        code: 404,
        message: "Profile data not found",
      };
      return response;
    }
  } catch (error) {
    console.log(error);
    const response = {
      success: false,
      data: null,
      code: 500,
      message: "Internal server error",
    };
    return response;
  }
}
