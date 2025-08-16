export type { EventRow } from '../../../../packages/backend/src/events.js';

import { createServerFn } from '@tanstack/start';
import { z } from 'zod';
// For local development, use a relative path to the backend package
// When using package exports, switch to: import { getAllEvents, getEventById, addEventAttendance } from '@repo/backend';
import { addEventAttendance, getAllEvents, getEventById } from '../../../../packages/backend/src/events.js';

// List all events
export const listEvents = createServerFn({ method: 'GET' }).handler(async () => {
  return await getAllEvents();
});

// Get a single event by ID
export const getEvent = createServerFn({ method: 'GET' })
  .validator(z.object({ eventId: z.string().uuid() }))
  .handler(async ({ data }) => {
    return await getEventById(data.eventId);
  });

// Add attendance to an event
export const attendEvent = createServerFn({ method: 'POST' })
  .validator(z.object({ eventId: z.string().uuid(), email: z.string().email() }))
  .handler(async ({ data }) => {
    return await addEventAttendance(data.eventId, data.email);
  });
