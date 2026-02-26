import type { Block } from 'payload'

export const TwoColumnRichText: Block = {
  slug: 'twoColumnRichText',
  labels: {
    singular: 'Two Column Rich Text',
    plural: 'Two Column Rich Text',
  },
  fields: [
    {
      name: 'left',
      type: 'richText',
    },
    {
      name: 'right',
      type: 'richText',
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}
