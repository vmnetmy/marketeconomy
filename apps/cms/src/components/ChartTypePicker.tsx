'use client'

import React, { useCallback, useState } from 'react'
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  fieldBaseClass,
  useField,
} from '@payloadcms/ui'
import type { ClientComponentProps, SelectFieldValidation } from 'payload'

type ChartOption = {
  label: string
  value: string
  renderPreview: () => React.ReactNode
}

type ChartTypePickerProps = {
  readonly onChange?: (value: string | null) => void
  readonly path: string
  readonly validate?: SelectFieldValidation
  readonly value?: string | null
  readonly field: {
    name: string
    label?: string
    localized?: boolean
    required?: boolean
    admin?: {
      className?: string
      description?: string
    }
  }
} & Omit<ClientComponentProps, 'customComponents' | 'field'>

const chartOptions: ChartOption[] = [
  {
    label: 'Bar',
    value: 'bar',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <rect x="12" y="30" width="14" height="22" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="34" y="18" width="14" height="34" rx="2" fill="currentColor" opacity="0.55" />
        <rect x="56" y="10" width="14" height="42" rx="2" fill="currentColor" opacity="0.75" />
        <rect x="78" y="24" width="14" height="28" rx="2" fill="currentColor" />
        <line x1="10" y1="54" x2="108" y2="54" stroke="currentColor" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    label: 'Line',
    value: 'line',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <polyline
          points="10,44 30,26 50,34 70,16 90,28 110,12"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle cx="30" cy="26" r="3" fill="currentColor" />
        <circle cx="70" cy="16" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Area',
    value: 'area',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <polygon
          points="10,44 30,26 50,34 70,16 90,28 110,12 110,54 10,54"
          fill="currentColor"
          opacity="0.35"
        />
        <polyline
          points="10,44 30,26 50,34 70,16 90,28 110,12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    ),
  },
  {
    label: 'Pie',
    value: 'pie',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <circle cx="40" cy="32" r="18" fill="currentColor" opacity="0.2" />
        <path d="M40 14 A18 18 0 0 1 58 32 L40 32 Z" fill="currentColor" opacity="0.55" />
        <path d="M58 32 A18 18 0 0 1 32 50 L40 32 Z" fill="currentColor" opacity="0.75" />
        <path d="M32 50 A18 18 0 0 1 40 14 L40 32 Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Donut',
    value: 'donut',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <circle cx="40" cy="32" r="18" fill="currentColor" opacity="0.2" />
        <circle cx="40" cy="32" r="10" fill="var(--theme-elevation-0)" />
        <path d="M40 14 A18 18 0 0 1 58 32 L40 32 Z" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    label: 'Stacked Bar',
    value: 'stackedBar',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <rect x="18" y="26" width="16" height="10" rx="2" fill="currentColor" opacity="0.45" />
        <rect x="18" y="36" width="16" height="16" rx="2" fill="currentColor" opacity="0.75" />
        <rect x="42" y="16" width="16" height="12" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="42" y="28" width="16" height="24" rx="2" fill="currentColor" />
        <rect x="66" y="22" width="16" height="10" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="66" y="32" width="16" height="20" rx="2" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    label: 'Grouped Bar',
    value: 'groupedBar',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <rect x="14" y="28" width="10" height="24" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="26" y="18" width="10" height="34" rx="2" fill="currentColor" opacity="0.7" />
        <rect x="46" y="22" width="10" height="30" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="58" y="12" width="10" height="40" rx="2" fill="currentColor" opacity="0.8" />
        <rect x="78" y="26" width="10" height="26" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="90" y="16" width="10" height="36" rx="2" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
  {
    label: 'Scatter',
    value: 'scatter',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <circle cx="20" cy="40" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="38" cy="28" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="56" cy="36" r="4" fill="currentColor" />
        <circle cx="74" cy="20" r="4" fill="currentColor" opacity="0.7" />
        <circle cx="92" cy="32" r="4" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: 'Radar',
    value: 'radar',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <polygon
          points="60,10 88,26 78,54 42,54 32,26"
          fill="currentColor"
          opacity="0.2"
        />
        <polygon
          points="60,16 80,28 72,48 48,48 40,28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    label: 'Heatmap',
    value: 'heatmap',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <rect x="12" y="14" width="14" height="14" fill="currentColor" opacity="0.25" />
        <rect x="28" y="14" width="14" height="14" fill="currentColor" opacity="0.5" />
        <rect x="44" y="14" width="14" height="14" fill="currentColor" opacity="0.75" />
        <rect x="60" y="14" width="14" height="14" fill="currentColor" />
        <rect x="12" y="30" width="14" height="14" fill="currentColor" opacity="0.6" />
        <rect x="28" y="30" width="14" height="14" fill="currentColor" opacity="0.35" />
        <rect x="44" y="30" width="14" height="14" fill="currentColor" opacity="0.9" />
        <rect x="60" y="30" width="14" height="14" fill="currentColor" opacity="0.45" />
      </svg>
    ),
  },
  {
    label: 'Treemap',
    value: 'treemap',
    renderPreview: () => (
      <svg viewBox="0 0 120 64" width="100%" height="64" aria-hidden="true">
        <rect x="10" y="12" width="40" height="40" fill="currentColor" opacity="0.3" />
        <rect x="52" y="12" width="30" height="18" fill="currentColor" opacity="0.6" />
        <rect x="52" y="32" width="18" height="20" fill="currentColor" opacity="0.45" />
        <rect x="72" y="32" width="20" height="20" fill="currentColor" />
      </svg>
    ),
  },
]

const ChartTypePicker: React.FC<ChartTypePickerProps> = (props) => {
  const {
    field: { admin: { className, description } = {}, label, localized, required },
    onChange: onChangeFromProps,
    path: pathFromProps,
    readOnly,
  } = props

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField({
    potentiallyStalePath: pathFromProps,
  })

  const [hoveredValue, setHoveredValue] = useState<string | null>(null)

  const onSelect = useCallback(
    (nextValue: string) => {
      if (readOnly || disabled) return
      if (typeof onChangeFromProps === 'function') {
        onChangeFromProps(nextValue)
      }
      setValue(nextValue)
    },
    [disabled, onChangeFromProps, readOnly, setValue],
  )

  const classes = [fieldBaseClass, className, showError && 'error', readOnly && 'read-only']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} id={`field-${path.replace(/\./g, '__')}`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} localized={localized} path={path} required={required} />}
      />
      <div className={`${fieldBaseClass}__wrap`}>
        <RenderCustomComponent CustomComponent={Error} Fallback={<FieldError path={path} showError={showError} />} />
        {BeforeInput}
        <div
          role="radiogroup"
          aria-disabled={readOnly || disabled}
          style={{
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            marginTop: '0.5rem',
          }}
        >
          {chartOptions.map((option) => {
            const isSelected = value === option.value
            const isHovered = hoveredValue === option.value
            const isInteractive = !(readOnly || disabled)
            const highlightColor = 'var(--theme-brand)'
            const accentShadow = isSelected
              ? '0 10px 22px rgba(0,0,0,0.12)'
              : isHovered
                ? '0 10px 20px rgba(0,0,0,0.08)'
                : 'none'
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(option.value)}
                onMouseEnter={() => {
                  if (isInteractive) setHoveredValue(option.value)
                }}
                onMouseLeave={() => {
                  if (isInteractive) setHoveredValue(null)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onSelect(option.value)
                  }
                }}
                disabled={!isInteractive}
                style={{
                  border: `2px solid ${
                    isSelected || isHovered ? highlightColor : 'var(--theme-border-color)'
                  }`,
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(14,165,233,0.08))'
                    : isHovered
                      ? 'var(--theme-elevation-50)'
                      : 'var(--theme-elevation-0)',
                  borderRadius: '12px',
                  padding: '10px',
                  cursor: isInteractive ? 'pointer' : 'not-allowed',
                  textAlign: 'left',
                  color: isSelected || isHovered ? highlightColor : 'var(--theme-text)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: accentShadow,
                }}
              >
                <div style={{ color: 'var(--theme-text)', opacity: 0.8 }}>{option.renderPreview()}</div>
                <div style={{ marginTop: '6px', fontSize: '0.85rem', fontWeight: 600 }}>{option.label}</div>
              </button>
            )
          })}
        </div>
        {AfterInput}
      </div>
      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={<FieldDescription description={description} path={path} />}
      />
    </div>
  )
}

export default ChartTypePicker
