import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_placeholder_override" AS ENUM('default', 'forceOn', 'forceOff');
  CREATE TYPE "public"."enum__pages_v_version_placeholder_override" AS ENUM('default', 'forceOn', 'forceOff');
  CREATE TYPE "public"."enum_site_settings_content_placeholders_mode" AS ENUM('off', 'on', 'onlyWhenEmpty');
  ALTER TABLE "pages" ADD COLUMN "placeholder_override" "enum_pages_placeholder_override" DEFAULT 'default';
  ALTER TABLE "_pages_v" ADD COLUMN "version_placeholder_override" "enum__pages_v_version_placeholder_override" DEFAULT 'default';
  ALTER TABLE "site_settings" ADD COLUMN "content_placeholders_mode" "enum_site_settings_content_placeholders_mode" DEFAULT 'onlyWhenEmpty';
  ALTER TABLE "site_settings" ADD COLUMN "content_placeholders_label" varchar DEFAULT 'Content coming soon';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "placeholder_override";
  ALTER TABLE "_pages_v" DROP COLUMN "version_placeholder_override";
  ALTER TABLE "site_settings" DROP COLUMN "content_placeholders_mode";
  ALTER TABLE "site_settings" DROP COLUMN "content_placeholders_label";
  DROP TYPE "public"."enum_pages_placeholder_override";
  DROP TYPE "public"."enum__pages_v_version_placeholder_override";
  DROP TYPE "public"."enum_site_settings_content_placeholders_mode";`)
}
