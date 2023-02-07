import Head from 'next/head'
import styled, { css } from 'styled-components'
import Login from 'components/shared/login/Login'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Password from 'components/shared/password/Password'
import HomeIcon from '@mui/icons-material/Home'
import SnackBarForm from 'components/Register/SnackBarForm'
const Index = () => {
  const [showRecuperar, setShowRecuperar] = useState(false)

  const router = useRouter()
  return (
    <LoginS>
      <Head>
        <title>Login | Apuesta Total</title>
        <meta content="Login | Apuesta Total" property="og:title" />
        <meta content="Login | Apuesta Total" itemProp="name" />
        <meta content="Login | Apuesta Total" name="twitter:title" />
        <meta
          content="Encuentra promociones, apuestas deportivas en vivo, próximos encuentros, juegos virtuales, casino y más en Apuesta Total"
          name="description"
        />
        <meta
          content="Encuentra promociones, apuestas deportivas en vivo, próximos encuentros, juegos virtuales, casino y más en Apuesta Total"
          property="og:description"
        />
        <meta
          content="Encuentra promociones, apuestas deportivas en vivo, próximos encuentros, juegos virtuales, casino y más en Apuesta Total"
          itemProp="description"
        />
        <meta
          content="Encuentra promociones, apuestas deportivas en vivo, próximos encuentros, juegos virtuales, casino y más en Apuesta Total"
          name="twitter:description"
        />
        <meta
          content="apuesta total, torneos, poker, juegos, recargas, casino, Bet Games, TV Bet, ruleta rusa, yan ken po, tragamonedas online, torneos de casino, premios"
          name="keywords"
        />
        <meta
          content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
          property="og:image"
        />
        <meta
          content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
          name="image"
        />
        <meta
          content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
          property="og:image:secure_url"
        />
        <meta
          content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
          itemProp="image"
        />
        <meta
          content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
          name="twitter:image"
        />
        <meta content="1145" property="og:image:width" />
        <meta content="513" property="og:image:height" />
        <meta content="website" property="og:type" />
        <meta content="https://www.apuestatotal.com/login" property="og:url" />
        <meta content="summary" name="twitter:card" />
        <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=0" name="viewport" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="telephone=no" name="format-detection" />
        <meta content="YES" name="apple-mobile-web-app-capable" />
        <link href="https://www.apuestatotal.com/login" rel="canonical" />

        <link href="/favicon.ico" rel="icon" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <LoginContentS>
        <ButtonSSuperS
          onClick={() => {
            router.push(PATHS.HOME.url)
          }}
        >
          <HomeIcon></HomeIcon>
          Inicio
        </ButtonSSuperS>
        <div className="close-modal">
          {showRecuperar && (
            <ButtonS
              onClick={() => {
                setShowRecuperar(false)
              }}
            >
              <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
              Login
            </ButtonS>
          )}

          {/* <IconButtonS onClick={handleOnClose}>
            <CloseIcon></CloseIcon>
          </IconButtonS> */}
        </div>
        <SnackBarForm></SnackBarForm>
        <WrapperS $showRecuperar={showRecuperar}>
          <div className="login">
            <Login setShowRecuperar={setShowRecuperar}></Login>
          </div>
          <div className="password">
            <Password></Password>
          </div>
        </WrapperS>
      </LoginContentS>
    </LoginS>
  )
}

export default Index
const ButtonSSuperS = styled.div`
  & {
    font-size: 2rem;
    font-size: 1.3rem;
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
const WrapperS = styled.div`
  & {
    display: flex;
    transition: 100ms;
    position: relative;
    > div {
      flex: 1 0 100%;
      color: ${(p) => p.theme.contrastText} !important;
      &.password {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      }
      &.login {
        opacity: 1;
        pointer-events: all;
        visibility: visible;
      }
    }
    ${(p) => {
      if (p.$showRecuperar) {
        return css`
          transform: translateX(-100%);
          > div {
            &.password {
              opacity: 1;
              pointer-events: all;
              visibility: visible;
            }
            &.login {
              opacity: 0;
              pointer-events: none;
              visibility: hidden;
            }
          }
        `
      }
    }}
  }
`
const ButtonS = styled.div`
  & {
    font-size: 2rem;
    font-size: 1rem;
    font-weight: 300;
    font-weight: 400;
    /* transform: scaleX(1.3); */
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${(p) => p.theme.palette.alternate11.main};
    cursor: pointer;
    padding-bottom: 1rem;
  }
`

const LoginS = styled('div')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${(p) => p.theme.layout.login.background};
`
const LoginContentS = styled('div')`
  width: 100%;
  max-width: 400px;
`
