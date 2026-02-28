import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildVideoEmbedAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. video' })
}
