import type { Block } from 'payload'

import { buildContentListAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const ContentList: Block = {
  slug: 'contentList',
  labels: {
    singular: 'Content List',
    plural: 'Content Lists',
  },
  fields: [
    {
      name: 'source',
      type: 'select',
      validate: requireValueUnlessPlaceholder('Source is required.'),
      options: [
        { label: 'In the News', value: 'inTheNews' },
        { label: 'Policy Briefs', value: 'policyBriefs' },
        { label: 'Events', value: 'events' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'list',
      options: [
        { label: 'List', value: 'list' },
        { label: 'Grid', value: 'grid' },
      ],
    },
    {
      name: 'filterTag',
      type: 'text',
    },
    showPlaceholderField,
    enableAdvancedField,
    buildContentListAdvancedGroup(),
  ],
}
