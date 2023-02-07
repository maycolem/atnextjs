import React from 'react'
import _EstadoSolicitud from 'components/retirar/estado-de-solicitud/EstadoSolicitud'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import classNames from 'classnames'
import { customFormatDateLocation } from '@helpers/customFormatDateLocation'
import { currency, currencyAT } from '@helpers/currency'

export const Cards = ({ data, typMove, handleMetodo, handleJuegoDeportivas, handleSaldo }) => {
    const { t } = useTranslation()

    return (
        <>
            <Styled>
                {data.map((item, i) => {
                    return (
                        <StyledItem key={i}>
                            <div className="title-id">{item.operation}</div>
                            <StyledItemContent>
                                <div className="row">
                                    <div className="title">ID MOVIMIENTO</div>
                                    <div className="row-content">{item.operation}</div>
                                </div>

                                <div className="row">
                                    <div className="title">FECHA Y HORA</div>
                                    <div className="row-content">{customFormatDateLocation(item.operation_date)}</div>
                                </div>

                                <div className="row">
                                    <div className="title">TIPO DE MOVIMIENTO</div>
                                    <div className="row-content">{typMove(item)}</div>
                                </div>

                                <div className="row">
                                    <div className={'title'}>MÉTODO</div>
                                    <div>
                                        {handleJuegoDeportivas(item)} {t(handleMetodo(item))}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="title">MONTO</div>
                                    <div className={classNames('row-content amount', { negative: item.amount < 0 })}>
                                        {currencyAT(item.amount)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="title">SALDO</div>
                                    <div className="row-content">{currencyAT(handleSaldo(item))}</div>
                                </div>
                            </StyledItemContent>
                        </StyledItem>
                    )
                })}
            </Styled>
        </>
    )
}

const StyledItem = styled.div`
    & {
        border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        border-radius: 8px;
        padding: 10px;
        padding-bottom: 0;
        background: ${(p) => p.theme.palette.light.main};
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        gap: 10px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 10px;

        .title-id {
            text-align: center;
            font-feature-settings: 'tnum';
            font-weight: 400;
        }
    }
`
const StyledItemContent = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    display: grid;
    position: relative;
    top: 1px;
    border-top: 1px solid ${(p) => p.theme.palette.alternate8.main};
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));

    ${MEDIA_QUERIES.min_width.tabletS} {
        grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
    }
    .row {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
        padding-bottom: 7px;
        padding-top: 7px;
        padding-left: 0;
        padding-right: 10px;

        .title {
            font-size: 0.75rem;
            /* color: ${(p) => p.theme.palette.alternate5.main}; */
            text-transform: uppercase;
            color: #1a1b25;
            font-weight: 500;
            /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
        }
        .row-content {
            &.negative {
                color: ${(p) => p.theme.palette.primary.main};
            }

            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #6e6e73;
            font-size: 0.95rem;
            font-feature-settings: 'tnum';
        }
    }
`
const Styled = styled.div`
    /* background: ${(p) => p.theme.palette.alternate12.main}; */
    padding: 1rem 1rem;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
`
