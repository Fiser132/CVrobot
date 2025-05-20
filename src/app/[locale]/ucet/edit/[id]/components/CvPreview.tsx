// src/app/[locale]/ucet/edit/[id]/components/CvPreview.tsx
interface CvPreviewProps {
  cvData: any
  photoPreview: string | null
  handleSave: () => void
}

const CvPreview = ({ cvData, photoPreview, handleSave }: CvPreviewProps) => {
  return (
    <div className="bg-[#2e2f4e] text-white fixed right-0 top-0 bottom-0 w-1/2 z-40 overflow-y-auto shadow-xl flex flex-col">
      <div className="pt-6 border-t border-gray-300 gap-10 w-full flex items-center justify-end px-32">
        <button
          type="button"
          onClick={handleSave}
          className="transition text-white underline py-2 rounded-md text-md cursor-pointer"
        >
          Uložit
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Stáhnout v PDFs
        </button>
      </div>
      <div className="flex justify-center p-10">
        <div className="w-full max-w-[700px] flex bg-white rounded-lg">
          <div className="bg-[#1e2a38] text-white w-1/3 p-6 space-y-6 rounded-l-lg">
            {photoPreview && (
              <div className="flex justify-center">
                <img
                  src={photoPreview}
                  alt="Fotka"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white"
                />
              </div>
            )}
            <div className="text-sm space-y-1">
              <p>
                <strong>Telefon:</strong> {cvData.phone}
              </p>
              <p>
                <strong>Email:</strong> {cvData.email}
              </p>
              <p>
                <strong>Adresa:</strong> {cvData.street}, {cvData.city}, {cvData.postalCode}
              </p>
              <p>
                <strong>Web:</strong> {cvData.website}
              </p>
              {cvData.gender && (
                <p>
                  <strong>Pohlaví:</strong> {cvData.gender}
                </p>
              )}
            </div>
            {cvData.education?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 border-b border-gray-500">
                  EDUKACE
                </h3>
                {cvData.education.map((edu: any, i: number) => (
                  <div key={i} className="text-sm mb-2">
                    <p className="font-semibold">
                      {edu.startYear}–{edu.endYear}
                    </p>
                    <p>{edu.schoolName}</p>
                    <p className="italic text-xs text-gray-300">{edu.field}</p>
                  </div>
                ))}
              </div>
            )}
            {cvData.languages?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 border-b border-gray-500">
                  JAZYKY
                </h3>
                {cvData.languages.map((lang: any, i: number) => (
                  <p key={i} className="text-sm">
                    {lang.language} – {lang.level}
                  </p>
                ))}
              </div>
            )}
            {Array.isArray(cvData.drivingLicense) && cvData.drivingLicense.length > 0 && (
              <p>
                <strong>Řidičský průkaz:</strong> {cvData.drivingLicense.join(', ')}
              </p>
            )}
          </div>

          <div className="w-2/3 p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1e2a38]">
                {cvData.firstName} {cvData.lastName}
              </h1>
              <p className="text-blue-700 font-semibold uppercase tracking-wide">
                {cvData.birthDate}
              </p>
            </div>
            {cvData.work?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-[#1e2a38] border-b pb-1 mb-2">
                  Pracovní zkušenosti
                </h2>
                {cvData.work.map((job: any, i: number) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between text-sm font-semibold text-black">
                      <span>
                        {job.position} – {job.employer}
                      </span>
                      <span>
                        {job.start}–{job.end}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{job.activity}</p>
                    {job.description && (
                      <p className="text-xs text-gray-500 italic">{job.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            {cvData.certificates?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-[#1e2a38] border-b pb-1 mb-2">
                  Kurzy a certifikáty
                </h2>
                {cvData.certificates.map((cert: any, i: number) => (
                  <p key={i} className="text-sm text-black">
                    {cert.name} – <span className="text-gray-600 italic">{cert.description}</span>
                  </p>
                ))}
              </div>
            )}
            {cvData.references && (
              <div>
                <h2 className="text-lg font-semibold text-[#1e2a38] border-b pb-1 mb-2">
                  Reference
                </h2>
                <p className="text-sm italic text-gray-700">{cvData.references}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CvPreview
