import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import CustomTextField from './CustomTextField'

const InputPassword = ({ register }) => {
    const [showPassword, setshowPassword] = useState(false)
    const handleClickShowPassword = () => setshowPassword(!showPassword)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    return (
        <CustomTextField
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            label="Contraseña"
            register={register}
            type={showPassword ? 'text' : 'password'}
        />
    )
}

export default InputPassword
