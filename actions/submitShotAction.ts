"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { shots } from "@/db/schema";
import { ShotData } from "@/lib/types";
// import { v4 as uuidv4 } from "uuid";



// export const shots = pgTable('shots', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
//   title: text('title').notNull(),
//   description: text('description'),
//   thumbnailUrl: text('image_url').notNull(),
//   views: integer('views').default(0),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// });

// export const addTodo = async (id: number, text: string) => {
//   await db.insert(todo).values({
//     id: id,
//     text: text,
//   });
// };
export const submitShotAction = async (shotData: ShotData) => {
  try{
    await db.insert(shots).values({
      id: shotData.id,
      userId: shotData.userId,
      // slug: shotData.slug,
      title: shotData.title,
      description: shotData.description,
      thumbnailUrl: shotData.thumbnailUrl,
      views: 0,
      
    });
  }catch (error) {
    console.error("Error submitting shot: ", error);
  }
  revalidatePath("/");
}
