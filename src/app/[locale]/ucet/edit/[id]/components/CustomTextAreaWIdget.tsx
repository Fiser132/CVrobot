'use client'

import { ChangeEvent } from 'react'

const CustomTextareaWidget = ({
  id,
  value,
  required,
  disabled,
  readonly,
  onChange,
  placeholder,
}: {
  id: string
  value?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  onChange: (value: string) => void
  placeholder?: string
}) => {
  return (
    <textarea
      id={id}
      className="w-full min-h-[120px] bg-gray-100 text-sm rounded-md p-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={value || ''}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export default CustomTextareaWidget
