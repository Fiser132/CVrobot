'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import PrimaryButton from '@/app/[locale]/components/ui/primary-button'

const EditCvPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const locale = (params as any).locale ?? 'sk'

  const formRef = useRef<HTMLFormElement>(null)
  const [saved, setSaved] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [cvData, setCvData] = useState<any>({})

  useEffect(() => {
    const fetchCv = async () => {
      const res = await fetch(`/api/cvs/${id}`)
      if (!res.ok) return console.error('Failed to fetch CV:', res.status)
      const data = await res.json()
      setCvData(data.content)
      if (data.content.photoPreview) setPhotoPreview(data.content.photoPreview)
    }
    if (id) fetchCv()
  }, [id])

  const updateCvDataFromForm = () => {
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const updatedData: Record<string, any> = {}

    formData.forEach((value, key) => {
      if (key.includes('[')) {
        const keys = key.replace(/\]/g, '').split('[')
        if (!updatedData[keys[0]]) updatedData[keys[0]] = []
        const index = Number(keys[1])
        const field = keys[2]
        if (!updatedData[keys[0]][index]) updatedData[keys[0]][index] = {}
        updatedData[keys[0]][index][field] = value
      } else if (key === 'drivingLicense') {
        if (!updatedData[key]) updatedData[key] = []
        updatedData[key].push(value)
      } else {
        updatedData[key] = value
      }
    })

    if (photoPreview) updatedData.photoPreview = photoPreview
    setCvData(updatedData)
  }

  const handleSave = async () => {
    if (!formRef.current) return
    const formDataInstance = new FormData(formRef.current)
    const content: Record<string, any> = {}

    formDataInstance.forEach((value, key) => {
      if (key.includes('[')) {
        const keys = key.replace(/\]/g, '').split('[')
        if (!content[keys[0]]) content[keys[0]] = []
        const index = Number(keys[1])
        const field = keys[2]
        if (!content[keys[0]][index]) content[keys[0]][index] = {}
        content[keys[0]][index][field] = value
      } else if (key === 'drivingLicense') {
        if (!content[key]) content[key] = []
        content[key].push(value)
      } else {
        content[key] = value
      }
    })

    if (photoPreview) content.photoPreview = photoPreview

    await fetch('/api/cvs/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, content, name: content.cvName }),
    })

    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      router.push(`/${locale}/ucet`)
    }, 1000)
  }

  const inputClass =
    'bg-white border border-gray-300 rounded-md px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

  const renderDynamicSection = (section: string, fields: string[], defaults: any) => (
    <section key={section} className="space-y-4">
      <h3 className="text-lg font-semibold capitalize border-l-4 border-blue-500 pl-2">
        {section}
      </h3>
      {cvData[section]?.map((item: any, i: number) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          {fields.map((field) => (
            <input
              key={field}
              name={`${section}[${i}][${field}]`}
              defaultValue={item[field] || ''}
              placeholder={field}
              className={inputClass}
              onChange={updateCvDataFromForm}
            />
          ))}
        </div>
      ))}
      <button
        type="button"
        className="text-sm text-blue-600 hover:underline"
        onClick={() => {
          setCvData((prev: any) => ({
            ...prev,
            [section]: [...(prev[section] || []), defaults],
          }))
        }}
      >
        ➕ Přidat další položku
      </button>
    </section>
  )

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen text-black bg-[#f5f6fa] absolute top-0 w-full">
      {saved && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg font-semibold text-lg animate-fadeIn">
            ✅ Životopis byl úspěšně uložen.
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg p-6 md:p-10 lg:p-14 space-y-10 overflow-y-auto rounded-l-xl">
        <form ref={formRef} className="space-y-10" onChange={updateCvDataFromForm}>
          <div className="space-y-2">
            <label htmlFor="cvName" className="text-lg font-semibold">
              Pojmenujte si Vaše CV
            </label>
            <input
              name="cvName"
              id="cvName"
              defaultValue={cvData.cvName || ''}
              className="text-2xl font-bold w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Název životopisu"
              onChange={updateCvDataFromForm}
            />
          </div>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-blue-600">1. Vaše osobní údaje</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'email',
                'firstName',
                'lastName',
                'birthDate',
                'street',
                'postalCode',
                'city',
                'country',
                'region',
                'phone',
                'website',
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field}
                  defaultValue={cvData[field] || ''}
                  className={inputClass}
                  onChange={updateCvDataFromForm}
                />
              ))}
              <div className="flex items-center gap-6">
                {['muž', 'žena'].map((val) => (
                  <label key={val} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="gender"
                      value={val}
                      defaultChecked={cvData.gender === val}
                      className="accent-red-500"
                      onChange={updateCvDataFromForm}
                    />{' '}
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-blue-600">Fotografie</h2>
            <div className="flex items-start gap-4">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setPhotoPreview(reader.result as string)
                      updateCvDataFromForm()
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Náhled"
                  className="w-24 h-24 rounded object-cover border shadow"
                />
              )}
            </div>
          </section>

          {renderDynamicSection('education', ['startYear', 'endYear', 'field', 'schoolName'], {
            startYear: '',
            endYear: '',
            field: '',
            schoolName: '',
          })}

          {renderDynamicSection(
            'work',
            ['start', 'end', 'employer', 'activity', 'position', 'description'],
            {
              start: '',
              end: '',
              employer: '',
              activity: '',
              position: '',
              description: '',
            }
          )}

          {renderDynamicSection('certificates', ['name', 'description'], {
            name: '',
            description: '',
          })}

          {renderDynamicSection('languages', ['language', 'level'], {
            language: '',
            level: '',
          })}

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Reference</h3>
            <textarea
              name="references"
              placeholder="Reference"
              defaultValue={cvData.references || ''}
              className={inputClass}
              onChange={updateCvDataFromForm}
            />
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Řidičský průkaz</h3>
            {['A', 'B', 'C', 'D', 'E', 'T'].map((group) => (
              <label key={group} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="drivingLicense"
                  value={group}
                  defaultChecked={
                    Array.isArray(cvData.drivingLicense) && cvData.drivingLicense.includes(group)
                  }
                  onChange={updateCvDataFromForm}
                />
                {group}
              </label>
            ))}
          </section>
        </form>
      </div>

      {/* RIGHT PREVIEW COLUMN */}
      <div className="bg-[#2e2f4e] text-white fixed right-0 top-0 bottom-0 w-1/2 z-40 overflow-y-auto shadow-xl flex flex-col">
        <div className="pt-6 border-t border-gray-300 gap-10 w-full flex items-center justify-end px-32">
          <button
            type="button"
            onClick={handleSave}
            className=" transition text-white underline py-2 rounded-md text-md cursor-default "
          >
            Uložit
          </button>
          <PrimaryButton>Stáhnout v PDF</PrimaryButton>
        </div>
        <div className="flex justify-center p-10 ">
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
                  {' '}
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
    </main>
  )
}

export default EditCvPage
