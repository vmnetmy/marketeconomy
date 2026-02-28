import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildStatsAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. impact',
    extraFields: [
      {
        name: 'numberSize',
        type: 'select',
        defaultValue: 'md',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
    ],
  })
}
