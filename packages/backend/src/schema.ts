import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Events table
export const events = pgTable('events', {
  eventId: uuid('event_id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  eventAt: timestamp('event_at', { withTimezone: true, mode: 'date' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});

// Event attendance table
export const eventAttendance = pgTable('event_attendance', {
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.eventId, { onDelete: 'cascade' }),
  email: text('email').notNull(),
});

// Newsletter subscriptions (existing)
export const newslatterSubscriptions = pgTable('newsletter_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
});

export const schema = {
  events,
  eventAttendance,
  newslatterSubscriptions,
};
