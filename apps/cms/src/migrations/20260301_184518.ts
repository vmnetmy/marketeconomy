import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_form_fields_type" AS ENUM('text', 'email', 'phone', 'textarea', 'select');
  CREATE TYPE "public"."enum_pages_blocks_form_fields_span" AS ENUM('full', 'half');
  CREATE TYPE "public"."enum_pages_blocks_form_form_type" AS ENUM('newsletter', 'contact', 'media', 'policyBrief', 'event', 'membership');
  CREATE TYPE "public"."enum_pages_blocks_form_destination_mode" AS ENUM('cms', 'external');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_layout" AS ENUM('stacked', 'twoColumn');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_card_style" AS ENUM('none', 'soft', 'card', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_radius" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_shadow" AS ENUM('none', 'soft', 'medium');
  CREATE TYPE "public"."enum_pages_blocks_form_advanced_button_style" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_form_fields_type" AS ENUM('text', 'email', 'phone', 'textarea', 'select');
  CREATE TYPE "public"."enum__pages_v_blocks_form_fields_span" AS ENUM('full', 'half');
  CREATE TYPE "public"."enum__pages_v_blocks_form_form_type" AS ENUM('newsletter', 'contact', 'media', 'policyBrief', 'event', 'membership');
  CREATE TYPE "public"."enum__pages_v_blocks_form_destination_mode" AS ENUM('cms', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_layout" AS ENUM('stacked', 'twoColumn');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_card_style" AS ENUM('none', 'soft', 'card', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_radius" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_shadow" AS ENUM('none', 'soft', 'medium');
  CREATE TYPE "public"."enum__pages_v_blocks_form_advanced_button_style" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_form_fields_type" AS ENUM('text', 'email', 'phone', 'textarea', 'select');
  CREATE TYPE "public"."enum_posts_blocks_form_fields_span" AS ENUM('full', 'half');
  CREATE TYPE "public"."enum_posts_blocks_form_form_type" AS ENUM('newsletter', 'contact', 'media', 'policyBrief', 'event', 'membership');
  CREATE TYPE "public"."enum_posts_blocks_form_destination_mode" AS ENUM('cms', 'external');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_layout" AS ENUM('stacked', 'twoColumn');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_card_style" AS ENUM('none', 'soft', 'card', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_radius" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_shadow" AS ENUM('none', 'soft', 'medium');
  CREATE TYPE "public"."enum_posts_blocks_form_advanced_button_style" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_form_fields_type" AS ENUM('text', 'email', 'phone', 'textarea', 'select');
  CREATE TYPE "public"."enum__posts_v_blocks_form_fields_span" AS ENUM('full', 'half');
  CREATE TYPE "public"."enum__posts_v_blocks_form_form_type" AS ENUM('newsletter', 'contact', 'media', 'policyBrief', 'event', 'membership');
  CREATE TYPE "public"."enum__posts_v_blocks_form_destination_mode" AS ENUM('cms', 'external');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_padding" AS ENUM('none', 'compact', 'standard', 'large');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_width" AS ENUM('standard', 'wide', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_layout" AS ENUM('stacked', 'twoColumn');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_card_style" AS ENUM('none', 'soft', 'card', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_radius" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_shadow" AS ENUM('none', 'soft', 'medium');
  CREATE TYPE "public"."enum__posts_v_blocks_form_advanced_button_style" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_form_submissions_form_type" AS ENUM('newsletter', 'contact', 'media', 'policyBrief', 'event', 'membership');
  CREATE TABLE "pages_blocks_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"type" "enum_pages_blocks_form_fields_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"span" "enum_pages_blocks_form_fields_span" DEFAULT 'full'
  );
  
  CREATE TABLE "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_type" "enum_pages_blocks_form_form_type" DEFAULT 'contact',
  	"headline" varchar,
  	"description" varchar,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thanks! We will be in touch shortly.',
  	"destination_mode" "enum_pages_blocks_form_destination_mode" DEFAULT 'cms',
  	"destination_form_action" varchar,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum_pages_blocks_form_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum_pages_blocks_form_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum_pages_blocks_form_advanced_width" DEFAULT 'standard',
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"advanced_layout" "enum_pages_blocks_form_advanced_layout" DEFAULT 'stacked',
  	"advanced_align" "enum_pages_blocks_form_advanced_align" DEFAULT 'left',
  	"advanced_show_labels" boolean DEFAULT true,
  	"advanced_full_width_button" boolean DEFAULT false,
  	"advanced_card_style" "enum_pages_blocks_form_advanced_card_style" DEFAULT 'card',
  	"advanced_radius" "enum_pages_blocks_form_advanced_radius" DEFAULT 'lg',
  	"advanced_shadow" "enum_pages_blocks_form_advanced_shadow" DEFAULT 'soft',
  	"advanced_button_style" "enum_pages_blocks_form_advanced_button_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"type" "enum__pages_v_blocks_form_fields_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"span" "enum__pages_v_blocks_form_fields_span" DEFAULT 'full',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_type" "enum__pages_v_blocks_form_form_type" DEFAULT 'contact',
  	"headline" varchar,
  	"description" varchar,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thanks! We will be in touch shortly.',
  	"destination_mode" "enum__pages_v_blocks_form_destination_mode" DEFAULT 'cms',
  	"destination_form_action" varchar,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum__pages_v_blocks_form_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum__pages_v_blocks_form_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum__pages_v_blocks_form_advanced_width" DEFAULT 'standard',
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"advanced_layout" "enum__pages_v_blocks_form_advanced_layout" DEFAULT 'stacked',
  	"advanced_align" "enum__pages_v_blocks_form_advanced_align" DEFAULT 'left',
  	"advanced_show_labels" boolean DEFAULT true,
  	"advanced_full_width_button" boolean DEFAULT false,
  	"advanced_card_style" "enum__pages_v_blocks_form_advanced_card_style" DEFAULT 'card',
  	"advanced_radius" "enum__pages_v_blocks_form_advanced_radius" DEFAULT 'lg',
  	"advanced_shadow" "enum__pages_v_blocks_form_advanced_shadow" DEFAULT 'soft',
  	"advanced_button_style" "enum__pages_v_blocks_form_advanced_button_style" DEFAULT 'solid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "posts_blocks_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"type" "enum_posts_blocks_form_fields_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"span" "enum_posts_blocks_form_fields_span" DEFAULT 'full'
  );
  
  CREATE TABLE "posts_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_type" "enum_posts_blocks_form_form_type" DEFAULT 'contact',
  	"headline" varchar,
  	"description" varchar,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thanks! We will be in touch shortly.',
  	"destination_mode" "enum_posts_blocks_form_destination_mode" DEFAULT 'cms',
  	"destination_form_action" varchar,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum_posts_blocks_form_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum_posts_blocks_form_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum_posts_blocks_form_advanced_width" DEFAULT 'standard',
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"advanced_layout" "enum_posts_blocks_form_advanced_layout" DEFAULT 'stacked',
  	"advanced_align" "enum_posts_blocks_form_advanced_align" DEFAULT 'left',
  	"advanced_show_labels" boolean DEFAULT true,
  	"advanced_full_width_button" boolean DEFAULT false,
  	"advanced_card_style" "enum_posts_blocks_form_advanced_card_style" DEFAULT 'card',
  	"advanced_radius" "enum_posts_blocks_form_advanced_radius" DEFAULT 'lg',
  	"advanced_shadow" "enum_posts_blocks_form_advanced_shadow" DEFAULT 'soft',
  	"advanced_button_style" "enum_posts_blocks_form_advanced_button_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"type" "enum__posts_v_blocks_form_fields_type" DEFAULT 'text',
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"span" "enum__posts_v_blocks_form_fields_span" DEFAULT 'full',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_type" "enum__posts_v_blocks_form_form_type" DEFAULT 'contact',
  	"headline" varchar,
  	"description" varchar,
  	"submit_label" varchar DEFAULT 'Submit',
  	"success_message" varchar DEFAULT 'Thanks! We will be in touch shortly.',
  	"destination_mode" "enum__posts_v_blocks_form_destination_mode" DEFAULT 'cms',
  	"destination_form_action" varchar,
  	"enable_advanced" boolean DEFAULT false,
  	"advanced_anchor_id" varchar,
  	"advanced_background" "enum__posts_v_blocks_form_advanced_background" DEFAULT 'none',
  	"advanced_padding" "enum__posts_v_blocks_form_advanced_padding" DEFAULT 'standard',
  	"advanced_width" "enum__posts_v_blocks_form_advanced_width" DEFAULT 'standard',
  	"advanced_hide_on_mobile" boolean DEFAULT false,
  	"advanced_hide_on_desktop" boolean DEFAULT false,
  	"advanced_layout" "enum__posts_v_blocks_form_advanced_layout" DEFAULT 'stacked',
  	"advanced_align" "enum__posts_v_blocks_form_advanced_align" DEFAULT 'left',
  	"advanced_show_labels" boolean DEFAULT true,
  	"advanced_full_width_button" boolean DEFAULT false,
  	"advanced_card_style" "enum__posts_v_blocks_form_advanced_card_style" DEFAULT 'card',
  	"advanced_radius" "enum__posts_v_blocks_form_advanced_radius" DEFAULT 'lg',
  	"advanced_shadow" "enum__posts_v_blocks_form_advanced_shadow" DEFAULT 'soft',
  	"advanced_button_style" "enum__posts_v_blocks_form_advanced_button_style" DEFAULT 'solid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"summary" varchar,
  	"form_type" "enum_form_submissions_form_type" NOT NULL,
  	"page" varchar,
  	"name" varchar,
  	"email" varchar,
  	"data" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" integer;
  ALTER TABLE "pages_blocks_form_fields_options" ADD CONSTRAINT "pages_blocks_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_fields" ADD CONSTRAINT "pages_blocks_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_fields_options" ADD CONSTRAINT "_pages_v_blocks_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_fields" ADD CONSTRAINT "_pages_v_blocks_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_form_fields_options" ADD CONSTRAINT "posts_blocks_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_form_fields" ADD CONSTRAINT "posts_blocks_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_form" ADD CONSTRAINT "posts_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form_fields_options" ADD CONSTRAINT "_posts_v_blocks_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form_fields" ADD CONSTRAINT "_posts_v_blocks_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form" ADD CONSTRAINT "_posts_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_form_fields_options_order_idx" ON "pages_blocks_form_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_fields_options_parent_id_idx" ON "pages_blocks_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_fields_order_idx" ON "pages_blocks_form_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_fields_parent_id_idx" ON "pages_blocks_form_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_fields_options_order_idx" ON "_pages_v_blocks_form_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_fields_options_parent_id_idx" ON "_pages_v_blocks_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_fields_order_idx" ON "_pages_v_blocks_form_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_fields_parent_id_idx" ON "_pages_v_blocks_form_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX "posts_blocks_form_fields_options_order_idx" ON "posts_blocks_form_fields_options" USING btree ("_order");
  CREATE INDEX "posts_blocks_form_fields_options_parent_id_idx" ON "posts_blocks_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_form_fields_order_idx" ON "posts_blocks_form_fields" USING btree ("_order");
  CREATE INDEX "posts_blocks_form_fields_parent_id_idx" ON "posts_blocks_form_fields" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_form_order_idx" ON "posts_blocks_form" USING btree ("_order");
  CREATE INDEX "posts_blocks_form_parent_id_idx" ON "posts_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_form_path_idx" ON "posts_blocks_form" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_form_fields_options_order_idx" ON "_posts_v_blocks_form_fields_options" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_form_fields_options_parent_id_idx" ON "_posts_v_blocks_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_form_fields_order_idx" ON "_posts_v_blocks_form_fields" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_form_fields_parent_id_idx" ON "_posts_v_blocks_form_fields" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_form_order_idx" ON "_posts_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_form_parent_id_idx" ON "_posts_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_form_path_idx" ON "_posts_v_blocks_form" USING btree ("_path");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_form_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_form_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_form_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_form_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_form_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_form_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_form_fields_options" CASCADE;
  DROP TABLE "pages_blocks_form_fields" CASCADE;
  DROP TABLE "pages_blocks_form" CASCADE;
  DROP TABLE "_pages_v_blocks_form_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_form_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_form" CASCADE;
  DROP TABLE "posts_blocks_form_fields_options" CASCADE;
  DROP TABLE "posts_blocks_form_fields" CASCADE;
  DROP TABLE "posts_blocks_form" CASCADE;
  DROP TABLE "_posts_v_blocks_form_fields_options" CASCADE;
  DROP TABLE "_posts_v_blocks_form_fields" CASCADE;
  DROP TABLE "_posts_v_blocks_form" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_form_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_submissions_id";
  DROP TYPE "public"."enum_pages_blocks_form_fields_type";
  DROP TYPE "public"."enum_pages_blocks_form_fields_span";
  DROP TYPE "public"."enum_pages_blocks_form_form_type";
  DROP TYPE "public"."enum_pages_blocks_form_destination_mode";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_background";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_padding";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_width";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_layout";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_align";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_card_style";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_radius";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_shadow";
  DROP TYPE "public"."enum_pages_blocks_form_advanced_button_style";
  DROP TYPE "public"."enum__pages_v_blocks_form_fields_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_fields_span";
  DROP TYPE "public"."enum__pages_v_blocks_form_form_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_destination_mode";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_background";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_padding";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_width";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_layout";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_align";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_radius";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_shadow";
  DROP TYPE "public"."enum__pages_v_blocks_form_advanced_button_style";
  DROP TYPE "public"."enum_posts_blocks_form_fields_type";
  DROP TYPE "public"."enum_posts_blocks_form_fields_span";
  DROP TYPE "public"."enum_posts_blocks_form_form_type";
  DROP TYPE "public"."enum_posts_blocks_form_destination_mode";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_background";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_padding";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_width";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_layout";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_align";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_card_style";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_radius";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_shadow";
  DROP TYPE "public"."enum_posts_blocks_form_advanced_button_style";
  DROP TYPE "public"."enum__posts_v_blocks_form_fields_type";
  DROP TYPE "public"."enum__posts_v_blocks_form_fields_span";
  DROP TYPE "public"."enum__posts_v_blocks_form_form_type";
  DROP TYPE "public"."enum__posts_v_blocks_form_destination_mode";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_background";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_padding";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_width";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_layout";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_align";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_card_style";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_radius";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_shadow";
  DROP TYPE "public"."enum__posts_v_blocks_form_advanced_button_style";
  DROP TYPE "public"."enum_form_submissions_form_type";`)
}
