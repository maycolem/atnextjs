/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import styled from '@emotion/styled'
import { Button, FormControl, FormLabel, TextField, Modal, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useDispatch, useSelector } from 'react-redux'
import FormHelperText from '@mui/material/FormHelperText'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import AstroPayIMG from 'public/assets/mi-billetera/recarga/temp/Logo-AstroPay.png'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { useForm } from 'react-hook-form'
import { useGetPayoutLobbyAstropayQuery, useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import { userSelector, setUser } from 'states/features/slices/userSlice'
import { usePaymentPayoutMutation } from 'states/calimaco/calimacoPaymentApi'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { ProviderAt } from 'services/ProviderAtService'
import { Session } from 'services/Session'
import { LoadingButton } from '@mui/lab'
import { onOpen } from 'states/slice/layout/SnackBar'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { GoogleTagManager } from 'google/TagManager'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'

const Astropay = ({ onBack = () => null, onNext = () => null }) => {
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const [amount, setAmount] = useState('')
    const id = `${Math.random() * 10000000000}${Math.random() * 10000000000}`
    const { register, handleSubmit, reset, setValue, formState, getValues, trigger } = useForm()
    const { data: astropay, isLoading: isloadingRetiros, refetch } = useGetPayoutLobbyAstropayQuery(user?.session)
    const [payoutAstropay, { isLoading: isLoadingPayoutAstropay }] = usePaymentPayoutMutation()
    const [open, setOpen] = useState(false)
    const [smsAlert, setSmsAlert] = useState(false)
    const { t } = useTranslation()
    const providerAt = new ProviderAt()
    const [disableButton, setDisableButton] = useState(false)
    const router = useRouter()
    const { data: dataFragment } = useGetFragmentQuery({ fragment: 'RETIROS_ASTROPAY' })

    const dtCancelar = async (e) => {
        setOpen(false)
    }
    const cbEffect = async () => {
        setErrors('')
        setDisableButton(false)

        const currentMontoRetirable = user?.saldoRetirable / 100
        const montoRetiro = amount

        if (montoRetiro > currentMontoRetirable) {
            // GTM
            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'astropay',
                amount: 'S/ ' + montoRetiro,
                option: 'enviar solicitud - error',
                action: 'click',
            })

            setDisableButton(true)
            setErrors('El monto que ingresaste supera el límite de tu saldo retirable, por favor corrígelo')
        } else if (astropay?.limits?.min && astropay?.limits?.max && amount) {
            const _min = Number(astropay?.limits?.min || 0) / 100
            const _max = Number(astropay?.limits?.max || 0) / 100
            const _amount = Number(amount || 0)

            const schema = yup.object().shape({
                amount: yup.number().min(_min, 'ERROR MINIMO').max(_max, 'ERROR MAXIMO').required(),
            })
            try {
                await schema.validate({ amount: _amount })
            } catch (errors) {
                switch (errors.errors[0]) {
                    case 'ERROR MINIMO':
                        // GTM

                        GoogleTagManager.push({
                            event: 'atm.event',
                            eventName: 'retiro_metodos_de_retiro',
                            payout_option: 'astropay',
                            amount: 'S/ ' + amount,
                            option: 'enviar solicitud - error',
                            action: 'click',
                        })

                        setDisableButton(true)
                        setErrors(
                            `El monto debe ser mayor que ${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
                                _min
                            )}.`
                        )
                        break
                    case 'ERROR MAXIMO':
                        // GTM

                        GoogleTagManager.push({
                            event: 'atm.event',
                            eventName: 'retiro_metodos_de_retiro',
                            payout_option: 'astropay',
                            amount: 'S/ ' + amount,
                            option: 'enviar solicitud - error',
                            action: 'click',
                        })

                        setDisableButton(true)
                        setErrors(
                            `El monto debe ser menor que ${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
                                _max
                            )}.`
                        )
                        break
                    default:
                        break
                }
            }
        }
    }
    useEffect(() => {
        cbEffect()
    }, [amount, astropay?.limits])

    const onSubmit = async (item) => {
        const newSolicitud = await payoutAstropay({
            company: 'ATP',
            session: user?.session,
            method: astropay.method,
            amount: item.amountAstropay * 100,
            payment_account: 0,
        })

        if (newSolicitud.data.result === 'OK') {
            // GTM IMPLEMENTATION

            GoogleTagManager.push({
                event: 'atm.event',
                eventName: 'retiro_metodos_de_retiro',
                payout_option: 'astropay',
                amount: 'S/' + item.amountAstropay ?? 0,
                option: 'enviar solicitud',
                action: 'click',
            })

            // setOpen(true)
            // setSmsAlert('¡Tu solicitud fue enviada y recibida con éxito!')
            // document.getElementById('amountAstropayId').value = ''

            // UPDATE BALANCE

            const resUserDetail = await providerAt.userDetail(user.session)
            const _user = {
                ...resUserDetail.user,
                session: user.session,
            }
            Session().setUser(_user)
            dispatch(setUser(Session().getUser()))

            router.push(PATHS.CUENTA_RETIRO_ESTADO_DE_SOLICITUD.url)
        } else {
            // GTM PENDINNG

            if (newSolicitud?.data.description === 'Pending payout') {
                GoogleTagManager.push({
                    event: 'atm.event',
                    eventName: 'retiro_metodos_de_retiro',
                    payout_option: 'astropay',
                    amount: 'S/' + item.amountAstropay ?? 0,
                    option: 'solicitud de retiro en curso',
                    action: 'view',
                })
            }

            // setOpen(true)
            // setSmsAlert(newSolicitud.data.description)

            dispatch(
                onOpen({
                    message: t(newSolicitud?.data.description),
                    severity: 'error',
                    open: true,
                    autoHideDuration: 3000,
                })
            )
        }
    }

    const currency = (amount) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            maximumFractionDigits: 2,
        }).format(amount / 100)
    }

    const handleBack = () => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_metodos_de_retiro',
            payout_option: 'astropay',
            option: 'elegir otro metodo de retiro',
            action: 'click',
        })
    }

    return (
        <div>
            <CabeceraPaymentS>
                <BannerS>
                    <img src={AstroPayIMG.src} />
                </BannerS>

                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <div className="iconS">
                            <CheckCircleOutlineOutlinedIcon />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <FragmentCustomAT fragment={dataFragment ?? ''}></FragmentCustomAT>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <FormS autoComplete="none" onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel className="TextMontoS">Monto a retirar</FormLabel>

                    <FormContentS>
                        <CurrencyS>
                            <span className="lineStyle">S/</span>
                        </CurrencyS>
                        <FormControlS>
                            <div className="wrapper">
                                <TextFieldS
                                    id="amountAstropayId"
                                    {...register('amountAstropay', { required: true })}
                                    autoComplete={id}
                                    // error={!!errors}
                                    helperText={''}
                                    hiddenLabel
                                    onInput={(e) => {
                                        const value = e.target.value
                                            .replace(/[^0-9.]/g, '')
                                            .replace(/(\..*?)\..*/g, '$1')
                                            .replace(/^0[^.]/, '0')
                                        setAmount(value)
                                    }}
                                    placeholder="Ingrese el monto aquí"
                                    size="small"
                                    value={amount}
                                ></TextFieldS>
                            </div>
                        </FormControlS>
                    </FormContentS>
                    <ErrorTextS>{errors}</ErrorTextS>

                    {astropay?.limits ? (
                        <FormHelperTextS id="component-helper-text">
                            Mínimo {`Min ${currency(Number(astropay?.limits?.min))}`} y Máximo{' '}
                            {`Max ${currency(Number(astropay?.limits?.max))}`}{' '}
                        </FormHelperTextS>
                    ) : (
                        ''
                    )}
                    <DivButton>
                        <LoadingButton
                            color="primary"
                            disabled={disableButton || isLoadingPayoutAstropay}
                            loading={isLoadingPayoutAstropay}
                            type="submit"
                            variant="contained"
                        >
                            {' '}
                            Enviar solicitud
                        </LoadingButton>
                    </DivButton>
                </FormS>
            </CabeceraPaymentS>

            <MetodoDeDepositoS>
                <div className="wrapper">
                    <BackMethodsS>
                        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                        <Link href={PATHS.CUENTA_RETIRO.url} onClick={() => handleBack()}>
                            <span>Elegir otro método de retiro</span>
                        </Link>
                    </BackMethodsS>
                </div>
            </MetodoDeDepositoS>

            {/* <ModalS onClose={() => setOpen(false)} open={open}>
        <ModalWrapperS>
          <BackAndCloseS>
            <ButtonS></ButtonS>
            <LocationS> </LocationS>
            <Button className="close" onClick={dtCancelar} variant="contained">
              <CloseIcon></CloseIcon>
            </Button>
          </BackAndCloseS>
          <MethodsPaymentS>
            <div className="TextModalAuto">{t(smsAlert)}</div>
            <div className="ContenedorBotones"></div>
          </MethodsPaymentS>
        </ModalWrapperS>
      </ModalS>
       */}
        </div>
    )
}

export default Astropay

const CabeceraPaymentS = styled.div`
    outline: none;
    background: #ffffff;
    position: relative;
    z-index: 1;
    height: auto;
    padding: 0 30px 0 30px;
    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: justify;
    .TituloModalS {
        padding: 20px 0px 30px 0px;
        color: #5a5a5a;
        font-size: 1rem;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
    }
    .iconS {
        text-align: right;
        padding-top: 25px;
    }

    .subtitS {
        padding: 20px 0px 30px 0px;
        color: #5a5a5a;
        font-size: 12px;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
    }
    .subtitS2 {
        padding: 20px 0px 30px 0px;
        color: #ff0000;
        font-size: 12px;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        text-decoration: underline;
    }

    ${MEDIA_QUERIES.min_width.desktopM} {
        outline: none;
        background: #ffffff;
        position: relative;
        z-index: 1;
        height: auto;
        padding: 0 30px 0 30px;
        width: 70%;
        /* overflow: auto; */
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: justify;
        .TituloModalS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 1.1rem;
            line-height: 25px;
        }
        .iconS {
            text-align: right;
            padding-top: 25px;
        }

        .subtitS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
        }
        .subtitS2 {
            padding: 20px 0px 30px 0px;
            color: #ff0000;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            text-decoration: underline;
        }
    }
`
const TextFieldS = styled(TextField)`
    & {
        background: white;
    }
`
const FormHelperTextS = styled(FormHelperText)`
    & {
        font-size: 1rem;
        padding-bottom: 20px;
    }
`
const FormControlS = styled(FormControl)`
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
const CurrencyS = styled.div`
    & {
        position: absolute;
        right: calc(100% + 3px);
        top: 50%;
        transform: translateY(-50%);
    }
`
const MetodoDeDepositoS = styled.div`
    background: #fafafa;
    min-height: 100%;
    //  padding: 1rem 40px;
    ${MEDIA_QUERIES.min_width.tabletS} {
        //   padding: 1rem 50px;
    }
    & {
        > .wrapper {
            //   max-width: 400px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`
const FormContentS = styled.div`
    & {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        span.lineStyle {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 1.3rem;
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
    ${MEDIA_QUERIES.min_width.desktopM} {
        & {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 20px;

            span.lineStyle {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 1.3rem;
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
    }
`
const FormS = styled.form`
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
    .TextMontoS {
        font-weight: 500;
    }
`
const BackMethodsS = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;

    padding: 1rem;
    padding-left: 5rem;
    width: fit-content;
    transition: 250ms;
    color: #767676;
    font-size: 1em;
    :hover {
        color: #ec3323;
    }
`
const BannerS = styled.div`
    & {
        margin-bottom: 0.5rem;
        img {
            width: fit-content;
            max-width: 150px;
            margin: auto;
        }
        .method {
            text-align: center;
            text-transform: uppercase;
            margin-top: 20px;
            margin-bottom: 20px;
            font-weight: 900;
            font-size: 1.2em;
            color: ${(p) => p.theme.palette.dark.main};
        }
    }

    ${MEDIA_QUERIES.min_width.desktopM} {
        & {
            margin-bottom: 0.5rem;
            img {
                width: fit-content;
                max-width: 250px;
                margin: auto;
            }
            .method {
                text-align: center;
                text-transform: uppercase;
                margin-top: 20px;
                margin-bottom: 20px;
                font-weight: 900;
                font-size: 1.2em;
                color: ${(p) => p.theme.palette.dark.main};
            }
        }
    }
`
const ModalS = styled(Modal)`
    & {
        z-index: 9999;
        overflow: auto;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
`
const ModalWrapperS = styled.div`
    outline: none;
    background: white;
    position: relative;
    z-index: 1;

    min-width: 230px;
    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    ${MEDIA_QUERIES.min_width.mobileL} {
        height: auto;
        min-height: auto;
        width: 90%;
        max-width: 400px;
    }
    & {
        .close-modal {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            svg {
                cursor: pointer;
                font-size: 30px;
            }
        }
        iframe {
            width: 100%;
            height: 80vh;
            max-height: 400px;
        }
    }
`
const BackAndCloseS = styled.div`
    background: white;
    display: flex;
    width: 100%;
    justify-content: space-between;

    align-items: center;
    border-bottom: 1px solid transparent;
    .MuiButton-root {
        border-radius: 0;
        padding: 0.3rem;
        line-height: 1;
        min-width: initial;
        svg {
            color: red;
            font-size: 2rem;
        }
    }
    .MuiButton-root.close {
        svg {
            color: white;
        }
    }
`
const ButtonS = styled(Button)`
    & {
        &.MuiButton-root.back {
            ${(p) => {
                if (p.$stepNext < 1)
                    return css`
                        & {
                            opacity: 0;
                            pointer-events: none;
                        }
                    `
            }}
        }
    }
`
const LocationS = styled.div`
    & {
        font-size: 0.95rem;
    }
`
const MethodsPaymentS = styled.div`
    min-height: 100%;
    .TextModalAuto {
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
        /* or 173% */

        display: flex;
        align-items: center;
        text-align: center;

        color: #323232;
        padding: 50px;
        background: white;
    }
    .ContenedorBotones {
        display: grid;
        grid-template-columns: auto auto;

        gap: 1rem;
        padding: 1rem;
    }
    & {
        .wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
            padding: 1rem;
            ${MEDIA_QUERIES.min_width.tabletS} {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            ${MEDIA_QUERIES.min_width.tabletS} {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            ${MEDIA_QUERIES.min_width.tabletL} {
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
                padding: 2rem;
            }
            ${MEDIA_QUERIES.min_width.desktopXS} {
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
                padding: 2rem 3rem;
            }
            ${MEDIA_QUERIES.min_width.desktopS} {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                padding: 2rem 4rem;
            }
            ${MEDIA_QUERIES.min_width.desktopM} {
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
                padding: 2rem 10vmax;
            }
        }
    }
`
const ButtonFormS = styled(Button)`
    & {
        padding: 16.5px 14px;
        width: 100%;
        max-width: 300px;
        margin: auto;
    }
`
const DivButton = styled.div`
    & {
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        > button {
            padding: 0.9rem;
            font-size: 1rem;
            text-transform: initial;
            min-width: 200px;
        }
    }
`
const ErrorTextS = styled.p`
    & {
        color: ${(p) => p.theme.palette.primary.main};
        font-size: 0.922423432432rem;
    }
`
