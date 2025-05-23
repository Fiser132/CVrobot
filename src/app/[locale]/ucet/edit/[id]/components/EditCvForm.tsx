// EditCvForm.tsx
import { RefObject, useRef } from 'react'
import InputWithLabel from './InputWithLabel'
import SelectWithLabel from './SelectWithLabel'
import RadioGroup from './RadioGroup'
import FileInputWithPreview from './FileInputWithPreview'
import TextareaWithLabel from './TextareaWithLabel'
import CheckboxGroup from './CheckboxGroup'
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

const EditCvForm = ({
  formRef,
  photoPreview,
  setPhotoPreview,
  handleSave,
  cvData,
}: EditCvFormProps) => {
  const internalFormRef = useRef<HTMLFormElement | null>(null)
  const ref = formRef || internalFormRef

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(ref.current!)
    handleSave(formData)
  }

  return (
    <div className="bg-white shadow-lg p-6 md:p-10 lg:p-14 space-y-10 overflow-y-auto rounded-l-xl">
      <CvFormContext.Provider value={cvData}>
        <form ref={ref} onSubmit={handleSubmit} className="space-y-10">
          <input
            name="cvName"
            id="cvName"
            className="text-2xl font-bold w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Název životopisu"
            defaultValue=""
          />

          <section className="space-y-6">
            <h2 className="text-[24px] font-semibold text-secondary">1. Vaše osobní údaje</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <InputWithLabel name="email" />

              <RadioGroup
                name="gender"
                label="Pohlaví *"
                options={[
                  { label: 'Muž', value: 'muž' },
                  { label: 'Žena', value: 'žena' },
                ]}
              />

              <InputWithLabel name="firstName" />
              <InputWithLabel name="lastName" />

              <div className="flex gap-8">
                <InputWithLabel name="titleBefore" />
                <InputWithLabel name="titleAfter" />
              </div>

              <InputWithLabel name="birthDate" type="date" />

              <SelectWithLabel
                name="maritalStatus"
                label="Rodinný stav"
                options={[
                  { value: '', label: 'Vyberte' },
                  { value: 'svobodný', label: 'Svobodný' },
                  { value: 'ženatý', label: 'Ženatý' },
                ]}
              />

              <FileInputWithPreview
                name="photo"
                label="Fotografie"
                accept="image/*"
                preview={photoPreview}
                onPreviewChange={setPhotoPreview}
              />

              <InputWithLabel name="street" />

              <div className="flex gap-5">
                <InputWithLabel name="postalCode" type="text" />
                <InputWithLabel name="city" />
              </div>

              <SelectWithLabel
                name="country"
                label="Stát *"
                options={[{ value: 'Česká republika', label: 'Česká republika' }]}
                defaultValue="Česká republika"
              />

              <SelectWithLabel
                name="region"
                label="Kraj"
                options={[{ value: '', label: 'Vyberte' }]}
              />

              <InputWithLabel name="phone" />
              <InputWithLabel name="website" />
            </div>
          </section>

          <DynamicSection
            section="education"
            fields={['startYear', 'endYear', 'field', 'schoolName']}
            defaults={{
              startYear: '',
              endYear: '',
              field: '',
              schoolName: '',
            }}
          />

          <DynamicSection
            section="work"
            fields={['start', 'end', 'employer', 'activity', 'position', 'description']}
            defaults={{
              start: '',
              end: '',
              employer: '',
              activity: '',
              position: '',
              description: '',
            }}
          />

          <DynamicSection
            section="certificates"
            fields={['name', 'description']}
            defaults={{ name: '', description: '' }}
          />

          <DynamicSection
            section="languages"
            fields={['language', 'level']}
            defaults={{ language: '', level: '' }}
          />

          <TextareaWithLabel name="references" label="Reference" placeholder="Reference" />

          <CheckboxGroup
            name="drivingLicense"
            label="Řidičský průkaz"
            options={['A', 'B', 'C', 'D', 'E', 'T'].map((group) => ({
              value: group,
              label: group,
            }))}
          />
        </form>
      </CvFormContext.Provider>
    </div>
  )
}

export default EditCvForm
