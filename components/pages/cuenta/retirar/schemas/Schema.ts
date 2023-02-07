/* eslint-disable camelcase */
import * as yup from 'yup'
import 'yup-phone'

export const SchemaRetiroNewAccount = () => {
    const yupValidateObj = {
        cci: yup
            .string()
            .matches(/^[0-9]*[.,]?[0-9]*$/, 'Ingrese numero CCI valido')
            .length(20, 'El campo debe tener 20 digitos')
            .required('Ingrese numero CCI*'),
        account_type: yup.string().required(),
        num_doc: yup.string().required(),
        bank_name: yup.string().required(),
        name_account: yup.string(),
        account_number: yup.string().required('Ingrese numero de cuenta bancaria'),
        amount: yup.number().required(),
    }

    return yup.object(yupValidateObj).required()
}

export const SchemaRetiroSelectAccount = () => {
    const yupValidateObj = {
        bankId: yup.string().required(),
        amount: yup.number().required(),
        account_number: yup.string(),
        bank_name: yup.string(),
    }

    return yup.object(yupValidateObj).required()
}
