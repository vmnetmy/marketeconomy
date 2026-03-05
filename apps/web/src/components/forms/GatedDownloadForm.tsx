'use client'

import { useState } from 'react'

import { CMS_URL } from '../../lib/cms'

type GatedDownloadFormProps = {
  resourceType: 'policyBrief' | 'eventReport'
  resourceId: string
  buttonLabel?: string
}

export function GatedDownloadForm({ resourceType, resourceId, buttonLabel = 'Download PDF' }: GatedDownloadFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage(null)
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()

    try {
      const res = await fetch(`${CMS_URL}/api/gated-downloads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          resourceType,
          resourceId,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || 'Unable to submit. Please try again.')
      }

      setStatus('success')
      setMessage('Check your email for the download link.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to submit. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        {message}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
        onClick={() => setIsOpen((open) => !open)}
      >
        {buttonLabel}
      </button>

      {isOpen ? (
        <form className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4" onSubmit={handleSubmit}>
          <div className="grid gap-2 text-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Name</label>
            <input
              name="name"
              required
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              placeholder="Your name"
            />
          </div>
          <div className="grid gap-2 text-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</label>
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              placeholder="you@email.com"
            />
          </div>
          {message && status === 'error' ? <p className="text-sm text-red-600">{message}</p> : null}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send Link'}
          </button>
        </form>
      ) : null}
    </div>
  )
}
