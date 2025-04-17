import { nanoid } from "nanoid";
import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
// import { PgArray } from "drizzle-orm/pg-core";

export const shots = pgTable("shots", {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  creator_id: text("creator_id").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnail_url: text("thumbnail_url").notNull(),
  attachments_id: text("attachments_id").notNull(),
  comments_id: text("comments_id").notNull(),
  reacts_id: text("reacts_id").notNull(),
  views_id: text("views_id").notNull(),
  tags:text("tags").array().notNull().default([]),
  is_published: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdateFn(() => new Date()),
});
