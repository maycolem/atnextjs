/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from 'react'
import { FormControl, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { PasswordSchema } from '../schema/password'
import { LoadingButton } from '@mui/lab'
import { useForgotPasswordMutation } from 'states/calimaco/calimacoAuthApi'
import { useDispatch } from 'react-redux'
import { onClose, onOpen } from 'states/slice/layout/SnackBar'
import { ErrorMessage } from '@hookform/error-message'

const duration = 12000

const Form = () => {
  const dispatch = useDispatch()
  const [sendEmail, { isLoading: isLoadingMain }] = useForgotPasswordMutation()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const {
    register: login,
    handleSubmit,
    setValue,
    formState,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(PasswordSchema),
    criteriaMode: 'all',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data) => {
    const responseForgot = await sendEmail({ email: data.email })

    if (responseForgot.data.result === 'OK') {
      dispatch(
        onOpen({
          message: `Restablecimiento de contraseña completado. Revise su correo electrónico. Si no lo ve en su bandeja de entrada en los próximos minutos, intente buscar en su carpeta de correo no deseado.`,
          severity: 'success',
          open: true,
          autoHideDuration: duration,
        })
      )
    } else {
      dispatch(
        onOpen({
          message: `Ocurrio un error`,
          severity: 'error',
          open: true,
          autoHideDuration: duration,
        })
      )
    }
  }
  console.log(formState.errors)
  return (
    <FormS onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <TextFieldS
          fullWidth
          id="email"
          label="Email"
          size="small"
          variant="outlined"
          {...login('email', {
            onChange: (e) => setValue('email', e.target.value.trim()),
          })}
        />
      </FormControl>

      <div>
        <ErrorMessage
          errors={formState.errors}
          name="email"
          render={({ message }) => (
            <InvalidS>
              <span>
                <p>{message}</p>
              </span>
            </InvalidS>
          )}
        />
        <InvalidS>
          <span>{error && <p>{error}</p>}</span>
        </InvalidS>

        <ButtonS disabled={isLoadingMain} loading={isLoadingMain} title="INGRESA" type="submit">
          ENVIAR INSTRUCCIONES
        </ButtonS>
      </div>
    </FormS>
  )
}

export default Form

const InvalidS = styled.div`
  & {
    display: grid;
    place-items: center;
    color: #6f7070;
    font-size: 1em;
    p {
      font-size: 0.9em;
      color: #ed1c24;
      font-weight: bold;
    }
  }
`
const FormS = styled('form')`
  & {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`
const TextFieldS = styled(TextField)`
  & {
    background: #ffffff;
    border-radius: 10px;
    /* label {
      transform: translate(14px, 1rem) scale(1);
    } */
    &::-ms-reveal {
      display: none;
    }
    .MuiOutlinedInput-root {
      font-size: 1em;
    }

    label {
      top: 50%;
      transform: translate(14px, -50%) scale(1);
      color: #494952;
      font-size: 1em;
      &.MuiFormLabel-filled,
      &.Mui-focused {
        transform: translate(14px, calc(-150% + 0.2em)) scale(0.75);
      }
    }

    fieldset {
      border-radius: 8px;
    }
    input {
      padding: 10px 14px;
      border-radius: 10px;

      font-weight: 400;
      font-size: 1em;
      &::-ms-reveal {
        display: none;
      }
    }

    svg {
      font-size: 18px;
    }
  }
`
const ButtonS = styled(LoadingButton)`
  cursor: pointer;
  margin-top: 0.6em;
  background: #ed1c24;
  width: 100%;
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1em;
  transition: 0.15s;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  & {
    :hover {
      background: #ed1c24;
      color: white;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }
    .MuiCircularProgress-root {
      color: white;
    }
    &.MuiLoadingButton-loading {
      color: transparent;
    }
  }
`
