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
export const Entre = ({ setDateObj }: Props) => {
    const [initDatePicker, setValueInitDatePicker] = React.useState(null)
    const [endDatePicker, setValueEndDatePicker] = React.useState(null)

    useEffect(() => {
        if (isValid(initDatePicker) && isValid(endDatePicker)) {
            const currentEnd = new Date(endDatePicker)
            const init = new Date(initDatePicker)
            const end = new Date(new Date(currentEnd.setDate(currentEnd.getDate() + 1)))
            if (init.getFullYear() > 1900 && end.getFullYear() > 1900) {
                const formatInit = init.toLocaleDateString('es-ES').split('/').reverse().join('-')
                const formatEnd = end.toLocaleDateString('es-ES').split('/').reverse().join('-')
                // const init = new Date('2022-12-31 23:30:00')
                // const end = new Date('2023-01-01 00:30:00')
                setDateObj({
                    init: `${formatInit} 00:00:00`,
                    end: `${formatEnd} 00:00:00`,
                })
            }
        }
    }, [initDatePicker, endDatePicker])

    return (
        <StyledFilterDateContent>
            <LocalizationProvider adapterLocale={esLocale} dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    disableFuture
                    disableHighlightToday
                    inputFormat="dd/MM/yyyy"
                    label=""
                    onChange={setValueInitDatePicker}
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
                    value={initDatePicker}
                />
            </LocalizationProvider>
            <LocalizationProvider adapterLocale={esLocale} dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    disableFuture
                    disableHighlightToday
                    inputFormat="dd/MM/yyyy"
                    label=""
                    onChange={setValueEndDatePicker}
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
                    value={endDatePicker}
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

const StyledFilterDateContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 5px;
    padding-top: 10px;
`

