import { db } from '@repo/backend/db';
import { schema } from '@repo/backend/schema';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

const attendEventSchema = z.object({
  email: z.email(),
  eventId: z.uuidv4(),
});

export const attendEvent = createServerFn({
  method: 'POST',
})
  .validator(attendEventSchema)
  .handler(async ({ data }) => {
    try {
      const { email, eventId } = data;

      // Check if event exists
      const event = await db.select().from(schema.events).where(eq(schema.events.id, eventId)).limit(1);
      if (event.length === 0) {
        throw new Error('Event not found');
      }

      // Check if user is already registered
      const existingAttendance = await db
        .select()
        .from(schema.eventAttendance)
        .where(and(eq(schema.eventAttendance.eventId, eventId), eq(schema.eventAttendance.email, email)))
        .limit(1);

      if (existingAttendance.length > 0) {
        throw new Error('You are already registered for this event');
      }

      // Register user for event
      await db.insert(schema.eventAttendance).values({
        eventId,
        email,
      });

      return { success: true, message: 'Successfully registered for event' };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to register for event');
    }
  });
