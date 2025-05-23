const TemplateProfessional = ({ cvData, photoPreview }: any) => (
  <div className="bg-gray-100 p-8 rounded-lg shadow-inner text-black space-y-6">
    <div className="flex items-center gap-6">
      {photoPreview && (
        <img
          src={photoPreview}
          alt="Foto"
          className="w-24 h-24 rounded-full object-cover border-2"
        />
      )}
      <div className="bg-secondary text-white">
        <h1 className="text-3xl font-bold">
          {cvData.firstName} {cvData.lastName}
        </h1>
        <p className="text-sm">
          {cvData.email} | {cvData.phone}
        </p>
        <p className="text-sm">
          {cvData.street}, {cvData.city}, {cvData.postalCode}, {cvData.country}
        </p>
        {cvData.website && <p className="text-blue-700 text-sm">{cvData.website}</p>}
        {cvData.birthDate && <p className="text-sm">Narozen: {cvData.birthDate}</p>}
        {cvData.gender && <p className="text-sm">Pohlaví: {cvData.gender}</p>}
      </div>
    </div>

    {cvData.education?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold border-b border-gray-400 pb-1">Vzdělání</h3>
        {cvData.education.map((edu: any, i: number) => (
          <div key={i} className="text-sm mt-2">
            <p className="font-medium">{edu.schoolName}</p>
            <p>
              {edu.field} ({edu.startYear}–{edu.endYear})
            </p>
          </div>
        ))}
      </section>
    )}

    {cvData.work?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold border-b border-gray-400 pb-1">Zkušenosti</h3>
        {cvData.work.map((job: any, i: number) => (
          <div key={i} className="mt-2 text-sm">
            <p className="font-semibold">
              {job.position} – {job.employer}
            </p>
            <p>
              {job.start}–{job.end}
            </p>
            {job.activity && <p>{job.activity}</p>}
            {job.description && <p className="italic text-xs">{job.description}</p>}
          </div>
        ))}
      </section>
    )}

    {cvData.certificates?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold border-b border-gray-400 pb-1">Certifikáty</h3>
        {cvData.certificates.map((cert: any, i: number) => (
          <p key={i} className="text-sm">
            {cert.name} – {cert.description}
          </p>
        ))}
      </section>
    )}

    {cvData.languages?.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold border-b border-gray-400 pb-1">Jazyky</h3>
        <ul className="list-disc list-inside text-sm">
          {cvData.languages.map((lang: any, i: number) => (
            <li key={i}>
              {lang.language} – {lang.level}
            </li>
          ))}
        </ul>
      </section>
    )}

    {cvData.references && (
      <section>
        <h3 className="text-lg font-semibold border-b border-gray-400 pb-1">Reference</h3>
        <p className="italic text-sm">{cvData.references}</p>
      </section>
    )}

    {Array.isArray(cvData.drivingLicense) && cvData.drivingLicense.length > 0 && (
      <section>
        <h3 className="text-lg font-semibold border-b border-gray-400 pb-1">Řidičský průkaz</h3>
        <p className="text-sm">{cvData.drivingLicense.join(', ')}</p>
      </section>
    )}
  </div>
)

export default TemplateProfessional
