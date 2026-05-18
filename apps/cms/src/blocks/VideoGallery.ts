import type { Block } from 'payload'

import { buildVideoGalleryAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireArrayItemsUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const VideoGallery: Block = {
  slug: 'videoGallery',
  labels: {
    singular: 'Video Gallery',
    plural: 'Video Galleries',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Videos',
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
    },
    {
      name: 'videos',
      type: 'array',
      minRows: 1,
      validate: requireArrayItemsUnlessPlaceholder(
        ['title', 'video'],
        'Each video needs a title and video file.',
      ),
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'poster',
          label: 'Poster thumbnail',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Recommended 16:9 image shown before playback.',
          },
        },
        {
          name: 'duration',
          type: 'text',
          admin: {
            placeholder: 'e.g. 2:51',
          },
        },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildVideoGalleryAdvancedGroup(),
  ],
}
