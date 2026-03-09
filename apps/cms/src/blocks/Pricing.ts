import type { Block } from 'payload'

import { buildPricingAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireArrayItemsUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const Pricing: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing',
    plural: 'Pricing',
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
      name: 'tiers',
      type: 'array',
      validate: requireArrayItemsUnlessPlaceholder(['name'], 'Each pricing tier needs a name.'),
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
        },
        {
          name: 'ctaUrl',
          type: 'text',
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildPricingAdvancedGroup(),
  ],
}
