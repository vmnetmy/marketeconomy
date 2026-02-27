import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_datasets_columns_type" AS ENUM('string', 'number', 'date');
  CREATE TYPE "public"."enum_datasets_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__datasets_v_version_columns_type" AS ENUM('string', 'number', 'date');
  CREATE TYPE "public"."enum__datasets_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_blocks_hero_alignment" AS ENUM('left', 'center', 'right', 'split');
  CREATE TYPE "public"."enum_pages_blocks_cards_cards_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum_pages_blocks_cta_section_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_list_source" AS ENUM('posts', 'policyBriefs', 'events');
  CREATE TYPE "public"."enum_pages_blocks_content_list_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_features_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_split_section_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_split_section_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_stats_layout" AS ENUM('grid', 'row');
  CREATE TYPE "public"."enum_pages_blocks_two_column_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_pages_blocks_data_viz_view_mode" AS ENUM('chart', 'table', 'chartAndTable');
  CREATE TYPE "public"."enum_pages_blocks_data_viz_chart_type" AS ENUM('bar', 'line', 'area', 'pie', 'donut', 'stackedBar', 'groupedBar', 'scatter', 'radar', 'heatmap', 'treemap');
  CREATE TYPE "public"."enum_pages_blocks_data_viz_color_scheme" AS ENUM('nivo', 'category10', 'paired', 'set3', 'spectral');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_alignment" AS ENUM('left', 'center', 'right', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_cards_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_section_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_list_source" AS ENUM('posts', 'policyBriefs', 'events');
  CREATE TYPE "public"."enum__pages_v_blocks_content_list_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_features_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_layout" AS ENUM('grid', 'row');
  CREATE TYPE "public"."enum__pages_v_blocks_two_column_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__pages_v_blocks_data_viz_view_mode" AS ENUM('chart', 'table', 'chartAndTable');
  CREATE TYPE "public"."enum__pages_v_blocks_data_viz_chart_type" AS ENUM('bar', 'line', 'area', 'pie', 'donut', 'stackedBar', 'groupedBar', 'scatter', 'radar', 'heatmap', 'treemap');
  CREATE TYPE "public"."enum__pages_v_blocks_data_viz_color_scheme" AS ENUM('nivo', 'category10', 'paired', 'set3', 'spectral');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_blocks_hero_alignment" AS ENUM('left', 'center', 'right', 'split');
  CREATE TYPE "public"."enum_posts_blocks_cards_cards_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum_posts_blocks_cta_section_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "public"."enum_posts_blocks_content_list_source" AS ENUM('posts', 'policyBriefs', 'events');
  CREATE TYPE "public"."enum_posts_blocks_content_list_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum_posts_blocks_feature_grid_features_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum_posts_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_blocks_split_section_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_posts_blocks_split_section_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_stats_layout" AS ENUM('grid', 'row');
  CREATE TYPE "public"."enum_posts_blocks_two_column_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_posts_blocks_data_viz_view_mode" AS ENUM('chart', 'table', 'chartAndTable');
  CREATE TYPE "public"."enum_posts_blocks_data_viz_chart_type" AS ENUM('bar', 'line', 'area', 'pie', 'donut', 'stackedBar', 'groupedBar', 'scatter', 'radar', 'heatmap', 'treemap');
  CREATE TYPE "public"."enum_posts_blocks_data_viz_color_scheme" AS ENUM('nivo', 'category10', 'paired', 'set3', 'spectral');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_alignment" AS ENUM('left', 'center', 'right', 'split');
  CREATE TYPE "public"."enum__posts_v_blocks_cards_cards_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_section_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_media_block_alignment" AS ENUM('left', 'center', 'right', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_content_list_source" AS ENUM('posts', 'policyBriefs', 'events');
  CREATE TYPE "public"."enum__posts_v_blocks_content_list_layout" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_grid_features_icon" AS ENUM('academicCap', 'adjustmentsHorizontal', 'adjustmentsVertical', 'archiveBoxArrowDown', 'archiveBox', 'archiveBoxXMark', 'arrowDownCircle', 'arrowDown', 'arrowDownLeft', 'arrowDownOnSquare', 'arrowDownOnSquareStack', 'arrowDownRight', 'arrowDownTray', 'arrowLeftCircle', 'arrowLeftEndOnRectangle', 'arrowLeft', 'arrowLeftOnRectangle', 'arrowLeftStartOnRectangle', 'arrowLongDown', 'arrowLongLeft', 'arrowLongRight', 'arrowLongUp', 'arrowPath', 'arrowPathRoundedSquare', 'arrowRightCircle', 'arrowRightEndOnRectangle', 'arrowRight', 'arrowRightOnRectangle', 'arrowRightStartOnRectangle', 'arrowSmallDown', 'arrowSmallLeft', 'arrowSmallRight', 'arrowSmallUp', 'arrowTopRightOnSquare', 'arrowTrendingDown', 'arrowTrendingUp', 'arrowTurnDownLeft', 'arrowTurnDownRight', 'arrowTurnLeftDown', 'arrowTurnLeftUp', 'arrowTurnRightDown', 'arrowTurnRightUp', 'arrowTurnUpLeft', 'arrowTurnUpRight', 'arrowUpCircle', 'arrowUp', 'arrowUpLeft', 'arrowUpOnSquare', 'arrowUpOnSquareStack', 'arrowUpRight', 'arrowUpTray', 'arrowUturnDown', 'arrowUturnLeft', 'arrowUturnRight', 'arrowUturnUp', 'arrowsPointingIn', 'arrowsPointingOut', 'arrowsRightLeft', 'arrowsUpDown', 'atSymbol', 'backspace', 'backward', 'banknotes', 'bars2', 'bars3BottomLeft', 'bars3BottomRight', 'bars3CenterLeft', 'bars3', 'bars4', 'barsArrowDown', 'barsArrowUp', 'battery0', 'battery100', 'battery50', 'beaker', 'bellAlert', 'bell', 'bellSlash', 'bellSnooze', 'bold', 'bolt', 'boltSlash', 'bookOpen', 'bookmark', 'bookmarkSlash', 'bookmarkSquare', 'briefcase', 'bugAnt', 'buildingLibrary', 'buildingOffice2', 'buildingOffice', 'buildingStorefront', 'cake', 'documentText', 'globeAlt', 'lightBulb', 'megaphone', 'scale', 'shieldCheck', 'users');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__posts_v_blocks_split_section_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_split_section_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_stats_layout" AS ENUM('grid', 'row');
  CREATE TYPE "public"."enum__posts_v_blocks_two_column_rich_text_background" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__posts_v_blocks_data_viz_view_mode" AS ENUM('chart', 'table', 'chartAndTable');
  CREATE TYPE "public"."enum__posts_v_blocks_data_viz_chart_type" AS ENUM('bar', 'line', 'area', 'pie', 'donut', 'stackedBar', 'groupedBar', 'scatter', 'radar', 'heatmap', 'treemap');
  CREATE TYPE "public"."enum__posts_v_blocks_data_viz_color_scheme" AS ENUM('nivo', 'category10', 'paired', 'set3', 'spectral');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_policy_briefs_brief_type" AS ENUM('policy', 'research', 'report');
  CREATE TYPE "public"."enum_policy_briefs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__policy_briefs_v_version_brief_type" AS ENUM('policy', 'research', 'report');
  CREATE TYPE "public"."enum__policy_briefs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_event_status" AS ENUM('upcoming', 'past');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_event_status" AS ENUM('upcoming', 'past');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_partners_category" AS ENUM('strategic', 'program', 'funding');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('x', 'facebook', 'linkedin', 'instagram', 'youtube');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "datasets_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum_datasets_columns_type"
  );
  
  CREATE TABLE "datasets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"rows" jsonb,
  	"row_count" numeric,
  	"is_truncated" boolean,
  	"parse_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_datasets_status" DEFAULT 'draft',
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "_datasets_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"label" varchar,
  	"type" "enum__datasets_v_version_columns_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_datasets_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_rows" jsonb,
  	"version_row_count" numeric,
  	"version_is_truncated" boolean,
  	"version_parse_error" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__datasets_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subheadline" varchar,
  	"background_image_id" integer,
  	"primary_c_t_a_label" varchar,
  	"primary_c_t_a_url" varchar,
  	"secondary_c_t_a_label" varchar,
  	"secondary_c_t_a_url" varchar,
  	"alignment" "enum_pages_blocks_hero_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_cards_cards_icon",
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_u_r_l" varchar,
  	"theme" "enum_pages_blocks_cta_section_theme" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"alignment" "enum_pages_blocks_media_block_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_content_list_source",
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_content_list_layout" DEFAULT 'list',
  	"filter_tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_feature_grid_features_icon",
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"media_id" integer,
  	"media_position" "enum_pages_blocks_split_section_media_position" DEFAULT 'right',
  	"background" "enum_pages_blocks_split_section_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"layout" "enum_pages_blocks_stats_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"organization" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"input_placeholder" varchar DEFAULT 'Enter your email',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"form_action" varchar,
  	"fine_print" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_column_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left" jsonb,
  	"right" jsonb,
  	"background" "enum_pages_blocks_two_column_rich_text_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"embed_url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_pages_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_data_viz_value_keys" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar
  );
  
  CREATE TABLE "pages_blocks_data_viz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"dataset_id" integer,
  	"view_mode" "enum_pages_blocks_data_viz_view_mode" DEFAULT 'chart',
  	"chart_type" "enum_pages_blocks_data_viz_chart_type" DEFAULT 'bar',
  	"index_by" varchar,
  	"value_key" varchar,
  	"x_key" varchar,
  	"y_key" varchar,
  	"series_key" varchar,
  	"color_scheme" "enum_pages_blocks_data_viz_color_scheme" DEFAULT 'nivo',
  	"height" numeric DEFAULT 360,
  	"show_legend" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subheadline" varchar,
  	"background_image_id" integer,
  	"primary_c_t_a_label" varchar,
  	"primary_c_t_a_url" varchar,
  	"secondary_c_t_a_label" varchar,
  	"secondary_c_t_a_url" varchar,
  	"alignment" "enum__pages_v_blocks_hero_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_cards_cards_icon",
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_u_r_l" varchar,
  	"theme" "enum__pages_v_blocks_cta_section_theme" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"alignment" "enum__pages_v_blocks_media_block_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_content_list_source",
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_content_list_layout" DEFAULT 'list',
  	"filter_tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_feature_grid_features_icon",
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"media_id" integer,
  	"media_position" "enum__pages_v_blocks_split_section_media_position" DEFAULT 'right',
  	"background" "enum__pages_v_blocks_split_section_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"layout" "enum__pages_v_blocks_stats_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"organization" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"input_placeholder" varchar DEFAULT 'Enter your email',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"form_action" varchar,
  	"fine_print" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_column_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left" jsonb,
  	"right" jsonb,
  	"background" "enum__pages_v_blocks_two_column_rich_text_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"embed_url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__pages_v_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_data_viz_value_keys" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_data_viz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"dataset_id" integer,
  	"view_mode" "enum__pages_v_blocks_data_viz_view_mode" DEFAULT 'chart',
  	"chart_type" "enum__pages_v_blocks_data_viz_chart_type" DEFAULT 'bar',
  	"index_by" varchar,
  	"value_key" varchar,
  	"x_key" varchar,
  	"y_key" varchar,
  	"series_key" varchar,
  	"color_scheme" "enum__pages_v_blocks_data_viz_color_scheme" DEFAULT 'nivo',
  	"height" numeric DEFAULT 360,
  	"show_legend" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "posts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subheadline" varchar,
  	"background_image_id" integer,
  	"primary_c_t_a_label" varchar,
  	"primary_c_t_a_url" varchar,
  	"secondary_c_t_a_label" varchar,
  	"secondary_c_t_a_url" varchar,
  	"alignment" "enum_posts_blocks_hero_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_posts_blocks_cards_cards_icon",
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "posts_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_u_r_l" varchar,
  	"theme" "enum_posts_blocks_cta_section_theme" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"alignment" "enum_posts_blocks_media_block_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "posts_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_posts_blocks_content_list_source",
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_posts_blocks_content_list_layout" DEFAULT 'list',
  	"filter_tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_posts_blocks_feature_grid_features_icon",
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"columns" "enum_posts_blocks_feature_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"media_id" integer,
  	"media_position" "enum_posts_blocks_split_section_media_position" DEFAULT 'right',
  	"background" "enum_posts_blocks_split_section_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "posts_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"layout" "enum_posts_blocks_stats_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"organization" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "posts_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"input_placeholder" varchar DEFAULT 'Enter your email',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"form_action" varchar,
  	"fine_print" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_two_column_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left" jsonb,
  	"right" jsonb,
  	"background" "enum_posts_blocks_two_column_rich_text_background" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "posts_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"embed_url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_posts_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_data_viz_value_keys" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar
  );
  
  CREATE TABLE "posts_blocks_data_viz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"dataset_id" integer,
  	"view_mode" "enum_posts_blocks_data_viz_view_mode" DEFAULT 'chart',
  	"chart_type" "enum_posts_blocks_data_viz_chart_type" DEFAULT 'bar',
  	"index_by" varchar,
  	"value_key" varchar,
  	"x_key" varchar,
  	"y_key" varchar,
  	"series_key" varchar,
  	"color_scheme" "enum_posts_blocks_data_viz_color_scheme" DEFAULT 'nivo',
  	"height" numeric DEFAULT 360,
  	"show_legend" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subheadline" varchar,
  	"background_image_id" integer,
  	"primary_c_t_a_label" varchar,
  	"primary_c_t_a_url" varchar,
  	"secondary_c_t_a_label" varchar,
  	"secondary_c_t_a_url" varchar,
  	"alignment" "enum__posts_v_blocks_hero_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__posts_v_blocks_cards_cards_icon",
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"section_intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_u_r_l" varchar,
  	"theme" "enum__posts_v_blocks_cta_section_theme" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"alignment" "enum__posts_v_blocks_media_block_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__posts_v_blocks_content_list_source",
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__posts_v_blocks_content_list_layout" DEFAULT 'list',
  	"filter_tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_grid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__posts_v_blocks_feature_grid_features_icon",
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"columns" "enum__posts_v_blocks_feature_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"media_id" integer,
  	"media_position" "enum__posts_v_blocks_split_section_media_position" DEFAULT 'right',
  	"background" "enum__posts_v_blocks_split_section_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"layout" "enum__posts_v_blocks_stats_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"organization" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"input_placeholder" varchar DEFAULT 'Enter your email',
  	"button_label" varchar DEFAULT 'Subscribe',
  	"form_action" varchar,
  	"fine_print" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_two_column_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left" jsonb,
  	"right" jsonb,
  	"background" "enum__posts_v_blocks_two_column_rich_text_background" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"embed_url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__posts_v_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_data_viz_value_keys" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_data_viz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"description" varchar,
  	"dataset_id" integer,
  	"view_mode" "enum__posts_v_blocks_data_viz_view_mode" DEFAULT 'chart',
  	"chart_type" "enum__posts_v_blocks_data_viz_chart_type" DEFAULT 'bar',
  	"index_by" varchar,
  	"value_key" varchar,
  	"x_key" varchar,
  	"y_key" varchar,
  	"series_key" varchar,
  	"color_scheme" "enum__posts_v_blocks_data_viz_color_scheme" DEFAULT 'nivo',
  	"height" numeric DEFAULT 360,
  	"show_legend" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_cover_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "policy_briefs_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "policy_briefs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"brief_type" "enum_policy_briefs_brief_type",
  	"pdf_file_id" integer,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_policy_briefs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_policy_briefs_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_policy_briefs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_brief_type" "enum__policy_briefs_v_version_brief_type",
  	"version_pdf_file_id" integer,
  	"version_cover_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__policy_briefs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "events_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar,
  	"registration_link" varchar,
  	"description" jsonb,
  	"event_status" "enum_events_event_status" DEFAULT 'upcoming',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_events_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_registration_link" varchar,
  	"version_description" jsonb,
  	"version_event_status" "enum__events_v_version_event_status" DEFAULT 'upcoming',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"role_title" varchar,
  	"photo_id" integer,
  	"bio" jsonb,
  	"email" varchar,
  	"phone" varchar,
  	"sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"description" varchar,
  	"category" "enum_partners_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"datasets_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"policy_briefs_id" integer,
  	"events_id" integer,
  	"people_id" integer,
  	"partners_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"tagline" varchar,
  	"logo_id" integer,
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"default_seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'internal',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'internal',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_address" varchar,
  	"copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "updates_sidebar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_headline" varchar,
  	"newsletter_description" varchar,
  	"button_label" varchar,
  	"form_action" varchar,
  	"fine_print" varchar,
  	"featured_title" varchar,
  	"featured_limit" numeric DEFAULT 3,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "datasets_columns" ADD CONSTRAINT "datasets_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."datasets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_datasets_v_version_columns" ADD CONSTRAINT "_datasets_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_datasets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_datasets_v" ADD CONSTRAINT "_datasets_v_parent_id_datasets_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."datasets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_cards" ADD CONSTRAINT "pages_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards" ADD CONSTRAINT "pages_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_section" ADD CONSTRAINT "pages_blocks_cta_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_list" ADD CONSTRAINT "pages_blocks_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_features" ADD CONSTRAINT "pages_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column_rich_text" ADD CONSTRAINT "pages_blocks_two_column_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tiers_features" ADD CONSTRAINT "pages_blocks_pricing_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tiers" ADD CONSTRAINT "pages_blocks_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_data_viz_value_keys" ADD CONSTRAINT "pages_blocks_data_viz_value_keys_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_data_viz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_data_viz" ADD CONSTRAINT "pages_blocks_data_viz_dataset_id_datasets_id_fk" FOREIGN KEY ("dataset_id") REFERENCES "public"."datasets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_data_viz" ADD CONSTRAINT "pages_blocks_data_viz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards" ADD CONSTRAINT "_pages_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_section" ADD CONSTRAINT "_pages_v_blocks_cta_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_list" ADD CONSTRAINT "_pages_v_blocks_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_features" ADD CONSTRAINT "_pages_v_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_column_rich_text" ADD CONSTRAINT "_pages_v_blocks_two_column_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_tiers_features" ADD CONSTRAINT "_pages_v_blocks_pricing_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_tiers" ADD CONSTRAINT "_pages_v_blocks_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_data_viz_value_keys" ADD CONSTRAINT "_pages_v_blocks_data_viz_value_keys_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_data_viz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_data_viz" ADD CONSTRAINT "_pages_v_blocks_data_viz_dataset_id_datasets_id_fk" FOREIGN KEY ("dataset_id") REFERENCES "public"."datasets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_data_viz" ADD CONSTRAINT "_pages_v_blocks_data_viz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text" ADD CONSTRAINT "posts_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cards_cards" ADD CONSTRAINT "posts_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cards" ADD CONSTRAINT "posts_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_section" ADD CONSTRAINT "posts_blocks_cta_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items" ADD CONSTRAINT "posts_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_list" ADD CONSTRAINT "posts_blocks_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid_features" ADD CONSTRAINT "posts_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid" ADD CONSTRAINT "posts_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_split_section" ADD CONSTRAINT "posts_blocks_split_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_split_section" ADD CONSTRAINT "posts_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_stats" ADD CONSTRAINT "posts_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats" ADD CONSTRAINT "posts_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud_logos" ADD CONSTRAINT "posts_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud_logos" ADD CONSTRAINT "posts_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud" ADD CONSTRAINT "posts_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items" ADD CONSTRAINT "posts_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items" ADD CONSTRAINT "posts_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials" ADD CONSTRAINT "posts_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline_items" ADD CONSTRAINT "posts_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline" ADD CONSTRAINT "posts_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_newsletter" ADD CONSTRAINT "posts_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_two_column_rich_text" ADD CONSTRAINT "posts_blocks_two_column_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_tiers_features" ADD CONSTRAINT "posts_blocks_pricing_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_tiers" ADD CONSTRAINT "posts_blocks_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing" ADD CONSTRAINT "posts_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_video_embed" ADD CONSTRAINT "posts_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_data_viz_value_keys" ADD CONSTRAINT "posts_blocks_data_viz_value_keys_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_data_viz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_data_viz" ADD CONSTRAINT "posts_blocks_data_viz_dataset_id_datasets_id_fk" FOREIGN KEY ("dataset_id") REFERENCES "public"."datasets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_data_viz" ADD CONSTRAINT "posts_blocks_data_viz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text" ADD CONSTRAINT "_posts_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cards_cards" ADD CONSTRAINT "_posts_v_blocks_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cards" ADD CONSTRAINT "_posts_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_section" ADD CONSTRAINT "_posts_v_blocks_cta_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items" ADD CONSTRAINT "_posts_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_list" ADD CONSTRAINT "_posts_v_blocks_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid_features" ADD CONSTRAINT "_posts_v_blocks_feature_grid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid" ADD CONSTRAINT "_posts_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_split_section" ADD CONSTRAINT "_posts_v_blocks_split_section_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_split_section" ADD CONSTRAINT "_posts_v_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_stats" ADD CONSTRAINT "_posts_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats" ADD CONSTRAINT "_posts_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials" ADD CONSTRAINT "_posts_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline_items" ADD CONSTRAINT "_posts_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline" ADD CONSTRAINT "_posts_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_newsletter" ADD CONSTRAINT "_posts_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_two_column_rich_text" ADD CONSTRAINT "_posts_v_blocks_two_column_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_tiers_features" ADD CONSTRAINT "_posts_v_blocks_pricing_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_tiers" ADD CONSTRAINT "_posts_v_blocks_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing" ADD CONSTRAINT "_posts_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_video_embed" ADD CONSTRAINT "_posts_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_data_viz_value_keys" ADD CONSTRAINT "_posts_v_blocks_data_viz_value_keys_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_data_viz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_data_viz" ADD CONSTRAINT "_posts_v_blocks_data_viz_dataset_id_datasets_id_fk" FOREIGN KEY ("dataset_id") REFERENCES "public"."datasets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_data_viz" ADD CONSTRAINT "_posts_v_blocks_data_viz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_briefs_tags" ADD CONSTRAINT "policy_briefs_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_briefs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_briefs" ADD CONSTRAINT "policy_briefs_pdf_file_id_media_id_fk" FOREIGN KEY ("pdf_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_briefs" ADD CONSTRAINT "policy_briefs_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_briefs" ADD CONSTRAINT "policy_briefs_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v_version_tags" ADD CONSTRAINT "_policy_briefs_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_policy_briefs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v" ADD CONSTRAINT "_policy_briefs_v_parent_id_policy_briefs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."policy_briefs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v" ADD CONSTRAINT "_policy_briefs_v_version_pdf_file_id_media_id_fk" FOREIGN KEY ("version_pdf_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v" ADD CONSTRAINT "_policy_briefs_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_policy_briefs_v" ADD CONSTRAINT "_policy_briefs_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_tags" ADD CONSTRAINT "events_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_tags" ADD CONSTRAINT "_events_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_datasets_fk" FOREIGN KEY ("datasets_id") REFERENCES "public"."datasets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policy_briefs_fk" FOREIGN KEY ("policy_briefs_id") REFERENCES "public"."policy_briefs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "datasets_columns_order_idx" ON "datasets_columns" USING btree ("_order");
  CREATE INDEX "datasets_columns_parent_id_idx" ON "datasets_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "datasets_slug_idx" ON "datasets" USING btree ("slug");
  CREATE INDEX "datasets_updated_at_idx" ON "datasets" USING btree ("updated_at");
  CREATE INDEX "datasets_created_at_idx" ON "datasets" USING btree ("created_at");
  CREATE INDEX "datasets__status_idx" ON "datasets" USING btree ("_status");
  CREATE UNIQUE INDEX "datasets_filename_idx" ON "datasets" USING btree ("filename");
  CREATE INDEX "_datasets_v_version_columns_order_idx" ON "_datasets_v_version_columns" USING btree ("_order");
  CREATE INDEX "_datasets_v_version_columns_parent_id_idx" ON "_datasets_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_datasets_v_parent_idx" ON "_datasets_v" USING btree ("parent_id");
  CREATE INDEX "_datasets_v_version_version_slug_idx" ON "_datasets_v" USING btree ("version_slug");
  CREATE INDEX "_datasets_v_version_version_updated_at_idx" ON "_datasets_v" USING btree ("version_updated_at");
  CREATE INDEX "_datasets_v_version_version_created_at_idx" ON "_datasets_v" USING btree ("version_created_at");
  CREATE INDEX "_datasets_v_version_version__status_idx" ON "_datasets_v" USING btree ("version__status");
  CREATE INDEX "_datasets_v_version_version_filename_idx" ON "_datasets_v" USING btree ("version_filename");
  CREATE INDEX "_datasets_v_created_at_idx" ON "_datasets_v" USING btree ("created_at");
  CREATE INDEX "_datasets_v_updated_at_idx" ON "_datasets_v" USING btree ("updated_at");
  CREATE INDEX "_datasets_v_latest_idx" ON "_datasets_v" USING btree ("latest");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_cards_cards_order_idx" ON "pages_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_cards_parent_id_idx" ON "pages_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_order_idx" ON "pages_blocks_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_parent_id_idx" ON "pages_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_path_idx" ON "pages_blocks_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_section_order_idx" ON "pages_blocks_cta_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_section_parent_id_idx" ON "pages_blocks_cta_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_section_path_idx" ON "pages_blocks_cta_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_list_order_idx" ON "pages_blocks_content_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_list_parent_id_idx" ON "pages_blocks_content_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_list_path_idx" ON "pages_blocks_content_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_features_order_idx" ON "pages_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_features_parent_id_idx" ON "pages_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_section_order_idx" ON "pages_blocks_split_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_section_parent_id_idx" ON "pages_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_section_path_idx" ON "pages_blocks_split_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_section_media_idx" ON "pages_blocks_split_section" USING btree ("media_id");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_logos_order_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_logos_parent_id_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_logo_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_avatar_idx" ON "pages_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_rich_text_order_idx" ON "pages_blocks_two_column_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_column_rich_text_parent_id_idx" ON "pages_blocks_two_column_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_column_rich_text_path_idx" ON "pages_blocks_two_column_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_tiers_features_order_idx" ON "pages_blocks_pricing_tiers_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_tiers_features_parent_id_idx" ON "pages_blocks_pricing_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_tiers_order_idx" ON "pages_blocks_pricing_tiers" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_tiers_parent_id_idx" ON "pages_blocks_pricing_tiers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_embed_order_idx" ON "pages_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_embed_parent_id_idx" ON "pages_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_path_idx" ON "pages_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_data_viz_value_keys_order_idx" ON "pages_blocks_data_viz_value_keys" USING btree ("_order");
  CREATE INDEX "pages_blocks_data_viz_value_keys_parent_id_idx" ON "pages_blocks_data_viz_value_keys" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_data_viz_order_idx" ON "pages_blocks_data_viz" USING btree ("_order");
  CREATE INDEX "pages_blocks_data_viz_parent_id_idx" ON "pages_blocks_data_viz" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_data_viz_path_idx" ON "pages_blocks_data_viz" USING btree ("_path");
  CREATE INDEX "pages_blocks_data_viz_dataset_idx" ON "pages_blocks_data_viz" USING btree ("dataset_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cards_cards_order_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_cards_parent_id_idx" ON "_pages_v_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_order_idx" ON "_pages_v_blocks_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_parent_id_idx" ON "_pages_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_path_idx" ON "_pages_v_blocks_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_section_order_idx" ON "_pages_v_blocks_cta_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_section_parent_id_idx" ON "_pages_v_blocks_cta_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_section_path_idx" ON "_pages_v_blocks_cta_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_list_order_idx" ON "_pages_v_blocks_content_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_list_parent_id_idx" ON "_pages_v_blocks_content_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_list_path_idx" ON "_pages_v_blocks_content_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_order_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_features_parent_id_idx" ON "_pages_v_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_section_order_idx" ON "_pages_v_blocks_split_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_section_parent_id_idx" ON "_pages_v_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_section_path_idx" ON "_pages_v_blocks_split_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_section_media_idx" ON "_pages_v_blocks_split_section" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_order_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_logo_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_avatar_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_column_rich_text_order_idx" ON "_pages_v_blocks_two_column_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_column_rich_text_parent_id_idx" ON "_pages_v_blocks_two_column_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_column_rich_text_path_idx" ON "_pages_v_blocks_two_column_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_features_order_idx" ON "_pages_v_blocks_pricing_tiers_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_features_parent_id_idx" ON "_pages_v_blocks_pricing_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_order_idx" ON "_pages_v_blocks_pricing_tiers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_tiers_parent_id_idx" ON "_pages_v_blocks_pricing_tiers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_embed_order_idx" ON "_pages_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_embed_parent_id_idx" ON "_pages_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_path_idx" ON "_pages_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_data_viz_value_keys_order_idx" ON "_pages_v_blocks_data_viz_value_keys" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_data_viz_value_keys_parent_id_idx" ON "_pages_v_blocks_data_viz_value_keys" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_data_viz_order_idx" ON "_pages_v_blocks_data_viz" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_data_viz_parent_id_idx" ON "_pages_v_blocks_data_viz" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_data_viz_path_idx" ON "_pages_v_blocks_data_viz" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_data_viz_dataset_idx" ON "_pages_v_blocks_data_viz" USING btree ("dataset_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_background_image_idx" ON "posts_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "posts_blocks_rich_text_order_idx" ON "posts_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_rich_text_parent_id_idx" ON "posts_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_path_idx" ON "posts_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_cards_cards_order_idx" ON "posts_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_cards_cards_parent_id_idx" ON "posts_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cards_order_idx" ON "posts_blocks_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_cards_parent_id_idx" ON "posts_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cards_path_idx" ON "posts_blocks_cards" USING btree ("_path");
  CREATE INDEX "posts_blocks_cta_section_order_idx" ON "posts_blocks_cta_section" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_section_parent_id_idx" ON "posts_blocks_cta_section" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_section_path_idx" ON "posts_blocks_cta_section" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_block_order_idx" ON "posts_blocks_media_block" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_block_parent_id_idx" ON "posts_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_block_path_idx" ON "posts_blocks_media_block" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_block_media_idx" ON "posts_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "posts_blocks_faq_items_order_idx" ON "posts_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_items_parent_id_idx" ON "posts_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_order_idx" ON "posts_blocks_faq" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_parent_id_idx" ON "posts_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_path_idx" ON "posts_blocks_faq" USING btree ("_path");
  CREATE INDEX "posts_blocks_content_list_order_idx" ON "posts_blocks_content_list" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_list_parent_id_idx" ON "posts_blocks_content_list" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_list_path_idx" ON "posts_blocks_content_list" USING btree ("_path");
  CREATE INDEX "posts_blocks_feature_grid_features_order_idx" ON "posts_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_grid_features_parent_id_idx" ON "posts_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_order_idx" ON "posts_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_grid_parent_id_idx" ON "posts_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_path_idx" ON "posts_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_split_section_order_idx" ON "posts_blocks_split_section" USING btree ("_order");
  CREATE INDEX "posts_blocks_split_section_parent_id_idx" ON "posts_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_split_section_path_idx" ON "posts_blocks_split_section" USING btree ("_path");
  CREATE INDEX "posts_blocks_split_section_media_idx" ON "posts_blocks_split_section" USING btree ("media_id");
  CREATE INDEX "posts_blocks_stats_stats_order_idx" ON "posts_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_stats_parent_id_idx" ON "posts_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_order_idx" ON "posts_blocks_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_parent_id_idx" ON "posts_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_path_idx" ON "posts_blocks_stats" USING btree ("_path");
  CREATE INDEX "posts_blocks_logo_cloud_logos_order_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_cloud_logos_parent_id_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_cloud_logos_logo_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "posts_blocks_logo_cloud_order_idx" ON "posts_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_cloud_parent_id_idx" ON "posts_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_cloud_path_idx" ON "posts_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "posts_blocks_testimonials_items_order_idx" ON "posts_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_items_parent_id_idx" ON "posts_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_items_avatar_idx" ON "posts_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "posts_blocks_testimonials_order_idx" ON "posts_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_parent_id_idx" ON "posts_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_path_idx" ON "posts_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "posts_blocks_timeline_items_order_idx" ON "posts_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_timeline_items_parent_id_idx" ON "posts_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_timeline_order_idx" ON "posts_blocks_timeline" USING btree ("_order");
  CREATE INDEX "posts_blocks_timeline_parent_id_idx" ON "posts_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_timeline_path_idx" ON "posts_blocks_timeline" USING btree ("_path");
  CREATE INDEX "posts_blocks_newsletter_order_idx" ON "posts_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "posts_blocks_newsletter_parent_id_idx" ON "posts_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_newsletter_path_idx" ON "posts_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "posts_blocks_two_column_rich_text_order_idx" ON "posts_blocks_two_column_rich_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_two_column_rich_text_parent_id_idx" ON "posts_blocks_two_column_rich_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_two_column_rich_text_path_idx" ON "posts_blocks_two_column_rich_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_pricing_tiers_features_order_idx" ON "posts_blocks_pricing_tiers_features" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_tiers_features_parent_id_idx" ON "posts_blocks_pricing_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_tiers_order_idx" ON "posts_blocks_pricing_tiers" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_tiers_parent_id_idx" ON "posts_blocks_pricing_tiers" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_order_idx" ON "posts_blocks_pricing" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_parent_id_idx" ON "posts_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_path_idx" ON "posts_blocks_pricing" USING btree ("_path");
  CREATE INDEX "posts_blocks_video_embed_order_idx" ON "posts_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "posts_blocks_video_embed_parent_id_idx" ON "posts_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_video_embed_path_idx" ON "posts_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "posts_blocks_data_viz_value_keys_order_idx" ON "posts_blocks_data_viz_value_keys" USING btree ("_order");
  CREATE INDEX "posts_blocks_data_viz_value_keys_parent_id_idx" ON "posts_blocks_data_viz_value_keys" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_data_viz_order_idx" ON "posts_blocks_data_viz" USING btree ("_order");
  CREATE INDEX "posts_blocks_data_viz_parent_id_idx" ON "posts_blocks_data_viz" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_data_viz_path_idx" ON "posts_blocks_data_viz" USING btree ("_path");
  CREATE INDEX "posts_blocks_data_viz_dataset_idx" ON "posts_blocks_data_viz" USING btree ("dataset_id");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_blocks_hero_order_idx" ON "_posts_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_parent_id_idx" ON "_posts_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_path_idx" ON "_posts_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hero_background_image_idx" ON "_posts_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_posts_v_blocks_rich_text_order_idx" ON "_posts_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_rich_text_parent_id_idx" ON "_posts_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_path_idx" ON "_posts_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_cards_cards_order_idx" ON "_posts_v_blocks_cards_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cards_cards_parent_id_idx" ON "_posts_v_blocks_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cards_order_idx" ON "_posts_v_blocks_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cards_parent_id_idx" ON "_posts_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cards_path_idx" ON "_posts_v_blocks_cards" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_cta_section_order_idx" ON "_posts_v_blocks_cta_section" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_section_parent_id_idx" ON "_posts_v_blocks_cta_section" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_section_path_idx" ON "_posts_v_blocks_cta_section" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_block_order_idx" ON "_posts_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_block_parent_id_idx" ON "_posts_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_block_path_idx" ON "_posts_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_block_media_idx" ON "_posts_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_faq_items_order_idx" ON "_posts_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_items_parent_id_idx" ON "_posts_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_order_idx" ON "_posts_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_parent_id_idx" ON "_posts_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_path_idx" ON "_posts_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_content_list_order_idx" ON "_posts_v_blocks_content_list" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_list_parent_id_idx" ON "_posts_v_blocks_content_list" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_list_path_idx" ON "_posts_v_blocks_content_list" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_feature_grid_features_order_idx" ON "_posts_v_blocks_feature_grid_features" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_grid_features_parent_id_idx" ON "_posts_v_blocks_feature_grid_features" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_order_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_grid_parent_id_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_path_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_split_section_order_idx" ON "_posts_v_blocks_split_section" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_split_section_parent_id_idx" ON "_posts_v_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_split_section_path_idx" ON "_posts_v_blocks_split_section" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_split_section_media_idx" ON "_posts_v_blocks_split_section" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_stats_stats_order_idx" ON "_posts_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_stats_parent_id_idx" ON "_posts_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_order_idx" ON "_posts_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_parent_id_idx" ON "_posts_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_path_idx" ON "_posts_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_order_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_parent_id_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_logo_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_order_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_cloud_parent_id_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_path_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_testimonials_items_order_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_items_parent_id_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_items_avatar_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_posts_v_blocks_testimonials_order_idx" ON "_posts_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_parent_id_idx" ON "_posts_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_path_idx" ON "_posts_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_timeline_items_order_idx" ON "_posts_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_timeline_items_parent_id_idx" ON "_posts_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_timeline_order_idx" ON "_posts_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_timeline_parent_id_idx" ON "_posts_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_timeline_path_idx" ON "_posts_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_newsletter_order_idx" ON "_posts_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_newsletter_parent_id_idx" ON "_posts_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_newsletter_path_idx" ON "_posts_v_blocks_newsletter" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_two_column_rich_text_order_idx" ON "_posts_v_blocks_two_column_rich_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_two_column_rich_text_parent_id_idx" ON "_posts_v_blocks_two_column_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_two_column_rich_text_path_idx" ON "_posts_v_blocks_two_column_rich_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_pricing_tiers_features_order_idx" ON "_posts_v_blocks_pricing_tiers_features" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_tiers_features_parent_id_idx" ON "_posts_v_blocks_pricing_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_tiers_order_idx" ON "_posts_v_blocks_pricing_tiers" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_tiers_parent_id_idx" ON "_posts_v_blocks_pricing_tiers" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_order_idx" ON "_posts_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_parent_id_idx" ON "_posts_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_path_idx" ON "_posts_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_video_embed_order_idx" ON "_posts_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_video_embed_parent_id_idx" ON "_posts_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_video_embed_path_idx" ON "_posts_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_data_viz_value_keys_order_idx" ON "_posts_v_blocks_data_viz_value_keys" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_data_viz_value_keys_parent_id_idx" ON "_posts_v_blocks_data_viz_value_keys" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_data_viz_order_idx" ON "_posts_v_blocks_data_viz" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_data_viz_parent_id_idx" ON "_posts_v_blocks_data_viz" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_data_viz_path_idx" ON "_posts_v_blocks_data_viz" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_data_viz_dataset_idx" ON "_posts_v_blocks_data_viz" USING btree ("dataset_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "policy_briefs_tags_order_idx" ON "policy_briefs_tags" USING btree ("_order");
  CREATE INDEX "policy_briefs_tags_parent_id_idx" ON "policy_briefs_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "policy_briefs_slug_idx" ON "policy_briefs" USING btree ("slug");
  CREATE INDEX "policy_briefs_pdf_file_idx" ON "policy_briefs" USING btree ("pdf_file_id");
  CREATE INDEX "policy_briefs_cover_image_idx" ON "policy_briefs" USING btree ("cover_image_id");
  CREATE INDEX "policy_briefs_seo_seo_og_image_idx" ON "policy_briefs" USING btree ("seo_og_image_id");
  CREATE INDEX "policy_briefs_updated_at_idx" ON "policy_briefs" USING btree ("updated_at");
  CREATE INDEX "policy_briefs_created_at_idx" ON "policy_briefs" USING btree ("created_at");
  CREATE INDEX "policy_briefs__status_idx" ON "policy_briefs" USING btree ("_status");
  CREATE INDEX "_policy_briefs_v_version_tags_order_idx" ON "_policy_briefs_v_version_tags" USING btree ("_order");
  CREATE INDEX "_policy_briefs_v_version_tags_parent_id_idx" ON "_policy_briefs_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_policy_briefs_v_parent_idx" ON "_policy_briefs_v" USING btree ("parent_id");
  CREATE INDEX "_policy_briefs_v_version_version_slug_idx" ON "_policy_briefs_v" USING btree ("version_slug");
  CREATE INDEX "_policy_briefs_v_version_version_pdf_file_idx" ON "_policy_briefs_v" USING btree ("version_pdf_file_id");
  CREATE INDEX "_policy_briefs_v_version_version_cover_image_idx" ON "_policy_briefs_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_policy_briefs_v_version_seo_version_seo_og_image_idx" ON "_policy_briefs_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_policy_briefs_v_version_version_updated_at_idx" ON "_policy_briefs_v" USING btree ("version_updated_at");
  CREATE INDEX "_policy_briefs_v_version_version_created_at_idx" ON "_policy_briefs_v" USING btree ("version_created_at");
  CREATE INDEX "_policy_briefs_v_version_version__status_idx" ON "_policy_briefs_v" USING btree ("version__status");
  CREATE INDEX "_policy_briefs_v_created_at_idx" ON "_policy_briefs_v" USING btree ("created_at");
  CREATE INDEX "_policy_briefs_v_updated_at_idx" ON "_policy_briefs_v" USING btree ("updated_at");
  CREATE INDEX "_policy_briefs_v_latest_idx" ON "_policy_briefs_v" USING btree ("latest");
  CREATE INDEX "events_tags_order_idx" ON "events_tags" USING btree ("_order");
  CREATE INDEX "events_tags_parent_id_idx" ON "events_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_seo_seo_og_image_idx" ON "events" USING btree ("seo_og_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "_events_v_version_tags_order_idx" ON "_events_v_version_tags" USING btree ("_order");
  CREATE INDEX "_events_v_version_tags_parent_id_idx" ON "_events_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_seo_version_seo_og_image_idx" ON "_events_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "people_photo_idx" ON "people" USING btree ("photo_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_datasets_id_idx" ON "payload_locked_documents_rels" USING btree ("datasets_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_policy_briefs_id_idx" ON "payload_locked_documents_rels" USING btree ("policy_briefs_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_default_seo_default_seo_image_idx" ON "site_settings" USING btree ("default_seo_image_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_page_idx" ON "header_nav_items" USING btree ("page_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_page_idx" ON "footer_columns_links" USING btree ("page_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "datasets_columns" CASCADE;
  DROP TABLE "datasets" CASCADE;
  DROP TABLE "_datasets_v_version_columns" CASCADE;
  DROP TABLE "_datasets_v" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_cards" CASCADE;
  DROP TABLE "pages_blocks_cta_section" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_content_list" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_features" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_split_section" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_two_column_rich_text" CASCADE;
  DROP TABLE "pages_blocks_pricing_tiers_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_tiers" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_video_embed" CASCADE;
  DROP TABLE "pages_blocks_data_viz_value_keys" CASCADE;
  DROP TABLE "pages_blocks_data_viz" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_section" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_content_list" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_features" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_split_section" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_two_column_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_tiers_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_tiers" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_data_viz_value_keys" CASCADE;
  DROP TABLE "_pages_v_blocks_data_viz" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_rich_text" CASCADE;
  DROP TABLE "posts_blocks_cards_cards" CASCADE;
  DROP TABLE "posts_blocks_cards" CASCADE;
  DROP TABLE "posts_blocks_cta_section" CASCADE;
  DROP TABLE "posts_blocks_media_block" CASCADE;
  DROP TABLE "posts_blocks_faq_items" CASCADE;
  DROP TABLE "posts_blocks_faq" CASCADE;
  DROP TABLE "posts_blocks_content_list" CASCADE;
  DROP TABLE "posts_blocks_feature_grid_features" CASCADE;
  DROP TABLE "posts_blocks_feature_grid" CASCADE;
  DROP TABLE "posts_blocks_split_section" CASCADE;
  DROP TABLE "posts_blocks_stats_stats" CASCADE;
  DROP TABLE "posts_blocks_stats" CASCADE;
  DROP TABLE "posts_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "posts_blocks_logo_cloud" CASCADE;
  DROP TABLE "posts_blocks_testimonials_items" CASCADE;
  DROP TABLE "posts_blocks_testimonials" CASCADE;
  DROP TABLE "posts_blocks_timeline_items" CASCADE;
  DROP TABLE "posts_blocks_timeline" CASCADE;
  DROP TABLE "posts_blocks_newsletter" CASCADE;
  DROP TABLE "posts_blocks_two_column_rich_text" CASCADE;
  DROP TABLE "posts_blocks_pricing_tiers_features" CASCADE;
  DROP TABLE "posts_blocks_pricing_tiers" CASCADE;
  DROP TABLE "posts_blocks_pricing" CASCADE;
  DROP TABLE "posts_blocks_video_embed" CASCADE;
  DROP TABLE "posts_blocks_data_viz_value_keys" CASCADE;
  DROP TABLE "posts_blocks_data_viz" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v_blocks_hero" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text" CASCADE;
  DROP TABLE "_posts_v_blocks_cards_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_section" CASCADE;
  DROP TABLE "_posts_v_blocks_media_block" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items" CASCADE;
  DROP TABLE "_posts_v_blocks_faq" CASCADE;
  DROP TABLE "_posts_v_blocks_content_list" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid_features" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_split_section" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials" CASCADE;
  DROP TABLE "_posts_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_posts_v_blocks_timeline" CASCADE;
  DROP TABLE "_posts_v_blocks_newsletter" CASCADE;
  DROP TABLE "_posts_v_blocks_two_column_rich_text" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_tiers_features" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_tiers" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing" CASCADE;
  DROP TABLE "_posts_v_blocks_video_embed" CASCADE;
  DROP TABLE "_posts_v_blocks_data_viz_value_keys" CASCADE;
  DROP TABLE "_posts_v_blocks_data_viz" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "policy_briefs_tags" CASCADE;
  DROP TABLE "policy_briefs" CASCADE;
  DROP TABLE "_policy_briefs_v_version_tags" CASCADE;
  DROP TABLE "_policy_briefs_v" CASCADE;
  DROP TABLE "events_tags" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "_events_v_version_tags" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "updates_sidebar" CASCADE;
  DROP TYPE "public"."enum_datasets_columns_type";
  DROP TYPE "public"."enum_datasets_status";
  DROP TYPE "public"."enum__datasets_v_version_columns_type";
  DROP TYPE "public"."enum__datasets_v_version_status";
  DROP TYPE "public"."enum_pages_blocks_hero_alignment";
  DROP TYPE "public"."enum_pages_blocks_cards_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_cta_section_theme";
  DROP TYPE "public"."enum_pages_blocks_media_block_alignment";
  DROP TYPE "public"."enum_pages_blocks_content_list_source";
  DROP TYPE "public"."enum_pages_blocks_content_list_layout";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_features_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_split_section_media_position";
  DROP TYPE "public"."enum_pages_blocks_split_section_background";
  DROP TYPE "public"."enum_pages_blocks_stats_layout";
  DROP TYPE "public"."enum_pages_blocks_two_column_rich_text_background";
  DROP TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_data_viz_view_mode";
  DROP TYPE "public"."enum_pages_blocks_data_viz_chart_type";
  DROP TYPE "public"."enum_pages_blocks_data_viz_color_scheme";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_cards_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_cta_section_theme";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_content_list_source";
  DROP TYPE "public"."enum__pages_v_blocks_content_list_layout";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_features_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_layout";
  DROP TYPE "public"."enum__pages_v_blocks_two_column_rich_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_data_viz_view_mode";
  DROP TYPE "public"."enum__pages_v_blocks_data_viz_chart_type";
  DROP TYPE "public"."enum__pages_v_blocks_data_viz_color_scheme";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_blocks_hero_alignment";
  DROP TYPE "public"."enum_posts_blocks_cards_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_cta_section_theme";
  DROP TYPE "public"."enum_posts_blocks_media_block_alignment";
  DROP TYPE "public"."enum_posts_blocks_content_list_source";
  DROP TYPE "public"."enum_posts_blocks_content_list_layout";
  DROP TYPE "public"."enum_posts_blocks_feature_grid_features_icon";
  DROP TYPE "public"."enum_posts_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_posts_blocks_split_section_media_position";
  DROP TYPE "public"."enum_posts_blocks_split_section_background";
  DROP TYPE "public"."enum_posts_blocks_stats_layout";
  DROP TYPE "public"."enum_posts_blocks_two_column_rich_text_background";
  DROP TYPE "public"."enum_posts_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_posts_blocks_data_viz_view_mode";
  DROP TYPE "public"."enum_posts_blocks_data_viz_chart_type";
  DROP TYPE "public"."enum_posts_blocks_data_viz_color_scheme";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__posts_v_blocks_cards_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_cta_section_theme";
  DROP TYPE "public"."enum__posts_v_blocks_media_block_alignment";
  DROP TYPE "public"."enum__posts_v_blocks_content_list_source";
  DROP TYPE "public"."enum__posts_v_blocks_content_list_layout";
  DROP TYPE "public"."enum__posts_v_blocks_feature_grid_features_icon";
  DROP TYPE "public"."enum__posts_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__posts_v_blocks_split_section_media_position";
  DROP TYPE "public"."enum__posts_v_blocks_split_section_background";
  DROP TYPE "public"."enum__posts_v_blocks_stats_layout";
  DROP TYPE "public"."enum__posts_v_blocks_two_column_rich_text_background";
  DROP TYPE "public"."enum__posts_v_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum__posts_v_blocks_data_viz_view_mode";
  DROP TYPE "public"."enum__posts_v_blocks_data_viz_chart_type";
  DROP TYPE "public"."enum__posts_v_blocks_data_viz_color_scheme";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_policy_briefs_brief_type";
  DROP TYPE "public"."enum_policy_briefs_status";
  DROP TYPE "public"."enum__policy_briefs_v_version_brief_type";
  DROP TYPE "public"."enum__policy_briefs_v_version_status";
  DROP TYPE "public"."enum_events_event_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_event_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_partners_category";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";`)
}
