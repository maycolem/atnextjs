import styled from '@emotion/styled'
import { ErrorMessage } from '@hookform/error-message'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { PATHS } from 'routes/paths/PATHS'

const RegisterControlsTerm = ({ register, getFirstError }) => {
    return (
        <FormControl>
            <FormControlLabelCheckBoxStyled
                control={<CheckboxStyled {...register('terms_and_Conditions')} />}
                label={
                    <PoliciesStyled>
                        Soy mayor de 18 años y estoy de acuerdo con el{' '}
                        <Link href={PATHS.REGLAMENTO_DEL_JUEGO.url} target="_blank">
                            <span>{PATHS.REGLAMENTO_DEL_JUEGO.name}</span>
                        </Link>{' '}
                        &{' '}
                        <Link href={PATHS.POLITICAS_DE_PRIVACIDAD.url} target="_blank">
                            <span>Políticas de Privacidad</span>
                        </Link>{' '}
                        de Apuesta Total.
                    </PoliciesStyled>
                }
            />
            <ErrorMessage
                errors={getFirstError()}
                name="terms_and_Conditions"
                render={({ message }) => <RegisterErrorStyled>{message}</RegisterErrorStyled>}
            />
        </FormControl>
    )
}

export default RegisterControlsTerm
const PoliciesStyled = styled('p')`
    color: #7d7e8f;
    color: #494952;
    font-size: 0.85rem;
    cursor: pointer;
    position: relative;
    top: 10%;
    padding: 9px 0;
    & {
        span {
            color: ${(p) => p.theme.palette.dark.main};
            transition: 250ms;
            font-weight: 500;
            :hover {
                color: ${(p) => p.theme.palette.primary.main};
            }
        }
    }
`
const CheckboxStyled = styled(Checkbox)`
    /* padding-top: 0; */

    svg {
        font-size: 1.4rem;
    }
`
const FormControlLabelCheckBoxStyled = styled(FormControlLabel)`
    && {
        align-items: flex-start;
        span.MuiCheckbox-root {
            /* bottom: 0.5em; */
        }

        .MuiCheckbox-root {
            position: relative;
        }
        .MuiTypography-root {
            font-size: inherit;
        }
    }
`
const RegisterErrorStyled = styled('p')`
    font-size: 0.7em;
    margin-left: 1rem;
    color: ${(p) => p.theme.palette.primary.main};
    animation-name: fadeLeft;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    position: relative;
    @keyframes fadeLeft {
        from {
            bottom: -5px;
            opacity: 0;
        }
        to {
            bottom: 0;
        }
    }
`
