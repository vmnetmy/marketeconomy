import type { CMSBlock } from '../../lib/cms'

import { ContentPlaceholder } from '../ui/ContentPlaceholder'
import { CardsBlock } from './CardsBlock'
import { CTASectionBlock } from './CTASectionBlock'
import { ContentListBlock } from './ContentListBlock'
import { DataVizBlock } from './DataVizBlock'
import { EventsFeedBlock } from './EventsFeedBlock'
import { FAQBlock } from './FAQBlock'
import { FeatureGridBlock } from './FeatureGridBlock'
import { FormBlock } from './FormBlock'
import { HeroBlock } from './HeroBlock'
import { InTheNewsFeedBlock } from './InTheNewsFeedBlock'
import { LogoCloudBlock } from './LogoCloudBlock'
import { MediaBlock } from './MediaBlock'
import { NewsletterBlock } from './NewsletterBlock'
import { PolicyBriefFeedBlock } from './PolicyBriefFeedBlock'
import { PricingBlock } from './PricingBlock'
import { RichTextBlock } from './RichTextBlock'
import { SplitSectionBlock } from './SplitSectionBlock'
import { StatsBlock } from './StatsBlock'
import { TestimonialsBlock } from './TestimonialsBlock'
import { TimelineBlock } from './TimelineBlock'
import { TwoColumnRichTextBlock } from './TwoColumnRichTextBlock'
import { VideoEmbedBlock } from './VideoEmbedBlock'

type HeroBlockType = Parameters<typeof HeroBlock>[0]['block']
type RichTextBlockType = Parameters<typeof RichTextBlock>[0]['block']
type CardsBlockType = Parameters<typeof CardsBlock>[0]['block']
type FeatureGridBlockType = Parameters<typeof FeatureGridBlock>[0]['block']
type SplitSectionBlockType = Parameters<typeof SplitSectionBlock>[0]['block']
type StatsBlockType = Parameters<typeof StatsBlock>[0]['block']
type LogoCloudBlockType = Parameters<typeof LogoCloudBlock>[0]['block']
type TestimonialsBlockType = Parameters<typeof TestimonialsBlock>[0]['block']
type TimelineBlockType = Parameters<typeof TimelineBlock>[0]['block']
type NewsletterBlockType = Parameters<typeof NewsletterBlock>[0]['block']
type TwoColumnRichTextBlockType = Parameters<typeof TwoColumnRichTextBlock>[0]['block']
type PricingBlockType = Parameters<typeof PricingBlock>[0]['block']
type VideoEmbedBlockType = Parameters<typeof VideoEmbedBlock>[0]['block']
type CTASectionBlockType = Parameters<typeof CTASectionBlock>[0]['block']
type MediaBlockType = Parameters<typeof MediaBlock>[0]['block']
type FAQBlockType = Parameters<typeof FAQBlock>[0]['block']
type ContentListBlockType = Parameters<typeof ContentListBlock>[0]['block']
type EventsFeedBlockType = Parameters<typeof EventsFeedBlock>[0]['block']
type InTheNewsFeedBlockType = Parameters<typeof InTheNewsFeedBlock>[0]['block']
type PolicyBriefFeedBlockType = Parameters<typeof PolicyBriefFeedBlock>[0]['block']
type DataVizBlockType = Parameters<typeof DataVizBlock>[0]['block']
type FormBlockType = Parameters<typeof FormBlock>[0]['block']

const placeholderConfig: Record<
  string,
  { title: string; items?: number; columns?: 1 | 2 | 3 | 4; description?: string }
> = {
  hero: { title: 'Hero Section', items: 1, columns: 1, description: 'Hero content will appear here once added.' },
  richText: { title: 'Content Section', items: 1, columns: 1 },
  cards: { title: 'Cards', items: 3, columns: 3 },
  featureGrid: { title: 'Feature Grid', items: 6, columns: 3 },
  splitSection: { title: 'Split Section', items: 1, columns: 2 },
  stats: { title: 'Stats', items: 4, columns: 4 },
  logoCloud: { title: 'Logo Cloud', items: 6, columns: 3 },
  testimonials: { title: 'Testimonials', items: 3, columns: 3 },
  timeline: { title: 'Timeline', items: 3, columns: 3 },
  newsletter: { title: 'Newsletter Signup', items: 1, columns: 1 },
  twoColumnRichText: { title: 'Two Column Content', items: 2, columns: 2 },
  pricing: { title: 'Pricing', items: 3, columns: 3 },
  videoEmbed: { title: 'Video', items: 1, columns: 1 },
  ctaSection: { title: 'Call To Action', items: 1, columns: 1 },
  mediaBlock: { title: 'Media', items: 1, columns: 1 },
  faq: { title: 'FAQ', items: 3, columns: 3 },
  contentList: { title: 'Content List', items: 3, columns: 3 },
  eventsFeed: { title: 'Events Feed', items: 3, columns: 3 },
  inTheNewsFeed: { title: 'In The News Feed', items: 3, columns: 3 },
  policyBriefFeed: { title: 'Policy Brief Feed', items: 3, columns: 3 },
  dataViz: { title: 'Data Visualization', items: 1, columns: 1 },
  form: { title: 'Form', items: 1, columns: 1 },
}

export function BlockRenderer({ blocks, placeholderLabel }: { blocks?: CMSBlock[]; placeholderLabel?: string }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`
        if (block.showPlaceholder) {
          const config = placeholderConfig[block.blockType] ?? { title: 'Content Section', items: 3, columns: 3 }
          const title = block.blockName || config.title
          return (
            <ContentPlaceholder
              key={`${key}-placeholder`}
              title={title}
              label={placeholderLabel}
              description={config.description}
              items={config.items}
              columns={config.columns}
            />
          )
        }
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block as HeroBlockType} />
          case 'richText':
            return <RichTextBlock key={key} block={block as RichTextBlockType} />
          case 'cards':
            return <CardsBlock key={key} block={block as CardsBlockType} />
          case 'featureGrid':
            return <FeatureGridBlock key={key} block={block as FeatureGridBlockType} />
          case 'splitSection':
            return <SplitSectionBlock key={key} block={block as SplitSectionBlockType} />
          case 'stats':
            return <StatsBlock key={key} block={block as StatsBlockType} />
          case 'logoCloud':
            return <LogoCloudBlock key={key} block={block as LogoCloudBlockType} />
          case 'testimonials':
            return <TestimonialsBlock key={key} block={block as TestimonialsBlockType} />
          case 'timeline':
            return <TimelineBlock key={key} block={block as TimelineBlockType} />
          case 'newsletter':
            return <NewsletterBlock key={key} block={block as NewsletterBlockType} />
          case 'twoColumnRichText':
            return <TwoColumnRichTextBlock key={key} block={block as TwoColumnRichTextBlockType} />
          case 'pricing':
            return <PricingBlock key={key} block={block as PricingBlockType} />
          case 'videoEmbed':
            return <VideoEmbedBlock key={key} block={block as VideoEmbedBlockType} />
          case 'ctaSection':
            return <CTASectionBlock key={key} block={block as CTASectionBlockType} />
          case 'mediaBlock':
            return <MediaBlock key={key} block={block as MediaBlockType} />
          case 'faq':
            return <FAQBlock key={key} block={block as FAQBlockType} />
          case 'contentList':
            return <ContentListBlock key={key} block={block as ContentListBlockType} />
          case 'eventsFeed':
            return <EventsFeedBlock key={key} block={block as EventsFeedBlockType} />
          case 'inTheNewsFeed':
            return <InTheNewsFeedBlock key={key} block={block as InTheNewsFeedBlockType} />
          case 'policyBriefFeed':
            return <PolicyBriefFeedBlock key={key} block={block as PolicyBriefFeedBlockType} />
          case 'dataViz':
            return <DataVizBlock key={key} block={block as DataVizBlockType} />
          case 'form':
            return <FormBlock key={key} block={block as FormBlockType} />
          default:
            return null
        }
      })}
    </>
  )
}
