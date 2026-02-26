import type { Block } from 'payload'

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
  ],
}
