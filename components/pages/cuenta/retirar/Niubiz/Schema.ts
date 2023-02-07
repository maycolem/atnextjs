/* eslint-disable camelcase */
import * as yup from 'yup'
import { setLocale } from 'yup'
setLocale({
    mixed: {
        required: 'Requerido',
    },
})
export const Schema = yup
    .object({
        amount: yup.string().required(),
    })
    .required()
