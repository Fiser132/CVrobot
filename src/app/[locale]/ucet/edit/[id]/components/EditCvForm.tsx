// src/app/[locale]/ucet/edit/[id]/components/EditCvForm.tsx
import { RefObject } from 'react'
import DynamicSection from './DynamicSection'

interface EditCvFormProps {
  formRef: RefObject<HTMLFormElement | null>
  cvData: any
  setCvData: (data: any) => void
  photoPreview: string | null
  setPhotoPreview: (url: string | null) => void
  updateCvDataFromForm: () => void
  handleSave: () => void
}

const educationDefaults = {
  startYear: '',
  endYear: '',
  field: '',
  schoolName: '',
}

const workDefaults = {
  start: '',
  end: '',
  employer: '',
  activity: '',
  position: '',
  description: '',
}

const certificatesDefaults = {
  name: '',
  description: '',
}

const languagesDefaults = {
  language: '',
  level: '',
}

const EditCvForm = ({
  formRef,
  cvData,
  setCvData,
  photoPreview,
  setPhotoPreview,
  updateCvDataFromForm,
}: EditCvFormProps) => {
  const inputClass =
    'bg-white border border-gray-300 rounded-md px-4 py-3 text-sm w-full placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition'

  return (
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
                  />
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

        <DynamicSection
          section="education"
          fields={['startYear', 'endYear', 'field', 'schoolName']}
          defaults={educationDefaults}
          cvData={cvData}
          setCvData={setCvData}
          inputClass={inputClass}
          updateCvDataFromForm={updateCvDataFromForm}
        />

        <DynamicSection
          section="work"
          fields={['start', 'end', 'employer', 'activity', 'position', 'description']}
          defaults={workDefaults}
          cvData={cvData}
          setCvData={setCvData}
          inputClass={inputClass}
          updateCvDataFromForm={updateCvDataFromForm}
        />

        <DynamicSection
          section="certificates"
          fields={['name', 'description']}
          defaults={certificatesDefaults}
          cvData={cvData}
          setCvData={setCvData}
          inputClass={inputClass}
          updateCvDataFromForm={updateCvDataFromForm}
        />

        <DynamicSection
          section="languages"
          fields={['language', 'level']}
          defaults={languagesDefaults}
          cvData={cvData}
          setCvData={setCvData}
          inputClass={inputClass}
          updateCvDataFromForm={updateCvDataFromForm}
        />

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
  )
}

export default EditCvForm
