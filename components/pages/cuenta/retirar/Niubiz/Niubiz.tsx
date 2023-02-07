import React from 'react'
import { currency } from '@helpers/currency'
import { Retiro } from '@interfaces/retiro'
import { LoadingButton } from '@mui/lab'
import { Alert, FormControl, FormHelperText, InputBase, InputLabel } from '@mui/material'
import styled from 'styled-components'
import visaIMG from '../assets/visa-icon_ok3.webp'
import { useAppSelector } from '@states/store'
import { userSelector } from '@states/features/slices/userSlice'
import { Iframe } from './Iframe'
import { BackMethodsLink } from '../BackMethodsLink'

interface Props {
    method: Retiro
}
interface FormValues {
    amount: string
}

export const Niubiz = ({ method }: Props) => {
    const user = useAppSelector(userSelector)

    return (
        <Styled>
            <StyledLogo>
                <img src={visaIMG.src} alt="visa" />
            </StyledLogo>
            <StyledInfo>
                <StyledFormLabel>
                    <div>Monto a retirar</div>&ensp;
                    <div>
                        Disponible: <span className="saldo">{currency(user?.saldoRetirable)}</span>
                    </div>
                </StyledFormLabel>
                <StyledMinMax id="component-helper-text">
                    <span>Mínimo {currency(method.limits.min)}</span>&ensp;
                    <span>y</span>&ensp;
                    <span>Máximo {currency(method.limits.max)}</span>
                </StyledMinMax>
                <StyledInfoNiubiz>
                    <Alert severity="info">
                        Ten en cuenta que si colocas una tarjeta de crédito, el monto podrá ir como pago de deuda pendiente.
                    </Alert>
                </StyledInfoNiubiz>
            </StyledInfo>
            <Iframe method={method.method} limits={method.limits} />
            <BackMethodsLink maxWidth="400px" />
        </Styled>
    )
}
const StyledInfoNiubiz = styled.div`
    > p {
        color: ${(p) => p.theme.palette.alternate13.main};
    }
`
const StyledInfo = styled.div`
    max-width: 400px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 10px;
`
const StyledFormLabel = styled.div`
    && {
        color: ${(p) => p.theme.palette.alternate11.main};
        display: flex;
        justify-content: space-between;
        font-size: 1rem;
        align-items: flex-end;
        span.saldo {
            color: ${(p) => p.theme.palette.success2.main};
            font-size: 1.2rem;
            font-feature-settings: 'tnum';
        }
    }
`

const StyledMinMax = styled.div`
    color: ${(p) => p.theme.palette.alternate13.main};
`
const StyledCurreny = styled.div`
    position: absolute;
    bottom: 0;
    right: calc(100% + 12px);
    font-size: 1rem;
    height: 100%;
    width: initial;
    font-size: 2rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4f4f4f;
`
const StyledTextFieldWrapper = styled.div`
    width: 100%;
    position: relative;
    margin-top: 2rem;
    margin-bottom: 10px;
`
const RegisterErrorStyled = styled.p`
    font-size: 0.7em;
    color: red;
    margin-left: 1rem;
    width: 100%;
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
const StyledFormHelperText = styled(FormHelperText)`
    && {
        font-size: 1rem;
        font-feature-settings: 'tnum';
    }
`
const StyledLoadingButton = styled(LoadingButton)`
    && {
        max-width: fit-content;
        padding: 0.7rem 2.5rem;
        text-transform: initial;
        font-size: 1rem;
    }
`
const StyledInputLabel = styled(InputLabel)`
    && {
        font-size: 1rem;
        transform: initial;
        transition: 200ms;
        font-weight: 600;
        margin-left: 10px;
        opacity: 0.8;
        &.Mui-focused {
            opacity: 1;
            color: ${(p) => p.theme.palette.dark.main};
            /* transform: scale(1.05); */
        }
    }
`
const StyledFormControl = styled(FormControl)`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
        width: 100%;
    }
`
const Styled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 100%;
`
const StyledTextField = styled(InputBase)`
    & {
        /* label + & {
            margin-top: 2rem;
            margin-bottom: 10px;
        } */
        width: 100%;
        & .MuiInputBase-input {
            border-radius: 10px;
            position: relative;
            border: 1px solid ${(p) => p.theme.palette.alternate20.main};
            font-size: 2rem;
            padding: 10px 1rem;
            color: #4f4f4f;
            transition: 200ms;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
            font-weight: 400;
            font-feature-settings: 'tnum';
            font-stretch: condensed;
            &::placeholder {
                font-size: 1rem;
                transform: translateY(-4px);
            }
            &:focus {
                /* border-color: ${(p) => p.theme.palette.dark.main}; */
                box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 10px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, black 0px 0px 1px 2px;
            }
        }
    }
`
const StyledForm = styled.form`
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
    margin: auto;
`
const StyledLogo = styled.div`
    max-width: 160px;
    margin: auto;
`
