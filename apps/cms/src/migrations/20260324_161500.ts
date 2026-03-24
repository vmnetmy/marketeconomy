import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "cover_image_id" integer;
    ALTER TABLE "_events_v" ADD COLUMN IF NOT EXISTS "version_cover_image_id" integer;

    DO $$ BEGIN
      ALTER TABLE "events"
      ADD CONSTRAINT "events_cover_image_id_media_id_fk"
      FOREIGN KEY ("cover_image_id")
      REFERENCES "public"."media"("id")
      ON DELETE set null
      ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_events_v"
      ADD CONSTRAINT "_events_v_version_cover_image_id_media_id_fk"
      FOREIGN KEY ("version_cover_image_id")
      REFERENCES "public"."media"("id")
      ON DELETE set null
      ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
    CREATE INDEX IF NOT EXISTS "_events_v_version_version_cover_image_idx" ON "_events_v" USING btree ("version_cover_image_id");

    UPDATE "events"
    SET "cover_image_id" = "seo_og_image_id"
    WHERE "cover_image_id" IS NULL
      AND "seo_og_image_id" IS NOT NULL;

    UPDATE "_events_v"
    SET "version_cover_image_id" = "version_seo_og_image_id"
    WHERE "version_cover_image_id" IS NULL
      AND "version_seo_og_image_id" IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "events_cover_image_idx";
    DROP INDEX IF EXISTS "_events_v_version_version_cover_image_idx";

    ALTER TABLE "events" DROP CONSTRAINT IF EXISTS "events_cover_image_id_media_id_fk";
    ALTER TABLE "_events_v" DROP CONSTRAINT IF EXISTS "_events_v_version_cover_image_id_media_id_fk";

    ALTER TABLE "events" DROP COLUMN IF EXISTS "cover_image_id";
    ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_cover_image_id";
  `)
}
