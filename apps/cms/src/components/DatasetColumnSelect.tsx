'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  SelectInput,
  fieldBaseClass,
  useField,
  useFormFields,
} from '@payloadcms/ui'
import type { ClientComponentProps, SelectFieldValidation } from 'payload'

type Option = { label: string; value: string }

type ColumnSelectProps = {
  readonly onChange?: (value: string | string[] | null) => void
  readonly path: string
  readonly validate?: SelectFieldValidation
  readonly value?: string | string[] | null
  readonly field: {
    name: string
    label?: string
    localized?: boolean
    required?: boolean
    hasMany?: boolean
    admin?: {
      className?: string
      description?: string
      isClearable?: boolean
      isSortable?: boolean
      placeholder?: string
    }
  }
} & Omit<ClientComponentProps, 'customComponents' | 'field'>

const buildDatasetPath = (path: string): string => {
  const segments = path.split('.')
  const layoutIndex = segments.lastIndexOf('layout')
  if (layoutIndex !== -1 && segments.length > layoutIndex + 1) {
    return [...segments.slice(0, layoutIndex + 2), 'dataset'].join('.')
  }
  segments[segments.length - 1] = 'dataset'
  return segments.join('.')
}

const DatasetColumnSelect: React.FC<ColumnSelectProps> = (props) => {
  const {
    field,
    field: {
      name,
      admin: { className, description, isClearable = true, isSortable = true, placeholder } = {},
      hasMany = false,
      label,
      localized,
      required,
    },
    onChange: onChangeFromProps,
    path: pathFromProps,
    readOnly,
  } = props

  const datasetPath = useMemo(() => buildDatasetPath(pathFromProps), [pathFromProps])
  const datasetValue = useFormFields(([fields]) => fields?.[datasetPath]?.value as unknown)
  const datasetId =
    typeof datasetValue === 'object' && datasetValue !== null
      ? (datasetValue as { id?: string }).id
      : (datasetValue as string | undefined)

  const [options, setOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      if (!datasetId) {
        if (isMounted) {
          setOptions([])
          setError(null)
        }
        return
      }

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/datasets/${datasetId}?depth=0&draft=true`, {
          credentials: 'include',
        })
        if (!res.ok) {
          throw new Error(`Failed to load dataset (${res.status})`)
        }
        const data = (await res.json()) as { columns?: Array<{ key?: string; label?: string }> }
        const nextOptions =
          data.columns?.map((column) => ({
            label: column.label ?? column.key ?? 'Unnamed',
            value: column.key ?? '',
          })) ?? []
        if (isMounted) {
          setOptions(nextOptions.filter((option) => option.value))
        }
      } catch (err) {
        if (isMounted) {
          setOptions([])
          setError(err instanceof Error ? err.message : 'Failed to load columns')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [datasetId])

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error: ErrorComponent, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField({
    potentiallyStalePath: pathFromProps,
  })

  const onChange = useCallback(
    (selectedOption: Option | Option[] | null) => {
      if (readOnly || disabled) return
      let newValue: string | string[] | null = null
      if (selectedOption && hasMany) {
        newValue = Array.isArray(selectedOption) ? selectedOption.map((option) => option.value) : []
      } else if (selectedOption && !Array.isArray(selectedOption)) {
        newValue = selectedOption.value
      }
      if (typeof onChangeFromProps === 'function') {
        onChangeFromProps(newValue)
      }
      setValue(newValue)
    },
    [disabled, hasMany, onChangeFromProps, readOnly, setValue],
  )

  const classes = [fieldBaseClass, 'select', className, showError && 'error', readOnly && 'read-only']
    .filter(Boolean)
    .join(' ')

  const computedPlaceholder =
    placeholder ??
    (datasetId
      ? loading
        ? 'Loading columns...'
        : 'Select a column'
      : 'Select a dataset first')

  return (
    <div className={classes} id={`field-${path.replace(/\./g, '__')}`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} localized={localized} path={path} required={required} />}
      />
      <div className={`${fieldBaseClass}__wrap`}>
        <RenderCustomComponent CustomComponent={ErrorComponent} Fallback={<FieldError path={path} showError={showError} />} />
        {BeforeInput}
        <SelectInput
          className="react-select"
          hasMany={hasMany}
          isClearable={isClearable}
          isSortable={isSortable}
          name={name}
          onChange={onChange as unknown as (value: unknown) => void}
          options={options}
          path={path}
          placeholder={computedPlaceholder}
          readOnly={readOnly || disabled}
          required={required}
          showError={showError}
          value={value as string | string[] | undefined}
        />
        {AfterInput}
      </div>
      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={<FieldDescription description={description} path={path} />}
      />
      {error ? <p style={{ color: 'var(--theme-error-500)', marginTop: '0.25rem' }}>{error}</p> : null}
    </div>
  )
}

export default DatasetColumnSelect
