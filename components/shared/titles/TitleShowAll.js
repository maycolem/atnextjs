import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'

const TitleShowAll = ({ title, href }) => {
  return (
    <GamesTitleS>
      <h1 className="MorePromotions__title">
        <span>{title}</span>
      </h1>
      <Link href={href} className="all">
        VER TODAS
      </Link>
    </GamesTitleS>
  );
}

export default TitleShowAll
const GamesTitleS = styled('div')`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    .all {
      color: ${(p) => p.theme.palette.primary.main};
      font-size: 0.8rem;
      font-weight: 400;
      padding-right: 1rem;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    h1.MorePromotions__title {
      font-size: 1.1rem;
      font-weight: 400;
      font-style: italic;
      @media (min-width: 700px) {
        font-size: 1.3rem;
      }
      span {
        font-weight: 500;
      }
    }
  }
`
