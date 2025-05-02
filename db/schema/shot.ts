import { nanoid } from "nanoid";
import { pgTable, integer, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
// import { PgArray } from "drizzle-orm/pg-core";

export const shot = pgTable("shot", {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  creator_id: text("creator_id").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnail_url: text("thumbnail_url").notNull(),
  attachments_id: text("attachments_id").notNull(),
  comments_id: text("comments_id").notNull(),
  likes_id: text("likes_id").notNull(),
  views_id: text("views_id").notNull(),
  tags:text("tags").array().notNull().default([]),
  is_published: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdateFn(() => new Date()),
});

export const attachment = pgTable("attachment", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  shot_id: text("shot_id").notNull().references(() => shot.id, { onDelete: "cascade" }),
  // attachments: text("attachments").array().notNull().default([]),
  attachments: jsonb('attachments').$type<{ type: string, source: string }[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdateFn(() => new Date()),
  is_published: boolean("is_published").default(false),
});

export const comments = pgTable("comments", {
  id: text("id").primaryKey().$defaultFn((): string => nanoid()).notNull(),
  shot_id: text("shot_id").notNull().references(() => shot.id, { onDelete: "cascade" }),
  author_id: text("creator_id").notNull(),
  content: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdateFn(() => new Date()),
});

export const likes = pgTable("likes", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  shot_id: text("shot_id").notNull().references(() => shot.id, { onDelete: "cascade" }),
  user_id: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const views = pgTable("views", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  shot_id: text("shot_id").notNull().references(() => shot.id, { onDelete: "cascade" }),
  totalViews: integer("total_views").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});





