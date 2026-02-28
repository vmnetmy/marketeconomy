import type { Field } from 'payload'

type AdvancedGroupOptions = {
  includeBackground?: boolean
  includePadding?: boolean
  includeWidth?: boolean
  anchorPlaceholder?: string
  backgroundDefault?: 'none' | 'light' | 'dark'
  paddingDefault?: 'none' | 'compact' | 'standard' | 'large'
  widthDefault?: 'standard' | 'wide' | 'full'
  extraFields?: Field[]
}

export const enableAdvancedField: Field = {
  name: 'enableAdvanced',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    description: 'Show advanced layout settings.',
  },
}

export function buildAdvancedGroup(options: AdvancedGroupOptions = {}): Field {
  const {
    includeBackground = true,
    includePadding = true,
    includeWidth = true,
    anchorPlaceholder = 'e.g. section-anchor',
    backgroundDefault = 'none',
    paddingDefault = 'standard',
    widthDefault = 'standard',
    extraFields = [],
  } = options

  const fields: Field[] = [
    {
      name: 'anchorId',
      type: 'text',
      admin: {
        placeholder: anchorPlaceholder,
      },
    },
  ]

  if (includeBackground) {
    fields.push({
      name: 'background',
      type: 'select',
      defaultValue: backgroundDefault,
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    })
  }

  if (includePadding) {
    fields.push({
      name: 'padding',
      type: 'select',
      defaultValue: paddingDefault,
      options: [
        { label: 'None', value: 'none' },
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'standard' },
        { label: 'Spacious', value: 'large' },
      ],
    })
  }

  if (includeWidth) {
    fields.push({
      name: 'width',
      type: 'select',
      defaultValue: widthDefault,
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full width', value: 'full' },
      ],
    })
  }

  fields.push(...extraFields)

  fields.push(
    {
      name: 'hideOnMobile',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'hideOnDesktop',
      type: 'checkbox',
      defaultValue: false,
    },
  )

  return {
    name: 'advanced',
    label: 'Advanced Settings',
    type: 'group',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.enableAdvanced),
    },
    fields,
  }
}
