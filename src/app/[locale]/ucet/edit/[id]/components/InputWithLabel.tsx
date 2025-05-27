// src/app/[locale]/ucet/edit/[id]/components/InputWithLabel.tsx
'use client'
import { useCvFormData } from './CvFormContext'
import React from 'react'

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
  inputClass?: string
  error?: string        // ← accept an optional error message
}

const defaultInputClass =
  'bg-[#F0F0F9] h-[48px] rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

export default function InputWithLabel({
  name,
  placeholder,
  type = 'text',
  inputClass = defaultInputClass,
  error,
  ...rest
}: InputWithLabelProps) {
  const cvData = useCvFormData()

  const labelText =
    placeholder ||
    name
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, (c) => c.toUpperCase())

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-[#7C8088]">
        {labelText}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={labelText}
        defaultValue={cvData[name] || ''}
        className={inputClass + (error ? ' border-red-500' : '')}
        {...rest}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
