import styled from '@emotion/styled'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
const Bonos = ({ totalBonos, casino, deportivas }) => {
  return (
    <AccordionS>
      <AccordionSummaryS
        aria-controls="panel1a-content"
        expandIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
        id="panel1a-header"
      >
        <Typography>Total bonos {totalBonos}</Typography>
      </AccordionSummaryS>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget.
        </Typography>
      </AccordionDetails>
    </AccordionS>
  )
}

export default Bonos
const AccordionS = styled(Accordion)`
  & {
    box-shadow: none;
    ::before {
      content: none;
    }
    svg {
      color: ${(p) => p.theme.palette.primary.main};
    }
  }
`
const AccordionSummaryS = styled(AccordionSummary)`
  & {
    padding: 0;
    &:hover {
      background: ${(p) => p.theme.palette.linkPink.main};
    }
    .MuiAccordionSummary-content {
      flex: initial;
      justify-content: center;
      margin: 20px 0;
      color: ${(p) => p.theme.palette.primary.main};
    }
  }
`
