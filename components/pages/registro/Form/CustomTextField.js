import { TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const CustomTextField = ({ children, disabled, label, InputProps, register, ...rest }) => {
    return (
        <Styled {...rest} {...register} InputProps={InputProps} disabled={disabled} label={label}>
            {children}
        </Styled>
    )
}

export default CustomTextField
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
        legend {
            font-size: 0.7rem;
        }
        input:disabled {
            /* background: #fbfbfb; */
            cursor: not-allowed;
        }
        label.Mui-disabled {
            opacity: 0.5;
        }
    }
`
