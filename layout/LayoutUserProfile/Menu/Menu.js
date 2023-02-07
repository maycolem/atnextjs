import React, { useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styled from '@emotion/styled'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import billeteraIMG from 'public/assets/Layout/user-pannel/billetera.png'
import bonosIMG from 'public/assets/Layout/user-pannel/bonos.png'
import apuestasIMG from 'public/assets/Layout/user-pannel/apuestas.png'
import { useRouter } from 'next/router'
import MyProfile from './MyProfile/MyProfile'
import MyWallet from './MyWallet/MyWallet'
import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import Bonds from './Bonds/Bonds'
import Message from './Mesage/Message'
import { useDispatch } from 'react-redux'
import hexAlpha from 'hex-alpha'
const Menu = ({ children }) => {
  const [expanded, setExpanded] = React.useState(null)

  const pathname = useRouter().pathname
  const route = useRouter()
  const dispatch = useDispatch()
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    const key = getKey(pathname)
    if (pathname === PATHS.ACCOUNT_MY_PROFILE.url) {
      return
    }
    if (pathname === PATHS.CUENTA_APUESTAS_MIS_APUESTAS.url) {
      if (typeof expanded === 'boolean' && !expanded) {
        return
      }
    }

    setExpanded(key)
  }, [route])

  const getKeys = (url) =>
    url
      .split('/')
      .filter((item) => item !== '')
      .slice(1)
  const getKey = (url) => url.split('/').filter((item) => item !== '')[1]

  return <>
    <AccordionS
      expanded={expanded === getKey(PATHS.ACCOUNT_MY_PROFILE.url)}
      onChange={handleChange(getKey(PATHS.ACCOUNT_MY_PROFILE.url))}
    >
      <AccordionSummaryS expandIcon={<ExpandMoreIcon />}>
        <AccordionContentS>
          <AccountCircleIcon />
          <div className="text">Mi perfil</div>
        </AccordionContentS>
      </AccordionSummaryS>
      <AccordionDetailsS>
        <MyProfile>{children}</MyProfile>
      </AccordionDetailsS>
    </AccordionS>
    <AccordionS
      expanded={expanded === getKey(PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url)}
      onChange={handleChange(getKey(PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url))}
    >
      <AccordionSummaryS aria-controls="panel2bh-content" expandIcon={<ExpandMoreIcon />} id="panel2bh-header">
        <AccordionContentS>
          <img alt="Banner Apuesta Total" src={billeteraIMG.src}></img>
          <div className="text">Mi billetera</div>
        </AccordionContentS>
      </AccordionSummaryS>
      <AccordionDetailsS>
        <MyWallet>{children}</MyWallet>
      </AccordionDetailsS>
    </AccordionS>
    <AccordionS
      expanded={expanded === getKey(PATHS.CUENTA_APUESTAS_MIS_APUESTAS.url)}
      onChange={handleChange(getKey(PATHS.CUENTA_APUESTAS_MIS_APUESTAS.url))}
    >
      <Link
        href={PATHS.CUENTA_APUESTAS_MIS_APUESTAS.url}
        scroll={false}
        legacyBehavior>
        <AccordionSummaryS aria-controls="panel4bh-content" expandIcon={<ExpandMoreIcon />}>
          <AccordionContentS>
            <img alt="Banner Apuesta Total" src={apuestasIMG.src} />
            <div className="text">Apuestas</div>
          </AccordionContentS>
        </AccordionSummaryS>
      </Link>

      <AccordionDetailsS>{PATHS.CUENTA_APUESTAS_MIS_APUESTAS.url === pathname && children}</AccordionDetailsS>
    </AccordionS>
    <AccordionS
      expanded={expanded === getKey(PATHS.CUENTA_BONOS_SPORTBOOK.url)}
      onChange={handleChange(getKey(PATHS.CUENTA_BONOS_SPORTBOOK.url))}
    >
      <AccordionSummaryS aria-controls="panel3bh-content" expandIcon={<ExpandMoreIcon />} id="panel3bh-header">
        <AccordionContentS>
          <img alt="Banner Apuesta Total" src={bonosIMG.src} />
          <div className="text">Bonos</div>
        </AccordionContentS>
      </AccordionSummaryS>
      <AccordionDetailsS>
        <Bonds>{children}</Bonds>
      </AccordionDetailsS>
    </AccordionS>
    <AccordionS
      expanded={expanded === getKey(PATHS.CUENTA_MENSAJE_BANDEJA_DE_ENTRADA.url)}
      onChange={handleChange(getKey(PATHS.CUENTA_MENSAJE_BANDEJA_DE_ENTRADA.url))}
    >
      <AccordionSummaryS aria-controls="panel4bh-content" expandIcon={<ExpandMoreIcon />} id="panel4bh-header">
        <AccordionContentS>
          <EmailIcon />
          <div className="text">Mensajes</div>
        </AccordionContentS>
      </AccordionSummaryS>
      <AccordionDetailsS>
        <Message>{children}</Message>
      </AccordionDetailsS>
    </AccordionS>
  </>;
}

export default Menu
const AccordionDetailsS = styled(AccordionDetails)`
  & {
    background: white;
    padding: 0;

    min-height: 200px;
  }
`
const AccordionS = styled(Accordion)`
  & {
    background: #f2f2f2;
    border-radius: 4px;
    box-shadow: none;
    margin: 0 !important;
    ::before {
      content: none;
    }
  }
`
const AccordionSummaryS = styled(AccordionSummary)`
  & {
    padding: 1.4em 3em;
    padding-right: 1rem;
    padding: 1.4em 1em;
    min-height: auto !important;
    border: 1px solid ${(p) => hexAlpha(p.theme.palette.alternate4.dark, 0.3)};
    border-radius: 4px;

    .MuiAccordionSummary-content {
      margin: 0 !important;
    }
    svg {
      font-size: 1.8rem;
    }
    :hover {
      background: ${(p) => p.theme.palette.alternate4.dark};
    }
  }
`

const AccordionContentS = styled.div`
  & {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1.4em;
    gap: 0.9em;
    color: #828282;
    color: #6e6e6e;
    .text {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      font-size: 1em;
      display: flex;
      align-items: center;
      flex: 1;
    }
    svg,
    img {
      max-width: 1em;
      font-size: 1.6em;
    }
  }
`
