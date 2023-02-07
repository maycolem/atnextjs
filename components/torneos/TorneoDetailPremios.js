/* eslint-disable camelcase */
import { Accordion, AccordionDetails, AccordionSummary, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import AddIcon from '@mui/icons-material/Add'
import { RankingPoint } from './RankingPoint'
const TorneoDetailPremios = ({ title, icon: Icon, haveId, ranking = [] }) => {
    const tabletL = useMediaQuery(MEDIA_QUERIES.min_width.tabletL)
    const refContentRanking = useRef()
    const [offset, setOffset] = useState(20)
    const [expanded, setExpanded] = useState(false)
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }
    useEffect(() => {
        if (tabletL) {
            setExpanded(tabletL)
        }
    }, [tabletL])
    // const curtAlias = (alias = 'anonimo') => {
    //   console.log(alias.length)
    // }
    // curtAlias()
    useEffect(() => {
        if (refContentRanking?.current) {
            const contentRanking = document.getElementsByClassName(`${refContentRanking.current.className}`)[0]
            contentRanking.onscroll = (e) => {
                const isEnd = contentRanking.offsetHeight + contentRanking.scrollTop >= contentRanking.scrollHeight
                if (isEnd) {
                    setOffset(offset + 20)
                }
            }
        }
    }, [refContentRanking, offset])

    return (
        <AccordionS expanded={expanded === true} onChange={handleChange(true)}>
            <AccordionSummaryS
                $tabletL={tabletL}
                aria-controls="panel1bh-content"
                expandIcon={tabletL ? null : <AddIcon />}
                id="panel1bh-header"
            >
                <ContentTopS>
                    <Icon className="left-icon"></Icon>
                    <TitleS $haveId={haveId}>
                        <span>{title}</span>
                        {haveId && <span>Puntos</span>}
                    </TitleS>
                </ContentTopS>
            </AccordionSummaryS>
            <AccordionDetails>
                <ContentS $haveId={haveId} ref={refContentRanking}>
                    {ranking.slice(0, offset).map(({ position, alias, amount, prize_amount, from_position, to_position, user }, i) => {
                        return (
                            <div className="premio-lugar" key={i}>
                                <div className="left">
                                    {haveId && <IdS>{position}</IdS>}
                                    {user?.split('.')[1]}
                                    <IdS>
                                        {from_position} {from_position !== to_position ? `- ${to_position}` : ''}
                                    </IdS>
                                </div>

                                <div className="right">
                                    {haveId
                                        ? RankingPoint(amount / 1000)
                                        : new Intl.NumberFormat('es-PE', {
                                              style: 'currency',
                                              currency: 'PEN',
                                              maximumFractionDigits: 2,
                                          }).format(prize_amount / 100)}
                                </div>
                            </div>
                        )
                    })}
                </ContentS>
            </AccordionDetails>
        </AccordionS>
    )
}

export default TorneoDetailPremios

const IdS = styled.div`
    display: inline-block;
    padding-left: 0.5rem;
`

const ContentS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        max-height: 270px;
        overflow: scroll;
        padding-right: 5px;

        /* overflow: overlay; */
        ::-webkit-scrollbar {
            width: 20px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: transparent;
            border: 8px solid transparent;
            border-radius: 11rem;
            box-shadow: 16px 16px 16px 16px ${(p) => p.theme.palette.alternate11.main} inset;
        }
        ::-webkit-scrollbar-track {
            position: absolute;
            right: -3rem;
            top: -5rem;
        }
        > .premio-lugar {
            display: flex;
            justify-content: space-between;
            > .left {
                font-feature-settings: 'tnum';
                ${(p) => {
                    if (p.$haveId) {
                        return css`
                            display: grid;
                            grid-template-columns: 70px 1fr;
                        `
                    }
                }}
            }
            > .right {
                font-feature-settings: 'tnum';
            }
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            padding-right: 0px;
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
        min-height: 100%;
    }
`
const AccordionSummaryS = styled(AccordionSummary)`
    & {
        min-height: 50px !important;
        > .MuiAccordionSummary-content {
            margin: 0 !important;
        }
        svg {
            color: ${(p) => p.theme.palette.primary.main};
        }
        ${(p) => {
            if (p.$tabletL) {
                return css`
                    background: ${(p) => p.theme.palette.alternate17.main};
                    border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
                `
            }
        }}
    }
`
const ContentTopS = styled.div`
    & {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: initial;
        gap: 1rem;
        flex: 1;
        > .left-icon {
            color: ${(p) => p.theme.palette.alternate16.main};
        }
    }
`

const TitleS = styled.div`
    & {
        font-weight: 500;
        color: ${(p) => p.theme.palette.alternate16.main};
        flex: 1;
        ${(p) => {
            if (p.$haveId) {
                return css`
                    padding-left: 30px;
                    padding-right: 10px;
                    display: flex;
                    justify-content: space-between;
                `
            }
        }}
    }
`
