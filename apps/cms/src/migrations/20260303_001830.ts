import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "policy_briefs_key_recommendations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"recommendation" varchar
  );
  
  CREATE TABLE "_policy_briefs_v_version_key_recommendations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"recommendation" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "policy_briefs" ADD COLUMN "executive_summary" jsonb;
  ALTER TABLE "_policy_briefs_v" ADD COLUMN "version_executive_summary" jsonb;
  ALTER TABLE "policy_briefs_key_recommendations" ADD CONSTRAINT "policy_briefs_key_recommendations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_briefs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v_version_key_recommendations" ADD CONSTRAINT "_policy_briefs_v_version_key_recommendations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_policy_briefs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "policy_briefs_key_recommendations_order_idx" ON "policy_briefs_key_recommendations" USING btree ("_order");
  CREATE INDEX "policy_briefs_key_recommendations_parent_id_idx" ON "policy_briefs_key_recommendations" USING btree ("_parent_id");
  CREATE INDEX "_policy_briefs_v_version_key_recommendations_order_idx" ON "_policy_briefs_v_version_key_recommendations" USING btree ("_order");
  CREATE INDEX "_policy_briefs_v_version_key_recommendations_parent_id_idx" ON "_policy_briefs_v_version_key_recommendations" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "policy_briefs_key_recommendations" CASCADE;
  DROP TABLE "_policy_briefs_v_version_key_recommendations" CASCADE;
  ALTER TABLE "policy_briefs" DROP COLUMN "executive_summary";
  ALTER TABLE "_policy_briefs_v" DROP COLUMN "version_executive_summary";`)
}
