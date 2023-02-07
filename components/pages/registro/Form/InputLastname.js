import React from 'react'
import CustomTextField from './CustomTextField'

const InputLastname = ({ disabled, register, label }) => {
    return <CustomTextField disabled={disabled} label={label} register={register}></CustomTextField>
}

export default InputLastname
