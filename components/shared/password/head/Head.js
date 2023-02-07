import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import logofullIMG from 'public/assets/logofull.png'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
const Head = () => {
    return (
        <PasswordHeadS>
            <h1 className="title">¿OLVIDÓ SU CONTRASEÑA?</h1>
            <Link href={'/'} legacyBehavior>
                <LogoS>
                    <img alt="logo apuesta total" src={logofullIMG.src} />
                </LogoS>
            </Link>

            <BottomS>
                <p>
                    Ingrese su dirección de correo electrónico registrada y las instrucciones para recuperar su contraseña serán enviadas a su correo
                    electrónico.
                </p>
            </BottomS>
        </PasswordHeadS>
    )
}

export default Head
const ButtonS = styled.div`
    & {
        font-size: 2rem;
        font-size: 1rem;
        font-weight: 300;
        font-weight: 400;
        /* transform: scaleX(1.3); */
        align-self: flex-start;
        padding-bottom: 3rem;
        display: flex;
        align-items: center;
        gap: 5px;
        color: ${(p) => p.theme.palette.primary.main};
        cursor: pointer;
    }
`
const BottomS = styled.div`
    & {
        p {
            font-size: 0.9em;
        }
    }
`
const PasswordHeadS = styled('div')`
    & {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.3rem;
        .title {
            font-weight: 400;
            font-size: 1.1em;
        }
        * {
            text-align: center;
        }
    }
`
const LogoS = styled('div')`
    cursor: pointer;
    img {
        margin: auto;
        width: 100%;
        max-width: 300px;
    }
`
