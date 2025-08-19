import { db } from '@repo/backend/db';
import { events } from '@repo/backend/events-schema';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';

export interface EventRow {
  eventId: string;
  title: string;
  description: string;
  eventAt: string;
  location: string;
}

export const listEvents = createServerFn({
  method: 'GET',
}).handler(async () => {
  const dbEvents = await db.select().from(events);

  return dbEvents.map((event) => ({
    eventId: event.id,
    title: event.title,
    description: event.description,
    eventAt: event.eventAt.toISOString(),
    location: event.location,
  }));
});

export const getEvent = createServerFn({
  method: 'POST',
})
  .validator((data: unknown) => data as { eventId: string })
  .handler(async ({ data }) => {
    const dbEvent = await db.select().from(events).where(eq(events.id, data.eventId)).limit(1);

    if (dbEvent.length === 0) {
      return null;
    }

    const event = dbEvent[0];
    return {
      eventId: event.id,
      title: event.title,
      description: event.description,
      eventAt: event.eventAt.toISOString(),
      location: event.location,
    };
  });
