// components/CheckboxGroup.tsx
import React from 'react'

interface Option {
  value: string
  label: string
}

interface CheckboxGroupProps {
  /** HTML name attribute for each checkbox */
  name: string
  /** Visible legend text for the group */
  label: string
  /** Array of checkbox options */
  options: Option[]
  /** Container class name override */
  className?: string
  /** Checkbox input class override */
  checkboxClassName?: string
  /** Label text class override */
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
