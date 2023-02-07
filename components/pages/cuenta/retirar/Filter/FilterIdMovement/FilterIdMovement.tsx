import { Checkbox, Collapse, FormControlLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'

export const FilterIdMovement = ({ checkIdMovement, setCheckIdMovement, operation, setOperation }) => {
    return (
        <>
            <StyledFormControlLabel
                control={
                    <Checkbox
                        onChange={(e) => {
                            setCheckIdMovement(e.target.checked)
                        }}
                        checked={checkIdMovement}
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                    />
                }
                label="ID"
            />
            <Collapse in={checkIdMovement}>
                <ContentFilterByItem>
                    <StyledTextField
                        hiddenLabel
                        value={operation}
                        onChange={(e) => {
                            setOperation(e.target.value)
                        }}
                        fullWidth
                        placeholder="ej. 65220734"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                    />
                </ContentFilterByItem>
            </Collapse>
        </>
    )
}
const StyledTextField = styled(TextField)`
    && {
        &.MuiFormControl-root {
            background: white;
            flex: 1;
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
