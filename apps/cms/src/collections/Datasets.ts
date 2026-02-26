import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { parseDatasetOnChange } from '../hooks/parseDatasetOnChange'
import { formatSlug } from '../hooks/formatSlug'
import { DATASET_UPLOAD_DIR } from '../util/datasetPaths'

export const Datasets: CollectionConfig = {
  slug: 'datasets',
  admin: {
    useAsTitle: 'title',
  },
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
    beforeValidate: [formatSlug('title')],
    afterChange: [parseDatasetOnChange],
  },
  fields: [
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
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'key',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'String', value: 'string' },
            { label: 'Number', value: 'number' },
            { label: 'Date', value: 'date' },
          ],
        },
      ],
    },
    {
      name: 'rows',
      type: 'json',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'rowCount',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isTruncated',
      type: 'checkbox',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'parseError',
      type: 'textarea',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/DatasetPreview',
        },
      },
    },
  ],
  upload: {
    staticDir: DATASET_UPLOAD_DIR,
    mimeTypes: [
      'text/csv',
      'text/plain',
      'application/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/octet-stream',
    ],
  },
}
