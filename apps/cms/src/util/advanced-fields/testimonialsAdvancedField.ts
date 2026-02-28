import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildTestimonialsAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. testimonials',
    extraFields: [
      {
        name: 'layout',
        type: 'select',
        defaultValue: 'grid',
        options: [
          { label: 'Grid', value: 'grid' },
          { label: 'Carousel', value: 'carousel' },
        ],
      },
    ],
  })
}
