import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { randomBytes } from 'crypto'
import React from 'react'
import styled, { css } from 'styled-components'
import BANNER from '@components/pages/promociones/assets/BANNER_KUSHKI_TYC.webp'
const data = Array(100)
    .fill(null)
    .map((_, i) => ({
        id: `${randomBytes(3).toString('hex')}-${i + 1}`,
        name: `Nomber Apellido${i + 1}`,
    }))

const Main = () => {
    console.table(data)
    return (
        <Styled>
            <StyledWrapper>
                <div>
                    <img src={BANNER.src} alt="Banner Kushki" />
                    <StyledTitle>
                        <div>
                            <span data-heading="Ganadores Promo Kushki">Ganadores promo&nbsp;</span>
                            <span data-heading="Kushki">kushki</span>
                        </div>
                    </StyledTitle>
                    <StyledGridWinner>
                        <div>
                            <StyledTable>
                                <StyledHead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>NOMBRE</th>
                                    </tr>
                                </StyledHead>
                                <StyledBody>
                                    {data.slice(0, 40).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td className="id">{item.id}</td>
                                                <td>{item.name}</td>
                                            </tr>
                                        )
                                    })}
                                </StyledBody>
                            </StyledTable>
                        </div>
                        <div>
                            <StyledTable>
                                <StyledHead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>NOMBRE</th>
                                    </tr>
                                </StyledHead>
                                <StyledBody>
                                    {data.slice(40, 80).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 40 + 1}</td>
                                                <td className="id">{item.id}</td>
                                                <td>{item.name}</td>
                                            </tr>
                                        )
                                    })}
                                </StyledBody>
                            </StyledTable>
                        </div>
                        <div>
                            <StyledTable>
                                <StyledHead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>NOMBRE</th>
                                    </tr>
                                </StyledHead>
                                <StyledBody>
                                    {data.slice(80, 120).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 80 + 1}</td>
                                                <td className="id">{item.id}</td>
                                                <td>{item.name}</td>
                                            </tr>
                                        )
                                    })}
                                </StyledBody>
                            </StyledTable>
                        </div>
                    </StyledGridWinner>
                </div>
            </StyledWrapper>
        </Styled>
    )
}

export default Main
const StyledGridWinner = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: clamp(10px, 2.5vw, 50px);
    display: grid;
    grid-template-columns: 1fr;
    ${MEDIA_QUERIES.min_width.tabletL} {
        grid-template-columns: 1fr 1fr;
    }
    ${MEDIA_QUERIES.min_width.desktopL} {
        grid-template-columns: 1fr 1fr 1fr;
    }
`
const commonStyledCell = css`
    font-feature-settings: 'tnum';
    padding: 7px 15px;
`
const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    /* background: ${(p) => p.theme.palette.alternate9.main}; */
    /* padding: 10px; */
`
const StyledHead = styled.thead`
    > tr {
        th {
            text-align: left;
            background: #ff0000;
            padding: 7px 15px;
            color: white;
            font-weight: 500;
            &:first-child {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
            &:last-child {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }
        }
    }
`
const StyledBody = styled.tbody`
    > tr {
        td {
            padding: 7px 15px;
            &:first-child {
                color: #5e5e5e;
            }
            &:last-child {
                color: #303030;
            }

            &.id {
                /* color: #ffa726; */
                font-weight: 500;
                font-size: 14px;
                color: ${(p) => p.theme.palette.primary.main};
            }
        }
        &:nth-last-of-type(odd) {
            /* border: 1px solid #ebebeb; */
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px;
            background: #f2f2f2;
        }
    }
`
const StyledHeaders = styled.tr`
    justify-content: space-between;
    border-radius: 8px;
    background: #ff0000;
    /* display: grid;
    grid-template-columns: 50px repeat(auto-fill, calc(calc(100% - 50px) / 2));
    grid-template-rows: repeat(auto-fill, 100%); */
`
const StyledHeader = styled.th`
    /* ${commonStyledCell} */
    font-weight: 600;
    /* display: flex; */
    /* justify-content: left; */
    /* align-items: center; */
    color: white;
    font-size: 0.9rem;
    &:first-child {
        /* flex: 0.1 0 50px; */
    }
`
const StyledRows = styled.tr`
    border-radius: 2px;
    border: 1px solid transparent;
    transition: 200ms;
    /* background: #050505; */
    display: grid;
    grid-template-columns: 50px 1fr 1.5fr;
    grid-template-columns: 50px repeat(auto-fill, calc(calc(100% - 50px) / 2));
    &:nth-last-of-type(odd) {
        border: 1px solid #ebebeb;
        /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px; */
        background: #f2f2f2;
        /* background: ${(p) => p.theme.palette.light.main}; */
    }
    /* &:hover {
        transform: scale(1.2);
    } */
`

const StyledRow = styled.td`
    /* ${commonStyledCell}
    display: flex;
    justify-content: left;
    align-items: center; */

    &:first-child {
        color: #5e5e5e;
    }
    &:last-child {
        color: #303030;
    }

    &.id {
        /* color: #ffa726; */
        font-weight: 500;
        font-size: 14px;
        color: ${(p) => p.theme.palette.primary.main};
    }
`

const StyledTitle = styled.div`
    /* font-size: clamp(20px, 2vw, 40px);
    font-weight: 900;
    transform: scaleY(1.2);
    text-transform: uppercase;
    padding: 1rem;
    padding-top: 2rem; */
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    /* transform: scaleY(1.2); */
    /* background: radial-gradient(ellipse at center, #443501 0%, #000000 100%); */
    /* max-width: fit-content; */

    > div {
        /* background: radial-gradient(ellipse at center, #443501 0%, #000000 100%); */
        max-width: fit-content;
        display: flex;
        flex-wrap: wrap;
        > span {
            /* background: linear-gradient(to bottom, #cfc09f 22%, #634f2c 24%, #cfc09f 26%, #cfc09f 27%, #ffecb3 40%, #3a2c0f 78%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent; */
            color: #1a1a1a;
            position: relative;
            /* text-transform: uppercase; */
            font-size: 18vw;
            margin: 0;
            white-space: nowrap;
            font-size: clamp(22px, 3vw, 40px);
            font-weight: 900;
            /* &::after {
                background: none;
                content: attr(data-heading);
                left: 0;
                top: 0;
                z-index: -1;
                position: absolute;
                text-shadow: -1px 0 1px #c6bb9f, 0 1px 1px #c6bb9f, 5px 5px 10px rgba(0, 0, 0, 0.4), -5px -5px 10px rgba(0, 0, 0, 0.4);
            } */
        }
    }
`
const Styled = styled.div`
    display: flex;
    flex-direction: column;
    /* background: #000000; */
    width: calc(100% + 28px);
    position: relative;
    right: 14px;
    padding-bottom: 50px;
    padding: 0;
    overflow-x: auto;
    background: white;

    /* background: white; */
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
        padding: 0 50px;
    }
`
const StyledWrapper = styled.div`
    border-radius: 20px;
    position: relative;
    > div {
        position: relative;
        z-index: 2;
        /* border: 1px solid ${(p) => p.theme.palette.alternate9.main}; */
        border-radius: 10px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        > img {
            max-width: 900px;
            margin-right: auto;
        }
    }
`
