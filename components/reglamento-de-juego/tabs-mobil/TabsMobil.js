import { Autocomplete, FormControl, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'

const TabsMobil = ({ setFragment }) => {
  const [value, setValue] = React.useState(null)
  const [inputValue, setInputValue] = React.useState('')
  const id = Math.random().toString()
  const router = useRouter()
  useEffect(() => {
    if (window?.location?.href) {
      const id = window?.location?.href?.split('?')[1]?.split('=')[1]
      if (id) {
        const index = FRAGMENTOS.findIndex((item) => item?.key === id.replaceAll('%20', ' '))
        setValue(FRAGMENTOS[index])
        setFragment(id.replaceAll('%20', ' '))
      } else {
        setValue(FRAGMENTOS[0])
        setFragment('SEC_REGLAMENTO_0_GLOSARIO')
      }
    }
  }, [])

  return (
    <FormControlS fullWidth>
      <div className="wrapper">
        <Autocomplete
          getOptionLabel={(option) => option?.label}
          inputValue={inputValue}
          noOptionsText="No hay opciones"
          onChange={(event, newValue) => {
            if (!newValue) {
              history.pushState(null, null, PATHS.REGLAMENTO_DEL_JUEGO.url + '/' + `?id=SEC_REGLAMENTO_0_GLOSARIO`)
              setValue(FRAGMENTOS[0])
              setFragment('SEC_REGLAMENTO_0_GLOSARIO')
              return
            }
            history.pushState(null, null, PATHS.REGLAMENTO_DEL_JUEGO.url + '/' + `?id=${newValue?.key}`)
            setValue(newValue)
            setFragment(newValue?.key)
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          options={FRAGMENTOS}
          popupIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
          renderInput={(params) => (
            <TextField
              {...params}
              autoComplete={id}
              id={id}
              inputProps={{
                id,
                ...params.inputProps,
                autoComplete: id, // disable autocomplete and autofill
                form: {
                  autocomplete: id,
                },
              }}
              label="Reglamento"
              name={id}
            />
          )}
          renderOption={(props, option) => (
            <div {...props}>
              <p>{option.label}</p>
            </div>
          )}
          value={value}
        ></Autocomplete>
      </div>
    </FormControlS>
  )
}

export default TabsMobil
const FormControlS = styled(FormControl)`
  & {
    > .wrapper {
      width: 100%;
      max-width: 400px;
      margin: auto;
      margin-bottom: 0.5rem;
    }
    .MuiOutlinedInput-root {
      background: white;
      .MuiOutlinedInput-input {
        font-size: 1rem;
      }
    }
    button.MuiIconButton-root {
      color: ${(p) => p.theme.palette.primary.main};
      svg {
        /* font-size: 1.8rem; */
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
