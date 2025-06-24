'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

interface EditableInputProps {
  value: string
  placeholder?: string
  onChange: (newVal: string) => void
}

export default function EditableInput({
  value,
  placeholder = '',
  onChange,
}: EditableInputProps) {
  return (
    <div className="relative inline-block">
      <input
        type="text"
        className="border-b border-dashed border-gray-400 focus:border-gray-600 outline-none pr-8 py-1 bg-transparent"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
      <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
        <FontAwesomeIcon icon={faPen} />
      </span>
    </div>
  )
}
