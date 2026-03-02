import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" ADD COLUMN "phone" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "organization" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "role" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "outlet" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "deadline" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "topic" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "message" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" DROP COLUMN "phone";
  ALTER TABLE "form_submissions" DROP COLUMN "organization";
  ALTER TABLE "form_submissions" DROP COLUMN "role";
  ALTER TABLE "form_submissions" DROP COLUMN "outlet";
  ALTER TABLE "form_submissions" DROP COLUMN "deadline";
  ALTER TABLE "form_submissions" DROP COLUMN "topic";
  ALTER TABLE "form_submissions" DROP COLUMN "message";`)
}
