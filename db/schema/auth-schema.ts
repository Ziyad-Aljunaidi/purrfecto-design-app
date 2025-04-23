import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const profile = pgTable("profile", {
  id: text('id').primaryKey(),
  userId: text("user_id")
  .notNull()
  .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull().default(""),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
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