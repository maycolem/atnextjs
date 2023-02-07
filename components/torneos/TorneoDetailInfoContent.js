/* eslint-disable camelcase */
import { LoadingButton } from '@mui/lab'
import { Alert, Button } from '@mui/material'
import { format } from 'date-fns'
import { customFormatDateLocation } from 'helpers/customFormatDateLocation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEnRollTournamentMutation } from 'states/calimaco/calimacoDataApi'
import { setOpen } from 'states/features/slices/LoginModalSlice'
import { userSelector } from 'states/features/slices/userSlice'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import TorneoCuentaRegresiva from './TorneoCuentaRegresiva'

const TorneoDetailInfoContent = ({ tournament, title, init, end, winners, prize, minAmount, minRounds, to_be_enrolled = true }) => {
    const dispatch = useDispatch()
    const [enRoll, { data: dataEnRoll, isLoading }] = useEnRollTournamentMutation()
    const [isEnrolled, setIsEnrolled] = useState(!to_be_enrolled)
    const user = useSelector(userSelector)
    const handleOnEnRoll = (tournament) => async () => {
        const data = await enRoll({ session: user?.session, tournament })
        if (data?.data?.result === 'OK') {
            setIsEnrolled(true)
        }
    }
    useEffect(() => {
        setIsEnrolled(!to_be_enrolled)
    }, [to_be_enrolled, user])

    const date = new Date()
    const rest = new Date(end?.replace(' ', 'T'))
    rest.setHours(rest.getHours() - 5)

    return (
        <ContentS>
            <TitleTorneoS className="title">{title}</TitleTorneoS>
            <FondoPremioS className="premio">
                <div className="top">Fondo de premio</div>
                <div className="bottom">
                    {Intl.NumberFormat('es-PE', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    }).format(Number(prize) / 100)}{' '}
                    <span>PEN</span>
                </div>
            </FondoPremioS>
            {rest < date ? <Alert severity="error">Torneo finalizado</Alert> : <TimerS className="timer" end={end} init={init} />}

            <RowS className="ganadores">
                <span className="top">Ganadores</span>
                <span className="bottom">{winners}</span>
            </RowS>
            <AccionS className="unirme">
                {rest < date ? null : user?.session ? (
                    <LoadingButton
                        disabled={isEnrolled || isLoading}
                        fullWidth
                        loading={isLoading}
                        onClick={handleOnEnRoll(tournament)}
                        variant="contained"
                    >
                        {isEnrolled ? 'Ya estás unido' : 'Unirme ahora'}
                    </LoadingButton>
                ) : (
                    <LoadingButton
                        fullWidth
                        loading={isLoading}
                        onClick={() => {
                            dispatch(setOpen())
                        }}
                        variant="contained"
                    >
                        Unirme ahora
                    </LoadingButton>
                )}
            </AccionS>
            <RowS className="date-init">
                <span className="top">Fecha inicio</span>
                {/* TODO//: borrar esto */}
                {/* {'23-09-2022 00:00 pm'} */}
                {init && <span className="bottom">{customFormatDateLocation(init)}</span>}
            </RowS>
            <RowS className="date">
                <span className="top">Fecha fin</span>
                {/* TODO//: borrar esto */}
                {/* {'15-10-2022 23:59 pm'} */}
                {end && <span className="bottom">{customFormatDateLocation(end)}</span>}
            </RowS>
            <RowS className="requisitos">
                <span className="top">Requisitos para clasificar</span>
                <span className="bottom">
                    {minRounds} Jugadas desde S/{(minAmount / 100).toFixed(2)}
                </span>
            </RowS>
        </ContentS>
    )
}

export default TorneoDetailInfoContent
const AccionS = styled.div`
    & {
        > button {
            display: block;
            text-transform: lowercase;
            ::first-letter {
                text-transform: uppercase;
            }
        }
    }
`
const RowS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
        > .top {
            font-size: 0.7rem;
        }
        > .bottom {
            font-size: 0.9rem;
            font-weight: 500;
            color: ${(p) => p.theme.palette.dark2.main};
        }
    }
`
const TimerS = styled(TorneoCuentaRegresiva)`
    display: grid;
    grid-template-columns: 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 1fr;
    > .points {
        text-align: center;
        align-self: center;
    }
`
const TitleTorneoS = styled.div`
    font-size: 1.3rem;
    font-weight: 500;
    text-transform: uppercase;
`
const FondoPremioS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
        > .top {
            font-size: 0.7rem;
        }
        > .bottom {
            font-size: 1.2rem;
            font-weight: 500;
            color: ${(p) => p.theme.palette.primary.main};
            > span {
                font-weight: 300;
            }
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            > .bottom {
                font-size: calc(1.3rem + 0.1vw);
            }
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            > .bottom {
                font-size: calc(1.5rem + 0.2vw);
            }
        }
    }
`

const ContentS = styled.div`
    & {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        ${TitleTorneoS} {
            grid-column: span 2;
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: repeat(2, 1fr);

            > .banner,
            > .details {
                order: -1;
            }
            > .games {
                grid-column: span 2;
            }
            > .puesto,
            > .more-datail {
                grid-column: span 2;
            }
        }
        ${MEDIA_QUERIES.min_width.desktopXS} {
            > .banner {
                padding-right: 2rem;
            }
            > .more-datail {
                width: 100%;
                max-width: 1100px;
                margin: auto;
            }
            > .premios {
                width: 100%;
                max-width: 450px;
                margin-left: auto;
            }
            > .clasificacion {
                width: 100%;
                max-width: 450px;
                margin-right: auto;
            }
        }
    }
`
