// src/app/[locale]/edit-cv/EditCvPage.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import EditCvForm from './components/EditCvForm'
import CvPreview from './components/CvPreview'
import SuccessOverlay from './components/SuccessOverlay'

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
    }, 1500)
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen text-black bg-[#f5f6fa] absolute top-0 w-full">
      {saved && <SuccessOverlay />}

      <EditCvForm
        formRef={formRef}
        cvData={cvData}
        setCvData={setCvData}
        photoPreview={photoPreview}
        setPhotoPreview={setPhotoPreview}
        updateCvDataFromForm={updateCvDataFromForm}
        handleSave={handleSave}
      />

      <CvPreview cvData={cvData} photoPreview={photoPreview} handleSave={handleSave} />
    </main>
  )
}

export default EditCvPage