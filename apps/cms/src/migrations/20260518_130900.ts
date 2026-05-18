import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_video_gallery_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_video_gallery_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum_pages_blocks_video_gallery_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_video_gallery_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TABLE "pages_blocks_video_gallery_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"duration" varchar
  );
  
  CREATE TABLE "pages_blocks_video_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Videos',
  	"section_intro" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum_pages_blocks_video_gallery_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum_pages_blocks_video_gallery_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum_pages_blocks_video_gallery_advanced_width" DEFAULT 'wide',
  	"advanced_card_style" "enum_pages_blocks_video_gallery_advanced_card_style" DEFAULT 'raised',
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_gallery_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"duration" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Videos',
  	"section_intro" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum__pages_v_blocks_video_gallery_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum__pages_v_blocks_video_gallery_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum__pages_v_blocks_video_gallery_advanced_width" DEFAULT 'wide',
  	"advanced_card_style" "enum__pages_v_blocks_video_gallery_advanced_card_style" DEFAULT 'raised',
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_video_gallery_videos" ADD CONSTRAINT "pages_blocks_video_gallery_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_gallery_videos" ADD CONSTRAINT "pages_blocks_video_gallery_videos_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_gallery_videos" ADD CONSTRAINT "pages_blocks_video_gallery_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_gallery" ADD CONSTRAINT "pages_blocks_video_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_gallery_videos" ADD CONSTRAINT "_pages_v_blocks_video_gallery_videos_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_gallery_videos" ADD CONSTRAINT "_pages_v_blocks_video_gallery_videos_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_gallery_videos" ADD CONSTRAINT "_pages_v_blocks_video_gallery_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_gallery" ADD CONSTRAINT "_pages_v_blocks_video_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_video_gallery_videos_order_idx" ON "pages_blocks_video_gallery_videos" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_gallery_videos_parent_id_idx" ON "pages_blocks_video_gallery_videos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_gallery_videos_video_idx" ON "pages_blocks_video_gallery_videos" USING btree ("video_id");
  CREATE INDEX "pages_blocks_video_gallery_videos_poster_idx" ON "pages_blocks_video_gallery_videos" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_video_gallery_order_idx" ON "pages_blocks_video_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_gallery_parent_id_idx" ON "pages_blocks_video_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_gallery_path_idx" ON "pages_blocks_video_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_gallery_videos_order_idx" ON "_pages_v_blocks_video_gallery_videos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_gallery_videos_parent_id_idx" ON "_pages_v_blocks_video_gallery_videos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_gallery_videos_video_idx" ON "_pages_v_blocks_video_gallery_videos" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_video_gallery_videos_poster_idx" ON "_pages_v_blocks_video_gallery_videos" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_video_gallery_order_idx" ON "_pages_v_blocks_video_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_gallery_parent_id_idx" ON "_pages_v_blocks_video_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_gallery_path_idx" ON "_pages_v_blocks_video_gallery" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_video_gallery_videos" CASCADE;
  DROP TABLE "pages_blocks_video_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_video_gallery_videos" CASCADE;
  DROP TABLE "_pages_v_blocks_video_gallery" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_video_gallery_advanced_background";
  DROP TYPE "public"."enum_pages_blocks_video_gallery_advanced_padding";
  DROP TYPE "public"."enum_pages_blocks_video_gallery_advanced_width";
  DROP TYPE "public"."enum_pages_blocks_video_gallery_advanced_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_background";
  DROP TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_padding";
  DROP TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_width";
  DROP TYPE "public"."enum__pages_v_blocks_video_gallery_advanced_card_style";`)
}
