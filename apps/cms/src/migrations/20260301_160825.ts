import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_impact_items_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_impact_items_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum_posts_blocks_hero_impact_items_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_impact_items_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TABLE "pages_blocks_hero_impact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"icon" "enum_pages_blocks_hero_impact_items_icon"
  );
  
  CREATE TABLE "_pages_v_blocks_hero_impact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"icon" "enum__pages_v_blocks_hero_impact_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "posts_blocks_hero_impact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"icon" "enum_posts_blocks_hero_impact_items_icon"
  );
  
  CREATE TABLE "_posts_v_blocks_hero_impact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"icon" "enum__posts_v_blocks_hero_impact_items_icon",
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_image_url" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "latest_link_label" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "latest_link_url" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "impact_title" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "background_image_url" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "latest_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "latest_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "impact_title" varchar;
  ALTER TABLE "posts_blocks_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "posts_blocks_hero" ADD COLUMN "background_image_url" varchar;
  ALTER TABLE "posts_blocks_hero" ADD COLUMN "latest_link_label" varchar;
  ALTER TABLE "posts_blocks_hero" ADD COLUMN "latest_link_url" varchar;
  ALTER TABLE "posts_blocks_hero" ADD COLUMN "impact_title" varchar;
  ALTER TABLE "_posts_v_blocks_hero" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_posts_v_blocks_hero" ADD COLUMN "background_image_url" varchar;
  ALTER TABLE "_posts_v_blocks_hero" ADD COLUMN "latest_link_label" varchar;
  ALTER TABLE "_posts_v_blocks_hero" ADD COLUMN "latest_link_url" varchar;
  ALTER TABLE "_posts_v_blocks_hero" ADD COLUMN "impact_title" varchar;
  ALTER TABLE "pages_blocks_hero_impact_items" ADD CONSTRAINT "pages_blocks_hero_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_impact_items" ADD CONSTRAINT "_pages_v_blocks_hero_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_impact_items" ADD CONSTRAINT "posts_blocks_hero_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_impact_items" ADD CONSTRAINT "_posts_v_blocks_hero_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_impact_items_order_idx" ON "pages_blocks_hero_impact_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_impact_items_parent_id_idx" ON "pages_blocks_hero_impact_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_impact_items_order_idx" ON "_pages_v_blocks_hero_impact_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_impact_items_parent_id_idx" ON "_pages_v_blocks_hero_impact_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_impact_items_order_idx" ON "posts_blocks_hero_impact_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_impact_items_parent_id_idx" ON "posts_blocks_hero_impact_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_impact_items_order_idx" ON "_posts_v_blocks_hero_impact_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_impact_items_parent_id_idx" ON "_posts_v_blocks_hero_impact_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_impact_items" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_impact_items" CASCADE;
  DROP TABLE "posts_blocks_hero_impact_items" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_impact_items" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "background_image_url";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "latest_link_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "latest_link_url";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "impact_title";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "background_image_url";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "latest_link_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "latest_link_url";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "impact_title";
  ALTER TABLE "posts_blocks_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "posts_blocks_hero" DROP COLUMN "background_image_url";
  ALTER TABLE "posts_blocks_hero" DROP COLUMN "latest_link_label";
  ALTER TABLE "posts_blocks_hero" DROP COLUMN "latest_link_url";
  ALTER TABLE "posts_blocks_hero" DROP COLUMN "impact_title";
  ALTER TABLE "_posts_v_blocks_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "_posts_v_blocks_hero" DROP COLUMN "background_image_url";
  ALTER TABLE "_posts_v_blocks_hero" DROP COLUMN "latest_link_label";
  ALTER TABLE "_posts_v_blocks_hero" DROP COLUMN "latest_link_url";
  ALTER TABLE "_posts_v_blocks_hero" DROP COLUMN "impact_title";
  DROP TYPE "public"."enum_pages_blocks_hero_impact_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_hero_impact_items_icon";
  DROP TYPE "public"."enum_posts_blocks_hero_impact_items_icon";
  DROP TYPE "public"."enum__posts_v_blocks_hero_impact_items_icon";`)
}
