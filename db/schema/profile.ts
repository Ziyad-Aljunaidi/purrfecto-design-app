import { pgTable, text, timestamp, boolean, integer, jsonb} from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth-schema";

export const profile = pgTable("profile", {
  id: text('id').primaryKey(),
  userId: text("user_id")
  .notNull()
  .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull().unique(),
  displayUsername: text("display_username").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  instagram_link: text("instagram_link").default(""),
  twitter_link: text("twitter_link").default(""),
  github_link: text("github_link").default(""),
  dribbble_link: text("dribbble_link").default(""),
  behance_link: text("behance_link").default(""),
  pinterest_link: text("pinterest_link").default(""),
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
  featured_shot: text("featured_shot").default(""),
  badges: jsonb('badges').$type<Array<{ badge_name: string; icon: string }>>().default([]),
});

export type InsertProfile = typeof profile.$inferInsert;
export type SelectProfile = typeof profile.$inferSelect;