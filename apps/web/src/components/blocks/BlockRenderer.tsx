import type { CMSBlock } from '../../lib/cms'

import { CardsBlock } from './CardsBlock'
import { CTASectionBlock } from './CTASectionBlock'
import { ContentListBlock } from './ContentListBlock'
import { DataVizBlock } from './DataVizBlock'
import { FAQBlock } from './FAQBlock'
import { FeatureGridBlock } from './FeatureGridBlock'
import { HeroBlock } from './HeroBlock'
import { LogoCloudBlock } from './LogoCloudBlock'
import { MediaBlock } from './MediaBlock'
import { NewsletterBlock } from './NewsletterBlock'
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
type DataVizBlockType = Parameters<typeof DataVizBlock>[0]['block']

export function BlockRenderer({ blocks }: { blocks?: CMSBlock[] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`
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
          case 'dataViz':
            return <DataVizBlock key={key} block={block as DataVizBlockType} />
          default:
            return null
        }
      })}
    </>
  )
}
