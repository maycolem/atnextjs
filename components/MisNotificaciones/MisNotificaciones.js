import React, { useEffect, useState } from 'react'
import _EstadoSolicitud from 'components/retirar/estado-de-solicitud/EstadoSolicitud'
import styled from 'styled-components'
import EmailIcon from '@mui/icons-material/Email'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DraftsIcon from '@mui/icons-material/Drafts'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { FormLabel } from '@mui/material'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'

const MisNotificaciones = () => {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const [page, setPage] = React.useState(1)
  const handleChange2 = (event, value) => {
    setPage(value)
  }

  return (
    <>
      <Styled>
        <span>No tiene Notificaciones</span>
        <DoDisturbAltIcon></DoDisturbAltIcon>
      </Styled>

      {/* <PaginacionS>
        <FormLabel>
          <div className="LabelS">pag.</div>
        </FormLabel>
        <Stack spacing={2}>
          <Pagination count={3} onChange={handleChange2} page={page} />
        </Stack>
      </PaginacionS>

      <FormDetalle>
        <div>
          <AccordionNL expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1bh-content" expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
              <Typography sx={{ width: '10%', flexShrink: 0 }}>
                <EmailIcon></EmailIcon>
              </Typography>
              <Typography sx={{ width: '20%', flexShrink: 0 }}>24/12/22 - 6:00 am</Typography>

              <TypographyNL sx={{ width: '70%', flexShrink: 0 }}>
                Aprende en 5 pasos como inciarse como experto en Black Jack
              </TypographyNL>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Penatibus mi mattis aliquam consequat,
                dignissim sed aliquet. Adipiscing massa non mi, pharetra id sed. Quis vulputate mus amet ullamcorper.
                Turpis malesuada nascetur ultrices pretium nisl. Aliquet sagittis purus massa rhoncus, vel lacus viverra
                massa vivamus. Vulputate at cursus eu elit ut. Massa tortor penatibus amet, viverra nulla massa justo,
                malesuada. Mi, adipiscing et sed montes, massa. Ipsum magna rhoncus aliquam a. Tellus orci, facilisi
                orci, faucibus turpis. Velit ac posuere volutpat accumsan egestas ac hac. Tempor, vulputate commodo a
                dolor eget ipsum. Neque, tortor, at est, hendrerit. Vitae et fames sem laoreet. Vulputate egestas sed at
                urna. Odio sit hac sapien in commodo sit aliquam enim mi. Fermentum faucibus commodo nascetur rhoncus.
                Purus leo, suscipit amet velit, ultricies sed. Ullamcorper suspendisse ultrices ut cursus feugiat hac
                leo suspendisse molestie. Pretium malesuada habitant pulvinar felis amet, pretium orci eget faucibus.
                Auctor vel consequat libero sed tortor elementum sem id sed. Commodo vulputate in nunc, diam lorem.
                Netus urna, id id lectus sit fermentum.
              </Typography>
            </AccordionDetails>
          </AccordionNL>

          <AccordionL expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel1bh-content" expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
              <Typography sx={{ width: '10%', flexShrink: 0 }}>
                <DraftsIcon></DraftsIcon>
              </Typography>
              <Typography sx={{ width: '20%', flexShrink: 0 }}>24/12/22 - 6:00 am</Typography>

              <Typography sx={{ width: '70%', flexShrink: 0 }}>Bienvenido a Apuesta Total</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Penatibus mi mattis aliquam consequat,
                dignissim sed aliquet. Adipiscing massa non mi, pharetra id sed. Quis vulputate mus amet ullamcorper.
                Turpis malesuada nascetur ultrices pretium nisl. Aliquet sagittis purus massa rhoncus, vel lacus viverra
                massa vivamus. Vulputate at cursus eu elit ut. Massa tortor penatibus amet, viverra nulla massa justo,
                malesuada. Mi, adipiscing et sed montes, massa. Ipsum magna rhoncus aliquam a. Tellus orci, facilisi
                orci, faucibus turpis. Velit ac posuere volutpat accumsan egestas ac hac. Tempor, vulputate commodo a
                dolor eget ipsum. Neque, tortor, at est, hendrerit. Vitae et fames sem laoreet. Vulputate egestas sed at
                urna. Odio sit hac sapien in commodo sit aliquam enim mi. Fermentum faucibus commodo nascetur rhoncus.
                Purus leo, suscipit amet velit, ultricies sed. Ullamcorper suspendisse ultrices ut cursus feugiat hac
                leo suspendisse molestie. Pretium malesuada habitant pulvinar felis amet, pretium orci eget faucibus.
                Auctor vel consequat libero sed tortor elementum sem id sed. Commodo vulputate in nunc, diam lorem.
                Netus urna, id id lectus sit fermentum.
              </Typography>
            </AccordionDetails>
          </AccordionL>
        </div>
      </FormDetalle> */}
    </>
  )
}

export default MisNotificaciones
const FormS = styled.form`
  & {
    padding: 1rem;
    grid-gap: 1rem;
    grid-column-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);

    > div {
      grid-column: span 2;
      &.date,
      &.method {
        grid-column: span 1;
      }
    }
  }
`

const FormDetalle = styled.form`
  & {
    grid-gap: 1rem;
    grid-column-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);

    > div {
      grid-column: span 2;
      &.date,
      &.method {
        grid-column: span 1;
      }
    }
  }
`
const AccordionNL = styled(Accordion)`
  background: rgba(255, 199, 0, 0.1);
`

const AccordionL = styled(Accordion)`
  background: #f2f2f2;
`

const TypographyNL = styled(Typography)`
  font-weight: 600;
`

const PaginacionS = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem;

  justify-content: right;
`

const Styled = styled.div`
  & {
    display: flex;
    align-items: center;
    min-height: 100px;
    justify-content: center;
    gap: 8px;
    color: ${(p) => p.theme.palette.alternate16.main};
  }
`
