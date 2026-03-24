import type { Block } from 'payload'

import { buildContentListAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const InTheNewsFeed: Block = {
  slug: 'inTheNewsFeed',
  labels: {
    singular: 'In The News Feed',
    plural: 'In The News Feeds',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Latest News',
      validate: requireValueUnlessPlaceholder('Section title is required.'),
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
    },
    {
      name: 'sort',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest first', value: 'latest' },
        { label: 'Oldest first', value: 'oldest' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 24,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'List', value: 'list' },
        { label: 'Grid', value: 'grid' },
      ],
    },
    {
      name: 'filterTag',
      type: 'text',
    },
    {
      name: 'showExcerpt',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showDate',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildContentListAdvancedGroup(),
  ],
}
