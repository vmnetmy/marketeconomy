import type { Block } from 'payload'

import { buildAdvancedGroup, enableAdvancedField } from '../util/advancedFields'

export const CTASection: Block = {
  slug: 'ctaSection',
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'buttonURL',
      type: 'text',
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    enableAdvancedField,
    buildAdvancedGroup({ anchorPlaceholder: 'e.g. cta' }),
  ],
}
