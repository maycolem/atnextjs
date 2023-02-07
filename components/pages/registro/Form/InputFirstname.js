import React from 'react'
import CustomTextField from './CustomTextField'

const InputFirstname = ({ disabled, register, label }) => {
    return <CustomTextField disabled={disabled} label={label} register={register}></CustomTextField>
}

export default InputFirstname
