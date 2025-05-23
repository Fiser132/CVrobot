// components/TextareaWithLabel.tsx
import React from 'react'

interface TextareaWithLabelProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** HTML name and id for the textarea */
  name: string
  /** Visible label text */
  label: string
  /** Placeholder text */
  placeholder?: string
  /** Initial value */
  defaultValue?: string
  /** Custom CSS class for textarea */
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
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={className || defaultTextareaClass}
      {...rest}
    />
  </div>
)

export default TextareaWithLabel
