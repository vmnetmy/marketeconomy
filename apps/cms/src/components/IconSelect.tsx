'use client'

import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  ArrowDownCircleIcon,
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowDownOnSquareIcon,
  ArrowDownOnSquareStackIcon,
  ArrowDownRightIcon,
  ArrowDownTrayIcon,
  ArrowLeftCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowLongDownIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowLongUpIcon,
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  ArrowRightCircleIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowSmallDownIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowSmallUpIcon,
  ArrowTopRightOnSquareIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ArrowTurnDownLeftIcon,
  ArrowTurnDownRightIcon,
  ArrowTurnLeftDownIcon,
  ArrowTurnLeftUpIcon,
  ArrowTurnRightDownIcon,
  ArrowTurnRightUpIcon,
  ArrowTurnUpLeftIcon,
  ArrowTurnUpRightIcon,
  ArrowUpCircleIcon,
  ArrowUpIcon,
  ArrowUpLeftIcon,
  ArrowUpOnSquareIcon,
  ArrowUpOnSquareStackIcon,
  ArrowUpRightIcon,
  ArrowUpTrayIcon,
  ArrowUturnDownIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowUturnUpIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  AtSymbolIcon,
  BackspaceIcon,
  BackwardIcon,
  BanknotesIcon,
  Bars2Icon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3CenterLeftIcon,
  Bars3Icon,
  Bars4Icon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  Battery0Icon,
  Battery100Icon,
  Battery50Icon,
  BeakerIcon,
  BellAlertIcon,
  BellIcon,
  BellSlashIcon,
  BellSnoozeIcon,
  BoldIcon,
  BoltIcon,
  BoltSlashIcon,
  BookOpenIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BugAntIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  CakeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  LightBulbIcon,
  MegaphoneIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  ReactSelect,
  RenderCustomComponent,
  fieldBaseClass,
  useField,
} from '@payloadcms/ui'
import type { ClientComponentProps, SelectFieldClient, SelectFieldValidation } from 'payload'
import React, { useCallback, useMemo } from 'react'
import { components, type OptionProps, type SingleValueProps } from 'react-select'

import { iconOptions } from '../util/iconOptions'

type IconComponent = React.ComponentType<{ className?: string }>

type IconSelectOption = {
  label: string
  value: string
  icon?: IconComponent
}

type IconSelectProps = {
  readonly onChange?: (value: string | string[] | null) => void
  readonly path: string
  readonly validate?: SelectFieldValidation
  readonly value?: string | string[] | null
  readonly field: Omit<SelectFieldClient, 'type'> & Partial<Pick<SelectFieldClient, 'type'>>
} & Omit<ClientComponentProps, 'customComponents' | 'field'>

const iconMap = {
  globe: GlobeAltIcon,
  chartBar: ChartBarIcon,
  academicCap: AcademicCapIcon,
  adjustmentsHorizontal: AdjustmentsHorizontalIcon,
  adjustmentsVertical: AdjustmentsVerticalIcon,
  archiveBoxArrowDown: ArchiveBoxArrowDownIcon,
  archiveBox: ArchiveBoxIcon,
  archiveBoxXMark: ArchiveBoxXMarkIcon,
  arrowDownCircle: ArrowDownCircleIcon,
  arrowDown: ArrowDownIcon,
  arrowDownLeft: ArrowDownLeftIcon,
  arrowDownOnSquare: ArrowDownOnSquareIcon,
  arrowDownOnSquareStack: ArrowDownOnSquareStackIcon,
  arrowDownRight: ArrowDownRightIcon,
  arrowDownTray: ArrowDownTrayIcon,
  arrowLeftCircle: ArrowLeftCircleIcon,
  arrowLeftEndOnRectangle: ArrowLeftEndOnRectangleIcon,
  arrowLeft: ArrowLeftIcon,
  arrowLeftOnRectangle: ArrowLeftOnRectangleIcon,
  arrowLeftStartOnRectangle: ArrowLeftStartOnRectangleIcon,
  arrowLongDown: ArrowLongDownIcon,
  arrowLongLeft: ArrowLongLeftIcon,
  arrowLongRight: ArrowLongRightIcon,
  arrowLongUp: ArrowLongUpIcon,
  arrowPath: ArrowPathIcon,
  arrowPathRoundedSquare: ArrowPathRoundedSquareIcon,
  arrowRightCircle: ArrowRightCircleIcon,
  arrowRightEndOnRectangle: ArrowRightEndOnRectangleIcon,
  arrowRight: ArrowRightIcon,
  arrowRightOnRectangle: ArrowRightOnRectangleIcon,
  arrowRightStartOnRectangle: ArrowRightStartOnRectangleIcon,
  arrowSmallDown: ArrowSmallDownIcon,
  arrowSmallLeft: ArrowSmallLeftIcon,
  arrowSmallRight: ArrowSmallRightIcon,
  arrowSmallUp: ArrowSmallUpIcon,
  arrowTopRightOnSquare: ArrowTopRightOnSquareIcon,
  arrowTrendingDown: ArrowTrendingDownIcon,
  arrowTrendingUp: ArrowTrendingUpIcon,
  arrowTurnDownLeft: ArrowTurnDownLeftIcon,
  arrowTurnDownRight: ArrowTurnDownRightIcon,
  arrowTurnLeftDown: ArrowTurnLeftDownIcon,
  arrowTurnLeftUp: ArrowTurnLeftUpIcon,
  arrowTurnRightDown: ArrowTurnRightDownIcon,
  arrowTurnRightUp: ArrowTurnRightUpIcon,
  arrowTurnUpLeft: ArrowTurnUpLeftIcon,
  arrowTurnUpRight: ArrowTurnUpRightIcon,
  arrowUpCircle: ArrowUpCircleIcon,
  arrowUp: ArrowUpIcon,
  arrowUpLeft: ArrowUpLeftIcon,
  arrowUpOnSquare: ArrowUpOnSquareIcon,
  arrowUpOnSquareStack: ArrowUpOnSquareStackIcon,
  arrowUpRight: ArrowUpRightIcon,
  arrowUpTray: ArrowUpTrayIcon,
  arrowUturnDown: ArrowUturnDownIcon,
  arrowUturnLeft: ArrowUturnLeftIcon,
  arrowUturnRight: ArrowUturnRightIcon,
  arrowUturnUp: ArrowUturnUpIcon,
  arrowsPointingIn: ArrowsPointingInIcon,
  arrowsPointingOut: ArrowsPointingOutIcon,
  arrowsRightLeft: ArrowsRightLeftIcon,
  arrowsUpDown: ArrowsUpDownIcon,
  atSymbol: AtSymbolIcon,
  backspace: BackspaceIcon,
  backward: BackwardIcon,
  banknotes: BanknotesIcon,
  bars2: Bars2Icon,
  bars3BottomLeft: Bars3BottomLeftIcon,
  bars3BottomRight: Bars3BottomRightIcon,
  bars3CenterLeft: Bars3CenterLeftIcon,
  bars3: Bars3Icon,
  bars4: Bars4Icon,
  barsArrowDown: BarsArrowDownIcon,
  barsArrowUp: BarsArrowUpIcon,
  battery0: Battery0Icon,
  battery100: Battery100Icon,
  battery50: Battery50Icon,
  beaker: BeakerIcon,
  bellAlert: BellAlertIcon,
  bell: BellIcon,
  bellSlash: BellSlashIcon,
  bellSnooze: BellSnoozeIcon,
  bold: BoldIcon,
  bolt: BoltIcon,
  boltSlash: BoltSlashIcon,
  bookOpen: BookOpenIcon,
  bookmark: BookmarkIcon,
  bookmarkSlash: BookmarkSlashIcon,
  bookmarkSquare: BookmarkSquareIcon,
  briefcase: BriefcaseIcon,
  bugAnt: BugAntIcon,
  buildingLibrary: BuildingLibraryIcon,
  buildingOffice2: BuildingOffice2Icon,
  buildingOffice: BuildingOfficeIcon,
  buildingStorefront: BuildingStorefrontIcon,
  cake: CakeIcon,
  documentText: DocumentTextIcon,
  globeAlt: GlobeAltIcon,
  lightBulb: LightBulbIcon,
  megaphone: MegaphoneIcon,
  scale: ScaleIcon,
  shieldCheck: ShieldCheckIcon,
  users: UsersIcon,
} as const

type IconKey = keyof typeof iconMap

const iconStyle: React.CSSProperties = {
  width: '1rem',
  height: '1rem',
  flex: '0 0 1rem',
}

const IconOptionLabel = ({ icon, label }: { icon?: IconComponent; label: string }) => {
  const Icon = icon
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {Icon ? <Icon className="icon-select__icon" style={iconStyle} /> : null}
      <span>{label}</span>
    </span>
  )
}

const Option = (props: OptionProps<IconSelectOption, false>) => (
  <components.Option {...props}>
    <IconOptionLabel icon={props.data.icon} label={props.data.label} />
  </components.Option>
)

const SingleValue = (props: SingleValueProps<IconSelectOption, false>) => (
  <components.SingleValue {...props}>
    <IconOptionLabel icon={props.data.icon} label={props.data.label} />
  </components.SingleValue>
)

const IconSelect: React.FC<IconSelectProps> = (props) => {
  const {
    field,
    field: {
      name,
      admin: { className, description, isClearable = true, isSortable = true, placeholder } = {},
      hasMany = false,
      label,
      localized,
      options: optionsFromProps = iconOptions,
      required,
    },
    onChange: onChangeFromProps,
    path: pathFromProps,
    readOnly,
    validate,
  } = props

  const normalizedOptions = useMemo<IconSelectOption[]>(() => {
    const source = Array.isArray(optionsFromProps) && optionsFromProps.length > 0 ? optionsFromProps : iconOptions
    return source.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option }
      }
      const labelText = typeof option.label === 'string' ? option.label : option.value
      return { label: labelText, value: option.value }
    })
  }, [optionsFromProps])

  const options = useMemo(
    () =>
      normalizedOptions.map((option) => ({
        ...option,
        icon: iconMap[option.value as IconKey],
      })),
    [normalizedOptions],
  )

  const memoizedValidate = useCallback(
    (value: unknown, validationOptions: Parameters<SelectFieldValidation>[1]) => {
      if (typeof validate === 'function') {
        return validate(value as string | string[] | null, {
          ...validationOptions,
          hasMany,
          options,
          required,
        })
      }
      return true
    },
    [validate, required, hasMany, options],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField({
    potentiallyStalePath: pathFromProps,
    validate: memoizedValidate,
  })

  const resolveOption = useCallback(
    (optionValue: string): IconSelectOption => {
      const match = options.find((option) => option.value === optionValue)
      if (match) return match
      return {
        label: optionValue,
        value: optionValue,
        icon: iconMap[optionValue as IconKey],
      }
    },
    [options],
  )

  const valueToRender = useMemo(() => {
    if (hasMany) {
      if (!Array.isArray(value)) return []
      return value.map((val) => resolveOption(val))
    }
    if (!value || Array.isArray(value)) return null
    return resolveOption(value)
  }, [hasMany, resolveOption, value])

  const onChange = useCallback(
    (selectedOption: IconSelectOption | IconSelectOption[] | null) => {
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

  const filterOption = useCallback(
    ({ label: optionLabel, value: optionValue }: { label: string; value: string }, input: string) => {
      const search = input.toLowerCase()
      return optionLabel.toLowerCase().includes(search) || optionValue.toLowerCase().includes(search)
    },
    [],
  )

  const classes = [fieldBaseClass, 'select', className, showError && 'error', readOnly && 'read-only']
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
        <ReactSelect
          className="react-select"
          components={{ Option, SingleValue }}
          disabled={readOnly || disabled}
          filterOption={filterOption}
          id={name}
          isClearable={isClearable}
          isSearchable
          isSortable={isSortable}
          onChange={onChange}
          options={options}
          placeholder={placeholder ?? 'Select an icon'}
          showError={showError}
          value={valueToRender}
        />
        {AfterInput}
      </div>
      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={<FieldDescription description={description} path={path} />}
      />
    </div>
  )
}

export default IconSelect
