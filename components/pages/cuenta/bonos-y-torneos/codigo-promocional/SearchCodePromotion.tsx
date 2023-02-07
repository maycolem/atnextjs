import { LoadingButton } from '@mui/lab'
import { FormControl, FormLabel, TextField, Button, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useClaimCodePromotionMutation, useGetUserPromotionsQuery } from 'states/calimaco/calimacoDataApi'
import { userSessionSelector } from 'states/features/slices/userSlice'
import { onOpen } from 'states/slice/layout/SnackBar'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { useAppSelector } from '@states/store'

const SearchCodePromotion = () => {
    const [code, setCode] = useState('')
    const [errors, setErrors] = useState(null)
    const [claimCode, { data, isLoading }] = useClaimCodePromotionMutation()
    const session = useAppSelector(userSessionSelector)
    const [skip, setSkip] = useState(true)
    useGetUserPromotionsQuery({ session: session }, { skip })
    const dispatch = useDispatch()
    const router = useRouter()
    const handleSubmit = async () => {
        setErrors('')
        if (isLoading) {
            return
        }
        await claimCode({ code, session: session })
    }

    const isSuccess = (data) => {
        const res = data?.toLowerCase()
        if (res === 'ok') {
            return true
        }
        if (res === 'error') {
            return false
        }
        return false
    }

    useEffect(() => {
        const result = data?.result
        const description = data?.description ?? ''
        let message = '¡Ups! Algo salió mal$$Ocurrió un error'
        if (result) {
            if (isSuccess(result)) {
                setSkip(false)
            } else {
                setSkip(true)
                if (description.includes('max_times_per_user reached')) {
                    message = '¡Ups! Algo salió mal$$Codigo usado.'
                }
                if (description.includes('Max codes claimed')) {
                    message = '¡Ups! Algo salió mal$$Se ha agotado la promoción.'
                }
                if (description.includes('Code already claimed')) {
                    message = '¡Ups! Algo salió mal$$Código ya reclamado.'
                }
                dispatch(onOpen({ message: message }))
            }
            setCode('')
        }
    }, [data])

    const id = Math.random().toString()
    const handlePushPage = () => router.push(PATHS.CUENTA_BONOS_Y_TORNEOS_BONOS.url)
    return (
        <div>
            <FormControlS>
                <FormLabelS>Código promocional</FormLabelS>
                <div className="wrapper">
                    <TextFieldS
                        autoComplete={id}
                        // error={!!errors}
                        // helperText={''}
                        hiddenLabel
                        id={id}
                        inputProps={{
                            id,
                            name: id,
                            autoComplete: id,
                        }}
                        name={id}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // const value = e.target.value
                            //   .replace(/[^0-9.]/g, '')
                            //   .replace(/(\..*?)\..*/g, '$1')
                            //   .replace(/^0[^.]/, '0')
                            setCode(e.target.value)
                        }}
                        placeholder="Si tienes un código escribelo aquí"
                        size="small"
                        // type={'password'}
                        value={code}
                    ></TextFieldS>
                    <LoadingButtonS
                        color="secondary"
                        disabled={isLoading}
                        loading={isLoading}
                        onClick={code ? handleSubmit : null}
                        variant="contained"
                    >
                        <span
                            style={{
                                opacity: isLoading ? '0' : '1',
                            }}
                        >
                            ENVIAR
                        </span>
                    </LoadingButtonS>
                </div>
                <p style={{ color: 'red' }}>{errors}</p>
            </FormControlS>

            {isSuccess(data?.result) && !isLoading ? (
                <StyledCodesRedeem>
                    <StyledCodes>
                        <CodeRow className="">
                            <Alert severity="success">¡Reclamaste el código con éxito!</Alert>
                        </CodeRow>
                    </StyledCodes>
                    <StyledButton onClick={handlePushPage} variant="contained">
                        Ir a activar la promoción
                    </StyledButton>
                </StyledCodesRedeem>
            ) : null}
        </div>
    )
}

export default SearchCodePromotion

const CodeRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px;
    width: calc(100%);
    > .code {
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        max-width: 25ch;
        font-size: 1rem;
        font-size: 1.2rem;
        color: #6e6e6e;
    }
    > .icon {
        width: 25px;
        height: 25px;
        background: ${(p) => p.theme.palette.success.main};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        > svg {
            font-size: 20px;
            color: white;
        }
    }
`
const StyledCodes = styled.div`
    width: calc(100%);
`
const StyledCodesRedeem = styled.div`
    width: calc(100%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    max-width: 400px;
    margin: auto;
`
const StyledButton = styled(Button)`
    && {
        text-transform: initial;
        font-size: 1rem;
        max-width: fit-content;
        margin: auto;
    }
`
const FormLabelS = styled(FormLabel)`
    & {
        font-weight: 500;
        color: ${(p) => p.theme.palette.dark2.main};
    }
`
const LoadingButtonS = styled(LoadingButton)`
    &&& {
        padding: 0 2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* background: #ffc700; */
        color: #000000;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 5px;
        display: flex;
        align-items: center;
        text-align: center;
        &[disabled] {
            background: gray;
        }
    }
`
const TextFieldS = styled(TextField)`
    & {
        background: white;
    }
`
const FormControlS = styled(FormControl)`
    && {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-bottom: 1rem;
        max-width: 500px;
        margin: auto;

        ${MEDIA_QUERIES.min_width.tabletL} {
            padding: 2rem 0;
            padding-bottom: 3rem;
        }
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

        > .wrapper {
            display: flex;
            flex: 1 1 100%;
            overflow-y: initial;
            background: ${(p) => p.theme.palette.secondary.main};
            outline: 3px solid ${(p) => p.theme.palette.secondary.main};
            /* box-shadow: ${(p) => p.theme.palette.secondary.main} 0px 1px 2px 0px, */
            /* ${(p) => p.theme.palette.secondary.main} 0px 1px 3px 1px; */
            border-radius: 8px;
            overflow: hidden;
            min-height: 62px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
            > button {
                border: none;
                border-radius: 0;
                box-shadow: none;
                font-size: 1.01rem;
            }
        }
    }
`
