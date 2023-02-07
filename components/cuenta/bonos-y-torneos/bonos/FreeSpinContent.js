import { LoadingButton } from '@mui/lab'
import { CircularProgress, circularProgressClasses, Fade, Modal } from '@mui/material'
import { format } from 'date-fns'
import { Parser } from 'html-to-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const FreeSpinContent = ({
    bono,
    pendiendPorApostarCustom,
    customMontoEntregado,
    objetivoRolloverCustom,
    customVasApostando,
    mapRespuesta,
    customFormatDateLocation,
    handleCancelar,
    ShowButtonReclamar,
    isLoadingActive,
    isLoadingCancel,
    openModalBonoCancel,
    setOpenModalBonoCancel,
    isStatusPending,
}) => {
    const [progressCircular, setProgressCircular] = useState(0)

    useEffect(() => {
        const vasApostando = bono?.initial_wr - bono?.wr
        const rollover = bono?.initial_wr
        const progress = ((vasApostando / rollover) * 100).toFixed(0)
        setProgressCircular(~~progress)
    }, [bono])

    // console.log(bono)

    return (
        <>
            {bono?.status !== 'PENDING' && (
                <>
                    <div className="monto monto-entregado">
                        <p>Free Spins entregados</p>
                        <span>{customMontoEntregado(bono?.initial_amount, bono?.type)}</span>
                        <span></span>
                    </div>
                </>
            )}
            <div className="message">
                {bono?.promotion?.summary_body && <MessageS>{Parser().parse(bono?.promotion?.summary_body)}</MessageS>}
            </div>
            <DateS>
                <div className="top">{isStatusPending ? 'Bono entregado' : 'Inicia'}</div>
                {customFormatDateLocation(isStatusPending ? bono?.created_date : bono?.activation_date)}
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
                                Bono <span className="bono_title">{bono?.promotion?.summary_title ?? ''}</span> será eliminado.
                            </div>
                            <div className="footer_acctions">
                                <LoadingButtonS
                                    loading={isLoadingActive || isLoadingCancel}
                                    onClick={() => handleCancelar(bono?.user_promotion_id)}
                                    variant="contained"
                                >
                                    Sí, borrar ahora!
                                </LoadingButtonS>
                                <LoadingButtonS color="dark" onClick={() => setOpenModalBonoCancel(false)} variant="contained">
                                    Cerrar
                                </LoadingButtonS>
                            </div>
                        </div>
                    </ModalSBonoContentS>
                </Fade>
            </ModalSBonoS>
        </>
    )
}

export default FreeSpinContent
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
const ButtonS = styled(LoadingButton)`
    & {
        max-width: 300px;
    }
`
