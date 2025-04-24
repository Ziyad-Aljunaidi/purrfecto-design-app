import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema";

export const profile = pgTable("profile", {
  id: text('id').primaryKey(),
  userId: text("user_id")
  .notNull()
  .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull().unique(),
  displayUsername: text("display_username").unique(),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  links: text("links").array().default([]),
  bio: text("bio").default(""),
  avatar_url: text("avatar_url").array().notNull(),
  banner_url: text("banner_url").default(""),
  location: jsonb("location").$type<{ country: string, city: string }>().default({ country: "Purrthia", city: "Meowpolis" }),
  website: text("website").default(""),
  is_verified: boolean("is_verified").default(false),
  total_shots: integer("total_shots").default(0),
  total_followers: integer("total_followers").default(0),
  total_following: integer("total_following").default(0),
  total_likes: integer("total_likes").default(0),
  total_views: integer("total_views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});