// components/FormInput.tsx
type FormInputProps = {
  label?: string
  name: string
  defaultValue?: string
  type?: string
  placeholder?: string
  className?: string
}

const FormInput = ({
  label,
  name,
  defaultValue = '',
  type = 'text',
  placeholder,
  className = '',
}: FormInputProps) => (
  <div className="space-y-1 w-full">
    {label && (
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`bg-[#f5f6fa] border border-[#e2e6f3] rounded-lg p-3 text-sm w-full placeholder-gray-400 text-black ${className}`}
    />
  </div>
)

export default FormInput
