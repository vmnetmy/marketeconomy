import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Leadership: CollectionConfig = {
  slug: 'leadership',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'displayOrder'],
  },
  defaultSort: 'displayOrder',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Chairman', value: 'Chairman' },
        { label: 'General Manager', value: 'General Manager' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
