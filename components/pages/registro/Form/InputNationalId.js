import { CircularProgress, InputAdornment } from '@mui/material'
import React from 'react'
import CustomTextField from './CustomTextField'

const InputNationalId = ({ disabled, register, loadingEndAdornment, nationalIdType }) => {
    const handleMaxLengtthNationalId = (type) => {
        if (type === 'DNI') {
            return 8
        }
        if (type === 'CARNET_EXTRANJERIA') {
            return 12
        }
        if (type === 'PASAPORTE') {
            return 12
        }
    }
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
            inputProps={{
                maxLength: handleMaxLengtthNationalId(nationalIdType),
            }}
            label="Número de documento"
            register={register}
        />
    )
}

export default InputNationalId
