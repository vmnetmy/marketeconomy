import type { Field } from 'payload'

const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
const RGB_COLOR =
  /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/

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

const validateColor = (value: unknown) => {
  if (value === null || value === undefined || value === '') return true
  if (typeof value !== 'string') return 'Use a valid color string.'
  const trimmed = value.trim()
  if (HEX_COLOR.test(trimmed) || RGB_COLOR.test(trimmed)) return true
  return 'Use hex (#fff or #ffffff) or rgb()/rgba() values.'
}

export function buildRichTextAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. content',
    extraFields: [
      {
        name: 'typography',
        type: 'group',
        fields: [
          {
            name: 'textSize',
            type: 'select',
            defaultValue: 'md',
            options: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
          },
          {
            name: 'lineHeight',
            type: 'select',
            defaultValue: 'normal',
            options: [
              { label: 'Snug', value: 'snug' },
              { label: 'Normal', value: 'normal' },
              { label: 'Relaxed', value: 'relaxed' },
            ],
          },
          {
            name: 'textAlign',
            type: 'select',
            defaultValue: 'left',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ],
          },
          {
            name: 'leadStyle',
            type: 'select',
            defaultValue: 'none',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Lead', value: 'lead' },
            ],
          },
          {
            name: 'dropCap',
            type: 'select',
            defaultValue: 'none',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Subtle', value: 'subtle' },
              { label: 'Strong', value: 'strong' },
            ],
          },
        ],
      },
      {
        name: 'layout',
        type: 'group',
        fields: [
          {
            name: 'columns',
            type: 'select',
            defaultValue: '1',
            options: [
              { label: 'One', value: '1' },
              { label: 'Two', value: '2' },
            ],
          },
          {
            name: 'columnGap',
            type: 'select',
            defaultValue: 'md',
            options: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
          },
          {
            name: 'maxWidth',
            type: 'select',
            defaultValue: 'standard',
            options: [
              { label: 'Narrow', value: 'narrow' },
              { label: 'Standard', value: 'standard' },
              { label: 'Wide', value: 'wide' },
              { label: 'Full', value: 'full' },
            ],
          },
        ],
      },
      {
        name: 'container',
        type: 'group',
        fields: [
          {
            name: 'surface',
            type: 'select',
            defaultValue: 'none',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Soft', value: 'soft' },
              { label: 'Card', value: 'card' },
              { label: 'Outline', value: 'outline' },
              { label: 'Gradient', value: 'gradient' },
            ],
          },
          {
            name: 'radius',
            type: 'select',
            defaultValue: 'md',
            options: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
          },
          {
            name: 'shadow',
            type: 'select',
            defaultValue: 'none',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Soft', value: 'soft' },
              { label: 'Medium', value: 'medium' },
            ],
          },
          {
            name: 'innerPadding',
            type: 'select',
            defaultValue: 'standard',
            options: [
              { label: 'Compact', value: 'compact' },
              { label: 'Standard', value: 'standard' },
              { label: 'Large', value: 'large' },
            ],
          },
          {
            name: 'borderStyle',
            type: 'select',
            defaultValue: 'none',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Subtle', value: 'subtle' },
              { label: 'Strong', value: 'strong' },
            ],
          },
        ],
      },
      {
        name: 'callouts',
        type: 'group',
        fields: [
          {
            name: 'highlightMode',
            type: 'select',
            defaultValue: 'none',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Left Bar', value: 'leftBar' },
              { label: 'Note Box', value: 'noteBox' },
            ],
          },
          {
            name: 'highlightText',
            type: 'textarea',
          },
        ],
      },
      {
        name: 'colors',
        type: 'group',
        fields: [
          {
            name: 'textColor',
            type: 'text',
            validate: validateColor,
            admin: { placeholder: '#1f2937 or rgb(31,55,70)' },
          },
          {
            name: 'headingColor',
            type: 'text',
            validate: validateColor,
            admin: { placeholder: '#0f172a' },
          },
          {
            name: 'linkColor',
            type: 'text',
            validate: validateColor,
            admin: { placeholder: '#2563eb' },
          },
          {
            name: 'accentColor',
            type: 'text',
            validate: validateColor,
            admin: { placeholder: '#2563eb' },
          },
          {
            name: 'backgroundColor',
            type: 'text',
            validate: validateColor,
            admin: { placeholder: '#ffffff' },
          },
          {
            name: 'borderColor',
            type: 'text',
            validate: validateColor,
            admin: { placeholder: '#e2e8f0' },
          },
        ],
      },
    ],
  })
}
