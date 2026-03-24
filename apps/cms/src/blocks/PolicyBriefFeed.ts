import type { Block } from 'payload'

import { buildContentListAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const PolicyBriefFeed: Block = {
  slug: 'policyBriefFeed',
  labels: {
    singular: 'Policy Brief Feed',
    plural: 'Policy Brief Feeds',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Latest Policy Briefs',
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
      name: 'featuredOnly',
      type: 'checkbox',
      defaultValue: false,
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
      name: 'showSummary',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showDate',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showTags',
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
