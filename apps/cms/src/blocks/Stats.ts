import type { Block } from 'payload'

import { buildStatsAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireArrayItemsUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const Stats: Block = {
  slug: 'stats',
  labels: {
    singular: 'Stats',
    plural: 'Stats',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Row', value: 'row' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      validate: requireArrayItemsUnlessPlaceholder(['value', 'label'], 'Each stat needs a value and label.'),
      fields: [
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'detail',
          type: 'textarea',
        },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildStatsAdvancedGroup(),
  ],
}
