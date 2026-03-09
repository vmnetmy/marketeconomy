import type { Block } from 'payload'

import { buildVideoEmbedAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: 'Video Embed',
    plural: 'Video Embeds',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'embedUrl',
      type: 'text',
      validate: requireValueUnlessPlaceholder('Embed URL is required.'),
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildVideoEmbedAdvancedGroup(),
  ],
}
