import React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { PATHS } from 'routes/paths/PATHS'
import { GoogleTagManager } from 'google/TagManager'

const Foot = () => {
    const route = useRouter()

    const handleRegistro = () => {
        // GTM

        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'login',
            hash_id: '',
            success: 'false',
            option: 'registrate aqui',
        })

        route.push(PATHS.REGISTRO.url)
    }

    return (
        <FootS>
            <div className="getAccount">
                <span>¿No tienes una cuenta?</span>
                <span>¡Qué esperas!</span>
            </div>
            <div>
                <ButtonS onClick={() => handleRegistro()}>¡REGÍSTRATE AQUÍ!</ButtonS>
            </div>
        </FootS>
    )
}

export default Foot
const ButtonS = styled('button')`
    background: #ed1c24;
    width: 100%;
    color: white;
    transition: 0.15s;
    font-weight: 500;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    padding: 10px;
    border-radius: 10px;
    font-size: 1em;

    & {
        :hover {
            box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
        }
    }
`
const FootS = styled('div')`
    margin-top: 1.5rem;
    display: grid;
    grid-gap: 0.8rem;
    width: 100%;
    & {
        .getAccount {
            display: grid;
            place-items: center;
            color: #6f7070;
            font-size: 1em;
        }
    }
`
