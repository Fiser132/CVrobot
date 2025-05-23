// components/SelectWithLabel.tsx
import React from 'react'

interface Option {
  value: string
  label: string
}

interface SelectWithLabelProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** The HTML name and id for the select */
  name: string
  /** Visible label text */
  label: string
  /** Options to render */
  options: Option[]
  /** Initial selected value */
  defaultValue?: string
}

const defaultSelectClass =
  'bg-[#F0F0F9] h-[48px] rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  name,
  label,
  options,
  defaultValue,
  className,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={className || defaultSelectClass}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectWithLabel
