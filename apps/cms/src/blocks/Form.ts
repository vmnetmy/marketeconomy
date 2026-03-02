import type { Block } from 'payload'

import { buildFormAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'

export const FormBlock: Block = {
  slug: 'form',
  labels: {
    singular: 'Form',
    plural: 'Forms',
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Newsletter Signup', value: 'newsletter' },
        { label: 'General Contact', value: 'contact' },
        { label: 'Media Inquiry', value: 'media' },
        { label: 'Policy Briefing Request', value: 'policyBrief' },
        { label: 'Event Registration', value: 'event' },
        { label: 'Membership / Supporter Interest', value: 'membership' },
      ],
    },
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Submit',
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thanks! We will be in touch shortly.',
    },
    {
      name: 'fields',
      type: 'array',
      labels: {
        singular: 'Field',
        plural: 'Fields',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Machine name (e.g. email, fullName). Used as the input name.',
          },
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'span',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Full width', value: 'full' },
            { label: 'Half width', value: 'half' },
          ],
        },
        {
          name: 'options',
          type: 'array',
          labels: {
            singular: 'Option',
            plural: 'Options',
          },
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'select',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'destination',
      type: 'group',
      fields: [
        {
          name: 'mode',
          type: 'select',
          defaultValue: 'cms',
          options: [
            { label: 'Store in CMS', value: 'cms' },
            { label: 'External URL', value: 'external' },
          ],
        },
        {
          name: 'formAction',
          type: 'text',
          admin: {
            placeholder: 'https://example.com/form-endpoint',
            condition: (_, siblingData) => siblingData?.mode === 'external',
          },
        },
      ],
    },
    enableAdvancedField,
    buildFormAdvancedGroup(),
  ],
}
