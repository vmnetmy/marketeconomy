import Image from 'next/image'

import type { CMSMedia } from '../../lib/cms'
import { resolveMediaUrl } from '../../lib/cms'

type CMSImageProps = {
  media?: CMSMedia | string | null
  alt?: string
  className?: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  fill?: boolean
}

export function CMSImage({
  media,
  alt,
  className,
  width = 1200,
  height = 800,
  sizes = '100vw',
  priority = false,
  fill = false,
}: CMSImageProps) {
  const url = resolveMediaUrl(media)
  if (!url) return null

  const resolvedAlt =
    alt ?? (typeof media === 'object' && media ? media.alt ?? media.caption ?? '' : '')

  if (fill) {
    return (
      <Image
        alt={resolvedAlt}
        className={className}
        fill
        priority={priority}
        sizes={sizes}
        src={url}
      />
    )
  }

  return (
    <Image
      alt={resolvedAlt}
      className={className}
      height={height}
      priority={priority}
      sizes={sizes}
      src={url}
      width={width}
    />
  )
}
