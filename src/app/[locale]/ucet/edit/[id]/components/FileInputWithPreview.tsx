import React, { useRef } from 'react'

interface FileInputWithPreviewProps {
  name: string

  label: string

  accept?: string

  preview: string | null

  onPreviewChange: (url: string | null) => void
  className?: string
}

const FileInputWithPreview: React.FC<FileInputWithPreviewProps> = ({
  name,
  label,
  accept,
  preview,
  onPreviewChange,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onPreviewChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      onPreviewChange(null)
    }
  }

  return (
    <div className={className || 'flex flex-col gap-2'}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        name={name}
        id={name}
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex items-center gap-4">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover border shadow"
          />
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm text-blue-600 hover:underline"
        >
          Choose File
        </button>
      </div>
    </div>
  )
}

export default FileInputWithPreview
