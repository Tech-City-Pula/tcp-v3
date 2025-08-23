ALTER TABLE "events" RENAME COLUMN "id" TO "event_id";--> statement-breakpoint
ALTER TABLE "event_attendance" DROP CONSTRAINT "event_attendance_event_id_events_id_fk";
--> statement-breakpoint
DROP INDEX "unique_event_email_idx";--> statement-breakpoint
ALTER TABLE "event_attendance" ADD CONSTRAINT "event_attendance_event_id_events_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("event_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_attendance" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "event_attendance" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "event_attendance" ADD CONSTRAINT "event_attendance_event_id_email_unique" UNIQUE("event_id","email");