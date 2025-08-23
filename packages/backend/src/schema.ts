import { pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

export const newslatterSubscriptions = pgTable('newsletter_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const events = pgTable('events', {
  id: uuid('event_id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  eventAt: timestamp('event_at').notNull(),
  location: text('location').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const eventAttendance = pgTable(
  'event_attendance',
  {
    eventId: uuid('event_id')
      .references(() => events.id)
      .notNull(),
    email: text('email').notNull(),
  },
  (table) => [unique().on(table.eventId, table.email)]
);

export const talks = pgTable('talks', {
  talkId: uuid('talk_id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const schema = {
  newslatterSubscriptions,
  events,
  eventAttendance,
  talks,
};
