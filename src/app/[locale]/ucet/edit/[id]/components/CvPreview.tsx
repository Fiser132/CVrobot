'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PDFViewer, BlobProvider } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { CvPdfDocument } from './CvPdfDocument'
import { faTextHeight, faTimes } from '@fortawesome/free-solid-svg-icons'
import CvHtmlPreview from './CvHtmlPreview'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

interface CvPreviewProps {
  cvData: any
  photoPreview: string | null
}

const CvPreview = ({ cvData, photoPreview }: CvPreviewProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()

  const locale = typeof params.locale === 'string' ? params.locale : 'sk'
  const cvId = typeof params.id === 'string' ? params.id : ''

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)

  useEffect(() => {
    if (searchParams.get('paid') === '1') {
      setIsUnlocked(true)
    }
  }, [searchParams])

  return (
    <div className="bg-[#2e2f4e] text-white fixed right-0 top-0 bottom-0 w-1/2 z-40 flex flex-col">
      {/* Controls */}
      <div className="flex justify-center">
        <div className="flex justify-between py-10 w-[90%]">
          <button
            className="underline text-sm flex gap-2 items-center"
            onClick={() => setShowTemplateModal(true)}
          >
            <FontAwesomeIcon icon={faTextHeight} />
            Vybrat šablonu CV
          </button>

          <div className="flex gap-4">
            {isUnlocked ? (
              <>
                {/* Print */}
                <BlobProvider
                  document={<CvPdfDocument cvData={cvData} photoPreview={photoPreview} watermark={false} />}
                >
                  {({ url }) => (
                    <button
                      onClick={() => {
                        const win = window.open(url)
                        win?.print()
                      }}
                      className="underline text-sm"
                    >
                      Uložit
                    </button>
                  )}
                </BlobProvider>

                {/* Download */}
                <BlobProvider
                  document={<CvPdfDocument cvData={cvData} photoPreview={photoPreview} watermark={false} />}
                >
                  {({ blob }) => (
                    <button
                      onClick={() => blob && saveAs(blob, 'cv.pdf')}
                      className="bg-red-600 px-4 py-2 text-sm rounded hover:bg-red-700"
                    >
                      Stáhnout PDF
                    </button>
                  )}
                </BlobProvider>
              </>
            ) : (
              <button
                onClick={() => router.push(`/${locale}/platba?cvId=${cvId}`)}
                className="bg-yellow-500 px-4 py-2 text-sm rounded hover:bg-yellow-600 text-white"
              >
                Zaplatit 49 Kč
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="flex-1 overflow-auto flex justify-center bg-[#2e2f4e] p-6">
        {isUnlocked ? (
          <PDFViewer width="100%" height={900} style={{ minHeight: 500 }}>
            <CvPdfDocument cvData={cvData} photoPreview={photoPreview} watermark={false} />
          </PDFViewer>
        ) : (
          <CvHtmlPreview cvData={cvData} photoPreview={photoPreview} />
        )}
      </div>

      {/* 🟨 Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-3xl w-full relative">
            <button
              onClick={() => setShowTemplateModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-center">Vyberte si šablonu</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Mock templates */}
              {[1, 2, 3, 4, 5, 6].map((id) => (
                <div
                  key={id}
                  className="border border-gray-300 rounded p-2 cursor-pointer hover:border-blue-600"
                  onClick={() => {
                    // Here you would call a function to setTemplate(id)
                    setShowTemplateModal(false)
                  }}
                >
                  <img
                    src={`/cv1normal.png`}
                    alt={`Šablona ${id}`}
                    className="w-full h-48 object-cover rounded"
                  />
                  <p className="text-center text-sm mt-2">Šablona {id}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CvPreview
