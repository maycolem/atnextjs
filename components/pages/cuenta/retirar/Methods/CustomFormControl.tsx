import { ErrorMessage } from '@hookform/error-message'
import { FormControl } from '@mui/material'
import classnames from 'classnames'
import hexAlpha from 'hex-alpha'
import React from 'react'
import styled from 'styled-components'
import { getFirstError } from '@components/pages/registro/Form/helpers/getFirstError'

interface Props {
    hookFormProps: {
        getFieldState: any
        getValues: any
        formState: any
    }
    children: JSX.Element
    name: string
    className?: string
}

export const CustomFormControl = ({ hookFormProps, children, className, name }: Props) => {
    const { getFieldState, getValues, formState } = hookFormProps
    const { errors } = formState
    return (
        <Styled
            fullWidth
            className={classnames(name, className, {
                invalid: getFieldState(name).invalid,
                valid: getValues(name) && !getFieldState(name).invalid,
            })}
        >
            {children}

            <ErrorMessage
                errors={getFirstError('retiro-form-apuesta-total', errors)}
                name={name}
                render={(data) => {
                    if (data?.messages) {
                        return Object.entries(data?.messages).map(([type, message]) => (
                            <RegisterErrorStyled key={type}>{message}</RegisterErrorStyled>
                        ))
                    }
                    return <RegisterErrorStyled>{data?.message}</RegisterErrorStyled>
                }}
            />
        </Styled>
    )
}

const RegisterErrorStyled = styled.p`
    font-size: 0.8rem;
    color: red;
    margin-left: 1rem;
    margin-top: 0.3rem;

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

const Styled = styled(FormControl)`
    && {
        z-index: 2;
        flex: 1;

        &.valid {
            fieldset {
                border-color: ${(p) => p.theme.palette.success2.light};
                border-width: 1px;
                overflow: initial;
                &::after {
                    content: '\\2713';
                    right: 5px;
                    top: -13px;
                    padding-left: 0px;
                    z-index: 5;
                    position: absolute;
                    background-color: white;
                    border: 1px solid ${(p) => p.theme.palette.success2.dark};
                    color: ${(p) => p.theme.palette.success2.dark};
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    font-size: 11px;
                    font-weight: 900;
                    line-height: 13px;
                    text-align: center;
                }
            }

            .MuiFilledInput-root {
                ::after {
                    border-bottom: 1px solid ${(p) => p.theme.palette.success2.light};
                }
            }
        }
        &.invalid {
            fieldset {
                border-color: ${(p) => hexAlpha(p.theme.palette.primary.light, 0.8)};
                border-width: 1px;
            }
            .MuiFilledInput-root {
                ::after {
                    border-bottom: 1px solid ${(p) => hexAlpha(p.theme.palette.primary.light, 0.8)};
                }
            }
        }
        label {
            font-size: 1rem;
            transform-origin: left center;
            opacity: 0.8;
        }
        fieldset {
            span {
                font-size: calc(1rem - 15%);
            }
        }
        &.withIconRigth {
            label {
                padding-right: 1.2rem;
            }
        }
        .MuiInputAdornment-root {
            width: 40px;
            height: 100%;
            max-height: max-content;
            margin-left: 0;
            display: flex;
        }
        .MuiButtonBase-root {
            font-size: 1rem;
            padding: 0.5rem;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            svg {
                font-size: inherit;
            }
        }

        .MuiFormLabel-root {
            transform: translate(1rem, calc(1rem - 1px)) scale(1);
            color: #494952;

            &.MuiFormLabel-filled,
            &.Mui-focused {
                transform: translate(1rem, calc(-100% + 0.8rem)) scale(0.85);
                opacity: 1;
            }
        }
        .MuiInputBase-input {
            padding: 0.9rem 1rem;
            background: #ffffff;
            border-radius: 0.4rem;
            width: auto;
            flex: 1;
            font-size: 1rem;
            color: #3e3e45;
            font-feature-settings: 'tnum';
        }
        .MuiFilledInput-root {
            ::after {
                border-bottom: 1px solid #d9d9d9;
            }
        }
        .MuiInputBase-root {
            font-feature-settings: 'tnum';
        }
        .MuiInputBase-root .MuiSelect-select {
            display: flex;
        }
    }
`
