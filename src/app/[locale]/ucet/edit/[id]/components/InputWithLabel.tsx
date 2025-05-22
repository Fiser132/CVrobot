// InputWithLabel.tsx
import { useCvFormData } from './CvFormContext'

interface InputWithLabelProps {
  name: string
  placeholder?: string
  type?: string
  inputClass?: string
}

const defaultInputClass =
  'bg-[#F0F0F9] h-[48px] rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

const InputWithLabel = ({
  name,
  placeholder,
  type = 'text',
  inputClass = defaultInputClass,
}: InputWithLabelProps) => {
  const cvData = useCvFormData()

  const labelText =
    placeholder ||
    name.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className="text-sm text-[#7C8088]">{labelText}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={labelText}
        defaultValue={cvData[name] || ''}
        className={inputClass}
      />
    </div>
  )
}

export default InputWithLabel
