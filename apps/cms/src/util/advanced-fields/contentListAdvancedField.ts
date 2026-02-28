import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildContentListAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. latest-updates',
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
      {
        name: 'showImages',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'dense',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  })
}
