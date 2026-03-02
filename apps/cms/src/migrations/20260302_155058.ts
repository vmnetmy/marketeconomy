import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'internal',
  	"page_id" integer,
  	"url" varchar
  );
  
  ALTER TABLE "footer" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_description" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_button_label" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_button_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_fine_print" varchar;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_page_idx" ON "footer_legal_links" USING btree ("page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_legal_links" CASCADE;
  ALTER TABLE "footer" DROP COLUMN "cta_title";
  ALTER TABLE "footer" DROP COLUMN "cta_description";
  ALTER TABLE "footer" DROP COLUMN "cta_button_label";
  ALTER TABLE "footer" DROP COLUMN "cta_button_url";
  ALTER TABLE "footer" DROP COLUMN "cta_fine_print";
  DROP TYPE "public"."enum_footer_legal_links_link_type";`)
}
