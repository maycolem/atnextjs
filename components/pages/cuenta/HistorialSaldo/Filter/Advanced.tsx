import { Button, Checkbox, Divider, FormControlLabel, MenuItem, Select, FormGroup, TextField, Collapse } from '@mui/material'
import hexAlpha from 'hex-alpha'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { delay } from '@helpers/delay'
import { FilterDate } from './FilterDate'
import { FilterIdMovement } from './FilterIdMovement'

interface Items {
    value: string
    descripcion: string
    filter?: string
}
interface HandleClickProps {
    method: string
    type: string
    operation: string
    dateObj: {
        init: string
        end: string
    }
}
interface Props {
    types: Items[]
    methods: Items[]
    setCountChekedFilter: React.Dispatch<React.SetStateAction<number>>
    handleClick?: (value: string, obj?: HandleClickProps) => void
    open: boolean
    setOpenModalAdvanced: React.Dispatch<React.SetStateAction<boolean>>
}
export const Advanced = ({ open, setOpenModalAdvanced, types, setCountChekedFilter, methods, handleClick }: Props) => {
    const [openModal, setOpenModal] = useState(false)

    const [checkType, setCheckType] = useState(false)
    const [checkFecha, setCheckFecha] = useState(false)
    const [checkMethod, setCheckMethod] = useState(false)
    const [checkIdMovement, setCheckIdMovement] = useState(false)

    const [method, setMethod] = useState('')
    const [type, setType] = useState('')
    const [operation, setOperation] = useState('')
    const [dateObj, setDateObj] = useState({
        init: '',
        end: '',
    })

    console.log(methods)
    console.log(types)

    const handleChangeType = (event) => {
        setType(event.target.value)
    }
    const handleChangeMethod = (event) => {
        setMethod(event.target.value)
    }
    useEffect(() => {
        if (open) {
            delay(100).then(() => {
                setOpenModal(open)
            })
        }
        setOpenModal(false)
    }, [open])

    useEffect(() => {
        const result = [checkFecha, checkType, checkMethod, checkIdMovement].filter((item) => item)
        setCountChekedFilter(result.length)
    }, [checkFecha, checkType, checkMethod, checkIdMovement])

    useEffect(() => {
        if (!checkFecha) {
            setDateObj({
                init: '',
                end: '',
            })
        }

        setType(checkType ? type || types[0].value : '')
        setMethod(checkMethod ? method || methods[0].value : '')
        setOperation(checkIdMovement ? operation || '' : '')
    }, [checkFecha, checkType, checkMethod, checkIdMovement])

    const handleResetCheckeds = () => {
        setCheckType(false)
        setCheckFecha(false)
        setCheckMethod(false)
        setCheckIdMovement(false)
    }

    const handleSubmit = () => {
        handleClick('CUSTOM_FILTER', { dateObj, type, method, operation })
        setOpenModalAdvanced(false)
    }

    return (
        <StyledModal className={classNames({ open: open })}>
            <StyledModalTop>
                <StyledButtonModal
                    onClick={handleResetCheckeds}
                    disableElevation
                    disableTouchRipple
                    disableFocusRipple
                    disableRipple
                    variant="contained"
                    color="light"
                >
                    Borrar
                </StyledButtonModal>
                <StyledTitle>Filtros</StyledTitle>
                <StyledButtonModal
                    disableElevation
                    disableTouchRipple
                    disableFocusRipple
                    disableRipple
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classNames('listo', { open: openModal })}
                >
                    Listo
                </StyledButtonModal>
            </StyledModalTop>
            <Divider />
            <Collapse in={openModal}>
                <StyledFormGroup>
                    <FilterDate setDateObj={setDateObj} checkFecha={checkFecha} setCheckFecha={setCheckFecha} />
                    {types.length > 1 ? (
                        <>
                            <Divider />
                            <StyledFormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => {
                                            setCheckType(e.target.checked)
                                        }}
                                        checked={checkType}
                                        disableRipple
                                        disableTouchRipple
                                        disableFocusRipple
                                    />
                                }
                                label="Tipo de movimiento"
                            />
                            <Collapse in={checkType}>
                                <ContentFilterByItem>
                                    <StyledSelect
                                        size="small"
                                        fullWidth
                                        value={type}
                                        onChange={handleChangeType}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {types.map((item, i) => (
                                            <StyledMenuItem key={i} value={item.value}>
                                                {item.descripcion}
                                            </StyledMenuItem>
                                        ))}
                                    </StyledSelect>
                                </ContentFilterByItem>
                            </Collapse>
                        </>
                    ) : null}
                    {methods.length > 1 ? (
                        <>
                            <Divider />
                            <StyledFormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => {
                                            setCheckMethod(e.target.checked)
                                        }}
                                        checked={checkMethod}
                                        disableRipple
                                        disableTouchRipple
                                        disableFocusRipple
                                    />
                                }
                                label="Método"
                            />
                            <Collapse in={checkMethod}>
                                <ContentFilterByItem>
                                    <StyledSelect
                                        size="small"
                                        fullWidth
                                        value={method}
                                        onChange={handleChangeMethod}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {methods.map((item, i) => (
                                            <StyledMenuItem key={i} value={item.value}>
                                                {item.descripcion}
                                            </StyledMenuItem>
                                        ))}
                                    </StyledSelect>
                                </ContentFilterByItem>
                            </Collapse>
                        </>
                    ) : null}

                    <Divider />
                    <FilterIdMovement
                        operation={operation}
                        setOperation={setOperation}
                        checkIdMovement={checkIdMovement}
                        setCheckIdMovement={setCheckIdMovement}
                    />
                </StyledFormGroup>
            </Collapse>
        </StyledModal>
    )
}

const StyledTitle = styled.p`
    font-weight: 500;
    font-size: 1rem;
`

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        padding: 0px 10px;
        span {
            font-size: 0.95rem;
        }
        svg {
            color: ${(p) => p.theme.palette.alternate8.main};
        }
        .Mui-checked svg {
            color: ${(p) => p.theme.palette.primary.main};
        }
    }
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
const StyledMenuItem = styled(MenuItem)`
    && {
        line-height: initial;
        min-height: auto;
        font-size: 0.95rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`
const StyledButtonModal = styled(Button)`
    && {
        text-transform: capitalize;
        box-shadow: initial;
        padding: 2px 10px;
        min-width: initial;
        border-radius: 8px;
        border: 1px solid #c5c5c5;
        transition: 150ms all linear 250ms;
        &.listo.open {
            outline: 3px solid ${(p) => hexAlpha(p.theme.palette.primary.main, 0.2)};
        }
    }
`
const StyledModalTop = styled.div`
    background: ${(p) => p.theme.palette.alternate4.main};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
`
const ContentFilterByItem = styled.div`
    background: ${(p) => p.theme.palette.alternate4.main};
    padding: 15px 10px;
`

const StyledModal = styled.div`
    border-radius: 8px;
    overflow: hidden;
    background: white;
    position: absolute;
    z-index: 10;
    height: auto;
    left: 14px;
    top: 45px;
    max-width: 280px;
    min-width: 280px;
    box-shadow: 0 0 0 1px #8898aa1a, 0 15px 35px #31315d1a, 0 5px 15px #00000014;
    font-size: 0.95rem;
    transition: 100ms;
    opacity: 0;
    pointer-events: none;
    &.open {
        opacity: 1;
        pointer-events: initial;
    }
`
const StyledFormGroup = styled(FormGroup)`
    && {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        animation-duration: 0.5s;
        transition-delay: 150ms;
        animation-iteration-count: 1;
        animation-fill-mode: both;
        transition: all 200ms linear 100ms;
    }
`
