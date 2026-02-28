import type { Block } from 'payload'

import { buildStatsAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'

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
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'detail',
          type: 'textarea',
        },
      ],
    },
    enableAdvancedField,
    buildStatsAdvancedGroup(),
  ],
}
