import type { Block } from 'payload'

import { buildFAQAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'

export const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
        },
      ],
    },
    enableAdvancedField,
    buildFAQAdvancedGroup(),
  ],
}
