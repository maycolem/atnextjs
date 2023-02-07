import { format } from 'date-fns'
import { customFormatDateLocation } from 'helpers/customFormatDateLocation'
import { Parser } from 'html-to-react'
import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { RankingPoint } from '../../../torneos/RankingPoint'

const TorneoCard = ({ tournament: t }) => {
    // const customFormatDateLocation = (dateCreated) => {
    //   if (!dateCreated) return ''
    //   const rest = new Date(dateCreated.replace(' ', 'T'))
    //   // const fromDate = new Date('2022-08-06T02:00:00')
    //   // if (rest > fromDate) {
    //   //   rest.setHours(rest.getHours() - 5)
    //   // }
    //   rest.setHours(rest.getHours() - 5)
    //   const resultFormatDate = format(rest, "dd-MM-yyyy hh:mm aaaaa'm'")
    //   // TODO: RESTAR 5 horas apartir del 6 de agostro del 2022 alas 02:00 horas.
    //   return `${resultFormatDate}`
    // }
    return (
        <TorneoCardS>
            <div className="id">{t.tournament?.summary_title}</div>
            {/* <div className="nombre">
        <span className="title">Nombre</span>
        <span>{t.tournament?.summary_title}</span>
      </div> */}
            <div className="fecha-inicio">
                <span className="title">Fecha y hora inicio</span>
                {t?.tournament?.init_date && <span> {customFormatDateLocation(t?.tournament?.init_date)}</span>}
            </div>
            <div className="fecha-fin">
                <span className="title">Fecha y hora fin</span>
                {t?.tournament?.end_date && <span>{customFormatDateLocation(t?.tournament?.end_date)}</span>}
            </div>
            <div className="fecha-inscription">
                <span className="title">Fecha y hora inscripción</span>
                {t?.acceptance_date && <span>{customFormatDateLocation(t?.acceptance_date)}</span>}
            </div>
            {/* <div className="fecha-calificacion">
        <span className="title">Fecha y hora calificación</span>
        <span>{t?.created_date && customFormatDateLocation(t?.created_date)}</span>
      </div> */}
            <div className="puntos">
                <span className="title">Puntos</span>
                <span>{RankingPoint(t?.amount / 1000)}</span>
            </div>
            <div className="rankin">
                <span className="title">Ranking</span>
                <span>{t?.position > -1 ? t?.position : '--'}</span>
            </div>
            <div className="premio">
                <span className="title">Premio (según ranking)</span>
                {t?.prize?.prize_amount && (
                    <span className="active">
                        {new Intl.NumberFormat('es-PE', {
                            style: 'currency',
                            currency: 'PEN',
                            maximumFractionDigits: 2,
                        }).format(t?.prize?.prize_amount / 100)}
                    </span>
                )}
            </div>
            <div className="informacion">
                <span className="title">Mas información</span>
                {Parser().parse(t?.tournament?.summary_body)}
            </div>
        </TorneoCardS>
    )
}

export default TorneoCard

const TorneoCardS = styled.div`
    & {
        background: white;
        border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        border-radius: 8px;
        padding: 0 1rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        > div {
            grid-column: span 1;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            border-top: 1px solid ${(p) => p.theme.palette.alternate8.main};
            padding: 1rem;
            > .title {
                font-size: 0.8rem;
                color: ${(p) => p.theme.palette.alternate13.main};
            }
            &.id {
                border-color: transparent;
                text-align: center;
            }
            &.premio {
                > .active {
                    color: ${(p) => p.theme.palette.success2.main};
                }
            }
            &.informacion {
                > a {
                    color: ${(p) => p.theme.palette.primary.main};
                }
            }
            &.id,
            &.informacion {
                grid-column: span 2;
            }
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: repeat(3, 1fr);
            > div {
                &.premio {
                    grid-column: span 1;
                }
                &.id,
                &.informacion {
                    grid-column: span 3;
                }
            }
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            /* grid-template-columns: repeat(4, 1fr);
      > div {
        &.premio {
          grid-column: span 1;
        }
        &.id,
        &.informacion {
          grid-column: span 4;
        }
      } */
        }
    }
`
