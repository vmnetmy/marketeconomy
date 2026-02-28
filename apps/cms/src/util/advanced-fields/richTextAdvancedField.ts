import type { Field } from 'payload'

import { buildAdvancedGroup, validateColor } from './common'

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
