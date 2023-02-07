import React, { useEffect } from 'react'
import { MenuItem, Select, TextField } from '@mui/material'
import styled from 'styled-components'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import esLocale from 'date-fns/locale/es'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { isValid } from 'date-fns'

interface Props {
    setDateObj: React.Dispatch<
        React.SetStateAction<{
            init: string
            end: string
        }>
    >
}

export const EsIgualA = ({ setDateObj }: Props) => {
    const [datePicker, setValueDatePicker] = React.useState(null)

    useEffect(() => {
        if (isValid(datePicker)) {
            const year = new Date(datePicker).getFullYear()
            if (year > 1900) {
                const current = new Date(datePicker)
                const init = new Date(datePicker).toLocaleDateString('es-ES')
                const end = new Date(datePicker).toLocaleDateString('es-ES')
                const formatInit = init.split('/').reverse().join('-')
                const formatEnd = end.split('/').reverse().join('-')
                // const init = new Date('2022-12-31 23:30:00')
                // const end = new Date('2023-01-01 00:30:00')
                setDateObj({
                    init: `${formatInit} 00:00:00`,
                    end: `${formatEnd} 23:59:59`,
                })
            }
        }
    }, [datePicker])

    return (
        <StyledFilterDateContent>
            <SubdirectoryArrowRightIcon color="error" />
            <LocalizationProvider adapterLocale={esLocale} dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    disableFuture
                    disableHighlightToday
                    inputFormat="dd/MM/yyyy"
                    label=""
                    onChange={setValueDatePicker}
                    renderInput={(params) => {
                        return (
                            <StyledTextField
                                inputProps={{
                                    placeholder: 'dd/mm/yyyy',
                                }}
                                {...params}
                            />
                        )
                    }}
                    value={datePicker}
                />
            </LocalizationProvider>
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
