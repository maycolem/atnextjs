import { customFormatDateLocation } from 'helpers/customFormatDateLocation'
import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { RankingPoint } from './RankingPoint'

const TorneoDetailMoreDetails = ({ status, initDate, endDate, totalPLayers, position, isEnrolled, userPosition, userAmount }) => {
    const user = useSelector(userSelector)

    const customStatus = () => {
        if (user && isEnrolled) {
            return Number(position) < 0 ? 'NO CLASIFICADO' : 'CLASIFICADO'
        } else {
            return 'NO CLASIFICADO'
        }
    }

    return (
        <TorneoDetailMoreDetailsS>
            <RowS className="estado">
                <div className="top top-estado">Estado</div>
                <div className="bottom en-vivo bottom-estado">{customStatus()}</div>
            </RowS>
            <RowS className="puesto puesto-icono">
                <div className="top top-puesto">
                    <EmojiEventsIcon></EmojiEventsIcon>
                </div>
                <div className="bottom bottom-puesto">
                    <div>
                        Tienes {RankingPoint(userAmount / 1000)} puntos
                        {userPosition > -1 ? <span className="puesto-bold"> y estás en el puesto {userPosition}</span> : ''}
                    </div>
                </div>
            </RowS>
            {/* <RowS className="inicio-registro">
        <div className="top">INICIO - FINALIZACIÓN DE REGISTRO</div>
        <div className="bottom">
          <span>{customFormatDateLocation(initDate)}</span>
          <span>{customFormatDateLocation(endDate)}</span>
        </div>
      </RowS>
      <RowS className="inicio-torneo">
        <div className="top">INICIO - FINALIZACIÓN DE TORNEO</div>
        <div className="bottom">
          <span>{customFormatDateLocation(initDate)}</span>
          <span>{customFormatDateLocation(endDate)}</span>
        </div>
      </RowS> */}
            <RowS className="jugadores">
                <div className="top top-jugadores">JUGADORES</div>
                <div className="bottom bottom-jugadores">{totalPLayers}</div>
            </RowS>
            {/* <RowS className="buy">
        <div className="top">BUY-IN + TARIFA</div>
        <div className="bottom">0 PEN</div>
      </RowS> */}
            {/* <RowS className="min-spin">
        <div className="top">MIN - MAX SPINS</div>
        <div className="bottom">1 - ∞</div>
      </RowS>
      <RowS className="min-apuesta">
        <div className="top">MIN - MAX APUESTA</div>
        <div className="bottom">0.75 - ∞ PEN</div>
      </RowS> */}
        </TorneoDetailMoreDetailsS>
    )
}

export default TorneoDetailMoreDetails
const RowS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        > .top {
            font-size: 0.6rem;
            text-transform: uppercase;
            padding: 0 0.5rem;
            min-height: 30px;
            color: ${(p) => p.theme.palette.alternate16.main};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;

            &.top-estado {
                justify-content: start;
            }
            &.top-jugadores {
                justify-content: end;
            }
        }
        > .bottom {
            flex: 1;
            background: white;
            padding: 0.5rem;
            /* min-height: 40px; */
            min-height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 30px;

            color: ${(p) => p.theme.palette.alternate16.main};
            &.en-vivo {
                color: ${(p) => p.theme.palette.primary.main};
            }
            &.bottom-estado {
                justify-content: start;
            }
            &.bottom-jugadores {
                justify-content: end;
            }
        }
        ${MEDIA_QUERIES.min_width.tabletS} {
            > .top,
            > .bottom {
                min-height: 50px;
            }
        }
    }
`
const TorneoDetailMoreDetailsS = styled.div`
    & {
        display: grid;
        grid-template-columns: 1fr 1fr;
        /* grid-auto-rows: 1fr; */
        > .estado {
            order: -2;
        }

        > .jugadores {
            order: -1;
            text-align: right;
        }
        > .puesto {
            grid-column: span 2;
        }
        > .puesto-icono {
            text-align: center;
        }

        ${MEDIA_QUERIES.min_width.tabletS} {
            grid-template-columns: 1fr 1fr 1fr;
            > .puesto {
                grid-column: span 1;
            }
            > .jugadores {
                order: initial;
                text-align: right;
            }
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: 1fr 1fr 1fr;
        }
        /* ${MEDIA_QUERIES.min_width.desktopS} {
      grid-template-columns: repeat(4, 1fr);
      border: 1px solid ${(p) => p.theme.palette.alternate8.main};
      overflow: hidden;
      border-radius: 5px;
      > ${RowS} {
        grid-column: span 1;
        .bottom {
          padding: 1rem;
          white-space: nowrap;
        }
        .top {
          padding: 1rem;
          border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
        }
      }
    } */
    }
`
