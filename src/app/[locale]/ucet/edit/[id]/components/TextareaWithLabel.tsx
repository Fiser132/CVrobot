// components/TextareaWithLabel.tsx
import React from 'react'
import { useCvFormData } from './CvFormContext'

interface TextareaWithLabelProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string
  className?: string
}

const defaultTextareaClass =
  'bg-[#F0F0F9] rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[120px]'

const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
  name,
  label,
  placeholder,
  defaultValue,
  className,
  ...rest
}) => {
  const cvData = useCvFormData()

  // Determine label text: use provided label or generate from name
  const labelText =
    label ||
    name
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, (c) => c.toUpperCase())

  const initial = cvData[name] as string | undefined
  const value = initial !== undefined ? initial : defaultValue ?? ''

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {labelText}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder || labelText}
        defaultValue={value}
        className={className || defaultTextareaClass}
        {...rest}
      />
    </div>
  )
}

export default TextareaWithLabel
