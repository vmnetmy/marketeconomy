import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
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
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'organization',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
