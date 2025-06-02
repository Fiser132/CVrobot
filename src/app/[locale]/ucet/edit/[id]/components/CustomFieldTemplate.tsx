import { FieldTemplateProps } from '@rjsf/utils'

const CustomFieldTemplate = ({
  id,
  classNames,
  label,
  help,
  required,
  description,
  errors,
  children
}: FieldTemplateProps) => {
  return (
    <div className={`mb-6 ${classNames} col-span-1`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {description && (
        <p className="text-xs text-gray-500 mb-1">{description}</p>
      )}

      <div className="w-full">
<div className="
  [&>input]:bg-gray-100 
  [&>input]:h-[50px] 
  [&>input]:w-full 
  [&>input]:rounded-md 
  [&>input]:border 
  [&>input]:border-gray-300 
  [&>input]:px-4 
  [&>input]:text-sm 
  [&>input]:text-gray-900 
  [&>input]:focus:outline-none 
  [&>input]:focus:ring-2 
  [&>input]:focus:ring-purple-500

  [&>select]:bg-gray-100 
  [&>select]:h-[50px] 
  [&>select]:w-full 
  [&>select]:rounded-md 
  [&>select]:border 
  [&>select]:border-gray-300 
  [&>select]:px-4 
  [&>select]:text-sm 
  [&>select]:text-gray-900 
  [&>select]:focus:outline-none 
  [&>select]:focus:ring-2 
  [&>select]:focus:ring-purple-500

  [&>input[type='date']]:appearance-none 
  [&>input[type='date']]:bg-gray-100 
  [&>input[type='date']]:h-[50px] 
  [&>input[type='date']]:w-full 
  [&>input[type='date']]:rounded-md 
  [&>input[type='date']]:border 
  [&>input[type='date']]:border-gray-300 
  [&>input[type='date']]:px-4 
  [&>input[type='date']]:text-sm 
  [&>input[type='date']]:text-gray-900 
  [&>input[type='date']]:focus:outline-none 
  [&>input[type='date']]:focus:ring-2 
  [&>input[type='date']]:focus:ring-purple-500
">
  {children}
</div>

      </div>

 {errors && <div className="mt-1 text-sm text-red-500">{errors}</div>}
      {help}
    </div>
  )
}

export default CustomFieldTemplate
