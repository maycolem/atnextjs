import { Button } from '@mui/material'
import PromocionesLobbies from 'components/promociones/PromocionesLobbies'
import { Parser } from 'html-to-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { PATHS } from 'routes/paths/PATHS'
import { usePromotionDetailQuery, usePromotionLobbiesQuery } from 'states/calimaco/calimacoContentApi'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
const PromotionDetail = () => {
  const r = useRouter()
  const [promotion, setPromotion] = useState(null)
  const { data: dataMain } = usePromotionLobbiesQuery({ lobby: 'MAIN' })
  const { data } = usePromotionDetailQuery(
    { promotion },
    {
      skip: !promotion,
    }
  )
  useEffect(() => {
    if (r?.query?.promotion) {
      setPromotion(r?.query?.promotion)
    }
  }, [r])
  return (
    <Styled>
      <WrapperS>
        {/* <img alt="" src={`${process.env.REACT_APP_WEB_BASE}/${data?.details?.cms?.image}`} /> */}
        {/* <h1>{data?.details?.cms?.title}</h1>
        <FragmentCustomAT fragment={data?.details?.cms?.body}></FragmentCustomAT> */}

        <FragmentCustomAT fragment={data?.details?.terms}></FragmentCustomAT>
        <PromocionesDestacadasS>
          <h2>Promociones destacadas</h2>
          <PromocionesLobbiesS></PromocionesLobbiesS>
          <Link href={PATHS.PROMOCIONES.url} legacyBehavior>
            <ButtonS color="buttonPink" size="small" variant="contained">
              {'<'} Volver a promociones
            </ButtonS>
          </Link>
        </PromocionesDestacadasS>
      </WrapperS>
    </Styled>
  );
}

export default PromotionDetail
const ButtonS = styled(Button)`
  && {
    box-shadow: none;
    text-transform: capitalize;
    color: ${(p) => p.theme.palette.primary.main};
    transition: 250ms;
    align-self: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    :hover {
      opacity: 0.7;
      box-shadow: none;
    }
  }
`
const PromocionesDestacadasS = styled.div`
  & {
    padding-top: 1rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    > h2 {
      font-weight: 500;
      font-size: 1.2rem;
    }
  }
`
const Styled = styled.div`
  & {
    padding-bottom: 1rem;
    position: relative;
    width: 100%;
    margin: auto;
    background: white;
    /* right: 14px; */
    width: calc(100% + 28px);
    position: relative;
    right: 14px;
    padding: 1rem;
    overflow: hidden;

    ${MEDIA_QUERIES.min_width.desktopS} {
      width: calc(100% + 100px);
      right: 50px;
    }
    > .wrapper {
      max-width: 1000px;
      margin: auto;
    }
  }
`
const WrapperS = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 1rem; */
    max-width: 1000px;
    margin: auto;
    img {
      width: 100%;
    }
    > h1 {
      font-weight: 500;
      font-size: 1.4rem;
    }
    * {
      color: #6e6e73;
      text-align: justify;
    }
    a {
      color: #3467ff;
      cursor: pointer !important;
    }
  }
`

const PromocionesLobbiesS = styled(PromocionesLobbies)`
  & {
    width: 100%;
  }
`
