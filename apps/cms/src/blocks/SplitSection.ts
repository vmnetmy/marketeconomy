import type { Block } from 'payload'

export const SplitSection: Block = {
  slug: 'splitSection',
  labels: {
    singular: 'Split Section',
    plural: 'Split Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
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
    {
      name: 'advanced',
      type: 'group',
      fields: [
        {
          name: 'anchorId',
          type: 'text',
          admin: {
            placeholder: 'e.g. mission',
          },
        },
        {
          name: 'padding',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Compact', value: 'compact' },
            { label: 'Standard', value: 'standard' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'hideOnMobile',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'hideOnDesktop',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
