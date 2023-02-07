import {
  BannerCabJRCS,
  CardJRCS,
  TeleJPMCardS,
  SliderJPMteleS,
  TeleAyudaS,
  TeleJRCS,
} from 'components/TeleServicios/TeleServicios.css'
import Banner7 from 'public/assets/teleservices/banner7.png'
import Bannermov7 from 'public/assets/teleservices/bannermov7.png'
import React from 'react'
import { useMediaQuery } from '@mui/material'
import ReactPlayer from 'react-player'

const TeleAyuda = () => {
  const isDesktop = useMediaQuery('@media (min-width : 600px)')
  return (
    <div>
      <TeleJRCS>
        <h1>
          <span className="TituloJRCTele"> TELESERVICIOS </span>
        </h1>

        <p className="subTituloJRCTele"> TELESERVICIOS TE AYUDA</p>
        <div className="subtextoS">
          <div className="w-full h-2 bg-red-600" />
        </div>
        <BannerCabJRCS>
          <CardJRCS>
            <div>
              {isDesktop ? (
                <img alt="Banner Apuesta Total" src={Banner7.src}></img>
              ) : (
                <img alt="Banner Apuesta Total" src={Bannermov7.src}></img>
              )}
            </div>
          </CardJRCS>
        </BannerCabJRCS>

        <p className="textTitulo1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p className="textBanner1">Excepteur sint occaecat cupidatat !</p>
      </TeleJRCS>

      <TeleAyudaS>
        <p className="tituloAyuda">Mira cómo te acompañamos:</p>
        <p className="subtituloAyuda">Loren Ipsum dolor :</p>

        <p className="textBanner2">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corofficia deserunt mollitia animi, eligendi optio cumque nihil impedit quo minus id quod maxime.
        </p>

        <div className=" space-y-4">
          <SliderJPMteleS>
            <TeleJPMCardS>
              <div className="MorePromotion__image">
                <ReactPlayer className="react-player" height="100%" url="https://vimeo.com/243556536" width="100%" />
              </div>
            </TeleJPMCardS>
          </SliderJPMteleS>
        </div>

        <p className="subtituloAyuda">At Vero accusamus:</p>

        <p className="textBanner2">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corofficia deserunt mollitia animi, eligendi optio cumque nihil impedit quo minus id quod maxime.
        </p>

        <div className=" space-y-4">
          <SliderJPMteleS>
            <TeleJPMCardS>
              <div className="MorePromotion__image">
                <ReactPlayer className="react-player" height="100%" url="https://vimeo.com/243556536" width="100%" />
              </div>
            </TeleJPMCardS>
          </SliderJPMteleS>
        </div>

        <p className="subtituloAyuda">At Vero accusamus:</p>

        <p className="textBanner2">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corofficia deserunt mollitia animi, eligendi optio cumque nihil impedit quo minus id quod maxime.
        </p>

        <div className=" space-y-4">
          <SliderJPMteleS>
            <TeleJPMCardS>
              <div className="MorePromotion__image">
                <ReactPlayer className="react-player" height="100%" url="https://vimeo.com/243556536" width="100%" />
              </div>
            </TeleJPMCardS>
          </SliderJPMteleS>
        </div>
      </TeleAyudaS>
    </div>
  )
}

export default TeleAyuda
