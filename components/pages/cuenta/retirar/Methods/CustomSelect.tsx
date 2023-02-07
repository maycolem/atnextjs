import { MenuItem, Select, SelectProps } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

interface Props extends SelectProps {
    register: any
    items: any[]
    maxHeight?: number
    itemKeyValue?: string
    itemsKeyLabel?: string | ((item: any) => any)
    disabled?: boolean
}

export const CustomSelect = ({
    defaultValue = '',
    label,
    register,
    size = 'small',
    items = [],
    maxHeight = 400,
    itemKeyValue = 'value',
    itemsKeyLabel = 'label',
    disabled = false,
    renderValue,
}: Props) => {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight,
            },
        },
    }

    const labelText = (item) => {
        if (typeof itemsKeyLabel === 'string') {
            return item[itemsKeyLabel]
        }
        return itemsKeyLabel(item)
    }

    return (
        <StyledSelect
            fullWidth
            MenuProps={MenuProps}
            defaultValue={defaultValue}
            disabled={disabled}
            label={label}
            size={size}
            renderValue={renderValue}
            {...register}
        >
            {items.map((item, i) => (
                <StyledMenuItem key={i} value={item[itemKeyValue]}>
                    {/* {item[itemsKeyLabel]} */}
                    {labelText(item)}
                </StyledMenuItem>
            ))}
        </StyledSelect>
    )
}

const StyledSelect = styled(Select)`
    && {
        svg {
            font-size: 1.5rem !important;
        }
    }
`
const StyledMenuItem = styled(MenuItem)`
    && {
        white-space: initial;
        min-height: 2rem;
        font-size: 1rem;
    }
`
