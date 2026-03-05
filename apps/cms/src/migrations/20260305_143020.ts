import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM pg_type t
        WHERE t.typname = 'enum_pages_blocks_content_list_source'
      ) THEN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_enum e ON t.oid = e.enumtypid
          WHERE t.typname = 'enum_pages_blocks_content_list_source'
          AND e.enumlabel = 'inTheNews'
        ) THEN
          ALTER TYPE "public"."enum_pages_blocks_content_list_source" ADD VALUE 'inTheNews';
        END IF;
      END IF;

      IF EXISTS (
        SELECT 1
        FROM pg_type t
        WHERE t.typname = 'enum__pages_v_blocks_content_list_source'
      ) THEN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_type t
          JOIN pg_enum e ON t.oid = e.enumtypid
          WHERE t.typname = 'enum__pages_v_blocks_content_list_source'
          AND e.enumlabel = 'inTheNews'
        ) THEN
          ALTER TYPE "public"."enum__pages_v_blocks_content_list_source" ADD VALUE 'inTheNews';
        END IF;
      END IF;
    END $$;
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No-op: Postgres enums cannot remove values safely.
}
