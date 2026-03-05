'use client'

import { useState } from 'react'

import { CMS_URL } from '../../lib/cms'

type EventRegistrationFormProps = {
  eventId: string
  eventTitle?: string
  isClosed?: boolean
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EventRegistrationForm({ eventId, eventTitle, isClosed = false }: EventRegistrationFormProps) {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isClosed) return

    setStatus('submitting')
    setMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      event: eventId,
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      organisation: String(formData.get('organisation') || '').trim() || undefined,
      phone: String(formData.get('phone') || '').trim() || undefined,
      extraFields: undefined as Record<string, unknown> | undefined,
    }

    const notes = String(formData.get('notes') || '').trim()
    if (notes) {
      payload.extraFields = { notes }
    }

    try {
      const res = await fetch(`${CMS_URL}/api/eventRegistrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const errorMessage = data?.message || data?.errors?.[0]?.message || 'Unable to submit registration.'
        throw new Error(errorMessage)
      }

      setStatus('success')
      setMessage(`Thanks for registering${eventTitle ? ` for ${eventTitle}` : ''}. Check your email for confirmation.`)
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to submit registration.')
    }
  }

  if (isClosed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Registration is closed for this event.
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        {message}
      </div>
    )
  }

  return (
    <form className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6" onSubmit={handleSubmit}>
      <div className="grid gap-2 text-sm">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Full Name</label>
        <input
          name="name"
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
          placeholder="Your name"
        />
      </div>
      <div className="grid gap-2 text-sm">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</label>
        <input
          name="email"
          type="email"
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
          placeholder="you@email.com"
        />
      </div>
      <div className="grid gap-2 text-sm">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Organisation</label>
        <input
          name="organisation"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
          placeholder="Organisation"
        />
      </div>
      <div className="grid gap-2 text-sm">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Phone</label>
        <input
          name="phone"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
          placeholder="+60"
        />
      </div>
      <div className="grid gap-2 text-sm">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Notes (optional)</label>
        <textarea
          name="notes"
          rows={3}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
          placeholder="Anything we should know?"
        />
      </div>

      {message && status === 'error' ? <p className="text-sm text-red-600">{message}</p> : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Register'}
      </button>
    </form>
  )
}
