import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const attachments = pgTable("attachments", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  shot_id: text("shot_id").notNull(),
  attachments: text("attachments").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdateFn(() => new Date()),
  is_published: text("is_published").default("false"),
});