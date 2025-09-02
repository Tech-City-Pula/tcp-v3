CREATE TABLE "members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"membership_type" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "members" ENABLE ROW LEVEL SECURITY;