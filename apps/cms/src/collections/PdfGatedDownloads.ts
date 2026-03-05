import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const PdfGatedDownloads: CollectionConfig = {
  slug: 'pdfGatedDownloads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'resourceType', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: {
    read: authenticated,
    create: () => true,
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
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'resourceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Policy Brief', value: 'policyBrief' },
        { label: 'Event Report', value: 'eventReport' },
      ],
    },
    {
      name: 'policyBrief',
      type: 'relationship',
      relationTo: 'policyBriefs',
      admin: {
        condition: (_, siblingData) => siblingData?.resourceType === 'policyBrief',
      },
    },
    {
      name: 'eventReport',
      type: 'relationship',
      relationTo: 'eventReports',
      admin: {
        condition: (_, siblingData) => siblingData?.resourceType === 'eventReport',
      },
    },
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tokenExpiresAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        if (data.resourceType === 'policyBrief' && !data.policyBrief) {
          throw new Error('Policy brief is required for policy brief downloads.')
        }
        if (data.resourceType === 'eventReport' && !data.eventReport) {
          throw new Error('Event report is required for event report downloads.')
        }
        return data
      },
    ],
  },
}
