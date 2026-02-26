import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
  plugins: [],
})
