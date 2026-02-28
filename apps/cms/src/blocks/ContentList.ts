import type { Block } from 'payload'

import { buildContentListAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'

export const ContentList: Block = {
  slug: 'contentList',
  labels: {
    singular: 'Content List',
    plural: 'Content Lists',
  },
  fields: [
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Posts', value: 'posts' },
        { label: 'Policy Briefs', value: 'policyBriefs' },
        { label: 'Events', value: 'events' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'list',
      options: [
        { label: 'List', value: 'list' },
        { label: 'Grid', value: 'grid' },
      ],
    },
    {
      name: 'filterTag',
      type: 'text',
    },
    enableAdvancedField,
    buildContentListAdvancedGroup(),
  ],
}
