import styled from '@emotion/styled'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

export const TeleServiciosS = styled('div')`
  padding-top: 10px;
  font-size: 40px;
  span.TituloSbTele {
    font-size: 30px;
    font-weight: 500;
  }
  h1.TituloSbTele2 {
    font-size: 25px;
    font-weight: 300;
  }
  p.textTitulo1 {
    padding-top: 20px;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.5;
  }
  p.textBanner1 {
    color: red;
    font-weight: 500;
    padding-bottom: 20px;
  }
  p.textBanner2 {
    font-size: 12px;
    word-spacing: 0.27em;
    line-height: 1.5;
    color: #555556;
  }

  ${MEDIA_QUERIES.min_width.tabletS} {
    font-size: 30px;
    font-weight: 300;

    span.TituloSbTele {
      font-size: 30px;
      font-weight: 500;
    }
    h1.TituloSbTele2 {
      font-size: 25px;
      font-weight: 300;
    }
    p.textTitulo1 {
      padding-top: 20px;
      font-size: 20px;
      font-weight: 300;
      line-height: 1.5;
    }
    p.textBanner1 {
      color: red;
      font-weight: 500;
      padding-bottom: 20px;
    }
    p.textBanner2 {
      font-size: 16px;
      word-spacing: 0.27em;
      line-height: 1.5;
      color: #555556;
    }
  }

  ${MEDIA_QUERIES.min_width.desktopM} {
    font-size: 40px;
    font-weight: 300;
    span.TituloSbTele {
      font-size: 40px;
      font-weight: 500;
    }
    h1.TituloSbTele2 {
      font-size: 35px;
      font-weight: 300;
    }
    p.textTitulo1 {
      padding-top: 20px;
      font-size: 25px;
      font-weight: 300;
      line-height: 1.5;
    }

    p.textBanner1 {
      font-size: 22px;
      color: red;
      font-weight: 500;
      padding-bottom: 20px;
    }
    p.textBanner2 {
      font-size: 16px;
      word-spacing: 0.27em;
      line-height: 1.5;
      color: #555556;
    }
  }
`

export const TeleContentS = styled('div')`
  background: blue;
  @media (min-width: 300px) {
    background: green;
  }
  @media (min-width: 500px) {
    background: gray;
  }
  @media (min-width: 700px) {
    background: skyblue;
  }
`
export const BannerCabS = styled('div')`
  & {
    div.Banner1movS {
      /* margin: 0px calc(50% - 50vw); */
      position: relative;
      display: flex;
      width: calc(100% + 2rem);
      right: 1rem;
    }
  }
`
export const CardS = styled('div')`
  img.banner2style {
    padding-top: 20px;
  }
`
export const LineS = styled('div')`
  & {
    img {
      padding: 15px 0px 20px;
      width: auto;
    }
  }
`

export const SliderteleS = styled('div')`
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.8rem;
  row-gap: 1rem;
  @media (min-width: 300px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`

export const TeleCardS = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > .MorePromotion__image {
    aspect-ratio: 1/1;
    border-radius: 0.3rem;
    overflow: hidden;
    @media (min-width: 900px) {
      border-radius: 1rem;
    }
  }
  > .MorePromotion__content {
    flex: 1;
    > div.MorePromotion__contentTop {
      font-weight: 500;
      font-size: clamp(0.5rem, 3vw, 0.6rem);
      text-transform: uppercase;
    }
    > div.MorePromotion__contentBottom {
      color: ${(props) => props.theme.palette.grey[600]};
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: clamp(0.75rem, 3vw, 0.8rem);

      svg {
        font-size: 1.2rem;
      }
    }
  }
`

export const TeleTitleS = styled('div')`
  padding-top: 60px;
  > h1.MorePromotions__title {
    font-size: 1.1rem;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 0.5rem;
    @media (min-width: 700px) {
      font-size: 1.3rem;
    }
    span {
      font-weight: 500;
    }
  }
`

export const LinkS = styled.div`
  & {
    cursor: pointer;
    font-size: 15px;
    word-spacing: 0.27em;
    line-height: 3;
    font-weight: 400;
    color: #848484;
  }
`

export const TeleJRCS = styled('div')`
  span.TituloJRCTele {
    font-size: 30px;
    font-weight: 400;
  }
  p.subTituloJRCTele {
    color: red;
    font-size: 25px;
    font-weight: 400;
  }
  div.subtextoS {
    padding-bottom: 15px;
    padding-top: 10px;
  }

  p.textTitulo1 {
    padding-top: 20px;
    font-size: 22px;
    font-weight: 300;
    line-height: 1.5;
  }

  p.textBanner1 {
    font-size: 22px;
    color: red;
    font-weight: 500;
    padding-bottom: 20px;
  }
  p.textBanner2 {
    font-size: 14px;
    word-spacing: 0.27em;
    line-height: 1.5;
    color: #555556;
  }
`

export const BannerCabJRCS = styled('div')``
export const CardJRCS = styled('div')``

export const SliderJRCteleS = styled('div')`
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.8rem;
  row-gap: 1rem;
  @media (min-width: 300px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`

export const TeleJRCCardS = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > .MorePromotion__image {
    aspect-ratio: 1/1;
    border-radius: 0.3rem;
    overflow: hidden;
    @media (min-width: 900px) {
      border-radius: 1rem;
    }
  }
  > .VideoS {
    position: absolute;
    top: 0;
    left: 0;
  }
  > .MorePromotion__content {
    flex: 1;
    > div.MorePromotion__contentTop {
      font-weight: 500;
      font-size: clamp(0.5rem, 3vw, 0.6rem);
      text-transform: uppercase;
    }
    > div.MorePromotion__contentBottom {
      color: ${(props) => props.theme.palette.grey[600]};
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: clamp(0.75rem, 3vw, 0.8rem);

      svg {
        font-size: 1.2rem;
      }
    }
  }
`

export const TeleJPMS = styled('div')`
  span.TituloJPMTele {
    font-size: 25px;
    font-weight: 500;
  }
  p.subTituloJPMTele {
    color: red;
    font-size: 25px;
    font-weight: 400;
  }
  div.subtextoS {
    padding-bottom: 15px;
    padding-top: 10px;
  }

  p.textTitulo1 {
    padding-top: 5px;
    font-size: 22px;
    font-weight: 300;
    line-height: 1.5;
  }

  p.textBanner1 {
    font-size: 22px;
    color: red;
    font-weight: 500;
    padding-top: 20px;
  }
  p.textBanner2 {
    font-size: 14px;
    word-spacing: 0.27em;
    line-height: 1.5;
    color: #555556;
  }
  p.textBanner3 {
    font-size: 16px;
    color: red;
    font-weight: 300;
    padding-top: 20px;
    text-decoration: underline;
    padding-bottom: 10px;
  }
`

export const SliderJPMteleS = styled('div')`
  padding-bottom: 50px;
  padding-top: 20px;
`

export const SliderJPMtele1S = styled('div')`
  padding-bottom: 50px;
  padding-top: 20px;

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.8rem;
  row-gap: 1rem;
  @media (min-width: 300px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`

export const TeleJPMCard1S = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > .MorePromotion__image {
    aspect-ratio: 3/1;
    border-radius: 0.3rem;
    overflow: hidden;
    @media (min-width: 900px) {
      border-radius: 1rem;
    }
  }
  > .MorePromotion__content {
    flex: 1;
    > div.MorePromotion__contentTop {
      font-weight: 500;
      font-size: clamp(0.5rem, 3vw, 0.6rem);
      text-transform: uppercase;
    }
    > div.MorePromotion__contentBottom {
      color: ${(props) => props.theme.palette.grey[600]};
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: clamp(0.75rem, 3vw, 0.8rem);

      > .VideoS {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
`

export const TeleJPMCardS = styled('div')`
  > .MorePromotion__image {
    aspect-ratio: 2/1;
  }
  > .VideoS {
    position: absolute;
    top: 0;
    left: 0;
  }
`
export const TeleAyudaS = styled('div')`
  p.tituloAyuda {
    font-size: 25px;
    font-weight: 500;
  }

  p.subtituloAyuda {
    font-size: 22px;
    font-weight: 500;
    padding-top: 20px;
  }

  p.textBanner2 {
    padding-top: 10px;
    font-size: 13px;
    word-spacing: 0.27em;
    line-height: 1.5;
    color: #555556;
  }
`
export const SliderTCEteleS = styled('div')`
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.8rem;
  row-gap: 1rem;
  @media (min-width: 300px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`

export const TeleTCECardS = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > .MorePromotion__image {
    aspect-ratio: 0;
    border-radius: 0.3rem;
    overflow: hidden;
    @media (min-width: 900px) {
      border-radius: 1rem;
    }
  }
  > .MorePromotion__content {
    flex: 1;
    > div.MorePromotion__contentTop {
      font-weight: 500;
      font-size: clamp(0.5rem, 3vw, 0.6rem);
      text-transform: uppercase;
    }
    > div.MorePromotion__contentBottom {
      color: ${(props) => props.theme.palette.grey[600]};
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: clamp(0.75rem, 3vw, 0.8rem);

      svg {
        font-size: 1.2rem;
      }
    }
  }

  div.Titulotexts {
    font-size: 20px;
    font-weight: 500;
  }

  div.subTitulotexs {
    font-size: 18px;
    font-weight: 300;
    padding-top: 20px;
  }

  div.subtexts {
    font-size: 14px;
    word-spacing: 0.27em;
    line-height: 1.5;
    color: #555556;
  }
  div.tablaTele {
    width: 250px;
  }
  img.avatartabla {
    width: 100%;
  }
`
export const SliderGTteleS = styled('div')`
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.8rem;
  row-gap: 1rem;
  @media (min-width: 300px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`
