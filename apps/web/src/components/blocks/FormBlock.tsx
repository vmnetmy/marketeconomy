'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import type { CMSBlock, FormAdvancedSettings } from '../../lib/cms'
import { CMS_URL } from '../../lib/cms'
import { getFormStyles, getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'

type FormFieldOption = {
  label?: string
  value?: string
}

type FormField = {
  name?: string
  label?: string
  type?: 'text' | 'email' | 'phone' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  span?: 'full' | 'half'
  options?: FormFieldOption[]
}

type FormBlock = CMSBlock & {
  formType?: string
  headline?: string
  description?: string
  submitLabel?: string
  successMessage?: string
  fields?: FormField[]
  destination?: {
    mode?: 'cms' | 'external'
    formAction?: string
  }
  advanced?: FormAdvancedSettings
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function FormBlock({ block }: { block: FormBlock }) {
  const pathname = usePathname()
  const sectionProps = getSectionProps(block.advanced)
  const { cardClass, gridClass, headerClass, labelClass, inputClass, textareaClass, selectClass, buttonClass } =
    getFormStyles(block.advanced)

  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const mode = block.destination?.mode ?? 'cms'
  const externalAction = block.destination?.formAction?.trim() ?? ''
  const isExternal = mode === 'external' && externalAction.length > 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (isExternal) return
    event.preventDefault()

    setStatus('submitting')
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = {}

    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    const payload = {
      summary: block.headline ?? 'Website form submission',
      formType: block.formType ?? 'contact',
      page: pathname,
      name: data.name || data.fullName || data.contactName || '',
      email: data.email || '',
      data,
    }

    try {
      const res = await fetch(`${CMS_URL}/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage('Unable to submit this form. Please try again shortly.')
    }
  }

  const fields = block.fields ?? []
  const submitLabel = block.submitLabel || 'Submit'
  const successMessage = block.successMessage || 'Thanks! We will be in touch shortly.'

  return (
    <SectionWrapper {...sectionProps}>
      <section className={cardClass}>
        {(block.headline || block.description) && (
          <div className={`${headerClass} space-y-2`}>
            {block.headline ? <h2 className="text-2xl font-semibold text-slate-900">{block.headline}</h2> : null}
            {block.description ? <p className="text-slate-600">{block.description}</p> : null}
          </div>
        )}

        <form
          className={`mt-6 ${gridClass}`}
          onSubmit={handleSubmit}
          action={isExternal ? externalAction : undefined}
          method="post"
        >
          {fields.map((field, index) => {
            const fieldKey = field.name || `field-${index}`
            const spanClass = field.span === 'half' ? 'md:col-span-1' : 'md:col-span-2'
            const wrapperClass = gridClass.includes('md:grid-cols-2') ? spanClass : 'col-span-1'
            const required = Boolean(field.required)
            const label = field.label || field.name || 'Field'
            const placeholder = field.placeholder || ''
            const type = field.type ?? 'text'

            return (
              <div key={fieldKey} className={`flex flex-col gap-2 ${wrapperClass}`}>
                <label className={labelClass} htmlFor={fieldKey}>
                  {label}
                  {required ? ' *' : ''}
                </label>
                {type === 'textarea' ? (
                  <textarea
                    id={fieldKey}
                    name={fieldKey}
                    placeholder={placeholder}
                    required={required}
                    rows={4}
                    className={textareaClass}
                  />
                ) : type === 'select' ? (
                  <select id={fieldKey} name={fieldKey} required={required} className={selectClass} defaultValue="">
                    <option value="" disabled>
                      {placeholder || 'Select an option'}
                    </option>
                    {(field.options ?? []).map((option, optionIndex) => (
                      <option
                        key={`${fieldKey}-option-${optionIndex}`}
                        value={option.value ?? option.label ?? ''}
                      >
                        {option.label ?? option.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={fieldKey}
                    name={fieldKey}
                    type={type === 'phone' ? 'tel' : type}
                    placeholder={placeholder}
                    required={required}
                    className={inputClass}
                  />
                )}
              </div>
            )
          })}

          <div className="col-span-1 md:col-span-2">
            <button type="submit" className={buttonClass} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : submitLabel}
            </button>
          </div>
        </form>

        {status === 'success' ? <p className="mt-4 text-sm text-emerald-600">{successMessage}</p> : null}
        {status === 'error' ? <p className="mt-4 text-sm text-rose-600">{errorMessage}</p> : null}
      </section>
    </SectionWrapper>
  )
}
