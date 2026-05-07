import type { CollectionConfig } from 'payload'
import path from 'path'

import { authenticated } from '../access'

const defaultUploadRoot =
  process.env.NODE_ENV === 'production'
    ? '/srv/apps/marketeconomy/shared/uploads'
    : path.resolve(process.cwd(), 'uploads')
const mediaUploadDir = process.env.MEDIA_UPLOAD_DIR || path.resolve(defaultUploadRoot, 'media')

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    staticDir: mediaUploadDir,
  },
}
