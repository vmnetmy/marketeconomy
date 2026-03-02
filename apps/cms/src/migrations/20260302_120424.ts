import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer
  );
  
  CREATE TABLE "policy_briefs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer
  );
  
  CREATE TABLE "_policy_briefs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer
  );
  
  ALTER TABLE "posts" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "policy_briefs" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "_policy_briefs_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "events" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "_events_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "people" ADD COLUMN "website" varchar;
  ALTER TABLE "partners" ADD COLUMN "sort_order" numeric;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_briefs_rels" ADD CONSTRAINT "policy_briefs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."policy_briefs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_briefs_rels" ADD CONSTRAINT "policy_briefs_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v_rels" ADD CONSTRAINT "_policy_briefs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_policy_briefs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v_rels" ADD CONSTRAINT "_policy_briefs_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_people_id_idx" ON "posts_rels" USING btree ("people_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_people_id_idx" ON "_posts_v_rels" USING btree ("people_id");
  CREATE INDEX "policy_briefs_rels_order_idx" ON "policy_briefs_rels" USING btree ("order");
  CREATE INDEX "policy_briefs_rels_parent_idx" ON "policy_briefs_rels" USING btree ("parent_id");
  CREATE INDEX "policy_briefs_rels_path_idx" ON "policy_briefs_rels" USING btree ("path");
  CREATE INDEX "policy_briefs_rels_people_id_idx" ON "policy_briefs_rels" USING btree ("people_id");
  CREATE INDEX "_policy_briefs_v_rels_order_idx" ON "_policy_briefs_v_rels" USING btree ("order");
  CREATE INDEX "_policy_briefs_v_rels_parent_idx" ON "_policy_briefs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_policy_briefs_v_rels_path_idx" ON "_policy_briefs_v_rels" USING btree ("path");
  CREATE INDEX "_policy_briefs_v_rels_people_id_idx" ON "_policy_briefs_v_rels" USING btree ("people_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "policy_briefs_rels" CASCADE;
  DROP TABLE "_policy_briefs_v_rels" CASCADE;
  ALTER TABLE "posts" DROP COLUMN "featured";
  ALTER TABLE "_posts_v" DROP COLUMN "version_featured";
  ALTER TABLE "policy_briefs" DROP COLUMN "featured";
  ALTER TABLE "_policy_briefs_v" DROP COLUMN "version_featured";
  ALTER TABLE "events" DROP COLUMN "featured";
  ALTER TABLE "_events_v" DROP COLUMN "version_featured";
  ALTER TABLE "people" DROP COLUMN "website";
  ALTER TABLE "partners" DROP COLUMN "sort_order";`)
}
