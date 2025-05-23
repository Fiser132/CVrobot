// components/CheckboxGroup.tsx
import React from 'react'

interface Option {
  value: string
  label: string
}

interface CheckboxGroupProps {
  name: string

  label: string

  options: Option[]

  className?: string

  checkboxClassName?: string

  labelClassName?: string
}

const defaultContainerClass = 'flex flex-col'
const defaultLegendClass = 'text-sm font-medium text-gray-700 mb-1'
const defaultOptionsContainer = 'flex flex-wrap gap-4'
const defaultLabelClass = 'flex items-center gap-2 text-sm'
const defaultCheckboxClass = ''

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  className,
  checkboxClassName,
  labelClassName,
  ...rest
}) => (
  <fieldset className={className || defaultContainerClass} {...rest}>
    <legend className={labelClassName || defaultLegendClass}>{label}</legend>
    <div className={defaultOptionsContainer}>
      {options.map((opt) => (
        <label key={opt.value} className={defaultLabelClass}>
          <input
            type="checkbox"
            name={name}
            value={opt.value}
            className={checkboxClassName || defaultCheckboxClass}
          />
          {opt.label}
        </label>
      ))}
    </div>
  </fieldset>
)

export default CheckboxGroup
