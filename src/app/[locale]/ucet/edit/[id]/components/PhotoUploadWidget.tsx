'use client'

import { ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faUser } from '@fortawesome/free-solid-svg-icons'

const PhotoUploadWidget = ({ value, onChange }: any) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex gap-5 items-center space-y-3">
      <div className="relative w-16 h-16">
        {value ? (
          <img
            src={value}
            alt="Nahraná fotografie"
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center  rounded-full bg-gray-100 text-gray-500 text-sm text-center">
            <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
          </div>
        )}
      </div>

      <label className="text-sm text-primary underline">
        Nahrát fotografii
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  )
}

export default PhotoUploadWidget
