import { CircularProgress, InputAdornment } from '@mui/material'
import React from 'react'
import CustomTextField from './CustomTextField'

const InputEmail = ({ disabled, register, loadingEndAdornment }) => {
    return (
        <CustomTextField
            InputProps={{
                endAdornment: loadingEndAdornment ? (
                    <InputAdornment
                        position="end"
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress color="alternate7" size={11} />
                    </InputAdornment>
                ) : (
                    <div></div>
                ),
            }}
            disabled={disabled}
            label="Correo electrónico (te enviaremos un codigo)"
            register={register}
        />
    )
}

export default InputEmail
