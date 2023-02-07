import { customFormatDateLocation } from '@helpers/customFormatDateLocation'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import CancelIcon from '@mui/icons-material/Cancel'
import DoneIcon from '@mui/icons-material/Done'
import hexAlpha from 'hex-alpha'
import { currency } from '@helpers/currency'
import { LoadingButton } from '@mui/lab'

export const Cards = ({ data, loading, cancel }) => {
    const { t } = useTranslation()
    return (
        <Styled>
            {data.map((item, i) => {
                return (
                    <StyledItem key={i}>
                        <div className="title-id">{item.operation}</div>
                        <StyledItemContent>
                            <div className="row">
                                <div className="title">ESTADO</div>
                                <div className="row-content">
                                    <p className={item.status}>
                                        {t(item.status)}{' '}
                                        {['TO_BE_PROCESSED', 'PROCESSED', 'PROCCESED', 'NEW', 'ACCEPTED'].includes(item.status) ? (
                                            <DoneIcon />
                                        ) : (
                                            <CancelIcon />
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="title">ID</div>
                                <div className="row-content">{item.operation}</div>
                            </div>

                            <div className="row">
                                <div className="title">FECHA Y HORA</div>
                                <div className="row-content">{customFormatDateLocation(item.operation_date)}</div>
                            </div>

                            <div className="row">
                                <div className={'title'}>MONTO</div>
                                <div className={classNames('row-content amount', { negative: item.amount < 0 })}>
                                    {currency(item.amount)}
                                </div>
                            </div>

                            <div className="row">
                                <div className="title">MEDIO PAGO</div>
                                <div className="row-content">{t(item.method_name)}</div>
                            </div>
                            <div className="row">
                                <div className="title">ACCIÓN</div>
                                <div className="row-content">
                                    {(item.status === 'ACCEPTED' && item.method === 'ATPAYMENTSERVICE_PAYOUT') || item.status === 'NEW' ? (
                                        <div>
                                            <StyledLoadingButton
                                                style={{ textTransform: 'initial' }}
                                                endIcon={<CancelIcon />}
                                                loading={loading}
                                                onClick={() => cancel(item)}
                                                size="large"
                                                variant="contained"
                                            >
                                                Cancelar
                                            </StyledLoadingButton>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </StyledItemContent>
                    </StyledItem>
                )
            })}
        </Styled>
    )
}
const StyledLoadingButton = styled(LoadingButton)`
    && {
        font-size: 1rem;
        margin: initial;
        line-height: initial;
        svg {
            font-size: 1.2rem;
        }
    }
`
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
            text-transform: uppercase;
            color: #1a1b25;
            font-weight: 500;
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
            p {
                background: ${(p) => p.theme.palette.alternate9.main};
                max-width: fit-content;
                padding: 2px 6px;
                border-radius: 2px;
                display: flex;
                align-items: center;
                gap: 5px;
                &.TO_BE_PROCESSED,
                &.PROCESSED,
                &.PROCCESED,
                &.NEW,
                &.ACCEPTED {
                    background: ${(p) => hexAlpha(p.theme.palette.success2.light, 0.2)};
                    color: ${(p) => p.theme.palette.success2.dark};
                }
                > svg {
                    font-size: 0.9rem;
                }
            }
        }
    }
`
const Styled = styled.div`
    padding: 1rem 1rem;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
`
