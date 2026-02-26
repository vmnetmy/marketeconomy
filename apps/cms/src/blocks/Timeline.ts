import type { Block } from 'payload'

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
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
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
  ],
}
