"use server";
import { desc,eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { shot } from "@/db/schema/shot";

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