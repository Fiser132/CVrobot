// EditCvForm.tsx
import { RefObject } from 'react'
import InputWithLabel from './InputWithLabel'
import DynamicSection from './DynamicSection'
import { CvFormContext } from './CvFormContext'

interface EditCvFormProps {
formRef: RefObject<HTMLFormElement | null>
  photoPreview: string | null
  setPhotoPreview: (url: string | null) => void
  handleSave: (formData: FormData) => void
  cvData: Record<string, any>
  setCvData: React.Dispatch<React.SetStateAction<Record<string, any>>>
  updateCvDataFromForm: () => void
}

const inputClass =
  'bg-[#F0F0F9] h-[48px] rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

const educationDefaults = { startYear: '', endYear: '', field: '', schoolName: '' }
const workDefaults = { start: '', end: '', employer: '', activity: '', position: '', description: '' }
const certificatesDefaults = { name: '', description: '' }
const languagesDefaults = { language: '', level: '' }

const EditCvForm = ({
  formRef,
  photoPreview,
  setPhotoPreview,
  handleSave,
  cvData,
}: EditCvFormProps & { cvData: Record<string, any> }) =>  {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)
    handleSave(formData)
  }

  return (
    <div className="bg-white shadow-lg p-6 md:p-10 lg:p-14 space-y-10 overflow-y-auto rounded-l-xl">
      <CvFormContext.Provider value={cvData}>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-2">
          <label htmlFor="cvName" className="text-lg font-semibold">Pojmenujte si Vaše CV</label>
          <input
            name="cvName"
            id="cvName"
            className="text-2xl font-bold w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Název životopisu"
            defaultValue=""
          />
        </div>

        <section className="space-y-6">
          <h2 className="text-[24px] font-semibold text-secondary">1. Vaše osobní údaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <InputWithLabel name="email" placeholder="E-mail *" type="email" />
            <div className="flex flex-col items-start gap-4">
              <span className="text-sm text-[#7C8088]">Pohlaví *</span>
              <div className="flex gap-8">
                {['muž', 'žena'].map((val) => (
                  <label key={val} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="gender" value={val} className="accent-red-500" />
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <InputWithLabel name="firstName" />
            <InputWithLabel name="lastName" />
            <div className="flex gap-8">
              <InputWithLabel name="titleBefore" placeholder="Titul před jménem" />
              <InputWithLabel name="titleAfter" placeholder="Titul za jménem" />
            </div>
            <InputWithLabel name="birthDate" placeholder="Datum narození" />
            <div>
              <label className="text-sm font-medium text-gray-700">Rodinný stav</label>
              <select name="maritalStatus" className={inputClass}>
                <option value="">vyberte</option>
                <option value="svobodný">Svobodný</option>
                <option value="ženatý">Ženatý</option>
              </select>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setPhotoPreview(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Náhled"
                  className="w-20 h-20 rounded-full object-cover border shadow"
                />
              )}
              <button
                type="button"
                className="text-sm text-red-600 hover:underline"
                onClick={() => document.querySelector<HTMLInputElement>('input[name="photo"]')?.click()}
              >
                Nahrát fotografii
              </button>
            </div>
            <InputWithLabel name="street" placeholder="Ulice a číslo popisné *" />
            <div className="flex gap-5">
              <InputWithLabel name="postalCode" placeholder="PSČ *" />
              <InputWithLabel name="city" placeholder="Město *" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Stát *</label>
              <select name="country" className={inputClass} defaultValue="Česká republika">
                <option value="Česká republika">Česká republika</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Kraj</label>
              <select name="region" className={inputClass}>
                <option value="">vyberte</option>
              </select>
            </div>
            <InputWithLabel name="phone" placeholder="Telefon" />
            <InputWithLabel name="website" placeholder="Webové stránky" />
          </div>
        </section>

        <DynamicSection section="education" fields={['startYear', 'endYear', 'field', 'schoolName']} defaults={educationDefaults} />
        <DynamicSection section="work" fields={['start', 'end', 'employer', 'activity', 'position', 'description']} defaults={workDefaults} />
        <DynamicSection section="certificates" fields={['name', 'description']} defaults={certificatesDefaults} />
        <DynamicSection section="languages" fields={['language', 'level']} defaults={languagesDefaults} />

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Reference</h3>
          <textarea
            name="references"
            placeholder="Reference"
            className="bg-[#F0F0F9] h-max rounded-[4px] px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            defaultValue=""
          />
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Řidičský průkaz</h3>
          <div className="flex flex-wrap gap-4">
            {['A', 'B', 'C', 'D', 'E', 'T'].map((group) => (
              <label key={group} className="flex items-center gap-2">
                <input type="checkbox" name="drivingLicense" value={group} />
                {group}
              </label>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Uložit CV
        </button>
      </form>
      </CvFormContext.Provider>
    </div>
  )
}

export default EditCvForm
