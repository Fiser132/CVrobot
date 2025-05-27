// src/app/[locale]/ucet/edit/[id]/components/validation.ts
import { z } from 'zod'

export const cvSchema = z.object({
  cvName:       z.string().min(1, 'Název životopisu je povinný'),
  firstName:    z.string().min(1, 'Jméno je povinné'),
  lastName:     z.string().min(1, 'Příjmení je povinné'),
  email:        z.string().email('Neplatný e-mail').nonempty('E-mail je povinný'),
  gender:       z.enum(['muž', 'žena'], { required_error: 'Pohlaví je povinné' }),
  birthDate:    z.string().nonempty('Datum narození je povinné'),
  maritalStatus: z.string().optional(),
  street:       z.string().nonempty('Ulice je povinná'),
  postalCode:   z.string().nonempty('PSČ je povinné'),
  city:         z.string().nonempty('Město je povinné'),
  country:      z.string().nonempty('Stát je povinný'),
  region:       z.string().optional(),
  phone:        z.string().optional(),
  website:      z.string().url('Neplatná URL').optional(),
  references:   z.string().optional(),
  drivingLicense: z.array(z.string()).optional(),
  // dynamic sections can be validated separately if needed…
})
