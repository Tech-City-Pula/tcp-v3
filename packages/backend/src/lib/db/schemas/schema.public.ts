import { randomUUID } from 'node:crypto';
import { pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

export const newsletterSubscriptions = pgTable('newsletter_subscriptions', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}).enableRLS();

export const events = pgTable('events', {
  id: uuid('event_id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  eventAt: timestamp('event_at').notNull(),
  location: text('location').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}).enableRLS();

export const eventAttendance = pgTable(
  'event_attendance',
  {
    eventId: uuid('event_id')
      .references(() => events.id)
      .notNull(),
    email: text('email').notNull(),
  },
  (table) => [unique().on(table.eventId, table.email)]
).enableRLS();

export const talks = pgTable('talks', {
  talkId: uuid('talk_id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  email: text('email').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}).enableRLS();

export const publicSchema = {
  newsletterSubscriptions,
  events,
  eventAttendance,
  talks,
};
