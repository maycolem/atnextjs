import {
  BannerCabS,
  CardS,
  TeleCardS,
  SliderteleS,
  TeleTitleS,
  TeleServiciosS,
} from 'components/TeleServicios/TeleServicios.css'
import Banner2 from 'public/assets/teleservices/banner2.png'
import Bannermov2 from 'public/assets/teleservices/bannermov2.png'
import Slider1 from 'public/assets/teleservices/slider1.png'
import Slider2 from 'public/assets/teleservices/slider2.png'
import Slider3 from 'public/assets/teleservices/slider3.png'
import Slider4 from 'public/assets/teleservices/slider4.png'
import Slider5 from 'public/assets/teleservices/slider5.png'
import React from 'react'
import { useMediaQuery } from '@mui/material'
import Link from 'next/link'

import { PATHS } from 'routes/paths/PATHS'

const list = [
  {
    label: 'Cómo jugar, recargar y cobrar',
    href: { pathname: PATHS.TELE_SERVICIOS.url, query: { seccion: 'como-jugar-recargar-y-cobrar' } },
    img: Slider1.src,
  },
  {
    label: 'Juegos y promociones del mes',
    href: { pathname: PATHS.TELE_SERVICIOS.url, query: { seccion: 'juegos-y-promociones-del-mes' } },
    img: Slider2.src,
  },
  {
    label: 'Grupo de Telegram',
    href: { pathname: PATHS.TELE_SERVICIOS.url, query: { seccion: 'grupo-de-telegram' } },
    img: Slider3.src,
  },
  {
    label: 'Teleservicios te ayuda',
    href: { pathname: PATHS.TELE_SERVICIOS.url, query: { seccion: 'teleservicios-te-ayuda' } },
    img: Slider4.src,
  },
  {
    label: 'Testimonios y casos de éxito',
    href: { pathname: PATHS.TELE_SERVICIOS.url, query: { seccion: 'testimonios-y-casos-de-exito' } },
    img: Slider5.src,
  },
]

const SobreTeleServicios = () => {
  const isDesktop = useMediaQuery('@media (min-width : 600px)')
  return (
    <div>
      <TeleServiciosS>
        <h1>
          <span className="TituloSbTele"> TELESERVICIOS </span>
        </h1>
        <h1 className="TituloSbTele2">
          Atención las 24 horas al <span className="TituloSbTele"> 950 722008 </span>{' '}
        </h1>

        <p className="textTitulo1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p className="textBanner1">Excepteur sint occaecat cupidatat!</p>

        <div className="w-2/5 sm:w-1/5 sm:h-2 h-1 bg-black" />

        <BannerCabS>
          <CardS>
            {isDesktop ? (
              <img alt="Banner Apuesta Total" className="banner2style" src={Banner2.src}></img>
            ) : (
              <img alt="Banner Apuesta Total" className="banner2style" src={Bannermov2.src}></img>
            )}
          </CardS>

          <p className="textBanner2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </BannerCabS>
      </TeleServiciosS>

      <div className=" space-y-4">
        <TeleTitleS>
          <h1 className="MorePromotions__title">
            MÁS SOBRE <span>TELESERVICIOS</span>
          </h1>
        </TeleTitleS>

        <SliderteleS>
          {list.map((item, i) => (
            <TeleCardS key={i}>
              <div className="MorePromotion__image">
                <img alt="Banner Apuesta Total" src={item.img}></img>
              </div>
              <div className="MorePromotion__content">
                <div className="MorePromotion__contentTop">{item.label}</div>

                <div className="MorePromotion__contentBottom">
                  <Link href={item.href}>
                    Conoce más
                  </Link>
                </div>
              </div>
            </TeleCardS>
          ))}
        </SliderteleS>
      </div>
    </div>
  );
}

export default SobreTeleServicios
