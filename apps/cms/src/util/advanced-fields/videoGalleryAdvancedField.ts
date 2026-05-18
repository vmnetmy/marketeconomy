import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildVideoGalleryAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. videos',
    widthDefault: 'wide',
    extraFields: [
      {
        name: 'cardStyle',
        type: 'select',
        defaultValue: 'raised',
        options: [
          { label: 'Flat', value: 'flat' },
          { label: 'Raised', value: 'raised' },
        ],
      },
    ],
  })
}
