const TemplateMinimal = ({ cvData, photoPreview }: any) => (
  <div className="bg-blue-50 border border-gray-200 p-8 rounded-xl shadow-md text-gray-900 space-y-8">
    {/* Header */}
    <div className="flex items-center gap-6">
      {photoPreview && (
        <img
          src={photoPreview}
          alt="Foto"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
      )}
      <div>
        <h1 className="text-3xl font-bold text-blue-800">
          {cvData.firstName} {cvData.lastName}
        </h1>
        <p className="text-sm text-gray-600">
          {cvData.email} | {cvData.phone}
        </p>
        <p className="text-sm text-gray-600">
          {cvData.street}, {cvData.city}, {cvData.postalCode}, {cvData.country}
        </p>
        {cvData.website && (
          <a
            href={cvData.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            {cvData.website}
          </a>
        )}
        {cvData.birthDate && <p className="text-sm text-gray-600">Narozen: {cvData.birthDate}</p>}
        {cvData.gender && <p className="text-sm text-gray-600">Pohlaví: {cvData.gender}</p>}
      </div>
    </div>

    {/* Education */}
    {cvData.education?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-300 pb-1 mb-2">
          Vzdělání
        </h3>
        {cvData.education.map((edu: any, i: number) => (
          <p key={i} className="text-sm text-gray-800">
            🎓 <strong>{edu.schoolName}</strong>, {edu.field} ({edu.startYear}–{edu.endYear})
          </p>
        ))}
      </section>
    )}

    {/* Work Experience */}
    {cvData.work?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-300 pb-1 mb-2">
          Pracovní zkušenosti
        </h3>
        {cvData.work.map((job: any, i: number) => (
          <div key={i} className="text-sm text-gray-800 space-y-1 mb-4">
            <p className="font-semibold">
              💼 {job.position} – {job.employer}
            </p>
            <p>
              {job.start} – {job.end}
            </p>
            {job.activity && <p>{job.activity}</p>}
            {job.description && <p className="italic text-xs text-gray-600">{job.description}</p>}
          </div>
        ))}
      </section>
    )}

    {/* Certificates */}
    {cvData.certificates?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-300 pb-1 mb-2">
          Certifikáty
        </h3>
        {cvData.certificates.map((cert: any, i: number) => (
          <p key={i} className="text-sm text-gray-800">
            📄 {cert.name} – <span className="italic">{cert.description}</span>
          </p>
        ))}
      </section>
    )}

    {/* Languages */}
    {cvData.languages?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-300 pb-1 mb-2">
          Jazyky
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {cvData.languages.map((lang: any, i: number) => (
            <li key={i}>
              🌐 {lang.language} – {lang.level}
            </li>
          ))}
        </ul>
      </section>
    )}

    {/* References */}
    {cvData.references && (
      <section>
        <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-300 pb-1 mb-2">
          Reference
        </h3>
        <p className="italic text-sm text-gray-700">💬 {cvData.references}</p>
      </section>
    )}

    {/* Driving License */}
    {Array.isArray(cvData.drivingLicense) && cvData.drivingLicense.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold text-blue-700 border-b border-gray-300 pb-1 mb-2">
          Řidičský průkaz
        </h3>
        <p className="text-sm text-gray-800">🚗 {cvData.drivingLicense.join(', ')}</p>
      </section>
    )}
  </div>
)

export default TemplateMinimal
