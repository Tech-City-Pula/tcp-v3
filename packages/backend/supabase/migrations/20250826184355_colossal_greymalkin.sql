ALTER TABLE "events" ALTER COLUMN "event_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "newsletter_subscriptions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "talks" ALTER COLUMN "talk_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "talks" ADD COLUMN "email" text NOT NULL;