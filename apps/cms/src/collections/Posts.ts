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

export const Posts: CollectionConfig = {
  slug: 'posts',
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
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
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
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      label: 'Categories / Tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
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
