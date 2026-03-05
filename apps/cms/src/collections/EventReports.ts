import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { formatSlug } from '../hooks/formatSlug'
import { setSeoDefaults } from '../hooks/setSeoDefaults'

export const EventReports: CollectionConfig = {
  slug: 'eventReports',
  admin: {
    useAsTitle: 'title',
  },
  defaultSort: '-publishedDate',
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      formatSlug('title'),
      setSeoDefaults('title'),
      async ({ data, req, originalDoc }) => {
        const eventId = typeof data?.event === 'string' ? data?.event : data?.event?.id
        if (!eventId || !req?.payload) return data

        const existing = await req.payload.find({
          collection: 'eventReports',
          where: {
            event: {
              equals: eventId,
            },
          },
          limit: 1,
          depth: 0,
        })

        if (existing?.docs?.length) {
          const existingId = existing.docs[0]?.id
          if (!originalDoc || existingId !== originalDoc?.id) {
            throw new Error('Each event can only have one event report.')
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
