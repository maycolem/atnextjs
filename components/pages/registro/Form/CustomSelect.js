import { MenuItem, Select } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const CustomSelect = ({
    defaultValue = '',
    label,
    register,
    size = 'small',
    items = [],
    maxHeight = 400,
    itemKeyValue = 'value',
    itemsKeyLabel = 'label',
    disabled,
}) => {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight,
            },
        },
    }

    return (
        <StyledSelect MenuProps={MenuProps} defaultValue={defaultValue} disabled={disabled} label={label} {...register} size={size}>
            {items.map((item, i) => (
                <StyledMenuItem key={i} value={item[itemKeyValue]}>
                    {item[itemsKeyLabel]}
                </StyledMenuItem>
            ))}
        </StyledSelect>
    )
}

export default CustomSelect
const StyledSelect = styled(Select)`
    & {
        svg {
            font-size: 1.5rem !important;
        }
    }
`
const StyledMenuItem = styled(MenuItem)`
    && {
        min-height: 2rem;
        font-size: 1rem;
    }
`
