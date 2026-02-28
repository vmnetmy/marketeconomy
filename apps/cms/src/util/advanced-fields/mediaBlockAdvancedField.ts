import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildMediaBlockAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. media' })
}
