import type { Block } from 'payload'

import { buildCTASectionAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

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
      validate: requireValueUnlessPlaceholder('Title is required.'),
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
    showPlaceholderField,
    enableAdvancedField,
    buildCTASectionAdvancedGroup(),
  ],
}
