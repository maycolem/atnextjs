import React from 'react'
import { BannerCabS, CardS } from 'components/TeleServicios/TeleServicios.css'
import Banner1 from 'public/assets/teleservices/banner1.png'
import Bannermov1 from 'public/assets/teleservices/bannermov1.png'
import { useMediaQuery } from '@mui/material'
import useGetWidthScrollBar from 'hooks/useGetWidthScrollBar'
const TeleServiciosHeader = () => {
  const isDesktop = useMediaQuery('@media (min-width : 600px)')
  const { scrollBardWidth } = useGetWidthScrollBar()
  return (
    <>
      {isDesktop ? (
        <BannerCabS>
          <CardS>
            <img alt="Banner Apuesta Total" src={Banner1.src}></img>
          </CardS>
        </BannerCabS>
      ) : (
        <BannerCabS scrollBardWidth={scrollBardWidth}>
          <div className="Banner1movS">
            <img alt="Banner Apuesta Total" src={Bannermov1.src}></img>
          </div>
        </BannerCabS>
      )}
    </>
  )
}

export default TeleServiciosHeader
