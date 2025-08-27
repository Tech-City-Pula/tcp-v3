import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  eventAt: z.string(),
  location: z.string(),
});

export const createEvent = createServerFn({
  method: 'POST',
})
  .validator(createEventSchema)
  .handler(async ({ data }) => {
    const eventAtDate = new Date(data.eventAt);

    await db.insert(schema.events).values({
      title: data.title,
      description: data.description,
      eventAt: eventAtDate,
      location: data.location,
    });

    return { success: true };
  });
