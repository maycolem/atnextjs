import styled from 'styled-components'
import { FormControl, TextField } from '@mui/material'
import React from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { Retiro } from '@interfaces/retiro'
import { currency } from '@helpers/currency'

interface Props {
    method: Retiro
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    errors: string
    saldoRetirable?: number
}

export const InputAmount = ({ method, setValue, value, errors, saldoRetirable }: Props) => {
    const id = `${Math.random() * 10000000000}${Math.random() * 10000000000}`

    const saldoRetirableCurrent = (saldoRetirable / 100 - Number(value)) * 100

    return (
        <Styled>
            <div className="wrapper">
                <StyledInput>
                    <StyledFormLabel>
                        <div>Monto a retirar</div>&ensp;
                        <div>
                            Disponible: <span className="saldo">{currency(saldoRetirable)}</span>
                        </div>
                    </StyledFormLabel>
                    <StyledMinMax id="component-helper-text">
                        <span>Mínimo {currency(method.limits.min)}</span>&ensp;
                        <span>y</span>&ensp;
                        <span>Máximo {currency(method.limits.max)}</span>
                    </StyledMinMax>
                    <StyledContent>
                        <StyledPEN>
                            <span className="lineStyle">S/</span>
                        </StyledPEN>
                        <StyledFormControl>
                            <div className="wrapper">
                                <StyledTextField
                                    autoComplete={id}
                                    error={!!errors}
                                    helperText={''}
                                    hiddenLabel
                                    id={id}
                                    name={id}
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value
                                            .replace(/[^0-9.]/g, '')
                                            .replace(/(\..*?)\..*/g, '$1')
                                            .replace(/^0[^.]/, '0')
                                        setValue(value)
                                    }}
                                    placeholder="Ingrese el monto aquí"
                                    size="small"
                                    value={value}
                                />
                            </div>
                        </StyledFormControl>
                    </StyledContent>
                    {errors ? <RegisterErrorStyled>{errors}</RegisterErrorStyled> : null}
                </StyledInput>
            </div>
        </Styled>
    )
}

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

const StyledTextField = styled(TextField)`
    & {
        background: white;
        > div > input {
            font-feature-settings: 'tnum';
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                &[type='number'] {
                    -moz-appearance: textfield;
                }
            }
        }
    }
`
const StyledMinMax = styled.div`
    color: ${(p) => p.theme.palette.alternate13.main};
`
const RegisterErrorStyled = styled.p`
    font-size: 0.8em;
    color: red;
    margin-left: 1rem;

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
const StyledFormControl = styled(FormControl)`
    & {
        fieldset {
            border: 0;
        }

        .MuiFormControl-root {
            min-height: 100%;
            flex: 1;
            .MuiOutlinedInput-root {
                flex: 1;
                font-size: 1.9453543rem;
                input {
                    &::placeholder {
                        font-size: 1rem;
                        transform: translateY(-6px);
                    }
                }
            }
        }

        button {
            border: 0;
            border-radius: 0;
            box-shadow: 0;
            font-size: 1.01rem;
            /* padding: 1.8rem 1.4rem; */
        }
        .wrapper {
            display: flex;
            flex: 1 1 100%;
            overflow-y: initial;
            border: 1px solid transparent;
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            border-radius: 8px;
            overflow: hidden;
        }
    }
`
const StyledPEN = styled.div`
    & {
        position: absolute;
        right: calc(100% + 3px);
        top: 50%;
        transform: translateY(-50%);
    }
`
const Styled = styled.div`
    min-height: 100%;
    padding: 10px 35px;
    padding-bottom: 20px;
    & {
        > .wrapper {
            max-width: 400px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`

const StyledContent = styled.div`
    & {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        span.lineStyle {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 19.42px;
            height: 45px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #000000;
        }
        span.textFooter {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #000000;
        }
    }
`
const StyledInput = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        header {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${(p) => p.theme.palette.alternate5.main};
        }
    }
`
