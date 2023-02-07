import { AiOutlineClose } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import logofullIMG from 'public/assets/logofull.png'
import { PATHS } from 'routes/paths/PATHS'
const linksPage = [
    {
        id: 1,
        href: '/',
        label: 'apuestas deportivas',
    },
    {
        id: 2,
        href: '/',
        label: 'apuestas en vivo',
    },
    {
        id: 3,
        href: '/',
        label: 'casino',
    },
    {
        id: 4,
        href: '/',
        label: 'juegos virtuales',
    },
    {
        id: 5,
        href: PATHS.PROMOCIONES.url,
        label: PATHS.PROMOCIONES.name,
    },
    {
        id: 6,
        href: '/',
        label: 'nuestras-tiendas',
    },
]

const linksTeleservicios = [
    {
        id: 1,
        href: '/',
        label: 'REFERIDOS',
    },
    {
        id: 2,
        href: '/',
        label: 'PODCAST',
    },
    {
        id: 3,
        href: '/',
        label: 'TUTORIALES',
    },
    {
        id: 4,
        href: '/teleservicios/?seccion=1',
        as: 'teleservicios',
        label: 'TELESERVICIOS',
    },
    {
        id: 5,
        href: '/',
        label: 'ÚNETE AL GRUPO DE TELEGRAM',
    },
]

const LinksMenuToggle = ({ data, handleToggleMenu }) => {
    // console.log('data', data)
    return (
        <div className="w-full flex flex-col space-y-4">
            {data.map((item) => (
                <Link href={item.href} key={item.id} className="uppercase" onClick={handleToggleMenu}>
                    <span>{item.label}</span>
                </Link>
            ))}
        </div>
    )
}

const ToggleMenu = ({ setToggleMenu }) => {
    const [scrollTop, setScrollTop] = useState(0)
    const route = useRouter()
    const handleToggleMenu = () => {
        setToggleMenu(false)
    }
    const handleNavLogin = async () => {
        handleToggleMenu()
        await route.push(PATHS.LOGIN.url)
    }
    const handleNavRegister = async () => {
        handleToggleMenu()
        await route.push(PATHS.REGISTRO.url)
    }
    const handleNavHome = async () => {
        handleToggleMenu()
        await route.push(PATHS.HOME.url)
    }
    // TODO: fix this
    // useEffect(() => {
    //   const onScroll = (e) => {
    //     console.log('scrollTop', window.scrollY)
    //     // setToggleMenu(false)
    //   }
    //   window.addEventListener('scroll', onScroll)
    //
    //   return () => window.removeEventListener('scroll', onScroll)
    // }, [])

    return (
        <div className="w-full h-screen bg-blackComplete fixed top-0 left-0 z-20 px-12 text-white md:hidden">
            <div className="mx-auto my-12 z-30" style={{ maxWidth: '500px' }}>
                <div className="w-full flex justify-end items-center">
                    <button className="bg-transparent" onClick={handleToggleMenu} style={{ width: '30px', height: '30px' }} type="button">
                        <AiOutlineClose size="30" />
                    </button>
                </div>
                <div className="w-full space-y-12">
                    <LogoDesktopS onClick={handleNavHome} title="Home page">
                        <img alt="logo apuesta total" src={logofullIMG.src} />
                    </LogoDesktopS>
                    <ButtonS>
                        <button>RECARGA</button>
                    </ButtonS>
                    <LoginRegisterS>
                        <div className="flex items-center text-yellow-600">
                            <BiUserCircle color="#FFBE2C" size="40px" />
                            <div className="flex space-x-4">
                                <p className="pl-4" onClick={handleNavLogin}>
                                    INGRESA
                                </p>
                                <span>{'/'}</span>
                                <p onClick={handleNavRegister}>REGISTRATE</p>
                            </div>
                        </div>
                    </LoginRegisterS>
                    <div className="space-y-12">
                        <LinksMenuToggle data={linksPage} handleToggleMenu={handleToggleMenu} />
                        <div className="w-full bg-white" style={{ height: '1px' }} />
                        <LinksMenuToggle data={linksTeleservicios} handleToggleMenu={handleToggleMenu} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToggleMenu
const LoginRegisterS = styled('div')`
    & {
        p {
            cursor: pointer;
        }
    }
`
const ButtonS = styled('div')`
    & {
        width: 100%;
        button {
            display: block;
            width: 100%;
            background-color: #ffbe2c;
            border-radius: 0.5rem;
            color: black;
            padding: 0.3rem 1rem;
        }
    }
`
const LogoDesktopS = styled('div')`
    height: 40px;
    cursor: pointer;
    max-height: 40px;
    img {
        object-fit: contain;
    }
`
