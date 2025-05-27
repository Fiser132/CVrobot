'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { cvSchema } from './components/validation'
import EditCvForm from './components/EditCvForm'
import CvPreview from './components/CvPreview'
import SuccessOverlay from './components/SuccessOverlay'

type Errors = Record<string,string>

export default function EditCvPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const locale = (params as any).locale ?? 'sk'

  const formRef = useRef<HTMLFormElement>(null)
  const [saved, setSaved] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string|null>(null)
  const [cvData, setCvData] = useState<any>({})
  const [errors, setErrors] = useState<Errors>({})

  // fetch existing CV…
  useEffect(() => {
    async function fetchCv() {
      const res = await fetch(`/api/cvs/${id}`)
      if (!res.ok) return
      const { content } = await res.json()
      setCvData(content)
      if (content.photoPreview) setPhotoPreview(content.photoPreview)
    }
    if (id) fetchCv()
  }, [id])

  // when CvPreview’s Save is clicked…
  const handleValidation = (): boolean => {
    const fd = new FormData(formRef.current!)
    const values: Record<string,string> = {}
    fd.forEach((v,k) => { values[k] = v as string })

    try {
      cvSchema.parse(values)
      setErrors({})            // clear old errors
      return true
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const newErr: Errors = {}
        err.errors.forEach(e => {
          const key = e.path[0] as string
          newErr[key] = e.message
        })
        setErrors(newErr)
      }
      return false
    }
  }

  // after validation passes, actually save…
  const handleSave = async () => {
    const fd = new FormData(formRef.current!)
    const content: any = {}
    fd.forEach((v,k) => { /* …same flatten logic as before… */ })
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

  // helper to clear a single field’s error on change
  const clearError = (field: string) => {
    setErrors(prev => {
      const c = { ...prev }
      delete c[field]
      return c
    })
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen text-black bg-[#f5f6fa] absolute top-0 w-full">
      {saved && <SuccessOverlay />}

      <EditCvForm
        formRef={formRef}
        cvData={cvData}
        photoPreview={photoPreview}
        setPhotoPreview={setPhotoPreview}
        updateCvDataFromForm={() => {
          // you can keep your existing updateCvDataFromForm here
        }}
        errors={errors}
        clearError={clearError}
      />

      <CvPreview
        cvData={cvData}
        photoPreview={photoPreview}
        handleValidation={handleValidation}
        handleSave={handleSave}
      />
    </main>
  )
}
