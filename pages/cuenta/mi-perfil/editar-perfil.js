import styled from '@emotion/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { FormControl, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

const EditarPerfil = () => {
  // RTK QUERY MUTATION
  const {
    register,
    trigger,
    resetField,
    setFocus,
    control,
    watch,
    setValue,
    getValues,
    getFieldState,
    formState,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    // mode: 'onSubmit',
    mode: 'onBlur',

    resolver: yupResolver(null),
    criteriaMode: 'all',
    defaultValues: {
      country: '',
      birthday: '',
      promotion: '',
      national_id_type: '',
    },
  })
  const onSubmit = async (data) => {
    // CONSUMIR API DE RTK QUERY
    // await
    // LOGRE EDITAR EL USUARIO
  }
  return (
    <div id="scroll-page">
      {/* <FormS autoComplete="chrome-off" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            {...register('firstname')}
            className="firstname"
            error={true}
            fullWidth
            helperText="error del input"
            id="chrome-off"
            inputProps={{ autoComplete: 'chrome-off' }}
            label="Nombres"
            variant="standard"
          />
        </FormControl>

        <TextField
          className="lastname"
          fullWidth
          id="chrome-off"
          inputProps={{ autoComplete: 'chrome-off' }}
          label="Apellidos"
          variant="standard"
        />
        <TextField className="dni" fullWidth id="chrome-off" label="DNI" variant="standard" />
        <TextField
          className="mobile"
          fullWidth
          id="chrome-off"
          inputProps={{ autoComplete: 'chrome-off' }}
          label="Celular"
          variant="standard"
        />
        <TextField
          className="birthday"
          fullWidth
          id="chrome-off"
          inputProps={{ autoComplete: 'chrome-off' }}
          label="Fecha de nacimiento"
          variant="standard"
        />
        <TextField
          className="gender"
          fullWidth
          id="chrome-off"
          inputProps={{ autoComplete: 'chrome-off' }}
          label="Género"
          variant="standard"
        />
        <TextField
          className="address"
          fullWidth
          id="chrome-off"
          inputProps={{ autoComplete: 'chrome-off' }}
          label="Dirección"
          variant="standard"
        />
        <TextField
          className="town"
          fullWidth
          id="chrome-off"
          inputProps={{ autoComplete: 'chrome-off' }}
          label="Ciudad"
          variant="standard"
        />
        <TextField
          className="country"
          fullWidth
          id="chrome-off"
          inputProps={{ autoComplete: 'chrome-off' }}
          label="Pais"
          variant="standard"
        />
        <div>
          <LoadingButtonS className="name" color="primary" fullWidth variant="contained">
            GUARDAR CAMBIOS
          </LoadingButtonS>
        </div>
      </FormS> */}
    </div>
  )
}

export default EditarPerfil
const LoadingButtonS = styled(LoadingButton)`
  & {
    padding: 16px;
    border-radius: 4px;
    font-family: 'Rubik';
    font-style: normal;
    color: #ffffff;
    font-weight: 400;
    margin-top: 1rem;
    font-size: 1em;
  }
`
const FormS = styled.form`
  & {
    display: grid;
    grid-gap: 1.5rem;
    grid-column-gap: 2.5rem;
    grid-template-columns: repeat(2, 1fr);

    * {
      font-size: 1em;
    }

    > div {
      grid-column: span 2;
      &.dni,
      &.mobile,
      &.birthday,
      &.gender,
      &.town,
      &.country {
        grid-column: span 1;
      }
    }
  }
`
