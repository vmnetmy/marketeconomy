import type { Block } from 'payload'

import { buildContentListAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const EventsFeed: Block = {
  slug: 'eventsFeed',
  labels: {
    singular: 'Events Feed',
    plural: 'Events Feeds',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Latest Events',
      validate: requireValueUnlessPlaceholder('Section title is required.'),
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
        { label: 'All', value: 'all' },
      ],
    },
    {
      name: 'sort',
      type: 'select',
      defaultValue: 'dateAsc',
      options: [
        { label: 'Date (Earliest first)', value: 'dateAsc' },
        { label: 'Date (Latest first)', value: 'dateDesc' },
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
