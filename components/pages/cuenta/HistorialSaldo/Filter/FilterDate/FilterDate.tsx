import { Checkbox, Collapse, FormControlLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import { EstaEnLosUltimosDias } from './EstaEnLosUltimosDias'
import { EsIgualA } from './EsIgualA'
import { Entre } from './Entre'
import { EsPosteriorA } from './EsPosteriorA'
import { EnEsaFechODespues } from './EnEsaFechODespues'
import { EsAnteriorA } from './EsAnteriorA'
import { EsAnteriorOIgualA } from './EsAnteriorOIgualA'

interface Props {
    setDateObj: React.Dispatch<
        React.SetStateAction<{
            init: string
            end: string
        }>
    >
    setCheckFecha: React.Dispatch<React.SetStateAction<boolean>>
    checkFecha: boolean
}

export const FilterDate = ({ checkFecha, setCheckFecha, setDateObj }: Props) => {
    const [type, setType] = useState('ESTA_EN_LOS_ULTIMOS')

    const items = [
        {
            value: 'ESTA_EN_LOS_ULTIMOS',
            description: 'esta en los últimos',
        },
        {
            value: 'ES_IGUAL_A',
            description: 'es igual a',
        },
        {
            value: 'ENTRE',
            description: 'entre',
        },
        {
            value: 'ES_POSTERIOR_A',
            description: 'es posterior a',
        },
        {
            value: 'EN_ESA_FECHA_O_DESPUES',
            description: 'en esa fecha o después',
        },
        {
            value: 'ES_ANTERIOR_A',
            description: 'es anterior a',
        },
        {
            value: 'ES_ANTERIOR_O_IGUAL_A',
            description: 'es anterior o igual a',
        },
    ]

    const handleChangeType = (event) => {
        setDateObj({ end: '', init: '' })
        setType(event.target.value)
    }

    return (
        <>
            <StyledFormControlLabel
                control={
                    <Checkbox
                        onChange={(e) => {
                            setCheckFecha(e.target.checked)
                        }}
                        checked={checkFecha}
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                    />
                }
                label="Fecha"
            />
            <Collapse in={checkFecha} unmountOnExit>
                <ContentFilterByItem>
                    <StyledSelect
                        size="small"
                        fullWidth
                        value={type}
                        onChange={handleChangeType}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {items.map((item, i) => (
                            <StyledMenuItem key={i} value={item.value}>
                                {item.description}
                            </StyledMenuItem>
                        ))}
                    </StyledSelect>
                    {type === 'ESTA_EN_LOS_ULTIMOS' ? <EstaEnLosUltimosDias setDateObj={setDateObj} /> : null}
                    {type === 'ES_IGUAL_A' ? <EsIgualA setDateObj={setDateObj} /> : null}
                    {type === 'ENTRE' ? <Entre setDateObj={setDateObj} /> : null}
                    {type === 'ES_POSTERIOR_A' ? <EsPosteriorA setDateObj={setDateObj} /> : null}
                    {type === 'EN_ESA_FECHA_O_DESPUES' ? <EnEsaFechODespues setDateObj={setDateObj} /> : null}
                    {type === 'ES_ANTERIOR_A' ? <EsAnteriorA setDateObj={setDateObj} /> : null}
                    {type === 'ES_ANTERIOR_O_IGUAL_A' ? <EsAnteriorOIgualA setDateObj={setDateObj} /> : null}
                </ContentFilterByItem>
            </Collapse>
        </>
    )
}

const StyledMenuItem = styled(MenuItem)`
    && {
        line-height: initial;
        min-height: auto;
        font-size: 0.95rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`
const ContentFilterByItem = styled.div`
    background: ${(p) => p.theme.palette.alternate4.main};
    padding: 15px 10px;
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
