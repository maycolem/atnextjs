import { TextField, TextFieldProps } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

type RetiroFormValues = {
    cci: string
    account_type: string
    num_doc: string
    bank_name: string
    account_number: string
    name_account: string
}
interface BaseProps extends PropsWithChildren {
    register: any
    inputProps?: React.HTMLProps<HTMLInputElement>
}
type Props = TextFieldProps & BaseProps

export const CustomTextField = ({ children, disabled, label, inputProps, register, ...rest }: Props) => {
    return (
        <Styled {...rest} {...register} inputProps={inputProps} disabled={disabled} label={label}>
            {children}
        </Styled>
    )
}

const Styled = styled(TextField)`
    && {
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px white inset;
        }

        input:-webkit-autofill:focus {
            -webkit-box-shadow: #494952 0 0 0 50px white inset;
            -webkit-text-fill-color: #494952;
        }
        /* color: #494952; */
        /* -webkit-text-fill-color: #494952 !important; */
        svg {
            font-size: 1rem !important;
        }
        */ input:disabled {
            /* background: #fbfbfb; */
            cursor: not-allowed;
        }
        label.Mui-disabled {
            opacity: 0.5;
        }
    }
`
