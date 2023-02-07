import React, { useState } from 'react'
import _EstadoSolicitud from 'components/retirar/estado-de-solicitud/EstadoSolicitud'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Modal } from '@mui/material'
import { userSelector } from 'states/features/slices/userSlice'
import { useCancelPayoutMutation } from 'states/calimaco/calimacoDataApi'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import CancelIcon from '@mui/icons-material/Cancel'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

const CardSMobile = (props) => {
    const { getHistory } = props
    const user = useSelector(userSelector)
    const [open, setOpen] = useState(false)
    const [smsAlert, setSmsAlert] = useState(false)
    const [cancelRetiros] = useCancelPayoutMutation()
    const { t } = useTranslation()

    const handleCancel = async (item) => {
        const response = await cancelRetiros({
            company: 'ATP',
            session: user?.session,
            operation: item.operation,
        })

        if (response.data.result === 'OK') {
            setOpen(true)
            setSmsAlert('¡El retiro ha sido cancelado a su solicitud!')
        } else if (response.data.result === 'error') {
            setOpen(true)
            setSmsAlert(response.data.description)
        }
    }

    const dtCancelar = async (e) => {
        setOpen(false)
    }

    return (
        <>
            <HistoryCardsS>
                {getHistory &&
                    getHistory.map((item, i) => {
                        return (
                            <CardSM key={i}>
                                <div className="TitiloCard">{item.operation}</div>
                                <LineS></LineS>

                                <div className="Contenedor1">
                                    <div className="Secciones">
                                        <div className="TextTitulo">Estado</div>
                                        <div className="TextContent">{t(item.status)}</div>
                                    </div>
                                    <div className="Secciones">
                                        <div className="TextTitulo">Fecha y hora</div>
                                        <div className="TextContent">
                                            {format(new Date(item.operation_date), "dd-MM-yyyy hh:mm aaaaa'm'")}
                                        </div>
                                    </div>
                                </div>
                                <LineS></LineS>

                                <div className="Contenedor1">
                                    <div className="Secciones">
                                        <div className="TextTitulo">Monto</div>
                                        <div className="TextContent">
                                            {new Intl.NumberFormat('es-PE', {
                                                style: 'currency',
                                                currency: 'PEN',
                                                maximumFractionDigits: 2,
                                            }).format(item.amount / 100)}
                                        </div>
                                    </div>
                                    <div className="Secciones">
                                        <div className="TextTitulo">Medio de Pago</div>
                                        <div className="TextContent">{t(item.method_name)}</div>
                                    </div>
                                </div>
                                <LineS></LineS>

                                <div className="Contenedor1">
                                    <div className="Secciones">
                                        <div className="TextTitulo">Acción</div>
                                        <div className="TextContent">
                                            {item.status === 'NEW' ? (
                                                <ButtonS
                                                    color="primary"
                                                    endIcon={<CancelIcon />}
                                                    onClick={() => handleCancel(item)}
                                                    size="large"
                                                    variant="contained"
                                                >
                                                    Cancelar
                                                </ButtonS>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="Secciones"></div>
                            </CardSM>
                        )
                    })}

                <ModalS onClose={() => setOpen(false)} open={open}>
                    <ModalWrapperS>
                        <BackAndCloseS>
                            <ButtonS></ButtonS>
                            <LocationS> </LocationS>
                            <Button className="close" onClick={dtCancelar} variant="contained">
                                <CloseIcon></CloseIcon>
                            </Button>
                        </BackAndCloseS>
                        <CardFooterS>
                            <div className="TextModalAuto">{t(smsAlert)}</div>
                            <div className="ContenedorBotones"></div>
                        </CardFooterS>
                    </ModalWrapperS>
                </ModalS>
            </HistoryCardsS>
        </>
    )
}

export default CardSMobile

const CardSM = styled('div')`
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    .TitiloCard {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6e6e73;
        padding: 20px;
    }
    .Contenedor1 {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        padding: 1.2rem;
    }
    .Secciones {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        text-align: left;
    }

    .TextContent {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 17px;
        color: #6e6e73;
    }
    .TextTitulo {
        font-weight: 400;
        font-size: 0.8rem;
        line-height: 10px;
        color: #6e6e73;
    }
    .TextContent2 {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 17px;
        color: #ff0000;
    }
`
const LineS = styled.div`
    & {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        border: 1px solid #d9d9d9;
        width: 90%;
    }
`
const ButtonS = styled(Button)`
    & {
        text-transform: capitalize;
        font-size: 1rem;
    }
    ${MEDIA_QUERIES.min_width.tabletS} {
        & {
            text-transform: capitalize;
            font-size: 1rem;
            width: 140px;
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
    border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
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
const LocationS = styled.div`
    & {
        font-size: 0.95rem;
    }
`
const CardFooterS = styled.div`
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
const HistoryCardsS = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
