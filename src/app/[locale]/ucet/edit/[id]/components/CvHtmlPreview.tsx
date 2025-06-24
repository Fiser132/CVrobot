// components/CvHtmlPreview.tsx
import React from 'react'

interface CvHtmlPreviewProps {
  cvData: any
  photoPreview: string | null
}

const CvHtmlPreview = ({ cvData, photoPreview }: CvHtmlPreviewProps) => {
  return (
    <div className="relative bg-white text-black p-10 w-full max-w-[800px] mx-auto shadow-lg overflow-auto max-h-[90vh] rounded">
      {/* Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Profilová fotka"
              className="w-24 h-24 rounded-full border-2 border-blue-700 mb-4 object-cover"
            />
          )}
          <h1 className="text-3xl font-bold text-blue-700">
            {cvData.titulBefore} {cvData.firstName} {cvData.lastName} {cvData.titulAfter}
          </h1>
          <p className="text-sm text-gray-700">
            {cvData.email} · {cvData.phone} · {cvData.website?.replace(/^https?:\/\//, '')}
          </p>
        </div>

        {/* Address */}
        {(cvData.street || cvData.city || cvData.zip || cvData.region || cvData.state) && (
          <div>
            <h2 className="text-lg font-semibold text-blue-700 border-l-4 border-blue-700 pl-2">Adresa</h2>
            <p className="text-sm">
              {[cvData.street, cvData.zip, cvData.city, cvData.region, cvData.state].filter(Boolean).join(', ')}
            </p>
          </div>
        )}

        {/* Education */}
        {cvData.education?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-blue-700 border-l-4 border-blue-700 pl-2">Vzdělání</h2>
            <div className="space-y-2 mt-2">
              {cvData.education.map((edu: any, idx: number) => (
                <div key={idx}>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                  <p className="text-xs text-gray-600">{edu.startYear} – {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {cvData.workExperience?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-blue-700 border-l-4 border-blue-700 pl-2">Pracovní zkušenosti</h2>
            <div className="space-y-2 mt-2">
              {cvData.workExperience.map((job: any, idx: number) => (
                <div key={idx}>
                  <p className="font-semibold">
                    {job.position} {job.company && <span className="text-sm text-gray-600">@ {job.company}</span>}
                  </p>
                  <p className="text-sm">{job.description}</p>
                  <p className="text-xs text-gray-600">{job.startDate} – {job.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {cvData.languages?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-blue-700 border-l-4 border-blue-700 pl-2">Jazyky</h2>
            <ul className="list-disc list-inside">
              {cvData.languages.map((lang: any, idx: number) => (
                <li key={idx} className="text-sm">{lang.language} – {lang.level}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Driver's License */}
        {cvData.driverLicense?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-blue-700 border-l-4 border-blue-700 pl-2">Řidičský průkaz</h2>
            <p className="text-sm">{cvData.driverLicense.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CvHtmlPreview
