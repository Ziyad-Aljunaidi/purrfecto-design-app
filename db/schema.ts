import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  serial,
  jsonb,
  primaryKey,
  
} from 'drizzle-orm/pg-core';

//
// USERS
//
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

//
// PROFILES
//
export const profiles = pgTable('profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  displayName: text('display_name'),
  bio: text('bio'),
  location: text('location'),
  website: text('website'),
  avatarUrl: text('avatar_url'),
  bannerUrl: text('banner_url'),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

//
// SHOTS
//
export const shots = pgTable('shots', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  thumbnailUrl: text('thumbnail_url').notNull(),
  // media:[text('media_url').notNull()],
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

//
// ATTACHMENTS
//
export const attachments = pgTable('attachments', {
  id: uuid('id').defaultRandom().primaryKey(),
  shotId: uuid('shot_id').notNull().references(() => shots.id, { onDelete: 'cascade' }),
  fileUrl: text('file_url').notNull(),
  fileType: text('file_type').$type<'image' | 'video' | 'file'>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

//
// TAGS
//
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  taged: integer('taged').default(0),
});

//
// SHOT_TAGS
//
export const shotTags = pgTable('shot_tags', {
  shotId: uuid('shot_id').notNull().references(() => shots.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.shotId, table.tagId] }),
}));

//
// LIKES
//
export const likes = pgTable('likes', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  shotId: uuid('shot_id').notNull().references(() => shots.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.shotId] }),
}));

//
// COMMENTS
//
export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  shotId: uuid('shot_id').notNull().references(() => shots.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

//
// FOLLOWS
//
export const follows = pgTable('follows', {
  followerId: uuid('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followedId: uuid('followed_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  pk: primaryKey({ columns: [table.followerId, table.followedId] }),
}));

//
// NOTIFICATIONS
//
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  data: jsonb('data'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});
