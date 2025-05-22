// CvFormContext.tsx
'use client'

import { createContext, useContext } from 'react'

export const CvFormContext = createContext<Record<string, any>>({})

export const useCvFormData = () => {
  const ctx = useContext(CvFormContext)
  if (!ctx) {
    throw new Error('useCvFormData must be used within CvFormContext.Provider')
  }
  return ctx
}
