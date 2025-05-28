import { z } from 'zod'

export const cvSchema = z.object({
  firstName: z.string().min(1, 'Jméno je povinné'),
  lastName: z.string().min(1, 'Příjmení je povinné'),
  email: z.string().email('Neplatný email'),
  birthDate: z.string().min(1, 'Datum narození je povinné'),
  phone: z.string().min(1, 'Telefon je povinný'),
})