import type { Field } from 'payload'

export const showPlaceholderField: Field = {
  name: 'showPlaceholder',
  label: 'Show Placeholder',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    description: 'Show a placeholder for this block and allow empty required fields.',
  },
}

const hasValue = (value: unknown): boolean => {
  if (typeof value === 'string') return value.trim().length > 0
  return value !== null && value !== undefined
}

const isPlaceholderEnabled = (siblingData?: Record<string, unknown>) => Boolean(siblingData?.showPlaceholder)

export const requireValueUnlessPlaceholder =
  (message: string) =>
  (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
    if (isPlaceholderEnabled(siblingData)) return true
    if (hasValue(value)) return true
    return message
  }

export const requireArrayItemsUnlessPlaceholder =
  (keys: string[], message: string) =>
  (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
    if (isPlaceholderEnabled(siblingData)) return true
    if (!Array.isArray(value) || value.length === 0) return true
    for (const item of value) {
      for (const key of keys) {
        if (!hasValue((item as Record<string, unknown>)?.[key])) return message
      }
    }
    return true
  }

export const hasTextValue = hasValue
export const isBlockPlaceholderEnabled = isPlaceholderEnabled
