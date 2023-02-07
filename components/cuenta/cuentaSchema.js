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
export const SchemaCuenta = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .password()
      .min(8, 'Minimo 8 caracteres')
      .minUppercase(1, 'Almenos 1 letra mayuscula')
      .minLowercase(1, 'Almenos 1 letras minuscula')
      .minNumbers(1, 'Almenos un numero')
      .minSymbols(0),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required(),
    gender: yup.string().required(),
    national_id_type: yup.string().required(),
    national_id: yup
      .string()
      .required()
      .when('national_id_type', (national_id_type, schema) => {
        if (national_id_type === 'DNI') {
          return yup.string().length(8, 'El campo debe tener 8 digitos').required()
        }
        if (national_id_type === 'CARNET_EXTRANJERIA') {
          return yup.string().length(12, 'El campo debe tener 12 digitos').required()
        }
        if (national_id_type === 'PASAPORTE') {
          return yup.string().length(12, 'El campo debe tener 12 digitos').required()
        }
      }),
    birthday: yup.string().required(),
    firstname: yup
      .string()
      .required()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÉÍÓÚÑäëïöüÄËÏÖÜ.'\- ]+$/,
        'Los datos ingresados son incorrectos no puedes utilizar números o simbolos intenta con textos y letras'
      ),
    lastname: yup
      .string()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÉÍÓÚÑäëïöüÄËÏÖÜ.'\- ]+$/,
        'Los datos ingresados son incorrectos no puedes utilizar números o simbolos intenta con textos y letras'
      )
      //   .matches(
      //     /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
      //     'Solo debe contener letras'
      //   )
      .required(),
    mobile: yup.string().phone('Pe', null, 'Numero no valido').required(),
    country: yup.string().required(),
    state: yup.string().required(),
    province: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    promotion: yup.string().min(0),
    mobile_code: yup.string().length(6, 'Cogido de 6 digitos').required(),
    email_code: yup.string().length(6, 'Cogido de 6 digitos').required(),
    terms_and_Conditions: yup.boolean().isTrue('Aceptar las politicas de privacidad').required(),
  })
  .required()
