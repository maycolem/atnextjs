import { MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import { format } from 'date-fns'

interface Props {
    setDateObj: React.Dispatch<
        React.SetStateAction<{
            init: string
            end: string
        }>
    >
}

export const EstaEnLosUltimosDias = ({ setDateObj }: Props) => {
    const [typeDate, setTypeDate] = useState('DIAS')
    const [valueText, setValueText] = useState('1')

    const handleChangeType = (event) => {
        setTypeDate(event.target.value)
    }

    useEffect(() => {
        const current = new Date()
        if (typeDate === 'DIAS') {
            const init = new Date(current.setDate(current.getDate() - Number(valueText))).toLocaleDateString('es-ES')
            const formatInit = init.split('/').reverse().join('-')
            setDateObj({
                init: `${formatInit} 00:00:00`,
                end: '',
            })
        }
        if (typeDate === 'MESES') {
            const init = new Date(current.setMonth(current.getMonth() - Number(valueText))).toLocaleDateString('es-ES')
            const formatInit = init.split('/').reverse().join('-')
            setDateObj({
                init: `${formatInit} 00:00:00`,
                end: '',
            })
        }
    }, [valueText, typeDate])

    return (
        <StyledFilterDateContent>
            <SubdirectoryArrowRightIcon color="error" />
            <StyledTextField
                hiddenLabel
                value={valueText}
                onChange={(e) => {
                    setValueText(e.target.value)
                }}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault()
                    }
                }}
            />
            <StyledSelect
                size="small"
                value={typeDate}
                onChange={handleChangeType}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <StyledMenuItem value={'DIAS'}>días</StyledMenuItem>
                <StyledMenuItem value={'MESES'}>meses</StyledMenuItem>
            </StyledSelect>
        </StyledFilterDateContent>
    )
}
const StyledTextField = styled(TextField)`
    && {
        &.MuiFormControl-root {
            background: white;
            flex: 0.7;
        }
        &.MuiFormControl-root > .MuiInputBase-root {
            line-height: 1;
        }
        &.MuiFormControl-root input {
            min-height: auto;
            line-height: 1;
            font-size: 0.85rem;
            padding: 7px 14px;
            padding-right: 0;
            height: auto;
            font-family: Rubik;
            font-feature-settings: 'tnum';
        }
        &.MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root {
            margin-left: 0;
            svg {
                width: 0.9rem;
                height: 0.9rem;
            }
        }
        fieldset {
            top: 0;
            legend {
                font-size: 0px;
                line-height: 0;
            }
        }
    }
`
const StyledMenuItem = styled(MenuItem)`
    && {
        line-height: initial;
        min-height: auto;
        font-size: 0.95rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`
const StyledFilterDateContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 5px;
    padding-top: 10px;
`
const StyledSelect = styled(Select)`
    && {
        &.MuiInputBase-root {
            background: white;
            min-width: 100px;
        }
        &.MuiInputBase-root > .MuiSelect-select {
            min-height: auto;
            line-height: 1;
            font-size: 0.95rem;
            height: auto;
        }
        fieldset {
            top: 0;
            legend {
                font-size: 0px;
                line-height: 0;
            }
        }
    }
`
