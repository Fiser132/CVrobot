'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import EditCvForm from './components/EditCvForm'
import CvPreview from './components/CvPreview'
import SuccessOverlay from './components/SuccessOverlay'

const EditCvPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const locale = (params as any).locale ?? 'sk'

  const [saved, setSaved] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [cvData, setCvData] = useState<Record<string, any>>({})

  useEffect(() => {
    const fetchCv = async () => {
      const res = await fetch(`/api/cvs/${id}`)
      if (!res.ok) return console.error('Failed to fetch CV:', res.status)
      const data = await res.json()
      setCvData(data.content || {})
      if (data.content?.photoPreview) setPhotoPreview(data.content.photoPreview)
    }
    if (id) fetchCv()
  }, [id])

const handleSave = async (content: Record<string, any>) => {
  if (photoPreview) {
    content.photoPreview = photoPreview
  }

  const res = await fetch('/api/cvs/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, content, name: content.cvName }),
  })

  if (!res.ok) {
    console.error('Failed to save CV:', res.statusText)
    return
  }

  setSaved(true)
  setTimeout(() => {
    setSaved(false)
    router.push(`/${locale}/ucet`)
  }, 1500)
}


  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen text-black bg-[#f5f6fa] absolute top-0 w-full">
      {saved && <SuccessOverlay />}

      <EditCvForm
        cvData={cvData}
        setCvData={setCvData}
        photoPreview={photoPreview}
        setPhotoPreview={setPhotoPreview}
        handleSave={handleSave}
      />

      <CvPreview cvData={cvData} photoPreview={photoPreview} handleSave={() => handleSave(cvData)} />
    </main>
  )
}

export default EditCvPage
