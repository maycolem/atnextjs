import { Tab, Tabs, useMediaQuery } from '@mui/material'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import useMediaQueryAT from 'hooks/useMediaQueryAT'
import React, { useState } from 'react'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import styled, { css } from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import regDesk from './assets/regDesk.png'
import regMobil from './assets/regMobil.png'
import TabsDesk from './tabs-desk/TabsDesk'
import TabsMobil from './tabs-mobil/TabsMobil'
const Main = () => {
  // SEC_REGLAMENTO_DE_JUEGO
  const [fragment, setFragment] = useState('')
  const [fragmentName, setFragmentName] = useState('')
  const { data, isLoading, isFetching } = useGetFragmentQuery(
    {
      fragment,
    },
    {
      skip: !fragment,
    }
  )
  const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
  return (
    <StyledS>
      <IMGS $fondo={regMobil}>
        <img alt="" src={desktopS ? regDesk.src : regMobil.src} />
      </IMGS>
      <div className="wrapper">
        <ContentS $desktopS={desktopS}>
          <TitleS>Reglamento de Juego</TitleS>

          {!desktopS ? (
            <>
              <TabsMobil setFragment={setFragment}></TabsMobil>
              <DividerS></DividerS>
            </>
          ) : (
            <TabsDesk setFragment={setFragment} setFragmentName={setFragmentName} />
          )}
          {isLoading || isFetching ? (
            <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
          ) : (
            <>
              <RightContentS>
                {desktopS && (
                  <TitleS>
                    <span className="bottom">{fragmentName}</span>
                  </TitleS>
                )}
                {desktopS && <DividerS></DividerS>}
                <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
              </RightContentS>
            </>
          )}
        </ContentS>
      </div>
    </StyledS>
  )
}

export default Main
const RightContentS = styled.div`
  & {
  }
`
const TitleS = styled.div`
  & {
    font-size: 2rem;
    color: #1d1d1f;
    text-align: center;
    margin-bottom: 1rem;
    ${MEDIA_QUERIES.min_width.desktopS} {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 0;
      > .bottom {
        font-size: 1.1rem;
        color: ${(p) => p.theme.palette.primary.main};
        text-transform: uppercase;
        padding: 12px 0px;
      }
    }
  }
`
const ContentS = styled.div`
  & {
    ${(p) => {
      if (p.$desktopS) {
        return css`
          display: grid;
          grid-template-columns: 200px 1fr;
          grid-template-rows: auto auto;
          gap: 2rem;
          row-gap: 1rem;
          max-width: 1000px;
          margin: auto;
          ${TitleS} {
            grid-column: 2/3;
            text-align: left;
          }
        `
      }
    }}
  }
`
const DividerS = styled.div`
  & {
    width: 100%;
    height: 2px;
    background: ${(p) => p.theme.palette.primary.main};
    margin: auto;
    margin-bottom: 0.5rem;
    max-width: 1000px;
    ${MEDIA_QUERIES.min_width.desktopS} {
      height: 3px;
    }
  }
`
const StyledS = styled.div`
  padding-bottom: 1rem;
  position: relative;
  width: 100%;
  margin: auto;
  background: white;
  /* right: 14px; */
  width: calc(100% + 28px);
  position: relative;
  right: 14px;
  ${MEDIA_QUERIES.min_width.desktopS} {
    width: calc(100% + 100px);
    right: 50px;
    padding-top: 1rem;
  }
  > .wrapper {
    padding: 1rem;
  }
`
const IMGS = styled.div`
  /* width: calc(100% + 28px);
  position: relative;
  right: 14px;
  max-width: 1000px; */
  max-width: 1000px;
  margin: auto;
  object-fit: contain;
  background-image: ${(p) => `url(${p.$fondo.src})`};
  background-repeat: no-repeat;
  background-size: 200%;
  /* @media (min-width: 1000px) {
    width: 100%;
    right: 0;
  } */
  ${MEDIA_QUERIES.min_width.desktopS} {
    border-radius: 1rem;
    overflow: hidden;
  }
  > img {
    max-height: 300px;
    object-fit: contain;
    backdrop-filter: blur(10px);
  }
`
