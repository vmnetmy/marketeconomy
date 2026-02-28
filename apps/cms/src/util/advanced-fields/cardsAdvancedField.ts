import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildCardsAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. ways-to-engage' })
}
