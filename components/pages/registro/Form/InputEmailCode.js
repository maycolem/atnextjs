import React from 'react'
import styled from 'styled-components'
import CustomTextField from './CustomTextField'

const InputEmailCode = ({ register }) => {
    return (
        <CustomTextField
            inputProps={{
                maxLength: 6,
            }}
            label="Codigo"
            onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault()
                }
            }}
            register={register}
        />
    )
}

export default InputEmailCode
