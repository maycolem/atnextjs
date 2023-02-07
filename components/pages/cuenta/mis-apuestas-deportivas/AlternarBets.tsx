import React, { memo } from 'react'
import { AltenarClient } from '@calimaco/components'
import cfg from 'config/config'
import styled, { createGlobalStyle } from 'styled-components'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { useRouter } from 'next/router'
const GlobalStyleApuestasDeportivas = createGlobalStyle`
#dsa423432432432{
  display: flex;
  width: 100%;
  position: relative;
  z-index: 99999 !important;
}
.asb-application._asb_application {
    max-width: 90vw !important;
    min-height: auto !important;
    flex:1 1 100% !important;
    margin: auto;
    z-index: 99999 !important;
    ${MEDIA_QUERIES.min_width.tabletS}{
      max-width: 95vw !important;
    }
  }
  ._asb_bethistory-item-header-lost{
    background: #FF0000 !important;
  }
  /* .asb-flex-cc{
    z-index: 99999 !important;
  } */
`
const AlternarBets = () => {
    return (
        <Styled>
            <AltenarClient cfg={cfg} />
            <GlobalStyleApuestasDeportivas></GlobalStyleApuestasDeportivas>
        </Styled>
    )
}

export const MemoAlternarBets = memo(AlternarBets)

const Styled = styled.div`
    min-height: 200px;
`
