import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildNewsletterAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. newsletter',
    extraFields: [
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'light',
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ],
      },
      {
        name: 'layout',
        type: 'select',
        defaultValue: 'inline',
        options: [
          { label: 'Inline', value: 'inline' },
          { label: 'Stacked', value: 'stacked' },
        ],
      },
      {
        name: 'cardStyle',
        type: 'select',
        defaultValue: 'flat',
        options: [
          { label: 'Flat', value: 'flat' },
          { label: 'Raised', value: 'raised' },
        ],
      },
    ],
  })
}
