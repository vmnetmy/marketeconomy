import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cards" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cta_section" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_content_list" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_split_section" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_logo_cloud" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_timeline" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_newsletter" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_form" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_two_column_rich_text" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_video_embed" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_data_viz" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cards" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cta_section" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content_list" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_split_section" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_stats" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_form" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_two_column_rich_text" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_pricing" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD COLUMN "show_placeholder" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_data_viz" ADD COLUMN "show_placeholder" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_cards" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_cta_section" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_content_list" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_split_section" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_logo_cloud" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_timeline" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_newsletter" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_form" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_two_column_rich_text" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_video_embed" DROP COLUMN "show_placeholder";
  ALTER TABLE "pages_blocks_data_viz" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_cards" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_cta_section" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_content_list" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_split_section" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_stats" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_logo_cloud" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_newsletter" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_form" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_two_column_rich_text" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_pricing" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_video_embed" DROP COLUMN "show_placeholder";
  ALTER TABLE "_pages_v_blocks_data_viz" DROP COLUMN "show_placeholder";`)
}
