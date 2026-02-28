import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildTimelineAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. timeline',
    extraFields: [
      {
        name: 'style',
        type: 'select',
        defaultValue: 'cards',
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Minimal', value: 'minimal' },
        ],
      },
      {
        name: 'compact',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  })
}
