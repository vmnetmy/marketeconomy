'use client'

import React, { useCallback, useMemo } from 'react'
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  fieldBaseClass,
  useField,
} from '@payloadcms/ui'
import type { ClientComponentProps, TextFieldValidation } from 'payload'
import { Provider } from '@react-spectrum/provider'
import { theme } from '@react-spectrum/theme-default'
import { ColorEditor, ColorPicker, parseColor } from '@react-spectrum/color'
import type { Color } from '@react-types/color'

type ColorPickerFieldProps = {
  readonly onChange?: (value: string | null) => void
  readonly path: string
  readonly validate?: TextFieldValidation
  readonly value?: string | null
  readonly field: {
    name: string
    label?: string
    localized?: boolean
    required?: boolean
    admin?: {
      className?: string
      description?: string
      placeholder?: string
    }
  }
} & Omit<ClientComponentProps, 'customComponents' | 'field'>

const DEFAULT_COLOR = '#000000'

const safeParseColor = (value: string): Color => {
  try {
    return parseColor(value)
  } catch {
    return parseColor(DEFAULT_COLOR)
  }
}

const normalizeValue = (value?: string | null): string => {
  if (typeof value !== 'string') return DEFAULT_COLOR
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : DEFAULT_COLOR
}

const serializeColor = (value: Color | string): string => {
  if (typeof value === 'string') return value
  return value.toString('hex')
}

const ColorPickerField: React.FC<ColorPickerFieldProps> = (props) => {
  const { field, path: pathFromProps, onChange: onChangeFromProps, readOnly } = props
  const { name, label, localized, required, admin } = field

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<string | null>({
    potentiallyStalePath: pathFromProps,
  })

  const classes = [fieldBaseClass, admin?.className, 'color-picker-field', showError && 'error', readOnly && 'read-only']
    .filter(Boolean)
    .join(' ')

  const colorValue = useMemo(() => safeParseColor(normalizeValue(value)), [value])
  const isDisabled = Boolean(disabled || readOnly)

  const handleChange = useCallback(
    (nextColor: Color) => {
      if (isDisabled) return
      const nextValue = serializeColor(nextColor)
      if (typeof onChangeFromProps === 'function') {
        onChangeFromProps(nextValue)
      }
      setValue(nextValue)
    },
    [isDisabled, onChangeFromProps, setValue],
  )

  const handleClear = useCallback(() => {
    if (isDisabled) return
    if (typeof onChangeFromProps === 'function') {
      onChangeFromProps(null)
    }
    setValue(null)
  }, [isDisabled, onChangeFromProps, setValue])

  return (
    <div className={classes} id={`field-${path.replace(/\./g, '__')}`}>
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} localized={localized} path={path} required={required} />}
      />
      <div className={`${fieldBaseClass}__wrap color-picker-field__wrap`}>
        <RenderCustomComponent CustomComponent={Error} Fallback={<FieldError path={path} showError={showError} />} />
        {BeforeInput}
        <div className="color-picker-field__controls">
          <Provider theme={theme} colorScheme="light" scale="medium">
            <ColorPicker
              aria-label={typeof label === 'string' ? label : name}
              isDisabled={isDisabled}
              value={colorValue}
              onChange={handleChange}
            >
              <ColorEditor hideAlphaChannel />
            </ColorPicker>
          </Provider>
          <button
            className="color-picker-field__clear"
            disabled={isDisabled || value === null || value === undefined || value === ''}
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        {AfterInput}
      </div>
      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={<FieldDescription description={admin?.description} path={path} />}
      />
    </div>
  )
}

export default ColorPickerField
