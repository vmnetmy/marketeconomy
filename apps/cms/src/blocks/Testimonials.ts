import type { Block } from 'payload'

import { buildTestimonialsAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireArrayItemsUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

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
      validate: requireArrayItemsUnlessPlaceholder(['quote', 'name'], 'Each testimonial needs a quote and name.'),
      fields: [
        {
          name: 'quote',
          type: 'textarea',
        },
        {
          name: 'name',
          type: 'text',
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
    showPlaceholderField,
    enableAdvancedField,
    buildTestimonialsAdvancedGroup(),
  ],
}
