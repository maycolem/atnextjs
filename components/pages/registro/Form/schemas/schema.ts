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
interface Props {
    withAgentShop?: boolean
}
export const SchemaRegister = ({ withAgentShop = false }: Props) => {
    const yupValidateObj = {
        email: yup.string().email().required(),
        password: yup
            .string()
            .required()
            .password()
            .min(8, 'Minimo 8 caracteres')
            .minUppercase(1, 'Almenos 1 letra mayuscula')
            .minLowercase(1, 'Almenos 1 letras minuscula')
            .minNumbers(1, 'Almenos un numero')
            .minSymbols(0)
            .matches(/^[^&]*$/, 'La contraseña no debe tener la letra &'),
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
                    return yup
                        .string()
                        .length(8, 'El campo debe tener 8 digitos')
                        .required()
                        .matches(/^[0-9]+$/, 'Dni inválido')
                }
                if (national_id_type === 'CARNET_EXTRANJERIA') {
                    // return yup.string().length(12, 'El campo debe tener 12 digitos').required()
                    return yup.string().required()
                }
                if (national_id_type === 'PASAPORTE') {
                    // return yup.string().length(12, 'El campo debe tener 12 digitos').required()
                    return yup.string().required()
                }
            }),
        birthday: yup.string().required('La fecha es inválida'),
        firstname: yup
            .string()
            .required()
            .matches(
                /^[A-Za-záàâãéèêíïóôõöúçñÁÉÍÓÚÑäëïöüÄËÏÖÜ.'\- ]+$/,
                'Los datos ingresados son incorrectos no puedes utilizar números o simbolos intenta con textos y letras'
            ),

        lastname: yup
            .string()
            .required()
            .matches(
                /^[A-Za-záàâãéèêíïóôõöúçñÁÉÍÓÚÑäëïöüÄËÏÖÜ.'\- ]+$/,
                'Los datos ingresados son incorrectos no puedes utilizar números o simbolos intenta con textos y letras'
            ),

        mobile: yup.string().phone('Pe', null, 'Numero no valido').required(),
        country: yup.string().required(),
        state: yup.string().required(),
        province: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required(),
        promotion: yup.string().min(0),
        mobile_code: yup.string().length(6, 'Cogido de 6 digitos').matches(/^\d+$/, 'Solo se aceptan numeros').required(),
        email_code: yup.string().length(6, 'Cogido de 6 digitos').matches(/^\d+$/, 'Solo se aceptan numeros').required(),
        terms_and_Conditions: yup.boolean().isTrue('Aceptar las politicas de privacidad').required(),
    }
    if (withAgentShop) {
        yupValidateObj['agent_shop'] = yup.string().required()
        yupValidateObj['preferences'] = yup.array().of(yup.string())
    }
    return yup.object(yupValidateObj).required()
}
