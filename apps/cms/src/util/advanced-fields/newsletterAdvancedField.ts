import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildNewsletterAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. newsletter' })
}
