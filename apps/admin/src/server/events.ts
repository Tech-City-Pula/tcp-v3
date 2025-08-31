import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createServerFn } from '@tanstack/react-start';
import { createEventEndpointSchema } from '@/lib/validation/events';

export const createEvent = createServerFn({
  method: 'POST',
})
  .validator(createEventEndpointSchema)
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
