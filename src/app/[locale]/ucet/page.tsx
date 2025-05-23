'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import PrimaryButton from './../components/ui/primary-button'
import FinalCTA from './../components/landing-page/FinalCTA'

interface Cv {
  _id: string
  name: string
  date: string
  content: Record<string, any>
}

interface Certificate {
  name: string
  description: string;
}

interface Language {
  language: string
  level: string
}

interface WorkExperience {
  start: string
  end: string
  position: string
  employer: string
  activity: string
  description?: string
}

interface Education {
  startYear: string
  endYear: string
  field: string
  schoolName: string
}

const UcetPage = () => {
  const { user } = useUser()
  const [cvs, setCvs] = useState<Cv[]>([])
  const [viewContent, setViewContent] = useState<Record<string, any>>({})
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [cvToDelete, setCvToDelete] = useState<Cv | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newCvTitle, setNewCvTitle] = useState('')

  const params = useParams()
  const locale = params.locale ?? 'sk'
  const withLocale = (path: string) => `/${locale}${path}`

  const fetchCvs = async () => {
    const res = await fetch('/api/cvs')
    const data = await res.json()
    setCvs(data)
  }

  useEffect(() => {
    if (user) fetchCvs()
  }, [user])

  const handleCreateCv = async () => {
    if (!newCvTitle.trim()) return
    await fetch('/api/cvs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCvTitle.trim(), content: {} }),
    })
    setCreateModalOpen(false)
    setNewCvTitle('')
    fetchCvs()
  }

  const handleDeleteCv = async () => {
    if (!cvToDelete) return
    await fetch('/api/cvs/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: cvToDelete._id }),
    })
    setDeleteModalOpen(false)
    setCvToDelete(null)
    fetchCvs()
  }

  return (
    <main className="flex flex-col gap-32">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center bg-gradient-to-r from-secondary via-[#2195e8] to-secondary py-12 text-white container flex flex-col gap-6 items-center">
          <p className="text-[24px] font-semibold">Ještě nemáte životopis?</p>
          <PrimaryButton onClick={() => setCreateModalOpen(true)}>Vytvořit životopis</PrimaryButton>
        </div>

        <section className="py-10 flex flex-col items-start w-full container">
          <h2 className="text-[24px] text-black font-semibold mb-12">
            {user?.fullName}&apos;s životopisy
          </h2>
          <div className="w-full flex flex-wrap gap-44">
            {cvs.map((cv) => (
              <div key={cv._id} className="flex gap-20">
                <div>
                  <img
                    src="/cvblank.png"
                    alt="Náhled životopisu"
                    className="h-[320px] shadow-lg cursor-pointer"
                    onClick={() => {
                      setViewContent(cv.content)
                      setViewModalOpen(true)
                    }}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-semibold text-black text-[18px]">{cv.name}</p>
                    <p className="text-gray-500 text-[12px]">
                      Aktualizováno:{' '}
                      {new Date(cv.date).toLocaleString('cs-CZ', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href={withLocale(`/ucet/edit/${cv._id}`)}
                        className="text-red-600 text-[15px] underline"
                      >
                        Upravit
                      </Link>
                    </li>
                    <li>
                      <span className="text-red-600 text-[15px] underline">Sdílet</span>
                    </li>
                    <li>
                      <span className="text-red-600 text-[15px] underline">Stáhnout v PDF</span>
                    </li>
                    <li>
                      <span
                        className="text-red-600 text-[15px] underline cursor-pointer"
                        onClick={() => {
                          setCvToDelete(cv)
                          setDeleteModalOpen(true)
                        }}
                      >
                        Smazat
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <FinalCTA />

      {viewModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-[650px] w-full flex flex-col relative shadow-lg">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-2 right-4 text-red-500 hover:text-black z-10"
            >
              Zavřít
            </button>
            <div className="w-full flex flex-col md:flex-row">
              <div className="bg-[#1e2a38] text-white w-full md:w-1/3 p-6 space-y-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                {viewContent.photoPreview && (
                  <div className="flex justify-center">
                    <img
                      src={viewContent.photoPreview}
                      alt="Fotka"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white"
                    />
                  </div>
                )}
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Telefon:</strong> {viewContent.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {viewContent.email}
                  </p>
                  <p>
                    <strong>Adresa:</strong> {viewContent.street}, {viewContent.city},{' '}
                    {viewContent.postalCode}
                  </p>
                  <p>
                    <strong>Web:</strong> {viewContent.website}
                  </p>
                  {viewContent.gender && (
                    <p>
                      <strong>Pohlaví:</strong> {viewContent.gender}
                    </p>
                  )}
                </div>

                {Array.isArray(viewContent.education) && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 border-b border-gray-500">
                      EDUKACE
                    </h3>
                    {(viewContent.education as Education[]).map((edu, i) => (
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

                {Array.isArray(viewContent.languages) && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 border-b border-gray-500">
                      JAZYKY
                    </h3>
                    {(viewContent.languages as Language[]).map((lang, i) => (
                      <p key={i} className="text-sm">
                        {lang.language} – {lang.level}
                      </p>
                    ))}
                  </div>
                )}

                {Array.isArray(viewContent.drivingLicense) &&
                  viewContent.drivingLicense.length > 0 && (
                    <p>
                      <strong>Řidičský průkaz:</strong> {viewContent.drivingLicense.join(', ')}
                    </p>
                  )}
              </div>

              <div className="w-full md:w-2/3 p-8 space-y-6 bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none text-black">
                <div>
                  <h1 className="text-3xl font-bold text-[#1e2a38]">
                    {viewContent.firstName} {viewContent.lastName}
                  </h1>
                  <p className="text-blue-700 font-semibold uppercase tracking-wide">
                    {viewContent.titleBefore} {viewContent.titleAfter}
                  </p>
                </div>

                {Array.isArray(viewContent.work) && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#1e2a38] border-b pb-1 mb-2">
                      Pracovní zkušenosti
                    </h2>
                    {(viewContent.work as WorkExperience[]).map((job, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between text-sm font-semibold">
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

                {Array.isArray(viewContent.certificates) && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#1e2a38] border-b pb-1 mb-2">
                      Kurzy a certifikáty
                    </h2>
                    {(viewContent.certificates as Certificate[]).map((cert, i) => (
                      <p key={i} className="text-sm">
                        {cert.name} –{' '}
                        <span className="text-gray-600 italic">{cert.description}</span>
                      </p>
                    ))}
                  </div>
                )}

                {viewContent.references && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#1e2a38] border-b pb-1 mb-2">
                      Reference
                    </h2>
                    <p className="text-sm italic text-gray-700">{viewContent.references}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && cvToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full relative text-center">
            <h3 className="text-xl font-bold text-secondary mb-4">Smazat životopis?</h3>
            <p className="text-black mb-6">
              Opravdu chcete smazat životopis <strong>{cvToDelete.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setDeleteModalOpen(false)
                  setCvToDelete(null)
                }}
                className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Zrušit
              </button>
              <button
                onClick={handleDeleteCv}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-red-700"
              >
                Smazat
              </button>
            </div>
          </div>
        </div>
      )}

      {createModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full relative text-center">
            <h3 className="text-xl font-bold text-secondary mb-4">Vytvořit nový životopis</h3>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-black mb-4"
              placeholder="Zadejte název životopisu"
              value={newCvTitle}
              onChange={(e) => setNewCvTitle(e.target.value)}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setCreateModalOpen(false)
                  setNewCvTitle('')
                }}
                className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Zrušit
              </button>
              <button
                onClick={handleCreateCv}
                className="px-4 py-2 rounded bg-secondary text-white hover:bg-secondary/90"
              >
                Vytvořit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default UcetPage
