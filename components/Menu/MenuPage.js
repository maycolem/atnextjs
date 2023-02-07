import styled from '@emotion/styled'
import React from 'react'
import NavbarPage from './NavbarPage'
import logofullIMG from 'public/assets/logofull.png'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
const MenuPage = () => {
  const route = useRouter()

  const handleNavHome = () => {
    route.push(PATHS.HOME.url)
  }
  return (
    <MenuPageS className="w-full flex items-center justify-between">
      <LogoDesktopS onClick={handleNavHome} title="Home page">
        <img alt="logo apuesta total" src={logofullIMG.src} />
      </LogoDesktopS>
      <NavbarPage />
    </MenuPageS>
  )
}

export default MenuPage
const MenuPageS = styled('div')`
  flex: 1;
  padding: 10px 0;
`
const LogoDesktopS = styled('div')`
  height: 40px;
  cursor: pointer;
  max-height: 40px;
  img {
    object-fit: contain;
  }
`
