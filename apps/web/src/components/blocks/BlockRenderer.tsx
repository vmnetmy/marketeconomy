import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  ArrowDownCircleIcon,
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowDownOnSquareIcon,
  ArrowDownOnSquareStackIcon,
  ArrowDownRightIcon,
  ArrowDownTrayIcon,
  ArrowLeftCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowLongDownIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowLongUpIcon,
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  ArrowRightCircleIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowSmallDownIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowSmallUpIcon,
  ArrowTopRightOnSquareIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowTurnDownLeftIcon,
  ArrowTurnDownRightIcon,
  ArrowTurnLeftDownIcon,
  ArrowTurnLeftUpIcon,
  ArrowTurnRightDownIcon,
  ArrowTurnRightUpIcon,
  ArrowTurnUpLeftIcon,
  ArrowTurnUpRightIcon,
  ArrowUpCircleIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
  ArrowUpOnSquareIcon,
  ArrowUpOnSquareStackIcon,
  ArrowUpRightIcon,
  ArrowUpTrayIcon,
  ArrowUturnDownIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowUturnUpIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  AtSymbolIcon,
  BackspaceIcon,
  BackwardIcon,
  BanknotesIcon,
  Bars2Icon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3CenterLeftIcon,
  Bars3Icon,
  Bars4Icon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  Battery0Icon,
  Battery100Icon,
  Battery50Icon,
  BeakerIcon,
  BellAlertIcon,
  BellIcon,
  BellSlashIcon,
  BellSnoozeIcon,
  BoldIcon,
  BoltIcon,
  BoltSlashIcon,
  BookOpenIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BugAntIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  CakeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  LightBulbIcon,
  MegaphoneIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import type { SerializedEditorState } from 'lexical'

import { ChartRenderer } from '../charts/ChartRenderer'
import { DataTable } from '../charts/DataTable'
import { getContentList, resolveMediaUrl, type CMSBlock, type CMSMedia, type DatasetDoc } from '../../lib/cms'

type HeroBlock = CMSBlock & {
  headline?: string
  subheadline?: string
  backgroundImage?: CMSMedia | string | null
  primaryCTA?: { label?: string; url?: string }
  secondaryCTA?: { label?: string; url?: string }
  alignment?: string
}

type RichTextBlock = CMSBlock & {
  content?: SerializedEditorState
}

type CardsBlock = CMSBlock & {
  sectionTitle?: string
  sectionIntro?: string
  cards?: Array<{ title?: string; description?: string; icon?: string; link?: { label?: string; url?: string } }>
}

type FeatureGridBlock = CMSBlock & {
  headline?: string
  intro?: string
  columns?: string
  features?: Array<{ title?: string; description?: string; icon?: string; link?: { label?: string; url?: string } }>
}

type SplitSectionBlock = CMSBlock & {
  content?: SerializedEditorState
  media?: CMSMedia | string | null
  mediaPosition?: 'left' | 'right'
  background?: 'none' | 'light' | 'dark'
}

type StatsBlock = CMSBlock & {
  headline?: string
  intro?: string
  layout?: 'grid' | 'row'
  stats?: Array<{ value?: string; label?: string; detail?: string }>
}

type LogoCloudBlock = CMSBlock & {
  headline?: string
  logos?: Array<{ logo?: CMSMedia | string | null; name?: string; url?: string }>
}

type TestimonialsBlock = CMSBlock & {
  headline?: string
  items?: Array<{
    quote?: string
    name?: string
    role?: string
    organization?: string
    avatar?: CMSMedia | string | null
  }>
}

type TimelineBlock = CMSBlock & {
  headline?: string
  items?: Array<{ title?: string; date?: string; description?: string }>
}

type NewsletterBlock = CMSBlock & {
  headline?: string
  description?: string
  inputPlaceholder?: string
  buttonLabel?: string
  formAction?: string
  finePrint?: string
}

type TwoColumnRichTextBlock = CMSBlock & {
  left?: SerializedEditorState
  right?: SerializedEditorState
  background?: 'none' | 'light' | 'dark'
}

type PricingBlock = CMSBlock & {
  headline?: string
  intro?: string
  tiers?: Array<{
    name?: string
    price?: string
    description?: string
    features?: Array<{ feature?: string }>
    ctaLabel?: string
    ctaUrl?: string
    highlight?: boolean
  }>
}

type VideoEmbedBlock = CMSBlock & {
  headline?: string
  embedUrl?: string
  caption?: string
  aspectRatio?: '16:9' | '4:3' | '1:1'
}

type CTASectionBlock = CMSBlock & {
  title?: string
  description?: string
  buttonLabel?: string
  buttonURL?: string
  theme?: string
}

type MediaBlock = CMSBlock & {
  media?: CMSMedia | string | null
  caption?: string
  alignment?: string
}

type FAQBlock = CMSBlock & {
  items?: Array<{ question?: string; answer?: SerializedEditorState }>
}

type ContentListBlock = CMSBlock & {
  source?: 'posts' | 'policyBriefs' | 'events'
  limit?: number
  layout?: 'list' | 'grid'
  filterTag?: string
}

type DataVizBlock = CMSBlock & {
  headline?: string
  description?: string
  dataset?: DatasetDoc | string | null
  viewMode?: 'chart' | 'table' | 'chartAndTable'
  chartType?: string
  indexBy?: string
  valueKeys?: Array<{ key?: string | null }> | string[]
  valueKey?: string
  xKey?: string
  yKey?: string
  seriesKey?: string
  colorScheme?: string
  height?: number
  showLegend?: boolean
}

function renderRichText(content?: SerializedEditorState) {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}

const iconMap = {
  globe: GlobeAltIcon,
  academicCap: AcademicCapIcon,
  adjustmentsHorizontal: AdjustmentsHorizontalIcon,
  adjustmentsVertical: AdjustmentsVerticalIcon,
  archiveBoxArrowDown: ArchiveBoxArrowDownIcon,
  archiveBox: ArchiveBoxIcon,
  archiveBoxXMark: ArchiveBoxXMarkIcon,
  arrowDownCircle: ArrowDownCircleIcon,
  arrowDown: ArrowDownIcon,
  arrowDownLeft: ArrowDownLeftIcon,
  arrowDownOnSquare: ArrowDownOnSquareIcon,
  arrowDownOnSquareStack: ArrowDownOnSquareStackIcon,
  arrowDownRight: ArrowDownRightIcon,
  arrowDownTray: ArrowDownTrayIcon,
  arrowLeftCircle: ArrowLeftCircleIcon,
  arrowLeftEndOnRectangle: ArrowLeftEndOnRectangleIcon,
  arrowLeft: ArrowLeftIcon,
  arrowLeftOnRectangle: ArrowLeftOnRectangleIcon,
  arrowLeftStartOnRectangle: ArrowLeftStartOnRectangleIcon,
  arrowLongDown: ArrowLongDownIcon,
  arrowLongLeft: ArrowLongLeftIcon,
  arrowLongRight: ArrowLongRightIcon,
  arrowLongUp: ArrowLongUpIcon,
  arrowPath: ArrowPathIcon,
  arrowPathRoundedSquare: ArrowPathRoundedSquareIcon,
  arrowRightCircle: ArrowRightCircleIcon,
  arrowRightEndOnRectangle: ArrowRightEndOnRectangleIcon,
  arrowRight: ArrowRightIcon,
  arrowRightOnRectangle: ArrowRightOnRectangleIcon,
  arrowRightStartOnRectangle: ArrowRightStartOnRectangleIcon,
  arrowSmallDown: ArrowSmallDownIcon,
  arrowSmallLeft: ArrowSmallLeftIcon,
  arrowSmallRight: ArrowSmallRightIcon,
  arrowSmallUp: ArrowSmallUpIcon,
  arrowTopRightOnSquare: ArrowTopRightOnSquareIcon,
  arrowTrendingDown: ArrowTrendingDownIcon,
  arrowTrendingUp: ArrowTrendingUpIcon,
  arrowTurnDownLeft: ArrowTurnDownLeftIcon,
  arrowTurnDownRight: ArrowTurnDownRightIcon,
  arrowTurnLeftDown: ArrowTurnLeftDownIcon,
  arrowTurnLeftUp: ArrowTurnLeftUpIcon,
  arrowTurnRightDown: ArrowTurnRightDownIcon,
  arrowTurnRightUp: ArrowTurnRightUpIcon,
  arrowTurnUpLeft: ArrowTurnUpLeftIcon,
  arrowTurnUpRight: ArrowTurnUpRightIcon,
  arrowUpCircle: ArrowUpCircleIcon,
  arrowUp: ArrowUpIcon,
  arrowUpLeft: ArrowUpLeftIcon,
  arrowUpOnSquare: ArrowUpOnSquareIcon,
  arrowUpOnSquareStack: ArrowUpOnSquareStackIcon,
  arrowUpRight: ArrowUpRightIcon,
  arrowUpTray: ArrowUpTrayIcon,
  arrowUturnDown: ArrowUturnDownIcon,
  arrowUturnLeft: ArrowUturnLeftIcon,
  arrowUturnRight: ArrowUturnRightIcon,
  arrowUturnUp: ArrowUturnUpIcon,
  arrowsPointingIn: ArrowsPointingInIcon,
  arrowsPointingOut: ArrowsPointingOutIcon,
  arrowsRightLeft: ArrowsRightLeftIcon,
  arrowsUpDown: ArrowsUpDownIcon,
  atSymbol: AtSymbolIcon,
  backspace: BackspaceIcon,
  backward: BackwardIcon,
  banknotes: BanknotesIcon,
  bars2: Bars2Icon,
  bars3BottomLeft: Bars3BottomLeftIcon,
  bars3BottomRight: Bars3BottomRightIcon,
  bars3CenterLeft: Bars3CenterLeftIcon,
  bars3: Bars3Icon,
  bars4: Bars4Icon,
  barsArrowDown: BarsArrowDownIcon,
  barsArrowUp: BarsArrowUpIcon,
  battery0: Battery0Icon,
  battery100: Battery100Icon,
  battery50: Battery50Icon,
  beaker: BeakerIcon,
  bellAlert: BellAlertIcon,
  bell: BellIcon,
  bellSlash: BellSlashIcon,
  bellSnooze: BellSnoozeIcon,
  bold: BoldIcon,
  bolt: BoltIcon,
  boltSlash: BoltSlashIcon,
  bookOpen: BookOpenIcon,
  bookmark: BookmarkIcon,
  bookmarkSlash: BookmarkSlashIcon,
  bookmarkSquare: BookmarkSquareIcon,
  briefcase: BriefcaseIcon,
  bugAnt: BugAntIcon,
  buildingLibrary: BuildingLibraryIcon,
  buildingOffice2: BuildingOffice2Icon,
  buildingOffice: BuildingOfficeIcon,
  buildingStorefront: BuildingStorefrontIcon,
  cake: CakeIcon,
  chartBar: ChartBarIcon,
  documentText: DocumentTextIcon,
  globeAlt: GlobeAltIcon,
  lightBulb: LightBulbIcon,
  megaphone: MegaphoneIcon,
  scale: ScaleIcon,
  shieldCheck: ShieldCheckIcon,
  users: UsersIcon,
} as const

type IconKey = keyof typeof iconMap

function IconBadge({ name }: { name?: string }) {
  if (!name) return null
  const Icon = iconMap[name as IconKey]
  if (!Icon) return null
  return (
    <div className="mb-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
        <Icon className="h-5 w-5" />
      </span>
    </div>
  )
}

function Hero({ block }: { block: HeroBlock }) {
  const backgroundUrl = resolveMediaUrl(block.backgroundImage)
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-10 py-16 text-white">
      {backgroundUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      ) : null}
      <div className="relative z-10 max-w-3xl space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">{block.headline}</h1>
        {block.subheadline ? <p className="text-lg text-slate-200">{block.subheadline}</p> : null}
        <div className="flex flex-wrap gap-3">
          {block.primaryCTA?.label && block.primaryCTA?.url ? (
            <a
              className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900"
              href={block.primaryCTA.url}
            >
              {block.primaryCTA.label}
            </a>
          ) : null}
          {block.secondaryCTA?.label && block.secondaryCTA?.url ? (
            <a className="rounded-full border border-white/40 px-6 py-2 text-sm font-semibold text-white" href={block.secondaryCTA.url}>
              {block.secondaryCTA.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function Cards({ block }: { block: CardsBlock }) {
  return (
    <section className="space-y-6">
      <div>
        {block.sectionTitle ? <h2 className="text-2xl font-semibold">{block.sectionTitle}</h2> : null}
        {block.sectionIntro ? <p className="mt-2 text-slate-600">{block.sectionIntro}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(block.cards || []).map((card, index) => (
          <div key={`${card.title ?? 'card'}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <IconBadge name={card.icon} />
            {card.title ? <h3 className="text-lg font-semibold">{card.title}</h3> : null}
            {card.description ? <p className="mt-2 text-sm text-slate-600">{card.description}</p> : null}
            {card.link?.label && card.link?.url ? (
              <a className="mt-4 inline-flex text-sm font-semibold text-slate-900" href={card.link.url}>
                {card.link.label}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function FeatureGrid({ block }: { block: FeatureGridBlock }) {
  const columns = Number(block.columns ?? 3)
  const gridCols =
    columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'

  return (
    <section className="space-y-6">
      <div>
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
      </div>
      <div className={`grid gap-4 ${gridCols}`}>
        {(block.features || []).map((feature, index) => (
          <div key={`${feature.title ?? 'feature'}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5">
            <IconBadge name={feature.icon} />
            {feature.title ? <h3 className="text-lg font-semibold">{feature.title}</h3> : null}
            {feature.description ? <p className="mt-2 text-sm text-slate-600">{feature.description}</p> : null}
            {feature.link?.label && feature.link?.url ? (
              <a className="mt-4 inline-flex text-sm font-semibold text-slate-900" href={feature.link.url}>
                {feature.link.label}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function SplitSection({ block }: { block: SplitSectionBlock }) {
  const mediaUrl = resolveMediaUrl(block.media)
  const sectionClass =
    block.background === 'light'
      ? 'bg-slate-100'
      : block.background === 'dark'
        ? 'bg-slate-900 text-white'
        : 'bg-transparent'

  const content = (
    <div className="space-y-4">
      {renderRichText(block.content)}
    </div>
  )

  const media = mediaUrl ? <img className="w-full rounded-2xl border border-slate-200" src={mediaUrl} alt="" /> : null

  return (
    <section className={`rounded-3xl px-8 py-10 ${sectionClass}`}>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {block.mediaPosition === 'left' ? media : content}
        {block.mediaPosition === 'left' ? content : media}
      </div>
    </section>
  )
}

function Stats({ block }: { block: StatsBlock }) {
  const layoutClass = block.layout === 'row' ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
  return (
    <section className="space-y-6">
      <div>
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
      </div>
      <div className={`grid gap-4 ${layoutClass}`}>
        {(block.stats || []).map((item, index) => (
          <div key={`${item.label ?? 'stat'}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5">
            {item.value ? <p className="text-3xl font-semibold">{item.value}</p> : null}
            {item.label ? <p className="mt-1 text-sm font-semibold text-slate-700">{item.label}</p> : null}
            {item.detail ? <p className="mt-2 text-sm text-slate-500">{item.detail}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function LogoCloud({ block }: { block: LogoCloudBlock }) {
  return (
    <section className="space-y-6">
      {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {(block.logos || []).map((logo, index) => {
          const logoUrl = resolveMediaUrl(logo.logo)
          const content = logoUrl ? (
            <img className="max-h-10 w-auto object-contain" src={logoUrl} alt={logo.name ?? ''} />
          ) : (
            <span className="text-sm text-slate-500">{logo.name}</span>
          )

          return logo.url ? (
            <a
              key={`${logo.name ?? 'logo'}-${index}`}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-4"
              href={logo.url}
            >
              {content}
            </a>
          ) : (
            <div key={`${logo.name ?? 'logo'}-${index}`} className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-4">
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Testimonials({ block }: { block: TestimonialsBlock }) {
  return (
    <section className="space-y-6">
      {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {(block.items || []).map((item, index) => {
          const avatarUrl = resolveMediaUrl(item.avatar)
          return (
            <figure key={`${item.name ?? 'testimonial'}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6">
              {item.quote ? <blockquote className="text-base text-slate-700">“{item.quote}”</blockquote> : null}
              <figcaption className="mt-4 flex items-center gap-3 text-sm text-slate-600">
                {avatarUrl ? (
                  <img className="h-10 w-10 rounded-full object-cover" src={avatarUrl} alt={item.name ?? ''} />
                ) : null}
                <div>
                  {item.name ? <div className="font-semibold text-slate-900">{item.name}</div> : null}
                  {item.role || item.organization ? (
                    <div>{[item.role, item.organization].filter(Boolean).join(', ')}</div>
                  ) : null}
                </div>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}

function Timeline({ block }: { block: TimelineBlock }) {
  return (
    <section className="space-y-6">
      {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
      <div className="space-y-4">
        {(block.items || []).map((item, index) => (
          <div key={`${item.title ?? 'milestone'}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-baseline gap-2">
              {item.title ? <h3 className="text-lg font-semibold">{item.title}</h3> : null}
              {item.date ? <span className="text-sm text-slate-500">{item.date}</span> : null}
            </div>
            {item.description ? <p className="mt-2 text-sm text-slate-600">{item.description}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function Newsletter({ block }: { block: NewsletterBlock }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
      {block.description ? <p className="mt-2 text-slate-600">{block.description}</p> : null}
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" action={block.formAction || '#'} method="post">
        <input
          type="email"
          name="email"
          placeholder={block.inputPlaceholder || 'Enter your email'}
          className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
        />
        <button type="submit" className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white">
          {block.buttonLabel || 'Subscribe'}
        </button>
      </form>
      {block.finePrint ? <p className="mt-2 text-xs text-slate-500">{block.finePrint}</p> : null}
    </section>
  )
}

function TwoColumnRichText({ block }: { block: TwoColumnRichTextBlock }) {
  const background =
    block.background === 'light'
      ? 'bg-slate-100'
      : block.background === 'dark'
        ? 'bg-slate-900 text-white'
        : 'bg-transparent'
  return (
    <section className={`rounded-3xl px-8 py-10 ${background}`}>
      <div className="grid gap-8 md:grid-cols-2">
        <div>{renderRichText(block.left)}</div>
        <div>{renderRichText(block.right)}</div>
      </div>
    </section>
  )
}

function Pricing({ block }: { block: PricingBlock }) {
  return (
    <section className="space-y-6">
      <div>
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {(block.tiers || []).map((tier, index) => (
          <div
            key={`${tier.name ?? 'tier'}-${index}`}
            className={`rounded-2xl border p-6 ${tier.highlight ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white'}`}
          >
            {tier.name ? <h3 className="text-lg font-semibold">{tier.name}</h3> : null}
            {tier.price ? <p className="mt-2 text-3xl font-semibold">{tier.price}</p> : null}
            {tier.description ? <p className="mt-2 text-sm text-slate-500">{tier.description}</p> : null}
            {tier.features?.length ? (
              <ul className="mt-4 space-y-2 text-sm">
                {tier.features.map((feature, featureIndex) => (
                  <li key={`${tier.name ?? 'tier'}-feature-${featureIndex}`}>{feature.feature}</li>
                ))}
              </ul>
            ) : null}
            {tier.ctaLabel && tier.ctaUrl ? (
              <a
                className={`mt-4 inline-flex rounded-full px-5 py-2 text-sm font-semibold ${
                  tier.highlight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                }`}
                href={tier.ctaUrl}
              >
                {tier.ctaLabel}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function VideoEmbed({ block }: { block: VideoEmbedBlock }) {
  if (!block.embedUrl) return null
  const ratio =
    block.aspectRatio === '4:3' ? 'pt-[75%]' : block.aspectRatio === '1:1' ? 'pt-[100%]' : 'pt-[56.25%]'
  return (
    <section className="space-y-4">
      {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
      <div className={`relative w-full overflow-hidden rounded-2xl bg-slate-200 ${ratio}`}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={block.embedUrl}
          title={block.caption || block.headline || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {block.caption ? <p className="text-sm text-slate-500">{block.caption}</p> : null}
    </section>
  )
}

function CTASection({ block }: { block: CTASectionBlock }) {
  return (
    <section
      className={`rounded-2xl px-8 py-10 ${block.theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}
    >
      {block.title ? <h2 className="text-2xl font-semibold">{block.title}</h2> : null}
      {block.description ? <p className="mt-2 text-base">{block.description}</p> : null}
      {block.buttonLabel && block.buttonURL ? (
        <a
          className={`mt-4 inline-flex rounded-full px-6 py-2 text-sm font-semibold ${
            block.theme === 'dark' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
          }`}
          href={block.buttonURL}
        >
          {block.buttonLabel}
        </a>
      ) : null}
    </section>
  )
}

function MediaBlockView({ block }: { block: MediaBlock }) {
  const mediaUrl = resolveMediaUrl(block.media)
  return (
    <section className="space-y-3">
      {mediaUrl ? <img className="w-full rounded-2xl border border-slate-200" src={mediaUrl} alt="" /> : null}
      {block.caption ? <p className="text-sm text-slate-500">{block.caption}</p> : null}
    </section>
  )
}

function FAQView({ block }: { block: FAQBlock }) {
  return (
    <section className="space-y-4">
      {(block.items || []).map((item, index) => (
        <div key={`${item.question ?? 'faq'}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
          {item.question ? <h3 className="text-base font-semibold">{item.question}</h3> : null}
          {item.answer ? <div className="mt-2 text-sm text-slate-600">{renderRichText(item.answer)}</div> : null}
        </div>
      ))}
    </section>
  )
}

async function ContentListView({ block }: { block: ContentListBlock }) {
  if (!block.source) return null
  const items = await getContentList(block.source, {
    limit: block.limit,
    tag: block.filterTag,
  })

  const basePath =
    block.source === 'posts'
      ? '/updates'
      : block.source === 'policyBriefs'
        ? '/policy-briefs'
        : block.source === 'events'
          ? '/events'
          : ''

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Latest {block.source}</h2>
      <div className={block.layout === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-3'}>
        {items.map((item) => (
          <a
            key={item.id}
            href={basePath && item.slug ? `${basePath}/${item.slug}` : undefined}
            className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {item.excerpt || item.summary ? (
              <p className="mt-2 text-sm text-slate-600">{item.excerpt ?? item.summary}</p>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  )
}

function DataVizView({ block }: { block: DataVizBlock }) {
  const dataset = typeof block.dataset === 'object' ? block.dataset : null
  if (!dataset) return null

  const valueKeys = Array.isArray(block.valueKeys)
    ? block.valueKeys
        .map((item) => (typeof item === 'string' ? item : item?.key ?? null))
        .filter((key): key is string => Boolean(key))
    : []

  const viewMode = block.viewMode ?? 'chart'
  const showChart = viewMode === 'chart' || viewMode === 'chartAndTable'
  const showTable = viewMode === 'table' || viewMode === 'chartAndTable'

  return (
    <section className="space-y-6">
      {(block.headline || block.description) && (
        <div>
          {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
          {block.description ? <p className="mt-2 text-slate-600">{block.description}</p> : null}
        </div>
      )}
      {showChart ? (
        <ChartRenderer
          dataset={dataset}
          config={{
            chartType: block.chartType,
            indexBy: block.indexBy,
            valueKeys,
            valueKey: block.valueKey,
            xKey: block.xKey,
            yKey: block.yKey,
            seriesKey: block.seriesKey,
            colorScheme: block.colorScheme,
            height: block.height,
            showLegend: block.showLegend,
          }}
        />
      ) : null}
      {showTable ? (
        <DataTable columns={dataset.columns} rows={dataset.rows} rowCount={dataset.rowCount} isTruncated={dataset.isTruncated} />
      ) : null}
    </section>
  )
}

export function BlockRenderer({ blocks }: { blocks?: CMSBlock[] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`
        switch (block.blockType) {
          case 'hero':
            return <Hero key={key} block={block as HeroBlock} />
          case 'richText':
            return (
              <section key={key} className="prose max-w-none">
                {renderRichText((block as RichTextBlock).content)}
              </section>
            )
          case 'cards':
            return <Cards key={key} block={block as CardsBlock} />
          case 'featureGrid':
            return <FeatureGrid key={key} block={block as FeatureGridBlock} />
          case 'splitSection':
            return <SplitSection key={key} block={block as SplitSectionBlock} />
          case 'stats':
            return <Stats key={key} block={block as StatsBlock} />
          case 'logoCloud':
            return <LogoCloud key={key} block={block as LogoCloudBlock} />
          case 'testimonials':
            return <Testimonials key={key} block={block as TestimonialsBlock} />
          case 'timeline':
            return <Timeline key={key} block={block as TimelineBlock} />
          case 'newsletter':
            return <Newsletter key={key} block={block as NewsletterBlock} />
          case 'twoColumnRichText':
            return <TwoColumnRichText key={key} block={block as TwoColumnRichTextBlock} />
          case 'pricing':
            return <Pricing key={key} block={block as PricingBlock} />
          case 'videoEmbed':
            return <VideoEmbed key={key} block={block as VideoEmbedBlock} />
          case 'ctaSection':
            return <CTASection key={key} block={block as CTASectionBlock} />
          case 'mediaBlock':
            return <MediaBlockView key={key} block={block as MediaBlock} />
          case 'faq':
            return <FAQView key={key} block={block as FAQBlock} />
          case 'contentList':
            return <ContentListView key={key} block={block as ContentListBlock} />
          case 'dataViz':
            return <DataVizView key={key} block={block as DataVizBlock} />
          default:
            return null
        }
      })}
    </div>
  )
}
