/* eslint-disable camelcase */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    circularProgressClasses,
    Fade,
    linearProgressClasses,
    Modal,
    Snackbar,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { format } from 'date-fns'
import { Parser } from 'html-to-react'
import { useActiveUserPromotionMutation, useCancelUserPromotionMutation, useGetUserPromotionsQuery } from 'states/calimaco/calimacoDataApi'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { LoadingButton } from '@mui/lab'
import { onOpen } from 'states/slice/layout/SnackBar'
import FreeBetContent from './FreeBetContent'
import FreeSpinContent from './FreeSpinContent'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
const BonoCard = ({ onClick, expanded, active, bono, refetch, className, isStatusPending = false }) => {
    const [progressCircular, setProgressCircular] = useState(0)
    const [reclam, { data: dataActive, isLoading: isLoadingActive }] = useActiveUserPromotionMutation()
    const [cancelProm, { data: dataCancel, isLoading: isLoadingCancel }] = useCancelUserPromotionMutation()
    const [openModalBonoCancel, setOpenModalBonoCancel] = useState(false)
    const user = useSelector(userSelector)
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    // const { refetch } = useGetUserPromotionsQuery({ session: user?.session })
    const dispatch = useDispatch()
    useEffect(() => {
        const vasApostando = bono?.initial_wr - bono?.wr
        const rollover = bono?.initial_wr
        const progress = ((vasApostando / rollover) * 100).toFixed(0)
        setProgressCircular(~~progress)
    }, [bono])
    const mapRespuesta = (stat) => {
        if (stat === 'PENDING') {
            return 'Pendiente'
        }
        if (stat === 'NOTIFIED') {
            return 'Notificado'
        }
        if (stat === 'ACTIVE') {
            return 'Activo'
        }
        if (stat === 'EXPIRED') {
            return 'Expirado'
        }
    }

    // console.log(bono)
    useEffect(() => {
        // console.log(dataCancel)
        if (dataCancel?.result === 'error') {
            dispatch(
                onOpen({
                    message: '¡Ups! Algo salió mal$$Comunícate con nuestro chat en línea.',
                    severity: 'error',
                    open: true,
                    autoHideDuration: 3000,
                })
            )
            return
        }
        if (dataCancel?.result === 'OK') {
            dispatch(
                onOpen({
                    message: 'Has cancelado la promoción exitosamente',
                    severity: 'success',
                    open: true,
                    autoHideDuration: 3000,
                })
            )
            refetch()
            return
        }
        if (dataActive?.result === 'OK') {
            dispatch(
                onOpen({
                    message: 'Has activado la promoción exitosamente',
                    severity: 'success',
                    open: true,
                    autoHideDuration: 3000,
                })
            )
            refetch()
        }
    }, [dataActive, dataCancel])

    const handleReclamar = async (promId) => {
        const data = await reclam({ session: user?.session, promotion: promId })
        window.fbq('trackCustom', 'ReclamarBono')

        if (data?.data.result === 'error') {
            // console.log(data?.data?.description)
            if (data?.data?.description?.toLowerCase().includes('promotion already')) {
                dispatch(
                    onOpen({
                        message: 'Tienes otra promoción activa actualmente',
                        severity: 'error',
                        open: true,
                        autoHideDuration: 3000,
                    })
                )
            } else {
                dispatch(
                    onOpen({
                        message: 'No pudiste reclamar esta promocion, comunicate con soporte.',
                        severity: 'error',
                        open: true,
                        autoHideDuration: 3000,
                    })
                )
            }
        }
    }
    const handleCancelar = async (promId) => {
        const data = await cancelProm({ session: user?.session, promotion: promId })
    }
    const ShowButtonReclamar = (status) => {
        if (status === 'ACTIVE') {
            return null
        }
        if (status === 'NOTIFIED') {
            return null
        }
        return (
            <ButtonS
                color="secondary"
                fullWidth
                loading={isLoadingActive || isLoadingCancel}
                onClick={() => handleReclamar(bono?.user_promotion_id)}
                variant="contained"
            >
                RECLAMAR
            </ButtonS>
        )
    }
    const customMontoEntregado = (monto, type) => {
        if (type === 'FREE_SPIN') {
            return bono?.initial_amount
        }
        // FREE_BET
        if (type === 'FREE_BET') {
            return `S/ ${Number(bono?.initial_amount / 100).toFixed(2)}`
        }
        return `S/ ${Number(bono?.initial_amount / 100).toFixed(2)}`
    }
    const customVasApostando = (initial_wr, wr, type) => {
        if (type === 'FREE_SPIN') {
            return '--'
        }
        if (type === 'FREE_BET') {
            return '--'
        }
        if (initial_wr && wr) {
            return `S/ ${((initial_wr - wr) / 100).toFixed(2)}`
        }
        return `S/ ${((initial_wr - wr) / 100).toFixed(2)}`
    }
    const pendiendPorApostarCustom = (wr, type) => {
        if (type === 'FREE_SPIN') {
            return '--'
        }
        if (type === 'FREE_BET') {
            return '--'
        }
        if (wr > 0) {
            return `S/ ${Number(wr / 100).toFixed(2)}`
        } else {
            return 0
        }
        // return `S/ ${Number(-500 / 100).toFixed(2)}`
    }
    const objetivoRolloverCustom = (initla_wr) => {
        return `S/ ${Number(initla_wr / 100).toFixed(2)}`
    }
    const customFormatDateLocation = (dateCreated) => {
        if (!dateCreated) return ''
        const rest = new Date(dateCreated.replace(' ', 'T'))
        // const fromDate = new Date('2022-08-06T02:00:00')
        // if (rest > fromDate) {
        //   rest.setHours(rest.getHours() - 5)
        // }
        rest.setHours(rest.getHours() - 5)
        const resultFormatDate = format(rest, "dd-MM-yyyy hh:mm aaaaa'm'")
        // TODO: RESTAR 5 horas apartir del 6 de agostro del 2022 alas 02:00 horas.
        return `${resultFormatDate}`
    }
    return (
        <>
            <AccordionS expanded={expanded === active}>
                <AccordionSummaryS
                    aria-controls="panel1bh-content"
                    expandIcon={desktopS ? <KeyboardArrowDownIcon /> : null}
                    id="panel1bh-header"
                    onClick={() => onClick(active)}
                >
                    <ContentTopSGridS>
                        <ContentTopS>
                            <TitleS className={className}>
                                <span className="title">{bono?.promotion?.summary_title ?? ''}</span>
                            </TitleS>
                            {className === 'pending' && desktopS && <IDS>RECLAMAR</IDS>}
                        </ContentTopS>
                        {!desktopS && (
                            <ShowMoreS $acitve={expanded === active} className="vermas">
                                {className === 'pending' ? 'Reclamar' : 'Ver más'}{' '}
                                {expanded === active ? <ExpandLessIcon></ExpandLessIcon> : <ExpandMoreIcon />}
                            </ShowMoreS>
                        )}
                    </ContentTopSGridS>
                </AccordionSummaryS>
                <AccordionDetails>
                    <ContentS>
                        {bono?.type === 'FREE_BET' ? (
                            <FreeBetContent
                                ShowButtonReclamar={ShowButtonReclamar}
                                bono={bono}
                                customFormatDateLocation={customFormatDateLocation}
                                customMontoEntregado={customMontoEntregado}
                                customVasApostando={customVasApostando}
                                handleCancelar={handleCancelar}
                                isLoadingActive={isLoadingActive}
                                isLoadingCancel={isLoadingCancel}
                                mapRespuesta={mapRespuesta}
                                objetivoRolloverCustom={objetivoRolloverCustom}
                                openModalBonoCancel={openModalBonoCancel}
                                pendiendPorApostarCustom={pendiendPorApostarCustom}
                                setOpenModalBonoCancel={setOpenModalBonoCancel}
                                isStatusPending={isStatusPending}
                            ></FreeBetContent>
                        ) : bono?.type === 'FREE_SPIN' ? (
                            <FreeSpinContent
                                isStatusPending={isStatusPending}
                                ShowButtonReclamar={ShowButtonReclamar}
                                bono={bono}
                                customFormatDateLocation={customFormatDateLocation}
                                customMontoEntregado={customMontoEntregado}
                                customVasApostando={customVasApostando}
                                handleCancelar={handleCancelar}
                                isLoadingActive={isLoadingActive}
                                isLoadingCancel={isLoadingCancel}
                                mapRespuesta={mapRespuesta}
                                objetivoRolloverCustom={objetivoRolloverCustom}
                                openModalBonoCancel={openModalBonoCancel}
                                pendiendPorApostarCustom={pendiendPorApostarCustom}
                                setOpenModalBonoCancel={setOpenModalBonoCancel}
                            ></FreeSpinContent>
                        ) : (
                            <>
                                {bono?.status !== 'PENDING' && (
                                    <>
                                        <div className="monto monto-entregado">
                                            <p>Monto entregado</p>
                                            <span>{customMontoEntregado(bono?.initial_amount, bono?.type)}</span>
                                            <span></span>
                                        </div>
                                        <div className="monto objetivo-rollover">
                                            <p
                                                style={{
                                                    opacity: bono?.multiplier ? '1' : '0',
                                                }}
                                            >
                                                Objetivo de rollover
                                            </p>
                                            <span
                                                style={{
                                                    opacity: bono?.multiplier ? '1' : '0',
                                                }}
                                            >
                                                {objetivoRolloverCustom(bono?.initial_wr)}
                                            </span>
                                        </div>
                                        <div className="monto vas-apostando">
                                            <p>Vas apostando</p>
                                            <span className="dark-ligth">{customVasApostando(bono?.initial_wr, bono?.wr, bono?.type)}</span>
                                        </div>
                                        <div className="monto pendiente-por-apostar">
                                            <p>Pendiente por apostar</p>
                                            <span className="dark-ligth">{pendiendPorApostarCustom(bono?.wr, bono?.type)}</span>
                                        </div>
                                        <div className="monto rollover">
                                            <p
                                                style={{
                                                    opacity: bono?.multiplier || bono?.multiplier === 0 ? '1' : '0',
                                                }}
                                            >
                                                Rollover
                                            </p>
                                            <span
                                                style={{
                                                    opacity: bono?.multiplier || bono?.multiplier === 0 ? '1' : '0',
                                                }}
                                            >{`x${bono?.multiplier}`}</span>
                                        </div>
                                        <ProgressS className="progress">
                                            {bono?.multiplier || bono?.multiplier === 0 ? (
                                                <div className="wrapper">
                                                    <CircularProgress
                                                        color="buttonPink"
                                                        size={100}
                                                        thickness={3}
                                                        value={100}
                                                        variant="determinate"
                                                    />
                                                    <CircularProgress
                                                        size={100}
                                                        sx={{
                                                            animationDuration: '550ms',
                                                            position: 'absolute',
                                                            left: 0,
                                                            [`& .${circularProgressClasses.circle}`]: {
                                                                strokeLinecap: 'round',
                                                            },
                                                            svg: {
                                                                // filter: 'drop-shadow(0 0px 4px #FF0000)',
                                                            },
                                                        }}
                                                        thickness={3}
                                                        value={Number(progressCircular)}
                                                        variant="determinate"
                                                    />
                                                    <ProgressPercentS>
                                                        <span className="percent">{progressCircular}%</span>
                                                        <div className="monto-por-aportar">
                                                            {/* S/ {bono?.wr / 100} */}
                                                            <span className="pendiente">Avance de rollover</span>
                                                        </div>
                                                    </ProgressPercentS>
                                                </div>
                                            ) : null}
                                        </ProgressS>
                                        <div className="monto">
                                            <div className="top">Estado</div>
                                            <span className="active">{mapRespuesta(bono?.status)}</span>
                                        </div>
                                    </>
                                )}
                                <div className="message">
                                    {bono?.promotion?.summary_body && <MessageS>{Parser().parse(bono?.promotion?.summary_body)}</MessageS>}
                                </div>
                                <DateS>
                                    <div className="top">{isStatusPending ? 'Bono entregado' : 'Inicia'}</div>

                                    <div className="bottom">
                                        {customFormatDateLocation(isStatusPending ? bono?.created_date : bono?.activation_date)}
                                    </div>
                                </DateS>
                                <DateS>
                                    {isStatusPending ? null : (
                                        <>
                                            <div className="top">Vence</div>
                                            <div className="bottom">{customFormatDateLocation(bono?.expiration_date)}</div>
                                        </>
                                    )}
                                </DateS>
                                <div className="accion">
                                    {ShowButtonReclamar(bono?.status)}
                                    <ButtonS fullWidth onClick={() => setOpenModalBonoCancel(true)} variant="contained">
                                        CANCELAR
                                    </ButtonS>
                                </div>
                                <ModalSBonoS
                                    aria-describedby="modal-modal-description"
                                    aria-labelledby="modal-modal-title"
                                    onClose={() => setOpenModalBonoCancel(false)}
                                    open={openModalBonoCancel}
                                >
                                    <Fade in={openModalBonoCancel}>
                                        <ModalSBonoContentS>
                                            <div className="wrapper">
                                                <div className="top_title">¿Estás seguro?</div>
                                                <div className="middle_body">
                                                    Bono <span className="bono_title">{bono?.promotion?.summary_title ?? ''}</span> será
                                                    eliminado.
                                                </div>
                                                <div className="footer_acctions">
                                                    <LoadingButtonS
                                                        loading={isLoadingActive || isLoadingCancel}
                                                        onClick={() => handleCancelar(bono?.user_promotion_id)}
                                                        variant="contained"
                                                    >
                                                        Sí, borrar ahora!
                                                    </LoadingButtonS>
                                                    <LoadingButtonS
                                                        color="dark"
                                                        onClick={() => setOpenModalBonoCancel(false)}
                                                        variant="contained"
                                                    >
                                                        Cerrar
                                                    </LoadingButtonS>
                                                </div>
                                            </div>
                                        </ModalSBonoContentS>
                                    </Fade>
                                </ModalSBonoS>
                            </>
                        )}
                    </ContentS>
                </AccordionDetails>
            </AccordionS>
        </>
    )
}

export default BonoCard
const ContentTopSGridS = styled.div`
    & {
        flex: 1;
        display: grid;
    }
`
const LoadingButtonS = styled(LoadingButton)`
    & {
        text-transform: initial !important;
        box-shadow: none !important;

        :hover {
            box-shadow: none !important;
        }
    }
`
const ModalSBonoContentS = styled.div`
    & {
        min-height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
        pointer-events: none;
        > .wrapper {
            pointer-events: all;
            background: white;
            padding: 1.5rem;
            border-radius: 7px;
            min-width: 250px;
            > .top_title {
                text-align: center;
                font-size: 1.2rem;
                font-weight: 500;
                margin-bottom: 10px;
            }
            > .middle_body {
                color: ${(p) => p.theme.palette.text.primary};
                margin-bottom: 10px;
                > .bono_title {
                    color: ${(p) => p.theme.palette.primary.main};
                }
            }
            > .footer_acctions {
                display: flex;
                gap: 5px;
                justify-content: end;
            }
        }
    }
`
const ModalSBonoS = styled(Modal)`
    & {
        position: fixed !important;
        z-index: 999999 !important;
        > div.MuiBackdrop-root {
            /* background-color: rgba(0, 0, 0, 0.1); */
        }
    }
`
const ButtonS = styled(LoadingButton)`
    & {
        max-width: 300px;
    }
`
const DateS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 5px;
    }
`
const MessageS = styled.div`
    & {
        padding-top: 2.5rem;
        padding-bottom: 1rem;
        text-align: justify;
    }
`
const ProgressPercentS = styled.div`
    & {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;

        > span.percent {
            font-size: 1.8rem;
            font-weight: 700;
            color: ${(p) => p.theme.palette.primary.main};
        }
        > div.monto-por-aportar {
            position: relative;
            > .pendiente {
                position: absolute;
                top: calc(100% + 15px);
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                background: black;
                color: white;
                font-size: 0.8rem;
                padding: 10px;
                border-radius: 5px;
                &::after {
                    transition: 0.15;
                    position: absolute;
                    bottom: calc(100% - 4px);
                    content: '';
                    display: block;
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: ${(p) => p.theme.palette.dark2.main};
                    pointer-events: none;
                    z-index: -1;
                    left: calc(50% - 5px);
                    transform: rotate(-135deg) translateX(50%);
                    -moz-transform: rotate(-135deg);
                    -webkit-transform: rotate(-135deg);
                }
            }
        }
    }
`

const ProgressS = styled.div`
    & {
        > .wrapper {
            flex: 1;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;
        }
    }
`
const ContentS = styled.div`
    & {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        row-gap: 1.5rem;
        /* max-width: 400px;
    margin: auto; */

        > div {
            grid-column: span 1;
            &.accion {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                > button {
                    width: initial;
                    flex: 1 1 40%;
                }
            }
            &.message,
            &.accion {
                grid-column: span 2;
            }
            &.progress {
                grid-row: span 2;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            &.monto {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
                > p {
                    font-size: 1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                > span {
                    font-weight: 500;
                    font-size: 1.3rem;
                    color: ${(p) => p.theme.palette.dark2.main};
                    &.dark-ligth {
                        color: inherit;
                        font-weight: 400;
                    }
                    &.active {
                        color: ${(p) => p.theme.palette.success2.main};
                        font-size: 1rem;
                        text-transform: lowercase;
                        &::first-letter {
                            text-transform: uppercase;
                        }
                    }
                }
            }
        }

        ${MEDIA_QUERIES.min_width.tabletS} {
            grid-template-columns: repeat(3, 1fr);
            > div {
                grid-column: span 1;
                &.message {
                    grid-column: span 3;
                }
                &.vas-apostando,
                &.pendiente-por-apostar {
                    order: -1;
                }
                &.rollover {
                    order: -2;
                }
                &.monto-entregado,
                &.objetivo-rollover {
                    order: -2;
                }
            }
        }
        ${MEDIA_QUERIES.min_width.desktopM} {
            grid-template-columns: repeat(4, 1fr);
            && {
                > div {
                    &.monto-entregado,
                    &.objetivo-rollover,
                    &.rollover,
                    &.progress {
                        order: -3;
                    }
                    &.message {
                        grid-column: span 4;
                    }
                }
            }
        }
    }
`
const AccordionS = styled(Accordion)`
    & {
        overflow: hidden;
        border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        border-radius: 8px !important;
        margin: 0 !important;
        box-shadow: none !important;
    }
`
const AccordionSummaryS = styled(AccordionSummary)`
    & {
        min-height: auto !important;
        /* padding-top: 9px !important;
    padding-bottom: 9px !important; */
        padding: 0 !important;
        > .MuiAccordionSummary-content {
            margin: 0 !important;
        }
        svg {
            color: ${(p) => p.theme.palette.primary.main};
        }
    }
`
const ContentTopS = styled.div`
    & {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        flex: 1;
        padding: 7px;
    }
`
const IDS = styled.div`
    & {
        color: ${(p) => p.theme.palette.primary.main};
        white-space: nowrap;
        font-weight: 500;
    }
`
const TitleS = styled.div`
    & {
        color: ${(p) => p.theme.palette.dark2.main};
        font-weight: 500;
        display: flex;
        align-items: center;
        flex: 1;

        > span.title {
            flex: 1;
            width: 40vw;
            /* max-width: 170px; */
            text-overflow: ellipsis;
            overflow: hidden;
        }
        &::before {
            content: '';
            width: 12px;
            height: 12px;
            position: relative;
            display: block;
            border-radius: 50%;
            margin-right: 10px;
        }
        &.active {
            ::before {
                background: ${(p) => p.theme.palette.success.main};
            }
        }
        &.pending {
            ::before {
                background: ${(p) => p.theme.palette.secondary.main};
            }
        }
    }
`

const BonoCardS = styled.div`
    & {
        background: white;
        padding: 1rem;
        border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        border-radius: 8px;
    }
`
const ShowMoreS = styled.div`
    & {
        /* margin-top: 5px; */
        display: flex;
        flex-direction: row;
        justify-content: center;
        transition: 150ms;
        align-items: center;
        color: ${(p) => p.theme.palette.alternate15.main};
        background: ${(p) => p.theme.palette.alternate20.main};
        padding: 4px;
        background: ${(p) => p.theme.palette.secondary.main};

        :hover {
            background: ${(p) => p.theme.palette.secondary.main};
            /* color: white; */
        }
        ${(p) => {
            if (p.$acitve) {
                return css`
                    background: ${(p) => p.theme.palette.secondary.main};
                    /* color: white; */
                `
            }
        }}
    }
`
