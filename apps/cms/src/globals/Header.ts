import type { Field, GlobalConfig } from 'payload'

const navItemFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'linkType',
    type: 'select',
    defaultValue: 'internal',
    options: [
      { label: 'Internal', value: 'internal' },
      { label: 'External', value: 'external' },
    ],
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'internal',
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      description: 'For internal links, use a path like /events or /publications/policy-brief.',
      condition: (_, siblingData) => siblingData?.linkType === 'external' || siblingData?.linkType === 'internal',
    },
  },
]

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        ...navItemFields,
        {
          name: 'children',
          type: 'array',
          fields: navItemFields,
          admin: {
            description: 'Optional sub-navigation items.',
          },
        },
      ],
    },
  ],
}
