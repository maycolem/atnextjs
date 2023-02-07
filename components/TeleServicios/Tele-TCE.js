import { TeleCardS, TeleTCECardS, SliderTCEteleS, TeleJRCS } from 'components/TeleServicios/TeleServicios.css'
import Avatar1 from 'public/assets/teleservices/avatar1.png'
import Avatar2 from 'public/assets/teleservices/avatar2.png'
import Avatar3 from 'public/assets/teleservices/avatar3.png'
import Avatar4 from 'public/assets/teleservices/avatar4.png'
import React from 'react'
import { useMediaQuery } from '@mui/material'

const TeleTCE = () => {
  return (
    <div>
      <TeleJRCS>
        <h1>
          <span className="TituloJRCTele"> TELESERVICIOS </span>
        </h1>

        <p className="subTituloJRCTele"> TESTIMONIOS Y CASOS DE ÉXITO</p>
        <div className="subtextoS">
          <div className="w-full h-2 bg-red-600" />
        </div>

        <p className="textTitulo1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
        <p className="textBanner1">Excepteur sint occaecat cupidatat !</p>
      </TeleJRCS>

      <div className=" space-y-4">
        <SliderTCEteleS>
          <TeleTCECardS>
            <div className="MorePromotion__image">
              <img alt="Banner Apuesta Total" src={Avatar1.src}></img>
            </div>
          </TeleTCECardS>

          <TeleTCECardS>
            <div className="MorePromotion__content">
              <div className="Titulotexts">Bryan López C.</div>

              <div className="subTitulotexs">DNI: 3468723433</div>
              <div className="subtexts">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corofficia deserunt mollitia animi, eligendi optio cumque nihil impedit quo minus id quod
                maxime placeat facere possimus, omnis voluptas assumenda est, omnis dol.
              </div>
            </div>
          </TeleTCECardS>
        </SliderTCEteleS>

        <SliderTCEteleS>
          <TeleTCECardS>
            <div className="MorePromotion__image">
              <img alt="Banner Apuesta Total" src={Avatar2.src}></img>
            </div>
          </TeleTCECardS>

          <TeleTCECardS>
            <div className="MorePromotion__content">
              <div className="Titulotexts">Lorena Casas S.</div>

              <div className="subTitulotexs">DNI: 34683453433</div>
              <div className="subtexts">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corofficia deserunt mollitia animi, eligendi optio cumque nihil impedit quo minus id quod
                maxime placeat facere possimus, omnis voluptas assumenda est, omnis dol.
              </div>
            </div>
          </TeleTCECardS>
        </SliderTCEteleS>

        <SliderTCEteleS>
          <TeleTCECardS>
            <div className="MorePromotion__image">
              <img alt="Banner Apuesta Total" src={Avatar3.src}></img>
            </div>
          </TeleTCECardS>

          <TeleTCECardS>
            <div className="MorePromotion__content">
              <div className="Titulotexts">Rodrigo Gonzáles Z.</div>

              <div className="subTitulotexs">DNI: 2858723433</div>
              <div className="subtexts">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corofficia deserunt mollitia animi, eligendi optio cumque nihil impedit quo minus id quod
                maxime placeat facere possimus, omnis voluptas assumenda est, omnis dol.
              </div>
            </div>
          </TeleTCECardS>
        </SliderTCEteleS>

        <SliderTCEteleS>
          <TeleTCECardS>
            <div className="MorePromotion__image">
              <img alt="Banner Apuesta Total" src={Avatar4.src}></img>
            </div>
          </TeleTCECardS>

          <TeleTCECardS>
            <div className="MorePromotion__content">
              <div className="Titulotexts">Evelyn Cava Ch.</div>

              <div className="subTitulotexs">DNI: 0828723433</div>
              <div className="subtexts">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corofficia deserunt mollitia animi, eligendi optio cumque nihil impedit quo minus id quod
                maxime placeat facere possimus, omnis voluptas assumenda est, omnis dol.
              </div>
            </div>
          </TeleTCECardS>
        </SliderTCEteleS>
      </div>
    </div>
  )
}

export default TeleTCE
