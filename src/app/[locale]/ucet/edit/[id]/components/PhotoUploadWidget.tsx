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
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-32 h-32">
        {value ? (
          <img
            src={value}
            alt="Nahraná fotografie"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-sm"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full bg-gray-50 text-gray-500 text-sm text-center">
            <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
          </div>
        )}
      </div>

      <label className="inline-flex items-center gap-2 cursor-pointer bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition">
        <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
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
