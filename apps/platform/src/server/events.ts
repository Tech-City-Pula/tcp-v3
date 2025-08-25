import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import { z as z3 } from 'zod/v3';

export const listEvents = createServerFn({
  method: 'GET',
}).handler(async () => {
  const dbEvents = await db.select().from(schema.events);

  return dbEvents.map((event) => ({
    eventId: event.id,
    title: event.title,
    description: event.description,
    eventAt: event.eventAt.toISOString(),
    location: event.location,
  }));
});

// TODO: change to zod v4 when drizzle-orm fix gets merged
const getEventInputSchema = z3.object({
  eventId: z3.string().uuid(),
});

export const getEvent = createServerFn({
  method: 'POST',
})
  .validator(getEventInputSchema)
  .handler(async ({ data }) => {
    const dbEvent = await db.select().from(schema.events).where(eq(schema.events.id, data.eventId)).limit(1);

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
