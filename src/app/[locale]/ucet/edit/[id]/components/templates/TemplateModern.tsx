import React from 'react'

interface TemplateModernProps {
  cvData: Record<string, any>
  photoPreview: string | null
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl font-semibold text-primary border-b border-gray-300 pb-1 mb-4">
      {title}
    </h2>
    {children}
  </section>
)

const TemplateModern = ({ cvData, photoPreview }: TemplateModernProps) => (
  <div className="bg-white rounded-2xl shadow-lg p-10 space-y-10 text-black max-w-3xl mx-auto border border-gray-200">
    {/* Header */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      {photoPreview && (
        <img
          src={photoPreview}
          alt="Foto"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
        />
      )}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-primary">
          {cvData.firstName} {cvData.lastName}
        </h1>
        <p className="text-gray-600">{cvData.email}</p>
        <p className="text-gray-600">{cvData.phone}</p>
        <p className="text-sm text-gray-500">
          {cvData.street}, {cvData.city}, {cvData.postalCode}, {cvData.country}
        </p>
        {cvData.website && <p className="text-sm text-blue-600">{cvData.website}</p>}
        {cvData.gender && <p className="text-sm">Pohlaví: {cvData.gender}</p>}
        {cvData.birthDate && <p className="text-sm">Datum narození: {cvData.birthDate}</p>}
      </div>
    </div>

    {/* Education */}
    {cvData.education?.length > 0 && (
      <Section title="Vzdělání">
        {cvData.education.map((edu: any, i: number) => (
          <div key={i} className="text-sm mb-3">
            <p className="font-semibold text-gray-800">{edu.schoolName}</p>
            <p className="text-gray-700">
              {edu.field} ({edu.startYear}–{edu.endYear})
            </p>
          </div>
        ))}
      </Section>
    )}

    {/* Work */}
    {cvData.work?.length > 0 && (
      <Section title="Zkušenosti">
        {cvData.work.map((job: any, i: number) => (
          <div key={i} className="mb-4">
            <p className="font-bold text-gray-900">
              {job.position} – {job.employer}
            </p>
            <p className="text-sm text-gray-600">
              {job.start} – {job.end}
            </p>
            <p className="text-sm text-gray-800">{job.activity}</p>
            {job.description && <p className="text-xs text-gray-500 italic">{job.description}</p>}
          </div>
        ))}
      </Section>
    )}

    {/* Certificates */}
    {cvData.certificates?.length > 0 && (
      <Section title="Certifikáty">
        {cvData.certificates.map((cert: any, i: number) => (
          <p key={i} className="text-sm text-gray-800">
            {cert.name} – <span className="text-gray-600 italic">{cert.description}</span>
          </p>
        ))}
      </Section>
    )}

    {/* Languages */}
    {cvData.languages?.length > 0 && (
      <Section title="Jazyky">
        <ul className="list-disc list-inside text-sm space-y-1">
          {cvData.languages.map((lang: any, i: number) => (
            <li key={i}>
              {lang.language} – {lang.level}
            </li>
          ))}
        </ul>
      </Section>
    )}

    {/* References */}
    {cvData.references && (
      <Section title="Reference">
        <p className="italic text-sm text-gray-700">{cvData.references}</p>
      </Section>
    )}

    {/* Driving License */}
    {Array.isArray(cvData.drivingLicense) && cvData.drivingLicense.length > 0 && (
      <Section title="Řidičský průkaz">
        <p className="text-sm text-gray-800">{cvData.drivingLicense.join(', ')}</p>
      </Section>
    )}
  </div>
)

export default TemplateModern
