import { Button, Checkbox, Divider, FormControlLabel, MenuItem, Select, FormGroup, TextField, Collapse } from '@mui/material'
import hexAlpha from 'hex-alpha'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import classNames from 'classnames'
import { delay } from '@helpers/delay'
import { FilterDate } from './FilterDate'
import { FilterIdMovement } from './FilterIdMovement'
import { useTranslation } from 'react-i18next'

interface Items {
    value: string
    descripcion: string
    filter?: string
}
interface HandleClickProps {
    status: string
    method: string
    operation: string
    dateObj: {
        init: string
        end: string
    }
}
interface Props {
    methods: Items[]
    statusData: Items[]
    setCountChekedFilter: React.Dispatch<React.SetStateAction<number>>
    handleClick?: (value: string, obj?: HandleClickProps) => void
    open: boolean
    setOpenModalAdvanced: React.Dispatch<React.SetStateAction<boolean>>
}
export const Advanced = ({ open, setOpenModalAdvanced, methods, setCountChekedFilter, statusData, handleClick }: Props) => {
    const { t } = useTranslation()

    const [openModal, setOpenModal] = useState(false)

    const [checkFecha, setCheckFecha] = useState(false)
    const [checkMethod, setCheckMethod] = useState(false)
    const [checkStatus, setCheckStatus] = useState(false)
    const [checkIdMovement, setCheckIdMovement] = useState(false)

    const [status, setStatus] = useState('')
    const [operation, setOperation] = useState('')
    const [method, setMethod] = useState('')
    const [dateObj, setDateObj] = useState({
        init: '',
        end: '',
    })

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
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
        const result = [checkFecha, checkMethod, checkStatus, checkIdMovement].filter((item) => item)
        setCountChekedFilter(result.length)
    }, [checkFecha, checkMethod, checkStatus, checkIdMovement])

    useEffect(() => {
        if (!checkFecha) {
            setDateObj({
                init: '',
                end: '',
            })
        }

        setMethod(checkMethod ? method || methods[0].value : '')
        setStatus(checkStatus ? status || statusData[0].value : '')
        setOperation(checkIdMovement ? operation || '' : '')
    }, [checkFecha, checkMethod, checkStatus, checkIdMovement])

    const handleResetCheckeds = () => {
        setCheckMethod(false)
        setCheckFecha(false)
        setCheckStatus(false)
        setCheckIdMovement(false)
    }

    const handleSubmit = () => {
        handleClick('CUSTOM_FILTER', { dateObj, method, status, operation })
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
                        label="Medio de pago"
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
                                        {t(item.descripcion)}
                                    </StyledMenuItem>
                                ))}
                            </StyledSelect>
                        </ContentFilterByItem>
                    </Collapse>
                    <Divider />
                    <StyledFormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    setCheckStatus(e.target.checked)
                                }}
                                checked={checkStatus}
                                disableRipple
                                disableTouchRipple
                                disableFocusRipple
                            />
                        }
                        label="Estado"
                    />
                    <Collapse in={checkStatus}>
                        <ContentFilterByItem>
                            <StyledSelect
                                size="small"
                                fullWidth
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {statusData.map((item, i) => (
                                    <StyledMenuItem key={i} value={item.value}>
                                        {t(item.descripcion)}
                                    </StyledMenuItem>
                                ))}
                            </StyledSelect>
                        </ContentFilterByItem>
                    </Collapse>
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
