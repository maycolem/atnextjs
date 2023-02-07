import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { Button, Divider } from '@mui/material'
import styled from 'styled-components'
import classNames from 'classnames'

export const ButtonAdvanced = ({ countChekedFilter, setActiveButton, activeButton, setOpenModalAdvanced, openModalAdvanced }) => {
    return (
        <StyledButton
            variant="contained"
            color={activeButton === 'CUSTOM_FILTER' ? 'primary' : 'alternate4'}
            onClick={() => {
                setActiveButton('CUSTOM_FILTER')
                setOpenModalAdvanced(!openModalAdvanced)
            }}
        >
            <div>
                <FilterAltIcon /> <span>Filtrar</span>
                {countChekedFilter > 0 ? (
                    <>
                        <StyledDivider2
                            className={classNames({ active: activeButton === 'CUSTOM_FILTER' })}
                            orientation="vertical"
                            flexItem
                            variant="middle"
                        />
                        <span className={classNames({ active: activeButton === 'CUSTOM_FILTER' })}>{countChekedFilter}</span>
                    </>
                ) : null}
            </div>
        </StyledButton>
    )
}
const StyledDivider2 = styled(Divider)`
    && {
        margin-left: 8px;
        margin-right: 8px;
        margin-top: 6px;
        margin-bottom: 6px;
        &.active {
            border-color: ${(p) => p.theme.palette.light.main};
        }
    }
`
const StyledButton = styled(Button)`
    && {
        border-radius: 10px;
        white-space: nowrap;
        box-shadow: none;
        text-transform: initial;
        font-weight: 400;
        font-size: 0.95rem;
        transition: 250ms;
        width: max-content;
        border: 1px solid transparent;
        display: block;
        min-width: initial;
        padding: 5px 10px;
        position: relative;
        &:not(.MuiButton-containedPrimary) {
            border: 1px solid #ebebeb;
        }

        &:hover:not(.MuiButton-containedPrimary) {
            box-shadow: none;
        }
        &:focus {
            box-shadow: none;
        }
        > div {
            display: flex;
            align-items: center;
        }
        span.active {
            color: ${(p) => p.theme.palette.light.main};
            font-weight: 500;
        }
    }
`
