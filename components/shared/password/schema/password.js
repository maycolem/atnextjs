/* eslint-disable camelcase */
import * as yup from 'yup'
import { setLocale } from 'yup'

setLocale({
  mixed: {
    required: 'Requerido',
  },
  string: {
    email: 'Email Invalido',
  },
})
export const PasswordSchema = yup
  .object({
    email: yup.string().trim('El campo email no debe tener espacios en blanco.').required().email('Email inválido.'),
  })
  .required()
