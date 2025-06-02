'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface Props {
  value?: string[]
  onChange: (value: string[]) => void
  options: {
    enumOptions: { label: string; value: string }[]
  }
}

const DriverLicenseWidget = ({ value = [], onChange, options }: Props) => {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  return (
    <div className="flex flex-wrap gap-6">
      {options.enumOptions.map((opt) => {
        const selected = value.includes(opt.value)
        return (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggle(opt.value)}
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition 
                ${
                  selected
                    ? 'bg-red-500 border-red-500'
                    : 'border-gray-400 hover:border-primary'
                }`}
            >
              {selected && (
                <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
              )}
            </div>
            <span className="text-sm">{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}

export default DriverLicenseWidget
