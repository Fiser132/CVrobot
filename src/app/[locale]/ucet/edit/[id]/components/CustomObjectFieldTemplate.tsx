'use client'

const gridFields = new Set([
  'cvName',
  'firstName',
  'lastName',
  'titulBefore',
  'titulAfter',
  'email',
  'birthDate',
  'maritalStatus',
  'street',
  'zip',
  'city',
  'state',
  'region',
  'photo',
  'phone',
  'website',
  'gender'
])

const CustomObjectFieldTemplate = ({ properties }: any) => {
  return (
    <>
      {/* 2-column layout for basic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties
          .filter((element: any) => gridFields.has(element.name))
          .map((element: any) => (
            <div key={element.name} className="flex flex-col">
              {element.content}
            </div>
          ))}
      </div>

      {/* Full-width layout for the rest */}
      <div className="space-y-6 mt-6">
        {properties
          .filter((element: any) => !gridFields.has(element.name))
          .map((element: any) => (
            <div key={element.name}>{element.content}</div>
          ))}
      </div>
    </>
  )
}

export default CustomObjectFieldTemplate
