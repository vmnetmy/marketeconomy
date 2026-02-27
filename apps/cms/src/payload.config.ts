import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { gcsStorage } from '@payloadcms/storage-gcs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Datasets } from './collections/Datasets'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { PolicyBriefs } from './collections/PolicyBriefs'
import { Events } from './collections/Events'
import { People } from './collections/People'
import { Partners } from './collections/Partners'
import { Footer, Header, SiteSettings, UpdatesSidebar } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const gcsBucket = process.env.GCS_BUCKET || ''
const gcsProjectId = process.env.GCS_PROJECT_ID || ''
const gcsEndpoint = process.env.GCS_ENDPOINT
const gcsEnabled = Boolean(gcsBucket && gcsProjectId)
const isProduction = process.env.NODE_ENV === 'production'

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Datasets, Pages, Posts, PolicyBriefs, Events, People, Partners],
  globals: [SiteSettings, Header, Footer, UpdatesSidebar],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    gcsStorage({
      enabled: gcsEnabled,
      acl: 'Public',
      bucket: gcsBucket,
      options: {
        projectId: gcsProjectId,
        ...(gcsEndpoint ? { apiEndpoint: gcsEndpoint } : {}),
      },
      collections: {
        media: true,
      },
    }),
  ],
  onInit: async (payload) => {
    if (isProduction && !gcsEnabled) {
      payload.logger.error(
        'GCS storage is not configured. Set GCS_BUCKET and GCS_PROJECT_ID to avoid local media uploads in production.',
      )
      throw new Error('Missing GCS_BUCKET/GCS_PROJECT_ID in production.')
    }
  },
})
