import type { Block } from 'payload'

import { buildTimelineAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireArrayItemsUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const Timeline: Block = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline',
    plural: 'Timeline',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      validate: requireArrayItemsUnlessPlaceholder(['title'], 'Each timeline item needs a title.'),
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'date',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildTimelineAdvancedGroup(),
  ],
}
