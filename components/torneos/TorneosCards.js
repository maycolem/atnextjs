import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import { format } from 'date-fns'
import TorneoCuentaRegresiva from './TorneoCuentaRegresiva'
import { useEnRollTournamentMutation } from 'states/calimaco/calimacoDataApi'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { LoadingButton } from '@mui/lab'
import { setOpen } from 'states/features/slices/LoginModalSlice'
import torneoFAKEIMG from 'components/torneos/borrar_imagen_prueba_torneo/borrar_torneofake.jpeg'
import torneoFAKEandreaIMG from 'components/torneos/borrar_imagen_prueba_torneo/prueba_andrea_torneo.jpeg'
import { currencyAT } from 'helpers/currency'
import { customFormatDateLocation } from 'helpers/customFormatDateLocation'
const TorneoCard = ({ item }) => {
    const [enRoll, { data: dataEnRoll, isLoading }] = useEnRollTournamentMutation()
    const dispatch = useDispatch()
    const [isEnrolled, setIsEnrolled] = useState(!item?.to_be_enrolled)
    const user = useSelector(userSelector)
    const handleOnEnRoll = (tournament) => async () => {
        const data = await enRoll({ session: user?.session, tournament })
        if (data?.data?.result === 'OK') {
            setIsEnrolled(true)
        }
    }
    useEffect(() => {
        setIsEnrolled(!item?.to_be_enrolled)
    }, [user, item])

    return (
        <TorneoCardS>
            <RowImageS $bg={`${process.env.REACT_APP_WEB_BASE}/${item?.cms?.summary_image?.replaceAll(' ', '%20')}`}>
                <div className="wrapper">
                    {/* TODO: actualizar la imagen fake */}
                    <a href={`https://www.apuestatotal.com/torneos/${item.tournament}/`} target="_blank">
                        <img alt={item?.cms?.summary_title} src={`${process.env.REACT_APP_WEB_BASE}/${item?.cms?.summary_image}`} />
                    </a>
                    {/* <img alt={item?.cms?.summary_title} src={`${torneoFAKEandreaIMG.src}`} /> */}
                </div>
            </RowImageS>
            <ContentS>
                <TitleTorneoS className="title">{item?.cms?.summary_title}</TitleTorneoS>
                <TimerS className="timer" end={item?.end_date} init={item?.init_date} />
                <FondoPremioS className="premio">
                    <div className="top">Fondo de premio</div>
                    <div className="bottom">
                        {Intl.NumberFormat('es-PE', {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                        }).format(Number(item.prize) / 100)}{' '}
                        <span>PEN</span>
                    </div>
                </FondoPremioS>
                <RowS className="ganadores">
                    <span className="top">Ganadores</span>
                    <span className="bottom">{item?.winners}</span>
                </RowS>
                <RowS className="date-init">
                    <span className="top">Fecha inicio</span>
                    {/* TODO//: borrar esto */}
                    {/* {'23-09-2022 00:00 pm'} */}
                    {/* <span className="bottom">{format(new Date(item?.init_date), "dd-MM-yyyy hh:mm aaaaa'm'")}</span> */}
                    {/* <p>{item?.init_date}</p> */}
                    <span className="bottom">{customFormatDateLocation(item?.init_date)}</span>
                </RowS>
                <RowS className="date">
                    <span className="top">Fecha fin</span>
                    {/* TODO//: borrar esto */}
                    {/* {'15-10-2022 23:59 pm'}  */}
                    {/* <span className="bottom">{format(new Date(item?.end_date), "dd-MM-yyyy hh:mm aaaaa'm'")}</span> */}
                    <span className="bottom">{customFormatDateLocation(item?.end_date)}</span>
                </RowS>
                <RowS className="requisitos">
                    {/* TODO requisitos esto esta faltando  */}
                    <span className="top">Requisitos para clasificar</span>
                    <span className="bottom">
                        {/* {item?.min_rounds}  */}
                        Jugadas de S/ {(item?.min_amount / 100).toFixed(2)}
                    </span>
                </RowS>
                <AccionS className="more-inform">
                    <Link
                        href={{
                            pathname: PATHS.TORNEO_DETAIL.url,
                            query: {
                                nameTorneo: item?.tournament,
                            },
                        }}
                    >
                        <Button fullWidth variant="outlined">
                            Más información
                        </Button>
                    </Link>
                </AccionS>
                <AccionS className="unirme-ahora">
                    {user?.session ? (
                        <LoadingButton
                            disabled={isEnrolled || isLoading}
                            fullWidth
                            loading={isLoading}
                            onClick={handleOnEnRoll(item?.tournament)}
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
            </ContentS>
        </TorneoCardS>
    )
}
const TorneosCards = ({ data = [] }) => {
    const computedData = () => {
        let res = []
        res = data?.filter((item) => {
            const endDate = new Date(item?.end_date)
            if (endDate < new Date()) {
                return false
            }
            return item
        })
        return res ?? []
    }
    // Pronto anunciaremos nuestro siguiente torneo
    // TODO CAMBIAR DATA POR COMPUTED
    return computedData().length > 0 ? (
        // return data.length > 0 ? (
        <TorneosCardsS>
            {computedData().map((item, i) => {
                // {data.map((item, i) => {
                return <TorneoCard item={item} key={i}></TorneoCard>
            })}
        </TorneosCardsS>
    ) : (
        <NotData>
            <span>Pronto anunciaremos nuestro siguiente torneo</span>
        </NotData>
    )
}

export default TorneosCards
const NotData = styled.div`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
            flex: 1;
            font-size: 1.1rem;
            text-align: left;
            color: ${(p) => p.theme.palette.alternate16.main};
        }
    }
`
const TitleTorneoS = styled.div`
    font-size: 1.3rem;
    font-weight: 500;
    color: ${(p) => p.theme.palette.dark3.main};
    text-transform: uppercase;
    min-height: 3rem;
    /* white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; */
`
const RowS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
        > .top {
            font-size: 0.7rem;
            color: ${(p) => p.theme.palette.alternate16.main};
        }
        > .bottom {
            font-size: 0.9rem;
            font-weight: 500;
            color: ${(p) => p.theme.palette.dark3.main};
            white-space: nowrap;
        }
    }
`

const ContentS = styled.div`
    & {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        padding: 1rem 0;
        flex: 1 1 60%;
        ${TitleTorneoS} {
            grid-column: span 2;
            order: -1;
        }
        > .premio {
            order: -1;
        }
        > .timer {
            order: -1;
        }
        > .date,
        > .date-init {
            order: -1;
        }
        ${RowS}.requisitos {
            grid-column: span 1;
        }

        ${MEDIA_QUERIES.min_width.tabletS} {
        }
    }
`
const RowImageS = styled.div`
    & {
        /* flex: 1 1 40%; */
        overflow: hidden;
        display: flex;
        > .wrapper {
            /* background-image: url(${(p) => p.$bg}); */
            overflow: hidden;
            display: flex;
            /* max-height: 190px; */
            flex: 1;

            > img {
                /* backdrop-filter: blur(20px); */
                object-fit: initial;
                display: block;
                margin: auto;
                cursor: pointer;
            }
            ${MEDIA_QUERIES.min_width.desktopS} {
                /* max-height: 250px; */
            }
        }
        /* display: block !important;
    min-height: 200px;
    > img {
      object-fit: contain;
    } */
    }
`
const TorneoCardS = styled.div`
    & {
        display: flex;
        flex-direction: column;
    }
`
const TimerS = styled(TorneoCuentaRegresiva)``

const TorneosCardsS = styled.div`
    & {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: calc(1rem + 0.4vw);
        ${MEDIA_QUERIES.min_width.mobileL} {
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        }
    }
`
const AccionS = styled.div`
    & {
        button {
            text-transform: lowercase;
            display: block;
            ::first-letter {
                text-transform: uppercase;
            }
        }
    }
`

const FondoPremioS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 3px;
        > .top {
            font-size: 0.7rem;
            color: ${(p) => p.theme.palette.alternate16.main};
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
