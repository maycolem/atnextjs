import styled from '@emotion/styled'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MyWallet = ({ children }) => {
  const [expanded, setExpanded] = React.useState(null)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const pathname = useRouter().pathname
  const route = useRouter()

  useEffect(() => {
    if (!expanded && typeof expanded === 'boolean') {
      setExpanded(null)
      return
    }
    setExpanded(route.pathname)
  }, [route])

  // useEffect(() => {
  //   console.log(pathname)
  //   setExpanded(pathname)
  //   // return () => {
  //   //   const arr = [PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url]
  //   //   const result = arr.filter((item) => item !== pathname)
  //   //   if (result.length === 0) {
  //   //     setExpanded(false)
  //   //   }
  //   // }
  // }, [route])

  return <>
    <AccordionS
      expanded={expanded === PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url}
      onChange={handleChange(PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url)}
    >
      <Link
        href={PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url}
        scroll={false}
        legacyBehavior>
        <AccordionSummaryS
          aria-controls="panel1bh-content"
          expandIcon={expanded === PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url ? <CloseIcon /> : <ExpandMoreIcon />}
          id="panel1bh-header"
        >
          <AccordionContentS>
            <div className="text">{PATHS.ACCOUNT_MY_BILLETERA_RECARGA.name}</div>
          </AccordionContentS>
        </AccordionSummaryS>
      </Link>
      <AccordionDetailsS>{PATHS.ACCOUNT_MY_BILLETERA_RECARGA.url === pathname && children}</AccordionDetailsS>
    </AccordionS>
    <AccordionS
      expanded={expanded === PATHS.ACCOUNT_MY_BILLETERA_RETIRO.url}
      onChange={handleChange(PATHS.ACCOUNT_MY_BILLETERA_RETIRO.url)}
    >
      <Link
        href={PATHS.ACCOUNT_MY_BILLETERA_RETIRO.url}
        scroll={false}
        legacyBehavior>
        <AccordionSummaryS
          aria-controls="panel1bh-content"
          expandIcon={expanded === PATHS.ACCOUNT_MY_BILLETERA_RETIRO.url ? <CloseIcon /> : <ExpandMoreIcon />}
          id="panel1bh-header"
        >
          <AccordionContentS>
            <div className="text">{PATHS.ACCOUNT_MY_BILLETERA_RETIRO.name}</div>
          </AccordionContentS>
        </AccordionSummaryS>
      </Link>
      <AccordionDetailsS>{PATHS.ACCOUNT_MY_BILLETERA_RETIRO.url === pathname && children}</AccordionDetailsS>
    </AccordionS>
    <AccordionS
      expanded={expanded === PATHS.ACCOUNT_MY_BILLETERA_HISTORIAL_SALDO.url}
      onChange={handleChange(PATHS.ACCOUNT_MY_BILLETERA_HISTORIAL_SALDO.url)}
    >
      <Link
        href={PATHS.ACCOUNT_MY_BILLETERA_HISTORIAL_SALDO.url}
        scroll={false}
        legacyBehavior>
        <AccordionSummaryS
          aria-controls="panel1bh-content"
          expandIcon={
            expanded === PATHS.ACCOUNT_MY_BILLETERA_HISTORIAL_SALDO.url ? <CloseIcon /> : <ExpandMoreIcon />
          }
          id="panel1bh-header"
        >
          <AccordionContentS>
            <div className="text">{PATHS.ACCOUNT_MY_BILLETERA_HISTORIAL_SALDO.name}</div>
          </AccordionContentS>
        </AccordionSummaryS>
      </Link>
      <AccordionDetailsS>{PATHS.ACCOUNT_MY_BILLETERA_HISTORIAL_SALDO.url === pathname && children}</AccordionDetailsS>
    </AccordionS>
  </>;
}

export default MyWallet
const AccordionDetailsS = styled(AccordionDetails)`
  & {
    background: white;
    padding: 0rem 3rem;
    padding-bottom: 1.8rem;
    padding-right: 1rem;
    padding-left: 1rem;
  }
`
const AccordionS = styled(Accordion)`
  & {
    background: #f2f2f2;
    background: white;
    border-radius: 4px;
    box-shadow: none;
    border-bottom: 0.5px solid #e5e5e5;
    border-radius: 0;
    margin: 0 !important;
    ::before {
      content: none;
    }
  }
`
const AccordionSummaryS = styled(AccordionSummary)`
  & {
    padding: 2rem 3rem;
    padding: 2.5rem 3rem;
    padding-right: 1rem;
    padding-left: 1rem;
    min-height: auto !important;
    padding: 1.4em 3em;
    padding-left: 1em;
    padding-right: 1rem;
    .MuiAccordionSummary-content {
      margin: 0 !important;
    }
    svg {
      font-size: 1.4rem;
    }
  }
`

const AccordionContentS = styled.div`
  & {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 3rem;
    .text {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 1em;

      line-height: 16px;
      display: flex;
      align-items: center;
      color: #828282;
      color: #595959;
    }
    svg {
      color: #828282;
      font-size: 2rem;
    }
    img {
      min-width: 2rem;
      max-width: 2rem;
      width: 2rem;
    }
  }
`
