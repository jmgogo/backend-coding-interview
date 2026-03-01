CREATE TABLE "photographers" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"profile_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "photos" (
	"id" integer PRIMARY KEY NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"url" text NOT NULL,
	"photographer_id" integer NOT NULL,
	"avg_color" varchar(7) NOT NULL,
	"alt" text,
	"src_original" text NOT NULL,
	"src_large2x" text NOT NULL,
	"src_large" text NOT NULL,
	"src_medium" text NOT NULL,
	"src_small" text NOT NULL,
	"src_portrait" text NOT NULL,
	"src_landscape" text NOT NULL,
	"src_tiny" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "photos" ADD CONSTRAINT "photos_photographer_id_photographers_id_fk" FOREIGN KEY ("photographer_id") REFERENCES "public"."photographers"("id") ON DELETE no action ON UPDATE no action;