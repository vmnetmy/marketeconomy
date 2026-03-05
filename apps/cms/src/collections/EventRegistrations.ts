import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'
import { sendEmail } from '../util/email'

export const EventRegistrations: CollectionConfig = {
  slug: 'eventRegistrations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'event', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const eventId = typeof data?.event === 'string' ? data?.event : data?.event?.id
        const email = data?.email?.toLowerCase().trim()
        if (!eventId || !email || !req?.payload) return data

        const existing = await req.payload.find({
          collection: 'eventRegistrations',
          where: {
            and: [
              { event: { equals: eventId } },
              { email: { equals: email } },
            ],
          },
          limit: 1,
          depth: 0,
        })

        if (existing?.docs?.length) {
          throw new Error('You are already registered for this event with that email.')
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        const adminEmail = process.env.ADMIN_NOTIFICATIONS_EMAIL
        const from = process.env.EMAIL_FROM
        const event = doc.event && typeof doc.event === 'object' ? doc.event : null
        const eventTitle = event?.title ?? 'Event'
        const siteUrl = process.env.NEXT_PUBLIC_WEB_URL || process.env.WEB_URL || 'https://marketeconomy.org'

        await sendEmail({
          to: doc.email,
          from,
          subject: `Registration confirmed: ${eventTitle}`,
          html: `<p>Hi ${doc.name},</p><p>Thanks for registering for <strong>${eventTitle}</strong>.</p><p>We will be in touch with updates. For questions, reply to this email.</p><p>— Network for Market Economy</p>`,
          text: `Hi ${doc.name},\n\nThanks for registering for ${eventTitle}.\nWe will be in touch with updates.\n\n— Network for Market Economy`,
        })

        if (adminEmail) {
          await sendEmail({
            to: adminEmail,
            from,
            subject: `New event registration: ${eventTitle}`,
            html: `<p>New registration for <strong>${eventTitle}</strong>.</p><ul><li>Name: ${doc.name}</li><li>Email: ${doc.email}</li><li>Organisation: ${doc.organisation ?? '-'}</li><li>Phone: ${doc.phone ?? '-'}</li></ul><p>View in admin: ${siteUrl}/admin/collections/eventRegistrations/${doc.id}</p>`,
            text: `New registration for ${eventTitle}\nName: ${doc.name}\nEmail: ${doc.email}\nOrganisation: ${doc.organisation ?? '-'}\nPhone: ${doc.phone ?? '-'}\n`,
          })
        }
      },
    ],
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'organisation',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'extraFields',
      type: 'json',
    },
  ],
}
