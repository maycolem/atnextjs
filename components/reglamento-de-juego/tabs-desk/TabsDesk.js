import { Tab, Tabs } from '@mui/material'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import React, { useEffect } from 'react'
import { PATHS } from 'routes/paths/PATHS'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import styled from 'styled-components'

function a11yProps(index) {
  return {
    id: index,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      aria-labelledby={`vertical-tab-${index}`}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <p>{children}</p>
        </div>
      )}
    </div>
  )
}

const TabsDesk = ({ setFragment, setFragmentName }) => {
  const [value, setValue] = React.useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (!newValue) {
      history.pushState(null, null, PATHS.REGLAMENTO_DEL_JUEGO.url + '/' + `?id=SEC_REGLAMENTO_0_GLOSARIO`)
      setValue(FRAGMENTOS[0].key)
      setFragment('SEC_REGLAMENTO_0_GLOSARIO')
      return
    }
    history.pushState(null, null, PATHS.REGLAMENTO_DEL_JUEGO.url + '/' + `?id=${newValue}`)
    setValue(newValue)
    setFragment(newValue)
  }
  useEffect(() => {
    if (window?.location?.href) {
      const id = window?.location?.href?.split('?')[1]?.split('=')[1]
      if (id) {
        const index = FRAGMENTOS.findIndex((item) => item?.key === id.replaceAll('%20', ' '))
        setValue(FRAGMENTOS[index].key)
        setFragment(id.replaceAll('%20', ' '))
      } else {
        setValue(FRAGMENTOS[0].key)
        setFragment('SEC_REGLAMENTO_0_GLOSARIO')
      }
    }
  }, [])
  useEffect(() => {
    if (value) {
      const index = FRAGMENTOS.findIndex((item) => item?.key === value?.replaceAll('%20', ' '))
      setFragmentName(FRAGMENTOS[index]?.label)
    }
  }, [value])

  return (
    <>
      {!!value && (
        <TabsS
          aria-label="Vertical tabs example"
          onChange={handleChange}
          orientation="vertical"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          value={value}
          variant="scrollable"
        >
          {FRAGMENTOS.map((item) => {
            return <TabS key={item.key} label={item.label} value={item.key} />
          })}
        </TabsS>
      )}
    </>
  )
}

export default TabsDesk
const TabsS = styled(Tabs)`
  & {
    counter-reset: my-awesome-counter;
    /* counter-reset: step -2; */
  }
`
const TabS = styled(Tab)`
  && {
    text-align: left !important;
    display: block !important;
    align-items: center !important;
    justify-content: flex-start !important;
    flex-direction: row !important;
    text-transform: initial;
    font-weight: 400;
    font-size: 1rem;
    :not(:first-of-type) {
      ::first-letter {
        text-transform: uppercase;
      }
      ::before {
        counter-increment: my-awesome-counter;
        content: counter(my-awesome-counter) '. ';
      }
    }
  }
`
const FRAGMENTOS = [
  { label: 'Glosario', key: 'SEC_REGLAMENTO_0_GLOSARIO' },
  { label: 'Normas generales', key: 'SEC_REGLAMENTO_1_NORMAS_GENERALES' },
  { label: 'Condiciones específicas del canal virtual', key: 'SEC_REGLAMENTO_2_CANAL_VIRTUAL' },
  { label: 'Condiciones específicas del Canal Presencial', key: 'SEC_REGLAMENTO_3_CANAL_PRESENCIAL' },
  { label: 'Condiciones específicas del Canal Teleservicios', key: 'SEC_REGLAMENTO_4_CANAL_TELESERVICIOS' },
  { label: 'Reglas generales por producto', key: 'SEC_REGLAMENTO_5_REGLAS_POR_PRODUCTO' },
  { label: 'Reglas deportivas del canal presencial', key: 'SEC_REGLAMENTO_6_REGLAS_POR_DEPORTE' },
  {
    label: 'Reglas deportivas del canal virtual y teleservicios',
    key: 'SEC_REGLAMENTO_8_REGLAS_DEP_CANAL_VIRTUAL_TELESERVICIOS',
  },
  {
    label: 'Juego Responsable',
    key: 'SEC_REGLAMENTO_7_JUEGO RESPONSABLE',
  },
]
