import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildFAQAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. faq' })
}
