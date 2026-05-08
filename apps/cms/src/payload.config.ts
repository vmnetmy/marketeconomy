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
import { PolicyBriefs } from './collections/PolicyBriefs'
import { Events } from './collections/Events'
import { Partners } from './collections/Partners'
import { FormSubmissions } from './collections/FormSubmissions'
import { Leadership } from './collections/Leadership'
import { InTheNews } from './collections/InTheNews'
import { EventReports } from './collections/EventReports'
import { EventRegistrations } from './collections/EventRegistrations'
import { PdfGatedDownloads } from './collections/PdfGatedDownloads'
import { Footer, Header, SiteSettings } from './globals'
import { createGatedDownload, downloadGatedFile } from './endpoints/gatedDownloads'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const isProduction = process.env.NODE_ENV === 'production'
const defaultUploadRoot = isProduction
  ? '/srv/apps/marketeconomy/shared/uploads'
  : path.resolve(dirname, '../uploads')
const mediaUploadDir = process.env.MEDIA_UPLOAD_DIR || path.resolve(defaultUploadRoot, 'media')
const webOrigins = Array.from(
  new Set(
    [
      process.env.WEB_URL,
      process.env.NEXT_PUBLIC_WEB_URL,
      process.env.CMS_URL,
      process.env.NEXT_PUBLIC_CMS_URL,
      'https://marketeconomy.org',
      'https://www.marketeconomy.org',
      'https://cms.marketeconomy.org',
      'http://localhost:3000',
      'http://localhost:3001',
    ].filter((value): value is string => Boolean(value)),
  ),
)

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Datasets,
    Pages,
    PolicyBriefs,
    Events,
    Partners,
    FormSubmissions,
    Leadership,
    InTheNews,
    EventReports,
    EventRegistrations,
    PdfGatedDownloads,
  ],
  globals: [SiteSettings, Header, Footer],
  endpoints: [
    {
      path: '/gated-downloads',
      method: 'post',
      handler: createGatedDownload,
    },
    {
      path: '/downloads',
      method: 'get',
      handler: downloadGatedFile,
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: webOrigins,
  csrf: webOrigins,
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
  onInit: async (payload) => {
    if (isProduction) {
      payload.logger.info(`Using local media uploads at ${mediaUploadDir}.`)
    }
  },
})
