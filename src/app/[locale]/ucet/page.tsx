'use client'

import { useEffect, useState } from 'react'
import PrimaryButton from '../components/ui/primary-button'
import FinalCTA from '../components/landing-page/FinalCTA'
import { useUser } from '@clerk/nextjs'

interface Cv {
  _id: string
  name: string
  date: string
  content: { text?: string }
}

const UcetPage = () => {
  const { user } = useUser()
  const [cvs, setCvs] = useState<Cv[]>([])

  const [editingCv, setEditingCv] = useState<Cv | null>(null)
  const [editContent, setEditContent] = useState<string>('')
  const [viewContent, setViewContent] = useState<string>('')

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [cvToDelete, setCvToDelete] = useState<Cv | null>(null)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newCvTitle, setNewCvTitle] = useState('')

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
      body: JSON.stringify({
        name: newCvTitle.trim(),
        content: { text: '' },
      }),
    })
    setCreateModalOpen(false)
    setNewCvTitle('')
    fetchCvs()
  }

  const handleSaveContent = async () => {
    if (!editingCv) return

    await fetch('/api/cvs/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingCv._id,
        content: { text: editContent },
      }),
    })

    setEditModalOpen(false)
    setEditingCv(null)
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
        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-r from-secondary via-[#2195e8] to-secondary py-12 text-white container flex flex-col gap-6 items-center">
          <p className="text-[24px] font-semibold">Ještě nemáte životopis?</p>
          <PrimaryButton onClick={() => setCreateModalOpen(true)}>Vytvořit životopis</PrimaryButton>
        </div>

        {/* CV List */}
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
                      setViewContent(cv.content?.text || '')
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
                      <span
                        className="text-red-600 text-[15px] underline cursor-pointer"
                        onClick={() => {
                          setEditingCv(cv)
                          setEditContent(cv.content?.text || '')
                          setEditModalOpen(true)
                        }}
                      >
                        Upravit
                      </span>
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

      {/* View Modal */}
      {viewModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 h-[400px] max-w-lg w-full flex flex-col items-center relative">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-2 right-4 text-gray-700 hover:text-black"
            >
              Zavřít
            </button>
            <h3 className="text-xl font-bold mb-4 text-secondary">Životopis</h3>
            <p className="text-primary text-2xl font-semibold whitespace-pre-wrap">
              {viewContent || 'Žádný obsah.'}
            </p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed bg-black/50 inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => {
                setEditModalOpen(false)
                setEditingCv(null)
              }}
              className="absolute top-2 right-4 text-gray-500 hover:text-black"
            >
              Zavřít
            </button>
            <h3 className="text-xl font-bold text-secondary mb-4">Upravit obsah životopisu</h3>
            <textarea
              className="w-full h-64 border border-red-500 rounded p-2 text-sm text-black"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button
              onClick={handleSaveContent}
              className="mt-4 bg-secondary text-white px-4 py-2 rounded"
            >
              Uložit změny
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
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
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Smazat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
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
