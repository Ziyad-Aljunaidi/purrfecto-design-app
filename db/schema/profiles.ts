import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: text('id').primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  links: text("links").array().notNull().default([]),
  bio: text("bio").default(""),
  avatar_url: text("avatar_url").notNull(),
  banner_url: text("banner_url").default(""),
  location: text("location"),
  website: text("website").default(""),
  is_verified: boolean("is_verified").default(false),
  total_shots: integer("total_shots").default(0),
  total_followers: integer("total_followers").default(0),
  total_following: integer("total_following").default(0),
  total_likes: integer("total_likes").default(0),
  total_views: integer("total_views").default(0),
});
