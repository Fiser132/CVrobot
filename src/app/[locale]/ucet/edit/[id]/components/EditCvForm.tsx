'use client'

import React from 'react'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { JSONSchema7 } from 'json-schema'

import CustomFieldTemplate from './CustomFieldTemplate'
import CustomArrayFieldTemplate from './CusromArrayFieldTemplate'
import CustomObjectFieldTemplate from './CustomObjectFieldTemplate'
import PhotoUploadWidget from './PhotoUploadWidget'
import DriverLicenseWidget from './DriverLicenseWidget'
import CustomTextareaWidget from './CustomTextAreaWIdget'


interface EditCvFormProps {
  handleSave: (formData: Record<string, any>) => void
  cvData: Record<string, any>
}

const schema: JSONSchema7 = {
  title: 'Životopis',
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'gender'],
  properties: {
    firstName: { type: 'string', title: 'Jméno' },
    lastName: { type: 'string', title: 'Příjmení' },
    titulBefore: { type: 'string', title: 'Titul před jménem' },
    titulAfter: { type: 'string', title: 'Titul za jménem' },
    email: { type: 'string', title: 'Email', format: 'email' },
    birthDate: { type: 'string', title: 'Datum narození', format: 'date' },
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
    photo: {
      type: 'string',
      title: 'Fotografie',
      contentEncoding: 'base64'
    },
    phone: { type: 'string', title: 'Telefon' },
    website: { type: 'string', title: 'Webové stránky', format: 'uri' },
    gender: {
      type: 'string',
      title: 'Pohlaví',
      enum: ['muž', 'žena']
    },
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
    'ui:options': {
      inline: true
    }
  },
  photo: {
    'ui:widget': 'photoUpload'
  },
otherExperience: {
  'ui:widget': 'customTextarea',
  'ui:options': {
    placeholder: 'Popis'
  }
},
  driverLicense: {
    'ui:widget': 'driverLicenseWidget',
    'ui:options': {
      inline: true
    }
  }
}

const EditCvForm = ({ handleSave, cvData }: EditCvFormProps) => {

  const onSubmit = ({ formData }: any) => {
    handleSave(formData)
  }

  return (
    <div className="bg-white shadow-lg p-6 md:p-10 lg:p-14 overflow-y-auto rounded-l-xl space-y-6">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        formData={cvData}
        onSubmit={onSubmit}
        noHtml5Validate
        showErrorList={false}
        templates={{
          FieldTemplate: CustomFieldTemplate,
          ArrayFieldTemplate: CustomArrayFieldTemplate,
          ObjectFieldTemplate: CustomObjectFieldTemplate
        }}
        widgets={{
          photoUpload: PhotoUploadWidget,
            driverLicenseWidget: DriverLicenseWidget,
              customTextarea: CustomTextareaWidget

        }}
      >
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-purple-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Uložit životopis
          </button>
        </div>
      </Form>
    </div>
  )
}

export default EditCvForm
