import type { Field } from 'payload'

const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
const RGB_COLOR =
  /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/

export type AdvancedGroupOptions = {
  includeBackground?: boolean
  includePadding?: boolean
  includeWidth?: boolean
  anchorPlaceholder?: string
  backgroundDefault?: 'none' | 'light' | 'dark'
  paddingDefault?: 'none' | 'compact' | 'standard' | 'large'
  widthDefault?: 'standard' | 'wide' | 'full'
  extraFields?: Field[]
}

export type AdvancedTabsGroupOptions = AdvancedGroupOptions & {
  tabs: Array<{ label: string; fields: Field[] }>
  basicsLabel?: string
  className?: string
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

const withAdminWidth = (field: Field, width?: string): Field => {
  if (!width) return field
  return {
    ...field,
    admin: {
      ...((field.admin ?? {}) as Field['admin']),
      width,
    } as Field['admin'],
  } as Field
}

export function buildAdvancedTabsGroup(options: AdvancedTabsGroupOptions): Field {
  const {
    includeBackground = true,
    includePadding = true,
    includeWidth = true,
    anchorPlaceholder = 'e.g. section-anchor',
    backgroundDefault = 'none',
    paddingDefault = 'standard',
    widthDefault = 'standard',
    tabs,
    basicsLabel = 'Basics',
    className,
  } = options

  const basicsFields: Field[] = [
    withAdminWidth(
      {
        name: 'anchorId',
        type: 'text',
        admin: {
          placeholder: anchorPlaceholder,
        },
      },
      '100%',
    ),
  ]

  if (includeBackground) {
    basicsFields.push(
      withAdminWidth(
        {
          name: 'background',
          type: 'select',
          defaultValue: backgroundDefault,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
        '33%',
      ),
    )
  }

  if (includePadding) {
    basicsFields.push(
      withAdminWidth(
        {
          name: 'padding',
          type: 'select',
          defaultValue: paddingDefault,
          options: [
            { label: 'None', value: 'none' },
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'standard' },
            { label: 'Spacious', value: 'large' },
          ],
        },
        '33%',
      ),
    )
  }

  if (includeWidth) {
    basicsFields.push(
      withAdminWidth(
        {
          name: 'width',
          type: 'select',
          defaultValue: widthDefault,
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full width', value: 'full' },
          ],
        },
        '33%',
      ),
    )
  }

  basicsFields.push(
    withAdminWidth(
      {
        name: 'hideOnMobile',
        type: 'checkbox',
        defaultValue: false,
      },
      '50%',
    ),
    withAdminWidth(
      {
        name: 'hideOnDesktop',
        type: 'checkbox',
        defaultValue: false,
      },
      '50%',
    ),
  )

  return {
    name: 'advanced',
    label: 'Advanced Settings',
    type: 'group',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.enableAdvanced),
      ...(className ? { className } : {}),
    },
    fields: [
      {
        type: 'tabs',
        tabs: [{ label: basicsLabel, fields: basicsFields }, ...tabs],
      },
    ],
  }
}

export const validateColor = (value: unknown) => {
  if (value === null || value === undefined || value === '') return true
  if (typeof value !== 'string') return 'Use a valid color string.'
  const trimmed = value.trim()
  if (HEX_COLOR.test(trimmed) || RGB_COLOR.test(trimmed)) return true
  return 'Use hex (#fff or #ffffff) or rgb()/rgba() values.'
}
