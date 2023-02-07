import React from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import DesktopSolicitud from 'components/retirar/estado-de-solicitud/DesktopSolicitud'
import MobileSolicitud from 'components/retirar/estado-de-solicitud/MobileSolicitud'
import useMediaQueryAT from 'hooks/useMediaQueryAT'

const EstadoSolicitud = () => {
    const isDesktop = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)

    return (
        <div>
            {isDesktop ? (
                <div>
                    <DesktopSolicitud></DesktopSolicitud>
                </div>
            ) : (
                <div>
                    <MobileSolicitud></MobileSolicitud>
                </div>
            )}
        </div>
    )
}

export default EstadoSolicitud
