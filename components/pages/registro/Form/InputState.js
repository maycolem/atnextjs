import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import { InputLabel, Select } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CustomSelect from './CustomSelect'

const InputState = ({ register, items = [], itemKeyValue, itemsKeyLabel, label, disabled = false, loading = false }) => {
    if (loading) {
        return (
            <div style={{ position: 'relative' }}>
                <StyledInputLabel disabled={disabled || loading}>{label}</StyledInputLabel>
                <Select
                    IconComponent={() => (
                        <div style={{ position: 'relative', padding: '0 10px' }}>
                            <LoadingDefault color="alternate7" loading={loading} minHeight="auto" size={15}></LoadingDefault>
                        </div>
                    )}
                    disabled={loading}
                    label={label}
                />
            </div>
        )
    }
    return (
        <>
            <div style={{ position: 'relative' }}>
                <StyledInputLabel disabled={disabled}>{label}</StyledInputLabel>
                <CustomSelect
                    disabled={disabled}
                    itemKeyValue={itemKeyValue}
                    items={items}
                    itemsKeyLabel={itemsKeyLabel}
                    label={label}
                    loading={loading}
                    register={register}
                />
            </div>
        </>
    )
}

export default InputState

const StyledInputLabel = styled(InputLabel)`
    && {
        &.Mui-disabled {
            opacity: 0.5;
        }
    }
`
