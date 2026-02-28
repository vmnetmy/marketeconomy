import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildTwoColumnRichTextAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. overview' })
}
