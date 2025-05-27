// src/app/[locale]/ucet/edit/[id]/components/DynamicSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCvFormData } from './CvFormContext'

interface DynamicSectionProps {
  section: string
  fields: string[]
  defaults: Record<string, string>
  errors: Record<string, string>
  clearError: (field: string) => void
}

const baseInputClass =
  'bg-[#F0F0F9] h-[48px] rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

export default function DynamicSection({
  section,
  fields,
  defaults,
  errors,
  clearError,
}: DynamicSectionProps) {
  const cvData = useCvFormData()

  const [items, setItems] = useState<Record<string, string>[]>(
    Array.isArray(cvData[section]) && cvData[section].length > 0
      ? cvData[section]
      : [defaults]
  )

  useEffect(() => {
    if (Array.isArray(cvData[section]) && cvData[section].length > 0) {
      setItems(cvData[section])
    }
  }, [cvData, section])

  const handleAdd = () => setItems([...items, defaults])
  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
    // Clear errors for removed item
    fields.forEach((field) => {
      const key = `${section}[${index}][${field}]`
      clearError(key)
    })
  }

  // Define numeric fields to restrict to number input
  const isNumericField = (field: string) => /year|start|end/i.test(field)

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold capitalize">{section}</h3>
      {items.map((item, index) => (
        <div key={index} className="flex gap-5 p-5 rounded-lg border border-[#F0F0F9]">
          <div className="h-[18px] text-secondary">
            <FontAwesomeIcon icon={faGripVertical} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
            {fields.map((field) => {
              const fieldKey = `${section}[${index}][${field}]`
              return (
                <div key={field} className="flex flex-col gap-1">
                  <label htmlFor={fieldKey} className="text-sm text-[#7C8088] capitalize">
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}
                  </label>
                  <input
                    id={fieldKey}
                    name={fieldKey}
                    type={isNumericField(field) ? 'number' : 'text'}
                    placeholder={field}
                    defaultValue={item[field] || ''}
                    className={
                      baseInputClass + (errors[fieldKey] ? ' border-red-500' : '')
                    }
                    onChange={() => clearError(fieldKey)}
                  />
                  {errors[fieldKey] && (
                    <p className="text-red-500 text-sm">{errors[fieldKey]}</p>
                  )}
                </div>
              )
            })}
          </div>
          <div
            className="text-secondary cursor-pointer h-[18px]"
            onClick={() => handleRemove(index)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
        </div>
      ))}

      <button type="button" className="text-sm text-primary hover:underline" onClick={handleAdd}>
        + Přidat další položku
      </button>
    </section>
  )
}
