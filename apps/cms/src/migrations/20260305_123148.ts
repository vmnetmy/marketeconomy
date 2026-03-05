import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('internal', 'external');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "header_nav_items_children" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "link_type" "enum_header_nav_items_children_link_type" DEFAULT 'internal',
      "page_id" integer,
      "url" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "header_nav_items_children_page_idx" ON "header_nav_items_children" USING btree ("page_id");

    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "event_type" varchar;
    ALTER TABLE "_events_v" ADD COLUMN IF NOT EXISTS "version_event_type" varchar;

    CREATE TABLE IF NOT EXISTS "policy_briefs_authors" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "full_name" varchar NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "policy_briefs_authors" ADD CONSTRAINT "policy_briefs_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_briefs"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "policy_briefs_authors_order_idx" ON "policy_briefs_authors" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "policy_briefs_authors_parent_id_idx" ON "policy_briefs_authors" USING btree ("_parent_id");

    CREATE TABLE IF NOT EXISTS "_policy_briefs_v_version_authors" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "full_name" varchar,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "_policy_briefs_v_version_authors" ADD CONSTRAINT "_policy_briefs_v_version_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_policy_briefs_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "_policy_briefs_v_version_authors_order_idx" ON "_policy_briefs_v_version_authors" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_policy_briefs_v_version_authors_parent_id_idx" ON "_policy_briefs_v_version_authors" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "_policy_briefs_v_version_authors" CASCADE;
    DROP TABLE "policy_briefs_authors" CASCADE;
    ALTER TABLE "_events_v" DROP COLUMN "version_event_type";
    ALTER TABLE "events" DROP COLUMN "event_type";
    DROP TABLE "header_nav_items_children" CASCADE;
    DROP TYPE "public"."enum_header_nav_items_children_link_type";
  `)
}
