import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildTwoColumnRichTextAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. overview',
    extraFields: [
      {
        name: 'gap',
        type: 'select',
        defaultValue: 'md',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
      {
        name: 'verticalAlign',
        dbName: 'v_align',
        type: 'select',
        defaultValue: 'top',
        options: [
          { label: 'Top', value: 'top' },
          { label: 'Center', value: 'center' },
        ],
      },
    ],
  })
}
