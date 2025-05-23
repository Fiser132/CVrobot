// components/RadioGroup.tsx
import React from 'react'

interface Option {
  label: string
  value: string
}

interface RadioGroupProps {
  name: string

  label: string

  options: Option[]

  className?: string

  inputClassName?: string

  labelClassName?: string
}

const defaultContainerClass = 'flex flex-col'
const defaultLegendClass = 'text-sm font-medium text-gray-700 mb-1'
const defaultOptionsContainer = 'flex gap-8'
const defaultLabelClass = 'flex items-center gap-2 text-sm'
const defaultInputClass = 'accent-red-500'

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  className,
  inputClassName,
  labelClassName,
  ...rest
}) => (
  <fieldset className={className || defaultContainerClass} {...rest}>
    <legend className={labelClassName || defaultLegendClass}>{label}</legend>
    <div className={defaultOptionsContainer}>
      {options.map((opt) => (
        <label key={opt.value} className={defaultLabelClass}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            className={inputClassName || defaultInputClass}
          />
          {opt.label}
        </label>
      ))}
    </div>
  </fieldset>
)

export default RadioGroup
