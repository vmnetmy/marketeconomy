import type { Block } from 'payload'

import { buildFAQAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireArrayItemsUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

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
      validate: requireArrayItemsUnlessPlaceholder(['question'], 'Each FAQ item needs a question.'),
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'richText',
        },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildFAQAdvancedGroup(),
  ],
}
