import type { Block } from 'payload'

export const Newsletter: Block = {
  slug: 'newsletter',
  labels: {
    singular: 'Newsletter Signup',
    plural: 'Newsletter Signups',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'inputPlaceholder',
      type: 'text',
      defaultValue: 'Enter your email',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Subscribe',
    },
    {
      name: 'formAction',
      type: 'text',
    },
    {
      name: 'finePrint',
      type: 'text',
    },
  ],
}
