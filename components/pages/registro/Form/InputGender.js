import { InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CustomSelect from './CustomSelect'

const InputGender = ({ register }) => {
    const items = [
        {
            value: 'MALE',
            label: 'Masculino',
        },
        {
            value: 'FEMALE',
            label: 'Femenino',
        },
    ]
    return (
        <>
            <div style={{ position: 'relative' }}>
                <InputLabel>Género</InputLabel>
                <CustomSelect items={items} label="Género" register={register} />
            </div>
        </>
    )
}

export default InputGender
