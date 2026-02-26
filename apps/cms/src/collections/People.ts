import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'roleTitle',
      type: 'text',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'sortOrder',
      type: 'number',
    },
  ],
}
