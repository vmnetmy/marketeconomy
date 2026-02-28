import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Split', value: 'split' },
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
            placeholder: 'e.g. hero',
          },
        },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        },
        {
          name: 'minHeight',
          type: 'select',
          defaultValue: 'tall',
          options: [
            { label: 'Short', value: 'short' },
            { label: 'Medium', value: 'medium' },
            { label: 'Tall', value: 'tall' },
          ],
        },
        {
          name: 'padding',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Standard', value: 'standard' },
            { label: 'Large', value: 'large' },
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
