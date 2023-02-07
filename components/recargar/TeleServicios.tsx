import React from 'react'
import styled from 'styled-components'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import { userSelector } from 'states/features/slices/userSlice'
import { useSelector } from 'react-redux'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { ModalRecargaMethodSelector } from 'states/slice/ModalRecarga'
import { Button } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { GoogleTagManager } from 'google/TagManager'
import { useAppSelector } from '@states/store'

const TeleServicios = () => {
    const dtRecargaTele = (name: string) => {
        GoogleTagManager.push({
            event: 'atm.event',
            option: name.toLowerCase(),
            eventName: 'recarga_teleservicios',
            action: 'click',
        })
    }
    const user = useSelector(userSelector)
    const { img } = useAppSelector(ModalRecargaMethodSelector)

    const { data: teleservicios } = useGetFragmentQuery({ fragment: 'RECARGAS_TELESERVICIOS_TEXTO' })
    // console.log(teleservicios)
    const PHONE_EMPRESA = '51975014644'
    const messageWHATSAPP = `https://api.whatsapp.com/send?phone=${PHONE_EMPRESA}&text=!Habla%20t%C3%ADo!%20Recarga%20mi%20cuenta%20web.%0AMi%20ID%20es%20el%20${user?.user}.%20%0AMi%20Email%20es%20${user?.email}.%0A%22Ahora%20te%20paso%20mi%20comprobante%20de%20la%20transferencia%22.`

    return (
        <FragmentTeleS>
            <IMGS>
                <img alt="" src={img} />
            </IMGS>
            <AccionsS>
                <Button
                    color="whatsapp"
                    onClick={() => {
                        window?.open(messageWHATSAPP, '_blank', '')
                    }}
                    variant="contained"
                >
                    {/* <a rel="nofollow noreferrer" target="_blank" href="http://enlace.at/telewasap"> */}
                    <span onClick={() => dtRecargaTele('iniciar conversacion whatsapp')}>Iniciar conversación</span>
                    {/* </a> */}
                    <WhatsAppIcon></WhatsAppIcon>
                </Button>
                <Button color="telegram" variant="contained">
                    <a href="https://t.me/Televentas_at_bot" rel="nofollow noreferrer" target="_blank">
                        <span onClick={() => dtRecargaTele('iniciar conversacion telegram')}>Iniciar conversación</span>
                    </a>
                    <TelegramIcon></TelegramIcon>
                </Button>
            </AccionsS>
            <FragmentCustomAT fragment={teleservicios ?? ''}></FragmentCustomAT>
        </FragmentTeleS>
    )
}

export default TeleServicios
const AccionsS = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    > button {
        padding: 1rem;
        display: flex;
        gap: 5px;
        text-transform: none;
        box-shadow: none;

        :hover {
            border: 0;
            box-shadow: none;
        }
    }
`
const IMGS = styled.div`
    & {
        padding-bottom: 1rem;
        > img {
            width: 100%;
            max-width: 200px;
            margin: auto;
        }
    }
`
const FragmentTeleS = styled.div`
    & {
        padding: 1rem 2rem;
    }
`
