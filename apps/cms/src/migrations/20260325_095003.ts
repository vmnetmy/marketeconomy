import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_events_feed_status" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum_pages_blocks_events_feed_sort" AS ENUM('dateAsc', 'dateDesc');
  CREATE TYPE "public"."enum_pages_blocks_events_feed_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_events_feed_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_events_feed_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum_pages_blocks_events_feed_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_events_feed_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TYPE "public"."enum_pages_blocks_in_the_news_feed_sort" AS ENUM('latest', 'oldest');
  CREATE TYPE "public"."enum_pages_blocks_in_the_news_feed_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TYPE "public"."enum_pages_blocks_policy_brief_feed_sort" AS ENUM('latest', 'oldest');
  CREATE TYPE "public"."enum_pages_blocks_policy_brief_feed_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TYPE "public"."enum__pages_v_blocks_events_feed_status" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum__pages_v_blocks_events_feed_sort" AS ENUM('dateAsc', 'dateDesc');
  CREATE TYPE "public"."enum__pages_v_blocks_events_feed_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_events_feed_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_events_feed_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_events_feed_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_events_feed_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TYPE "public"."enum__pages_v_blocks_in_the_news_feed_sort" AS ENUM('latest', 'oldest');
  CREATE TYPE "public"."enum__pages_v_blocks_in_the_news_feed_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TYPE "public"."enum__pages_v_blocks_policy_brief_feed_sort" AS ENUM('latest', 'oldest');
  CREATE TYPE "public"."enum__pages_v_blocks_policy_brief_feed_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_card_style" AS ENUM('flat', 'raised');
  CREATE TABLE "pages_blocks_events_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Latest Events',
  	"section_intro" varchar,
  	"status" "enum_pages_blocks_events_feed_status" DEFAULT 'upcoming',
  	"sort" "enum_pages_blocks_events_feed_sort" DEFAULT 'dateAsc',
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_events_feed_layout" DEFAULT 'grid',
  	"filter_tag" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum_pages_blocks_events_feed_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum_pages_blocks_events_feed_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum_pages_blocks_events_feed_advanced_width" DEFAULT 'standard',
  	"advanced_card_style" "enum_pages_blocks_events_feed_advanced_card_style" DEFAULT 'raised',
  	"advanced_show_images" boolean DEFAULT true,
  	"advanced_dense" boolean DEFAULT false,
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_in_the_news_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Latest News',
  	"section_intro" varchar,
  	"sort" "enum_pages_blocks_in_the_news_feed_sort" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_in_the_news_feed_layout" DEFAULT 'grid',
  	"filter_tag" varchar,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum_pages_blocks_in_the_news_feed_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum_pages_blocks_in_the_news_feed_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum_pages_blocks_in_the_news_feed_advanced_width" DEFAULT 'standard',
  	"advanced_card_style" "enum_pages_blocks_in_the_news_feed_advanced_card_style" DEFAULT 'raised',
  	"advanced_show_images" boolean DEFAULT true,
  	"advanced_dense" boolean DEFAULT false,
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_policy_brief_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Latest Policy Briefs',
  	"section_intro" varchar,
  	"sort" "enum_pages_blocks_policy_brief_feed_sort" DEFAULT 'latest',
  	"featured_only" boolean DEFAULT false,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_policy_brief_feed_layout" DEFAULT 'grid',
  	"filter_tag" varchar,
  	"show_summary" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_tags" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum_pages_blocks_policy_brief_feed_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum_pages_blocks_policy_brief_feed_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum_pages_blocks_policy_brief_feed_advanced_width" DEFAULT 'standard',
  	"advanced_card_style" "enum_pages_blocks_policy_brief_feed_advanced_card_style" DEFAULT 'raised',
  	"advanced_show_images" boolean DEFAULT true,
  	"advanced_dense" boolean DEFAULT false,
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_events_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Latest Events',
  	"section_intro" varchar,
  	"status" "enum__pages_v_blocks_events_feed_status" DEFAULT 'upcoming',
  	"sort" "enum__pages_v_blocks_events_feed_sort" DEFAULT 'dateAsc',
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_events_feed_layout" DEFAULT 'grid',
  	"filter_tag" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum__pages_v_blocks_events_feed_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum__pages_v_blocks_events_feed_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum__pages_v_blocks_events_feed_advanced_width" DEFAULT 'standard',
  	"advanced_card_style" "enum__pages_v_blocks_events_feed_advanced_card_style" DEFAULT 'raised',
  	"advanced_show_images" boolean DEFAULT true,
  	"advanced_dense" boolean DEFAULT false,
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_in_the_news_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Latest News',
  	"section_intro" varchar,
  	"sort" "enum__pages_v_blocks_in_the_news_feed_sort" DEFAULT 'latest',
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_in_the_news_feed_layout" DEFAULT 'grid',
  	"filter_tag" varchar,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum__pages_v_blocks_in_the_news_feed_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum__pages_v_blocks_in_the_news_feed_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum__pages_v_blocks_in_the_news_feed_advanced_width" DEFAULT 'standard',
  	"advanced_card_style" "enum__pages_v_blocks_in_the_news_feed_advanced_card_style" DEFAULT 'raised',
  	"advanced_show_images" boolean DEFAULT true,
  	"advanced_dense" boolean DEFAULT false,
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_policy_brief_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar DEFAULT 'Latest Policy Briefs',
  	"section_intro" varchar,
  	"sort" "enum__pages_v_blocks_policy_brief_feed_sort" DEFAULT 'latest',
  	"featured_only" boolean DEFAULT false,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_policy_brief_feed_layout" DEFAULT 'grid',
  	"filter_tag" varchar,
  	"show_summary" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_tags" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"show_placeholder" boolean DEFAULT false,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum__pages_v_blocks_policy_brief_feed_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum__pages_v_blocks_policy_brief_feed_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum__pages_v_blocks_policy_brief_feed_advanced_width" DEFAULT 'standard',
  	"advanced_card_style" "enum__pages_v_blocks_policy_brief_feed_advanced_card_style" DEFAULT 'raised',
  	"advanced_show_images" boolean DEFAULT true,
  	"advanced_dense" boolean DEFAULT false,
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_events_feed" ADD CONSTRAINT "pages_blocks_events_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_in_the_news_feed" ADD CONSTRAINT "pages_blocks_in_the_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_policy_brief_feed" ADD CONSTRAINT "pages_blocks_policy_brief_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_events_feed" ADD CONSTRAINT "_pages_v_blocks_events_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_in_the_news_feed" ADD CONSTRAINT "_pages_v_blocks_in_the_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_policy_brief_feed" ADD CONSTRAINT "_pages_v_blocks_policy_brief_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_events_feed_order_idx" ON "pages_blocks_events_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_events_feed_parent_id_idx" ON "pages_blocks_events_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_events_feed_path_idx" ON "pages_blocks_events_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_in_the_news_feed_order_idx" ON "pages_blocks_in_the_news_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_in_the_news_feed_parent_id_idx" ON "pages_blocks_in_the_news_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_in_the_news_feed_path_idx" ON "pages_blocks_in_the_news_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_policy_brief_feed_order_idx" ON "pages_blocks_policy_brief_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_policy_brief_feed_parent_id_idx" ON "pages_blocks_policy_brief_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_policy_brief_feed_path_idx" ON "pages_blocks_policy_brief_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_events_feed_order_idx" ON "_pages_v_blocks_events_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_events_feed_parent_id_idx" ON "_pages_v_blocks_events_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_events_feed_path_idx" ON "_pages_v_blocks_events_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_in_the_news_feed_order_idx" ON "_pages_v_blocks_in_the_news_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_in_the_news_feed_parent_id_idx" ON "_pages_v_blocks_in_the_news_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_in_the_news_feed_path_idx" ON "_pages_v_blocks_in_the_news_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_policy_brief_feed_order_idx" ON "_pages_v_blocks_policy_brief_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_policy_brief_feed_parent_id_idx" ON "_pages_v_blocks_policy_brief_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_policy_brief_feed_path_idx" ON "_pages_v_blocks_policy_brief_feed" USING btree ("_path");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_events_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_in_the_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_policy_brief_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_events_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_in_the_news_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_policy_brief_feed" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_events_feed" CASCADE;
  DROP TABLE "pages_blocks_in_the_news_feed" CASCADE;
  DROP TABLE "pages_blocks_policy_brief_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_events_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_in_the_news_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_policy_brief_feed" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_events_feed_status";
  DROP TYPE "public"."enum_pages_blocks_events_feed_sort";
  DROP TYPE "public"."enum_pages_blocks_events_feed_layout";
  DROP TYPE "public"."enum_pages_blocks_events_feed_advanced_background";
  DROP TYPE "public"."enum_pages_blocks_events_feed_advanced_padding";
  DROP TYPE "public"."enum_pages_blocks_events_feed_advanced_width";
  DROP TYPE "public"."enum_pages_blocks_events_feed_advanced_card_style";
  DROP TYPE "public"."enum_pages_blocks_in_the_news_feed_sort";
  DROP TYPE "public"."enum_pages_blocks_in_the_news_feed_layout";
  DROP TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_background";
  DROP TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_padding";
  DROP TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_width";
  DROP TYPE "public"."enum_pages_blocks_in_the_news_feed_advanced_card_style";
  DROP TYPE "public"."enum_pages_blocks_policy_brief_feed_sort";
  DROP TYPE "public"."enum_pages_blocks_policy_brief_feed_layout";
  DROP TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_background";
  DROP TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_padding";
  DROP TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_width";
  DROP TYPE "public"."enum_pages_blocks_policy_brief_feed_advanced_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_events_feed_status";
  DROP TYPE "public"."enum__pages_v_blocks_events_feed_sort";
  DROP TYPE "public"."enum__pages_v_blocks_events_feed_layout";
  DROP TYPE "public"."enum__pages_v_blocks_events_feed_advanced_background";
  DROP TYPE "public"."enum__pages_v_blocks_events_feed_advanced_padding";
  DROP TYPE "public"."enum__pages_v_blocks_events_feed_advanced_width";
  DROP TYPE "public"."enum__pages_v_blocks_events_feed_advanced_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_in_the_news_feed_sort";
  DROP TYPE "public"."enum__pages_v_blocks_in_the_news_feed_layout";
  DROP TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_background";
  DROP TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_padding";
  DROP TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_width";
  DROP TYPE "public"."enum__pages_v_blocks_in_the_news_feed_advanced_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_policy_brief_feed_sort";
  DROP TYPE "public"."enum__pages_v_blocks_policy_brief_feed_layout";
  DROP TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_background";
  DROP TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_padding";
  DROP TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_width";
  DROP TYPE "public"."enum__pages_v_blocks_policy_brief_feed_advanced_card_style";`)
}
