import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

type SubmissionDetailsItem = {
  label: string
  value: string
}

const FIELD_LABEL_OVERRIDES: Record<string, string> = {
  fullName: 'Full name',
  contactName: 'Contact name',
  organization: 'Organization',
  company: 'Company',
  email: 'Email',
  phone: 'Phone',
  outlet: 'Media outlet',
  deadline: 'Deadline',
}

const toLabel = (key: string) =>
  FIELD_LABEL_OVERRIDES[key] ??
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .trim()

const normalizeValue = (value: unknown): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return JSON.stringify(value)
}

const buildDetails = (raw: Record<string, unknown>): SubmissionDetailsItem[] =>
  Object.entries(raw)
    .map(([key, value]) => ({
      label: toLabel(key),
      value: normalizeValue(value),
    }))
    .filter((item) => item.value.trim().length > 0)

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'summary',
    defaultColumns: ['summary', 'formType', 'email', 'createdAt'],
  },
  access: {
    read: authenticated,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation !== 'create') return data
        const raw = (data?.data ?? {}) as Record<string, unknown>
        const getValue = (key: string) => (typeof raw[key] === 'string' ? raw[key] : undefined)

        return {
          ...data,
          summary: data?.summary || 'Form submission',
          name: data?.name || getValue('name') || getValue('fullName'),
          email: data?.email || getValue('email'),
          phone: data?.phone || getValue('phone'),
          organization: data?.organization || getValue('organization') || getValue('company'),
          role: data?.role || getValue('role'),
          outlet: data?.outlet || getValue('outlet'),
          deadline: data?.deadline || getValue('deadline'),
          topic: data?.topic || getValue('topic'),
          message: data?.message || getValue('message'),
          details: buildDetails(raw),
        }
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (!doc) return doc
        if (doc.details && Array.isArray(doc.details) && doc.details.length > 0) return doc
        if (!doc.data || typeof doc.data !== 'object' || Array.isArray(doc.data)) return doc

        return {
          ...doc,
          details: buildDetails(doc.data as Record<string, unknown>),
        }
      },
    ],
  },
  fields: [
    {
      name: 'submissionBrief',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/FormSubmissionBrief',
        },
      },
    },
    {
      name: 'summary',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Newsletter Signup', value: 'newsletter' },
        { label: 'General Contact', value: 'contact' },
        { label: 'Media Inquiry', value: 'media' },
        { label: 'Policy Briefing Request', value: 'policyBrief' },
        { label: 'Event Registration', value: 'event' },
        { label: 'Membership / Supporter Interest', value: 'membership' },
      ],
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'page',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Full name',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'email',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'organization',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'outlet',
      type: 'text',
      label: 'Media outlet',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'deadline',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'topic',
      type: 'textarea',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'data',
      type: 'json',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'details',
      type: 'array',
      label: 'Submission Details',
      admin: {
        readOnly: true,
        description: 'Read-only snapshot of the submitted fields.',
        hidden: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'value',
          type: 'textarea',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  timestamps: true,
}
