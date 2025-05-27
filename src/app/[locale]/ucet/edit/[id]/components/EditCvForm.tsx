// src/app/[locale]/ucet/edit/[id]/components/EditCvForm.tsx
'use client'

import { RefObject, useRef, useState } from 'react'
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
  updateCvDataFromForm: () => void
  cvData: Record<string, any>
  errors: Record<string, string>
  clearError: (field: string) => void
  handleValidation: () => boolean  // new: validate step-1 fields
}

export default function EditCvForm({
  formRef,
  photoPreview,
  setPhotoPreview,
  updateCvDataFromForm,
  cvData,
  errors,
  clearError,
}: EditCvFormProps) {
  const internalFormRef = useRef<HTMLFormElement | null>(null)
  const ref = formRef || internalFormRef
  const [step, setStep] = useState(1)

  const onContinue = () => {
    // Optionally: validate required personal fields here
    setStep(2)
  }

  return (
    <div className="bg-white shadow-lg p-6 md:p-10 lg:p-14 space-y-10 rounded-l-xl w-1/2 absolute top-0 overflow-y-auto">
      <CvFormContext.Provider value={cvData}>
        <form
          ref={ref}
          onChange={updateCvDataFromForm}
          className="space-y-10"
        >
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <section className="space-y-6">
              <h2 className="text-[24px] font-semibold text-secondary">
                1. Vaše osobní údaje
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <InputWithLabel
                  name="cvName"
                  placeholder="Název životopisu"
                  inputClass="text-2xl font-bold w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  onChange={() => clearError('cvName')}
                  error={errors.cvName}
                />
                <InputWithLabel
                  name="firstName"
                  placeholder="Jméno"
                  onChange={() => clearError('firstName')}
                  error={errors.firstName}
                />
                <InputWithLabel
                  name="lastName"
                  placeholder="Příjmení"
                  onChange={() => clearError('lastName')}
                  error={errors.lastName}
                />
                <InputWithLabel
                  name="email"
                  type="email"
                  onChange={() => clearError('email')}
                  error={errors.email}
                />
                <div className="flex flex-col gap-1">
                  <label htmlFor="gender" className="text-sm text-[#7C8088]">Pohlaví</label>
                  <RadioGroup
                    name="gender"
                    label="Pohlaví"
                    options={[
                      { label: 'Muž', value: 'muž' },
                      { label: 'Žena', value: 'žena' },
                    ]}
                    onChange={() => clearError('gender')}
                  />
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
                <InputWithLabel
                  name="birthDate"
                  type="date"
                  onChange={() => clearError('birthDate')}
                  error={errors.birthDate}
                />
              </div>
   
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <SelectWithLabel
                    name="maritalStatus"
                    label="Rodinný stav"
                    options={[
                      { value: '', label: 'Vyberte' },
                      { value: 'svobodný', label: 'Svobodný' },
                      { value: 'ženatý', label: 'Ženatý' },
                    ]}
                    onChange={() => clearError('maritalStatus')}
                  />
                  {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
                  <FileInputWithPreview
                    name="photo"
                    label="Fotografie"
                    accept="image/*"
                    preview={photoPreview}
                    onPreviewChange={setPhotoPreview}
                  />
                  <InputWithLabel
                    name="street"
                    onChange={() => clearError('street')}
                    error={errors.street}
                  />
                  <InputWithLabel
                    name="postalCode"
                    placeholder="PSČ"
                    onChange={() => clearError('postalCode')}
                    error={errors.postalCode}
                  />
                  <InputWithLabel
                    name="city"
                    onChange={() => clearError('city')}
                    error={errors.city}
                  />
                  <SelectWithLabel
                    name="country"
                    label="Stát"
                    options={[
                      { value: 'Česká republika', label: 'Česká republika' },
                      { value: 'Slovensko', label: 'Slovensko' },
                    ]}
                    defaultValue="Česká republika"
                    onChange={() => clearError('country')}
                  />
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                  <SelectWithLabel
                    name="region"
                    label="Kraj"
                    options={[{ value: '', label: 'Vyberte' }]}
                    onChange={() => clearError('region')}
                  />
                  {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
                  <InputWithLabel
                    name="phone"
                    type="tel"
                    onChange={() => clearError('phone')}
                    error={errors.phone}
                  />
                  <InputWithLabel
                    name="website"
                    type="url"
                    onChange={() => clearError('website')}
                    error={errors.website}
                  />
                </div>
                     <button
                  type="button"
                  onClick={onContinue}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Pokračovat
                </button>
            </section>
          )}

          {/* Step 2+: Other Sections */}
          {step > 1 && (
            <>

              {/* Dynamic & Other Fields */}
              <DynamicSection
                section="education"
                fields={['startYear', 'endYear', 'field', 'schoolName']}
                defaults={{ startYear: '', endYear: '', field: '', schoolName: '' }}
                errors={errors}
                clearError={clearError}
              />

              <DynamicSection
                section="work"
                fields={['start', 'end', 'employer', 'activity', 'position', 'description']}
                defaults={{ start: '', end: '', employer: '', activity: '', position: '', description: '' }}
                errors={errors}
                clearError={clearError}
              />

              <DynamicSection
                section="certificates"
                fields={['name', 'description']}
                defaults={{ name: '', description: '' }}
                errors={errors}
                clearError={clearError}
              />

              <DynamicSection
                section="languages"
                fields={['language', 'level']}
                defaults={{ language: '', level: '' }}
                errors={errors}
                clearError={clearError}
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="references" className="text-sm text-[#7C8088]">
                  Reference
                </label>
                <TextareaWithLabel
                  name="references"
                  placeholder="Reference"
                  onChange={() => clearError('references')}
                />
                {errors.references && <p className="text-red-500 text-sm">{errors.references}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#7C8088]">Řidičský průkaz</label>
                <CheckboxGroup
                  name="drivingLicense"
                  options={['A', 'B', 'C', 'D', 'E', 'T'].map((group) => ({ value: group, label: group }))}
                  onChange={() => clearError('drivingLicense')}
                />
                {errors.drivingLicense && <p className="text-red-500 text-sm">{errors.drivingLicense}</p>}
              </div>
            </>
          )}
        </form>
      </CvFormContext.Provider>
    </div>
  )
}
