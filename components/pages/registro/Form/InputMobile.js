import React from 'react'
import CustomTextField from './CustomTextField'

const InputMobile = ({ disabled, register }) => {
    return (
        <CustomTextField
            disabled={disabled}
            inputProps={{
                maxLength: 9,
            }}
            label="Celular"
            onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault()
                }
            }}
            register={register}
        />
    );
}

export default InputMobile
