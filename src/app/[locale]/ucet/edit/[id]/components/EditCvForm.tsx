'use client'

import React from 'react'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { JSONSchema7 } from 'json-schema'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import CustomFieldTemplate from './CustomFieldTemplate'
import EditableInput from './CvName'
import CustomObjectFieldTemplate from './CustomObjectFieldTemplate'
import PhotoUploadWidget from './PhotoUploadWidget'
import DriverLicenseWidget from './DriverLicenseWidget'
import CustomTextareaWidget from './CustomTextAreaWIdget'



interface EditCvFormProps {
  handleSave: (formData: Record<string, any>) => void
  cvData: Record<string, any>
  setCvData: (data: Record<string, any>) => void
}

const schema: JSONSchema7 = {
  title: 'Životopis',
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'gender'],
  properties: {
    firstName: { type: 'string', title: 'Jméno' },
    gender: {
      type: 'string',
      title: 'Pohlaví',
      enum: ['muž', 'žena']
    },
    lastName: { type: 'string', title: 'Příjmení' },
    titulBefore: { type: 'string', title: 'Titul před jménem' },
    titulAfter: { type: 'string', title: 'Titul za jménem' },
    email: { type: 'string', title: 'Email', format: 'email' },
    birthDate: { type: 'string', title: 'Datum narození', format: 'date' },
    photo: {
      type: 'string',
      title: '',
      contentEncoding: 'base64'
    },
    maritalStatus: {
      type: 'string',
      title: 'Rodinný stav',
      enum: ['Svobodný/á', 'Ženatý/Vdaná', 'Rozvedený/á', 'Ovdovělý/á']
    },
    street: { type: 'string', title: 'Ulice a číslo popisné' },
    zip: { type: 'string', title: 'PSČ' },
    city: { type: 'string', title: 'Město' },
    state: {
      type: 'string',
      title: 'Stát',
      enum: ['Česká republika', 'Slovenská republika', 'Jiné']
    },
    region: {
      type: 'string',
      title: 'Kraj',
      enum: [
        'vyberte', 'Hlavní město Praha', 'Středočeský', 'Jihočeský', 'Plzeňský',
        'Karlovarský', 'Ústecký', 'Liberecký', 'Královéhradecký', 'Pardubický',
        'Vysočina', 'Jihomoravský', 'Olomoucký', 'Zlínský', 'Moravskoslezský'
      ]
    },
    phone: { type: 'string', title: 'Telefon' },
    website: { type: 'string', title: 'Webové stránky', format: 'uri' },
    education: {
      type: 'array',
      title: 'Vzdělání',
      items: {
        type: 'object',
        required: ['school', 'degree'],
        properties: {
          school: { type: 'string', title: 'Škola' },
          degree: { type: 'string', title: 'Titul' },
          field: { type: 'string', title: 'Obor' },
          startYear: { type: 'string', title: 'Rok začátku' },
          endYear: { type: 'string', title: 'Rok konce' }
        }
      }
    },
    workExperience: {
      type: 'array',
      title: 'Pracovní zkušenosti',
      items: {
        type: 'object',
        required: ['company', 'position'],
        properties: {
          company: { type: 'string', title: 'Společnost' },
          position: { type: 'string', title: 'Pozice' },
          description: { type: 'string', title: 'Popis práce' },
          startDate: { type: 'string', title: 'Začátek', format: 'date' },
          endDate: { type: 'string', title: 'Konec', format: 'date' }
        }
      }
    },
    otherExperience: {
      type: 'string',
      title: 'Další profesní zkušenosti, reference'
    },
    languages: {
      type: 'array',
      title: 'Jazyky',
      items: {
        type: 'object',
        properties: {
          language: { type: 'string', title: 'Jazyk' },
          level: {
            type: 'string',
            title: 'Úroveň',
            enum: ['Základní', 'Střední', 'Pokročilá', 'Rodilý mluvčí']
          }
        }
      }
    },
    driverLicense: {
      type: 'array',
      title: 'Řidičský průkaz',
      items: {
        type: 'string',
        enum: ['A', 'B', 'C', 'D', 'E', 'T']
      },
      uniqueItems: true
    }
  }
}

const uiSchema = {
  email: { 'ui:placeholder': 'např. filip@email.cz' },
  birthDate: { 'ui:widget': 'date' },
  gender: {
    'ui:widget': 'radio',
    'ui:options': { inline: true },
    'classNames': 'flex gap-5 items-center'
  },
  photo: { 'ui:widget': 'photoUpload' },
  otherExperience: {
    'ui:widget': 'customTextarea',
    'ui:options': { placeholder: 'Popis' }
  },
  driverLicense: {
    'ui:widget': 'driverLicenseWidget',
    'ui:options': { inline: true }
  },
education: {
  'ui:options': {
    addable: true,
    removable: true,
    orderable: true,
        classNames: 'border border-gray-300 rounded-md p-4 bg-white'
  },
  
},
workExperience: {
  'ui:options': {
    addable: true,
    removable: true,
    orderable: true,
        classNames: 'border border-gray-300 rounded-md p-4 bg-white'
  }
},
languages: {
  'ui:options': {
    addable: true,
    removable: true,
    orderable: true,
    classNames: 'border border-gray-300 rounded-md p-4 bg-white'
  }
},
}

const EditCvForm = ({ handleSave, cvData, setCvData }: EditCvFormProps) => {
  const onSubmit = ({ formData }: any) => handleSave(formData)
  const [cvName, setCvName] = React.useState('')
  const params = useParams()
  const locale = params.locale ?? 'sk'
  const withLocale = (path: string) => `/${locale}${path}`

  return (
    <div className="bg-white">
      <div className="py-10 px-14 flex justify-between">
        <div className="flex gap-5">
          <Link href={withLocale('/')} className="flex items-start space-x-2 text-secondary font-bold text-2xl">
            <Image src="/logo.svg" alt="Logo" width={135} height={31} />
          </Link>
          <div className="border border-[#D9D9D9] h-[70%] my-auto"></div>
          <Link href={withLocale('/ucet')} className="block py-2 text-sm text-primary underline">
            Můj účet
          </Link>
        </div>
        <Link href={withLocale('/ucet')} className="block px-6 py-2 text-sm text-primary underline">
          Nápověda
        </Link>
      </div>

      <div className="px-14">
        <EditableInput
          value={cvName}
          placeholder="Pojmenujte si Vaše CV"
          onChange={setCvName}
        />
      </div>

      <div className="border-b-2 w-[90%] mx-auto border-[#D9D9D9] py-5"></div>

      <div className="bg-white p-6 md:p-10 lg:p-14 overflow-y-auto rounded-l-xl space-y-6">
        <div className="rjsf">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={cvData}
          onSubmit={onSubmit}
          onChange={({ formData }) => setCvData(formData)}
          validator={validator}
          showErrorList={false}
          noHtml5Validate
          templates={{
            FieldTemplate: CustomFieldTemplate,
            ObjectFieldTemplate: CustomObjectFieldTemplate,
          }}
          widgets={{
            photoUpload: PhotoUploadWidget,
            driverLicenseWidget: DriverLicenseWidget,
            customTextarea: CustomTextareaWidget
          }}
        />
        </div>
      </div>
    </div>
  )
}

export default EditCvForm;