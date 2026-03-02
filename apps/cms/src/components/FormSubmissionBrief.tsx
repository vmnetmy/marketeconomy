'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

type DetailItem = {
  label?: string
  value?: string
}

type SubmissionData = {
  summary?: string
  formType?: string
  page?: string
  name?: string
  email?: string
  phone?: string
  organization?: string
  role?: string
  outlet?: string
  deadline?: string
  topic?: string
  message?: string
  createdAt?: string
  updatedAt?: string
  details?: DetailItem[]
}

const formatDate = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const findDetail = (details: DetailItem[] | undefined, labels: string[]) => {
  if (!details?.length) return ''
  const found = details.find((item) => {
    const label = item.label?.toLowerCase().trim()
    return label ? labels.some((candidate) => label === candidate.toLowerCase()) : false
  })
  return found?.value ?? ''
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'baseline',
  margin: '0.35rem 0',
}

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--theme-elevation-700)',
  minWidth: '140px',
}

const valueStyle: React.CSSProperties = {
  color: 'var(--theme-elevation-900)',
}

const sectionTitleStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: 'var(--theme-elevation-500)',
}

export default function FormSubmissionBrief() {
  const submission = useFormFields(([fields]) => {
    const getValue = (key: string) => fields?.[key]?.value
    return {
      summary: getValue('summary') as string | undefined,
      formType: getValue('formType') as string | undefined,
      page: getValue('page') as string | undefined,
      name: getValue('name') as string | undefined,
      email: getValue('email') as string | undefined,
      phone: getValue('phone') as string | undefined,
      organization: getValue('organization') as string | undefined,
      role: getValue('role') as string | undefined,
      outlet: getValue('outlet') as string | undefined,
      deadline: getValue('deadline') as string | undefined,
      topic: getValue('topic') as string | undefined,
      message: getValue('message') as string | undefined,
      createdAt: getValue('createdAt') as string | undefined,
      updatedAt: getValue('updatedAt') as string | undefined,
      details: (getValue('details') as DetailItem[] | undefined) ?? [],
    } satisfies SubmissionData
  })

  const name = submission.name || findDetail(submission.details, ['Full name', 'Name', 'Contact name'])
  const email = submission.email || findDetail(submission.details, ['Email'])
  const phone = submission.phone || findDetail(submission.details, ['Phone'])
  const organization =
    submission.organization || findDetail(submission.details, ['Organization', 'Company', 'Organisation'])
  const role = submission.role || findDetail(submission.details, ['Role', 'Position'])
  const outlet = submission.outlet || findDetail(submission.details, ['Media outlet', 'Outlet'])
  const deadline = submission.deadline || findDetail(submission.details, ['Deadline'])
  const topic = submission.topic || findDetail(submission.details, ['Topic', 'Subject'])
  const message = submission.message || findDetail(submission.details, ['Message', 'Message body'])

  return (
    <div style={{ padding: '1.5rem 0 2rem', maxWidth: 900 }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          {submission.summary || 'Form Submission'}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: 'var(--theme-elevation-500)' }}>
          {submission.formType ? <span>Type: {submission.formType}</span> : null}
          {submission.page ? <span>Page: {submission.page}</span> : null}
          {submission.createdAt ? <span>Created: {formatDate(submission.createdAt)}</span> : null}
          {submission.updatedAt ? <span>Last Modified: {formatDate(submission.updatedAt)}</span> : null}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--theme-elevation-150)', paddingTop: '1rem' }}>
        <div style={sectionTitleStyle}>Contact Information</div>
        {name ? (
          <div style={rowStyle}>
            <span style={labelStyle}>Full Name:</span>
            <span style={valueStyle}>{name}</span>
          </div>
        ) : null}
        {email ? (
          <div style={rowStyle}>
            <span style={labelStyle}>Email:</span>
            <span style={valueStyle}>{email}</span>
          </div>
        ) : null}
        {phone ? (
          <div style={rowStyle}>
            <span style={labelStyle}>Phone:</span>
            <span style={valueStyle}>{phone}</span>
          </div>
        ) : null}

        {(organization || role || outlet || deadline) && (
          <>
            <div style={sectionTitleStyle}>Organization Details</div>
            {organization ? (
              <div style={rowStyle}>
                <span style={labelStyle}>Organization:</span>
                <span style={valueStyle}>{organization}</span>
              </div>
            ) : null}
            {role ? (
              <div style={rowStyle}>
                <span style={labelStyle}>Role:</span>
                <span style={valueStyle}>{role}</span>
              </div>
            ) : null}
            {outlet ? (
              <div style={rowStyle}>
                <span style={labelStyle}>Media Outlet:</span>
                <span style={valueStyle}>{outlet}</span>
              </div>
            ) : null}
            {deadline ? (
              <div style={rowStyle}>
                <span style={labelStyle}>Deadline:</span>
                <span style={valueStyle}>{deadline}</span>
              </div>
            ) : null}
          </>
        )}

        {(topic || message) && (
          <>
            <div style={sectionTitleStyle}>Message</div>
            {topic ? (
              <div style={rowStyle}>
                <span style={labelStyle}>Topic:</span>
                <span style={valueStyle}>{topic}</span>
              </div>
            ) : null}
            {message ? (
              <div style={{ marginTop: '0.75rem', color: 'var(--theme-elevation-900)', lineHeight: 1.7 }}>
                {message}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
