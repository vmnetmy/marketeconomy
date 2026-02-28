export type SplitSectionAdvanced = {
  imageSize?: 'small' | 'medium' | 'large' | null
  reverseOnMobile?: boolean | null
}

export function getSplitSectionStyles(advanced?: SplitSectionAdvanced) {
  const reverseOnMobile = Boolean(advanced?.reverseOnMobile)
  const mediaSizeClass =
    advanced?.imageSize === 'small'
      ? 'aspect-[5/4] lg:max-w-md'
      : advanced?.imageSize === 'large'
        ? 'aspect-[16/10]'
        : 'aspect-[4/3]'

  const contentOrderClass = reverseOnMobile ? 'order-2 lg:order-none' : ''
  const mediaOrderClass = reverseOnMobile ? 'order-1 lg:order-none' : ''

  return { mediaSizeClass, contentOrderClass, mediaOrderClass }
}
