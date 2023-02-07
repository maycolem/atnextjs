/* eslint-disable camelcase */
import * as yup from 'yup'
import { setLocale } from 'yup'
import YupPassword from 'yup-password'
import 'yup-phone'
YupPassword(yup)
setLocale({
  mixed: {
    required: 'Requerido',
  },
  string: {
    email: 'Email invalido',
  },
})
export const LoginSchema = yup
  .object({ username: yup.string().required(), password: yup.string().required() })
  .required()
