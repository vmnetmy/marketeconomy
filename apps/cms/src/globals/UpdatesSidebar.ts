import type { GlobalConfig } from 'payload'

export const UpdatesSidebar: GlobalConfig = {
  slug: 'updates-sidebar',
  label: 'Updates Sidebar',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'newsletterHeadline',
      type: 'text',
    },
    {
      name: 'newsletterDescription',
      type: 'textarea',
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'formAction',
      type: 'text',
    },
    {
      name: 'finePrint',
      type: 'text',
    },
    {
      name: 'featuredTitle',
      type: 'text',
    },
    {
      name: 'featuredLimit',
      type: 'number',
      defaultValue: 3,
      min: 1,
    },
  ],
}
