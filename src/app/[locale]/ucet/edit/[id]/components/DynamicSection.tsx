// src/app/[locale]/ucet/edit/[id]/components/DynamicSection.tsx
interface DynamicSectionProps {
  section: string
  fields: string[]
  defaults: { [key: string]: string } // ✅ Updated type
  cvData: any
  setCvData: (data: any) => void
  inputClass: string
  updateCvDataFromForm: () => void
}

const DynamicSection = ({
  section,
  fields,
  defaults,
  cvData,
  setCvData,
  inputClass,
  updateCvDataFromForm,
}: DynamicSectionProps) => {
  return (
    <section key={section} className="space-y-4">
      <h3 className="text-lg font-semibold capitalize border-l-4 border-blue-500 pl-2">
        {section}
      </h3>
      {cvData[section]?.map((item: any, i: number) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          {fields.map((field) => (
            <input
              key={field}
              name={`${section}[${i}][${field}]`}
              defaultValue={item[field] || ''}
              placeholder={field}
              className={inputClass}
              onChange={updateCvDataFromForm}
            />
          ))}
        </div>
      ))}
      <button
        type="button"
        className="text-sm text-blue-600 hover:underline"
        onClick={() => {
          setCvData((prev: any) => ({
            ...prev,
            [section]: [...(prev[section] || []), defaults],
          }))
        }}
      >
        ➕ Přidat další položku
      </button>
    </section>
  )
}

export default DynamicSection
