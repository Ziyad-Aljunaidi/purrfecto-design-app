"use server"
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { InsertNewsletterEmail, newsletter } from "@/db/schema/newsletter";
import { nanoid } from "nanoid";

export async function insertNewsletterEmail(email: string) {
  email = email.toLowerCase();

  try {
    const isEmailExists = await db
      .select()
      .from(newsletter)
      .where(eq(newsletter.email, email));

    if (isEmailExists.length > 0) {
      const response = {
        success: false,
        code: 409,
        message: "Email already exists",
      };
      return response;
    } else {
      const id = nanoid(8);
      const insertData: InsertNewsletterEmail = {
        id,
        email,
        createdAt: new Date(),
      };
      await db.insert(newsletter).values(insertData);
      const response = {
        success: true,
        code: 200,
        message: "Email inserted successfully",
        data: insertData,
      };
      return response;
    }
  } catch (error) {
    console.log(error);
    const response = {
      success: false,
      code: 500,
      message: "Something went wrong",
    };
    return response;
  }
}
