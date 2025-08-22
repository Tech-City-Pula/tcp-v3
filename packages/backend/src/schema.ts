import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const newslatterSubscriptions = pgTable('newsletter_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const schema = {
  newslatterSubscriptions,
};
export const talks = pgTable('talks', {
  talk_id: uuid('talk_id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Tipovi za TypeScript
export type Talk = typeof talks.$inferSelect;
export type NewTalk = typeof talks.$inferInsert;
