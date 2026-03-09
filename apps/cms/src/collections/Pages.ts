import type { CollectionConfig } from 'payload'

import {
  Cards,
  ContentList,
  CTASection,
  DataViz,
  FAQ,
  FeatureGrid,
  FormBlock,
  Hero,
  LogoCloud,
  Newsletter,
  MediaBlock,
  Pricing,
  RichTextBlock,
  SplitSection,
  Stats,
  Testimonials,
  Timeline,
  TwoColumnRichText,
  VideoEmbed,
} from '../blocks'
import { authenticated, publishedOrAuthenticated } from '../access'
import { formatSlug } from '../hooks/formatSlug'
import { setSeoDefaults } from '../hooks/setSeoDefaults'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [formatSlug('title'), setSeoDefaults('title')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'placeholderOverride',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Use site setting', value: 'default' },
        { label: 'Force placeholders', value: 'forceOn' },
        { label: 'Disable placeholders', value: 'forceOff' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Override content placeholder behavior for this page.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Hero,
        RichTextBlock,
        Cards,
        CTASection,
        MediaBlock,
        FAQ,
        ContentList,
        FeatureGrid,
        SplitSection,
        Stats,
        LogoCloud,
        Testimonials,
        Timeline,
        Newsletter,
        FormBlock,
        TwoColumnRichText,
        Pricing,
        VideoEmbed,
        DataViz,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
