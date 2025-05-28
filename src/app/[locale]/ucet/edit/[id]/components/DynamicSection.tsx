import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

interface DynamicSectionProps {
  section: string
  fields: string[]
  defaults: Record<string, string>
}

const inputClass =
  'bg-[#F0F0F9] h-[48px] rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

const DynamicSection = ({ section, fields, defaults }: DynamicSectionProps) => {
  const [items, setItems] = useState<Record<string, string>[]>([defaults])

  const handleAdd = () => setItems([...items, defaults])
  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">{section}</h3>
      {items.map((item, index) => (
        <div key={index} className="flex gap-5 p-5 rounded-lg border border-[#F0F0F9]">
          <div className="h-[18px] text-secondary">
            <FontAwesomeIcon icon={faGripVertical} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
            {fields.map((field) => (
              <input
                key={field}
                name={`${section}[${index}][${field}]`}
                defaultValue=""
                placeholder={field}
                className={inputClass}
              />
            ))}
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

export default DynamicSection