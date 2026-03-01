import type { Field } from 'payload'

import { buildAdvancedTabsGroup, validateColor } from './common'

const withWidth = (field: Field, width?: string): Field => {
  if (!width) return field
  return {
    ...field,
    admin: {
      ...((field.admin ?? {}) as Field['admin']),
      width,
    } as Field['admin'],
  } as Field
}

export function buildRichTextAdvancedGroup(): Field {
  return buildAdvancedTabsGroup({
    anchorPlaceholder: 'e.g. content',
    className: 'advanced-tabs',
    tabs: [
      {
        label: 'Typography',
        fields: [
          {
            name: 'typography',
            label: false,
            type: 'group',
            admin: { className: 'advanced-grid' },
            fields: [
              withWidth(
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
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
              withWidth(
                {
                  name: 'leadStyle',
                  type: 'select',
                  defaultValue: 'none',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Lead', value: 'lead' },
                  ],
                },
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
            ],
          },
        ],
      },
      {
        label: 'Layout',
        fields: [
          {
            name: 'layout',
            label: false,
            type: 'group',
            admin: { className: 'advanced-grid' },
            fields: [
              withWidth(
                {
                  name: 'columns',
                  type: 'select',
                  defaultValue: '1',
                  options: [
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                  ],
                },
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
            ],
          },
        ],
      },
      {
        label: 'Container',
        fields: [
          {
            name: 'container',
            label: false,
            type: 'group',
            admin: { className: 'advanced-grid' },
            fields: [
              withWidth(
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
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
              withWidth(
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
                '50%',
              ),
            ],
          },
        ],
      },
      {
        label: 'Callouts',
        fields: [
          {
            name: 'callouts',
            label: false,
            type: 'group',
            admin: { className: 'advanced-grid' },
            fields: [
              withWidth(
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
                '50%',
              ),
              withWidth(
                {
                  name: 'highlightText',
                  type: 'textarea',
                },
                '100%',
              ),
            ],
          },
        ],
      },
      {
        label: 'Colors',
        fields: [
          {
            name: 'colors',
            label: false,
            type: 'group',
            admin: { className: 'advanced-grid' },
            fields: [
              withWidth(
                {
                  name: 'textColor',
                  type: 'text',
                  validate: validateColor,
                  admin: { placeholder: '#1f2937 or rgb(31,55,70)' },
                },
                '50%',
              ),
              withWidth(
                {
                  name: 'headingColor',
                  type: 'text',
                  validate: validateColor,
                  admin: { placeholder: '#0f172a' },
                },
                '50%',
              ),
              withWidth(
                {
                  name: 'linkColor',
                  type: 'text',
                  validate: validateColor,
                  admin: { placeholder: '#2563eb' },
                },
                '50%',
              ),
              withWidth(
                {
                  name: 'accentColor',
                  type: 'text',
                  validate: validateColor,
                  admin: { placeholder: '#2563eb' },
                },
                '50%',
              ),
              withWidth(
                {
                  name: 'backgroundColor',
                  type: 'text',
                  validate: validateColor,
                  admin: { placeholder: '#ffffff' },
                },
                '50%',
              ),
              withWidth(
                {
                  name: 'borderColor',
                  type: 'text',
                  validate: validateColor,
                  admin: { placeholder: '#e2e8f0' },
                },
                '50%',
              ),
            ],
          },
        ],
      },
    ],
  })
}
