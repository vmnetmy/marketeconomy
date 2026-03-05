import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_leadership_role" AS ENUM('Chairman', 'General Manager');
    CREATE TYPE "public"."enum_in_the_news_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum__in_the_news_v_version_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum_event_reports_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum__event_reports_v_version_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum_pdf_gated_downloads_resource_type" AS ENUM('policyBrief', 'eventReport');

    CREATE TABLE "leadership" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "role" "enum_leadership_role" NOT NULL,
      "bio" jsonb NOT NULL,
      "photo_id" integer,
      "social_url" varchar,
      "display_order" numeric NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "in_the_news_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar
    );

    CREATE TABLE "in_the_news" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "slug" varchar,
      "excerpt" varchar,
      "content" jsonb,
      "published_date" timestamp(3) with time zone,
      "original_source_url" varchar,
      "original_source_label" varchar,
      "cover_image_id" integer,
      "seo_meta_title" varchar,
      "seo_meta_description" varchar,
      "seo_og_image_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_in_the_news_status" DEFAULT 'draft'
    );

    CREATE TABLE "_in_the_news_v_version_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "tag" varchar,
      "_uuid" varchar
    );

    CREATE TABLE "_in_the_news_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_title" varchar,
      "version_slug" varchar,
      "version_excerpt" varchar,
      "version_content" jsonb,
      "version_published_date" timestamp(3) with time zone,
      "version_original_source_url" varchar,
      "version_original_source_label" varchar,
      "version_cover_image_id" integer,
      "version_seo_meta_title" varchar,
      "version_seo_meta_description" varchar,
      "version_seo_og_image_id" integer,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__in_the_news_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean
    );

    CREATE TABLE "event_reports" (
      "id" serial PRIMARY KEY NOT NULL,
      "event_id" integer,
      "title" varchar,
      "slug" varchar,
      "summary" varchar,
      "content" jsonb,
      "cover_image_id" integer,
      "pdf_file_id" integer,
      "published_date" timestamp(3) with time zone,
      "seo_meta_title" varchar,
      "seo_meta_description" varchar,
      "seo_og_image_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_event_reports_status" DEFAULT 'draft'
    );

    CREATE TABLE "_event_reports_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_event_id" integer,
      "version_title" varchar,
      "version_slug" varchar,
      "version_summary" varchar,
      "version_content" jsonb,
      "version_cover_image_id" integer,
      "version_pdf_file_id" integer,
      "version_published_date" timestamp(3) with time zone,
      "version_seo_meta_title" varchar,
      "version_seo_meta_description" varchar,
      "version_seo_og_image_id" integer,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__event_reports_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean
    );

    CREATE TABLE "event_registrations" (
      "id" serial PRIMARY KEY NOT NULL,
      "event_id" integer NOT NULL,
      "name" varchar NOT NULL,
      "email" varchar NOT NULL,
      "organisation" varchar,
      "phone" varchar,
      "extra_fields" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "pdf_gated_downloads" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "email" varchar NOT NULL,
      "resource_type" "enum_pdf_gated_downloads_resource_type" NOT NULL,
      "policy_brief_id" integer,
      "event_report_id" integer,
      "token" varchar NOT NULL,
      "token_expires_at" timestamp(3) with time zone NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "leadership_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "in_the_news_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_reports_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_registrations_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pdf_gated_downloads_id" integer;

    ALTER TABLE "leadership" ADD CONSTRAINT "leadership_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "in_the_news_tags" ADD CONSTRAINT "in_the_news_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."in_the_news"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "in_the_news" ADD CONSTRAINT "in_the_news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "in_the_news" ADD CONSTRAINT "in_the_news_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_in_the_news_v_version_tags" ADD CONSTRAINT "_in_the_news_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_in_the_news_v"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_in_the_news_v" ADD CONSTRAINT "_in_the_news_v_parent_id_in_the_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."in_the_news"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_in_the_news_v" ADD CONSTRAINT "_in_the_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_in_the_news_v" ADD CONSTRAINT "_in_the_news_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "event_reports" ADD CONSTRAINT "event_reports_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "event_reports" ADD CONSTRAINT "event_reports_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "event_reports" ADD CONSTRAINT "event_reports_pdf_file_id_media_id_fk" FOREIGN KEY ("pdf_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "event_reports" ADD CONSTRAINT "event_reports_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_event_reports_v" ADD CONSTRAINT "_event_reports_v_parent_id_event_reports_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."event_reports"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_event_reports_v" ADD CONSTRAINT "_event_reports_v_version_event_id_events_id_fk" FOREIGN KEY ("version_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_event_reports_v" ADD CONSTRAINT "_event_reports_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_event_reports_v" ADD CONSTRAINT "_event_reports_v_version_pdf_file_id_media_id_fk" FOREIGN KEY ("version_pdf_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_event_reports_v" ADD CONSTRAINT "_event_reports_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "pdf_gated_downloads" ADD CONSTRAINT "pdf_gated_downloads_policy_brief_id_policy_briefs_id_fk" FOREIGN KEY ("policy_brief_id") REFERENCES "public"."policy_briefs"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pdf_gated_downloads" ADD CONSTRAINT "pdf_gated_downloads_event_report_id_event_reports_id_fk" FOREIGN KEY ("event_report_id") REFERENCES "public"."event_reports"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leadership_fk" FOREIGN KEY ("leadership_id") REFERENCES "public"."leadership"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_in_the_news_fk" FOREIGN KEY ("in_the_news_id") REFERENCES "public"."in_the_news"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_reports_fk" FOREIGN KEY ("event_reports_id") REFERENCES "public"."event_reports"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pdf_gated_downloads_fk" FOREIGN KEY ("pdf_gated_downloads_id") REFERENCES "public"."pdf_gated_downloads"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "leadership_photo_idx" ON "leadership" USING btree ("photo_id");
    CREATE INDEX "leadership_updated_at_idx" ON "leadership" USING btree ("updated_at");
    CREATE INDEX "leadership_created_at_idx" ON "leadership" USING btree ("created_at");

    CREATE INDEX "in_the_news_tags_order_idx" ON "in_the_news_tags" USING btree ("_order");
    CREATE INDEX "in_the_news_tags_parent_id_idx" ON "in_the_news_tags" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "in_the_news_slug_idx" ON "in_the_news" USING btree ("slug");
    CREATE INDEX "in_the_news_cover_image_idx" ON "in_the_news" USING btree ("cover_image_id");
    CREATE INDEX "in_the_news_seo_seo_og_image_idx" ON "in_the_news" USING btree ("seo_og_image_id");
    CREATE INDEX "in_the_news_updated_at_idx" ON "in_the_news" USING btree ("updated_at");
    CREATE INDEX "in_the_news_created_at_idx" ON "in_the_news" USING btree ("created_at");
    CREATE INDEX "in_the_news__status_idx" ON "in_the_news" USING btree ("_status");
    CREATE INDEX "_in_the_news_v_version_tags_order_idx" ON "_in_the_news_v_version_tags" USING btree ("_order");
    CREATE INDEX "_in_the_news_v_version_tags_parent_id_idx" ON "_in_the_news_v_version_tags" USING btree ("_parent_id");
    CREATE INDEX "_in_the_news_v_parent_idx" ON "_in_the_news_v" USING btree ("parent_id");
    CREATE INDEX "_in_the_news_v_version_version_slug_idx" ON "_in_the_news_v" USING btree ("version_slug");
    CREATE INDEX "_in_the_news_v_version_version_cover_image_idx" ON "_in_the_news_v" USING btree ("version_cover_image_id");
    CREATE INDEX "_in_the_news_v_version_seo_version_seo_og_image_idx" ON "_in_the_news_v" USING btree ("version_seo_og_image_id");
    CREATE INDEX "_in_the_news_v_version_version_updated_at_idx" ON "_in_the_news_v" USING btree ("version_updated_at");
    CREATE INDEX "_in_the_news_v_version_version_created_at_idx" ON "_in_the_news_v" USING btree ("version_created_at");
    CREATE INDEX "_in_the_news_v_version_version__status_idx" ON "_in_the_news_v" USING btree ("version__status");
    CREATE INDEX "_in_the_news_v_created_at_idx" ON "_in_the_news_v" USING btree ("created_at");
    CREATE INDEX "_in_the_news_v_updated_at_idx" ON "_in_the_news_v" USING btree ("updated_at");
    CREATE INDEX "_in_the_news_v_latest_idx" ON "_in_the_news_v" USING btree ("latest");

    CREATE INDEX "event_reports_event_idx" ON "event_reports" USING btree ("event_id");
    CREATE UNIQUE INDEX "event_reports_slug_idx" ON "event_reports" USING btree ("slug");
    CREATE INDEX "event_reports_cover_image_idx" ON "event_reports" USING btree ("cover_image_id");
    CREATE INDEX "event_reports_pdf_file_idx" ON "event_reports" USING btree ("pdf_file_id");
    CREATE INDEX "event_reports_seo_seo_og_image_idx" ON "event_reports" USING btree ("seo_og_image_id");
    CREATE INDEX "event_reports_updated_at_idx" ON "event_reports" USING btree ("updated_at");
    CREATE INDEX "event_reports_created_at_idx" ON "event_reports" USING btree ("created_at");
    CREATE INDEX "event_reports__status_idx" ON "event_reports" USING btree ("_status");
    CREATE INDEX "_event_reports_v_parent_idx" ON "_event_reports_v" USING btree ("parent_id");
    CREATE INDEX "_event_reports_v_version_version_event_idx" ON "_event_reports_v" USING btree ("version_event_id");
    CREATE INDEX "_event_reports_v_version_version_slug_idx" ON "_event_reports_v" USING btree ("version_slug");
    CREATE INDEX "_event_reports_v_version_version_cover_image_idx" ON "_event_reports_v" USING btree ("version_cover_image_id");
    CREATE INDEX "_event_reports_v_version_version_pdf_file_idx" ON "_event_reports_v" USING btree ("version_pdf_file_id");
    CREATE INDEX "_event_reports_v_version_seo_version_seo_og_image_idx" ON "_event_reports_v" USING btree ("version_seo_og_image_id");
    CREATE INDEX "_event_reports_v_version_version_updated_at_idx" ON "_event_reports_v" USING btree ("version_updated_at");
    CREATE INDEX "_event_reports_v_version_version_created_at_idx" ON "_event_reports_v" USING btree ("version_created_at");
    CREATE INDEX "_event_reports_v_version_version__status_idx" ON "_event_reports_v" USING btree ("version__status");
    CREATE INDEX "_event_reports_v_created_at_idx" ON "_event_reports_v" USING btree ("created_at");
    CREATE INDEX "_event_reports_v_updated_at_idx" ON "_event_reports_v" USING btree ("updated_at");
    CREATE INDEX "_event_reports_v_latest_idx" ON "_event_reports_v" USING btree ("latest");

    CREATE INDEX "event_registrations_event_idx" ON "event_registrations" USING btree ("event_id");
    CREATE INDEX "event_registrations_updated_at_idx" ON "event_registrations" USING btree ("updated_at");
    CREATE INDEX "event_registrations_created_at_idx" ON "event_registrations" USING btree ("created_at");

    CREATE INDEX "pdf_gated_downloads_policy_brief_idx" ON "pdf_gated_downloads" USING btree ("policy_brief_id");
    CREATE INDEX "pdf_gated_downloads_event_report_idx" ON "pdf_gated_downloads" USING btree ("event_report_id");
    CREATE UNIQUE INDEX "pdf_gated_downloads_token_idx" ON "pdf_gated_downloads" USING btree ("token");
    CREATE INDEX "pdf_gated_downloads_updated_at_idx" ON "pdf_gated_downloads" USING btree ("updated_at");
    CREATE INDEX "pdf_gated_downloads_created_at_idx" ON "pdf_gated_downloads" USING btree ("created_at");

    CREATE INDEX "payload_locked_documents_rels_leadership_id_idx" ON "payload_locked_documents_rels" USING btree ("leadership_id");
    CREATE INDEX "payload_locked_documents_rels_in_the_news_id_idx" ON "payload_locked_documents_rels" USING btree ("in_the_news_id");
    CREATE INDEX "payload_locked_documents_rels_event_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("event_reports_id");
    CREATE INDEX "payload_locked_documents_rels_event_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("event_registrations_id");
    CREATE INDEX "payload_locked_documents_rels_pdf_gated_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("pdf_gated_downloads_id");

    ALTER TABLE "leadership" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "in_the_news_tags" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "in_the_news" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "_in_the_news_v_version_tags" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "_in_the_news_v" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "event_reports" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "_event_reports_v" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "event_registrations" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "pdf_gated_downloads" DISABLE ROW LEVEL SECURITY;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leadership_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_in_the_news_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_reports_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_registrations_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pdf_gated_downloads_fk";

    DROP INDEX "payload_locked_documents_rels_leadership_id_idx";
    DROP INDEX "payload_locked_documents_rels_in_the_news_id_idx";
    DROP INDEX "payload_locked_documents_rels_event_reports_id_idx";
    DROP INDEX "payload_locked_documents_rels_event_registrations_id_idx";
    DROP INDEX "payload_locked_documents_rels_pdf_gated_downloads_id_idx";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "leadership_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "in_the_news_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_reports_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_registrations_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pdf_gated_downloads_id";

    DROP TABLE "pdf_gated_downloads" CASCADE;
    DROP TABLE "event_registrations" CASCADE;
    DROP TABLE "_event_reports_v" CASCADE;
    DROP TABLE "event_reports" CASCADE;
    DROP TABLE "_in_the_news_v_version_tags" CASCADE;
    DROP TABLE "_in_the_news_v" CASCADE;
    DROP TABLE "in_the_news_tags" CASCADE;
    DROP TABLE "in_the_news" CASCADE;
    DROP TABLE "leadership" CASCADE;

    DROP TYPE "public"."enum_pdf_gated_downloads_resource_type";
    DROP TYPE "public"."enum__event_reports_v_version_status";
    DROP TYPE "public"."enum_event_reports_status";
    DROP TYPE "public"."enum__in_the_news_v_version_status";
    DROP TYPE "public"."enum_in_the_news_status";
    DROP TYPE "public"."enum_leadership_role";
  `)
}
