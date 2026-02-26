import type { Block } from 'payload'

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
  ],
}
