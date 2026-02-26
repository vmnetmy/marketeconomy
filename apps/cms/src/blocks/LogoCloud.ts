import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  labels: {
    singular: 'Logo Cloud',
    plural: 'Logo Clouds',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
