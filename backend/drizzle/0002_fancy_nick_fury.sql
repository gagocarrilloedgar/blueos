ALTER TABLE "projects" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "description" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "worked_hours" real;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "updated_at" timestamp (6) with time zone;