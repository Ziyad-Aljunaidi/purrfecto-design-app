import { pgTable, text, timestamp} from "drizzle-orm/pg-core";

export const newsletter = pgTable("newsletter", {
  id: text('id').primaryKey(),
  email: text("email").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertNewsletterEmail = typeof newsletter.$inferInsert;
export type SelectNewsletterEmail = typeof newsletter.$inferSelect;
