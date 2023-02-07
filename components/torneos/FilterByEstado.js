import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import styled from 'styled-components'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const FilterByEstado = () => {
  const [age, setAge] = React.useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <FormControlS>
      <InputLabelS id="demo-simple-select-label">Estado</InputLabelS>
      <SelectS
        IconComponent={KeyboardArrowDownIcon}
        id="demo-simple-select"
        label="Estado"
        labelId="demo-simple-select-label"
        onChange={handleChange}
        value={age}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </SelectS>
    </FormControlS>
  )
}

export default FilterByEstado
const InputLabelS = styled(InputLabel)`
  & {
    transform: translate(14px, 1rem) scale(1);
    transform-origin: top left;
    &.Mui-focused,
    &.MuiFormLabel-filled {
      transform: translate(14px, -0.5rem) scale(0.7);
    }
  }
`
const SelectS = styled(Select)`
  & {
    .MuiSelect-select {
      padding: 1rem;
    }
    svg {
      color: ${(p) => p.theme.palette.primary.main};
      font-size: 2rem;
    }
  }
`
const FormControlS = styled(FormControl)`
  & {
    background: white;
  }
`
