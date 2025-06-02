'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ArrayFieldTemplateProps } from '@rjsf/utils'

const CustomArrayFieldTemplate = ({
  items,
  canAdd,
  onAddClick,
  title,
}: ArrayFieldTemplateProps<any>) => {
  const handleRemove = (item: any, index: number) => {
    // Use the built-in RJSF deletion if available
    if (item.hasRemove && typeof item.onDropIndexClick === 'function') {
      item.onDropIndexClick(index)()
    } else {
      // Fallback to manually clicking the hidden remove button
      const btn = document.getElementById(`root_${item.name}_${index}__remove`) as HTMLButtonElement
      btn?.click()
    }
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-xl font-semibold">{title}</h3>}

      {items.map((item, index) => (
        <div
          key={item.key}
          className="relative border border-gray-200 p-6 rounded-lg bg-gray-50 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.children}
          </div>

          <button
            type="button"
            onClick={() => handleRemove(item, index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="h-5 w-5" />
          </button>
        </div>
      ))}

      {canAdd && (
        <button
          type="button"
          onClick={onAddClick}
          className="text-sm text-primary hover:underline mt-2 flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Přidat další položku
        </button>
      )}
    </div>
  )
}

export default CustomArrayFieldTemplate
