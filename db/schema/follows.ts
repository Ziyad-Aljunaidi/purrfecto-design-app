import { pgTable, text, timestamp, primaryKey, index } from 'drizzle-orm/pg-core';
import { user } from '@/db/schema/auth-schema'; // Import your existing users table

export const follows = pgTable('follows', {
  followerId: text('follower_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  followingId: text('following_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  // Composite primary key to prevent duplicate follows
  pk: primaryKey({ columns: [table.followerId, table.followingId] }),
  
  // Indexes for fast lookup in both directions
  followerIdx: index('follower_idx').on(table.followerId),
  followingIdx: index('following_idx').on(table.followingId),
}));

export type Follow = typeof follows.$inferSelect;
export type NewFollow = typeof follows.$inferInsert;