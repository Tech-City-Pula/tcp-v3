export type EventRow = z.infer<typeof eventRow>;

import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from './db.js';
import { eventAttendance, events } from './schema.js';

// Zod schemas for validation
export const eventRow = z.object({
  eventId: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  eventAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const attendanceRow = z.object({
  eventId: z.string().uuid(),
  email: z.string().email(),
});

// Map DB event row to Zod-expected shape (string UUIDs, ISO date strings)
function mapDbEventRow(row: any) {
  return {
    eventId: typeof row.eventId === 'string' ? row.eventId : String(row.eventId),
    title: row.title,
    description: row.description,
    location: row.location,
    eventAt: row.eventAt instanceof Date ? row.eventAt.toISOString() : String(row.eventAt),
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : String(row.updatedAt),
  };
}

// Fetch all events
export async function getAllEvents() {
  const rows = await db.select().from(events);
  return rows.map((row: any) => eventRow.parse(mapDbEventRow(row)));
}

// Fetch single event by ID
export async function getEventById(eventId: string) {
  const [row] = await db.select().from(events).where(eq(events.eventId, eventId));
  if (!row) {
    return null;
  }
  return eventRow.parse(mapDbEventRow(row));
}

// Add attendance
export async function addEventAttendance(eventId: string, email: string) {
  const attendance = attendanceRow.parse({ eventId, email });
  await db.insert(eventAttendance).values(attendance);
  return attendance;
}

// Get attendance for an event (optional)
export async function getEventAttendance(eventId: string) {
  const rows = await db.select().from(eventAttendance).where(eq(eventAttendance.eventId, eventId));
  return rows.map((attendanceRowData: unknown) => attendanceRow.parse(attendanceRowData));
}
