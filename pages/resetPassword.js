import { Button, FormControl, FormLabel, TextField, IconButton, InputAdornment } from '@mui/material'
import Head from 'next/head'
import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import styled from '@emotion/styled'
import { ErrorMessage } from '@hookform/error-message'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import classNames from 'classnames'
import Link from 'next/link'
import logofullIMG from 'public/assets/logofull.png'
import { useRouter } from 'next/router'
import { useUpdatePasswordMutation } from 'states/calimaco/calimacoAuthApi'
import { PATHS } from 'routes/paths/PATHS'
import { useDispatch } from 'react-redux'
import { onOpen } from 'states/slice/layout/SnackBar'

const duration = 1500

const resetPassword = () => {
  const { register, getFieldState, formState, handleSubmit, reset } = useForm()
  const { errors } = formState
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [updatePassword, { isLoading: isLoadingUpdate }] = useUpdatePasswordMutation()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    if (router?.query.code) {
      if (data.new_password === data.rep_password) {
        const responseUpdatePassword = await updatePassword({
          code: router.query.code,
          password: unescape(encodeURIComponent(data.new_password)),
        })

        if (responseUpdatePassword.data.result === 'OK') {
          await router.push(PATHS.LOGIN.url)
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
      } else {
        dispatch(
          onOpen({
            message: `Password Incorrecto`,
            severity: 'error',
            open: true,
            autoHideDuration: duration,
          })
        )
      }
    } else {
      console.log('ENTRO ERROR..')
    }
  }

  return <>
    <Head>
      <title>Cambiar Password | Apuesta Total</title>
    </Head>

    <CambiarPasswordS id="scroll-page">
      <TitleS>
        <p>CAMBIAR PASSWORD</p>
      </TitleS>

      <Link href={'/'} legacyBehavior>
        <LogoS>
          <img alt="logo apuesta total" src={logofullIMG.src} />
        </LogoS>
      </Link>

      <div className="Contenedor2">
        <FormContentS>
          <FormS onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              className={classNames('--password', {
                invalid: getFieldState('password').invalid,
                valid: getFieldState('password').isTouched && !getFieldState('password').invalid,
              })}
            >
              <FormLabel>Constraseña Nueva</FormLabel>
              <TextField
                {...register('new_password', { required: true })}
                InputProps={{
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                inputProps={{ autoComplete: 'chrome-off' }}
                type={'password'}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Repetir Constraseña</FormLabel>
              <TextField
                {...register('rep_password', { required: true })}
                InputProps={{
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                id="chrome-off"
                inputProps={{ autoComplete: 'chrome-off' }}
                type={'password'}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <FormLabel> </FormLabel>
              <Button color="primary" type="submit" variant="contained">
                Guardar Cambios
              </Button>
            </FormControl>
          </FormS>
        </FormContentS>
      </div>
    </CambiarPasswordS>
  </>;
}

export default resetPassword

const CambiarPasswordS = styled.div`
  & {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #fafafa;

    header {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: ${(p) => p.theme.palette.alternate5.main};
    }
  }

  ${MEDIA_QUERIES.min_width.tabletS} {
    & {
      gap: 1rem;
      background: #fafafa;
      padding: 20px;

      margin: 0 auto;
      display: flex;
      flex-direction: column;

      align-items: center;
      header {
        display: flex;

        gap: 1rem;
        color: ${(p) => p.theme.palette.alternate5.main};
      }
    }
    .Contenedor2 {
      display: grid;
      grid-template-columns: 500px;

      gap: 1rem;
      padding: 1rem;
    }
  }

  .Contenedor1 {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
    padding: 1.2rem;
  }
  .Secciones {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    text-align: left;
  }
`
const FormContentS = styled.div`
  & {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 10px;
    span.lineStyle {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 19.42px;
      height: 45px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #000000;
    }
    span.textFooter {
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #000000;
    }
  }

  ${MEDIA_QUERIES.min_width.tabletS} {
    & {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      text-align: left;

      span.lineStyle {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 19.42px;
        height: 45px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #000000;
      }
      span.textFooter {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #000000;
      }
    }
  }
`
const FormS = styled.form`
  & {
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);

    > div {
      grid-column: span 2;
    }
  }
`
const TitleS = styled.div`
  & {
    p {
      font-size: 0.9em;
      display: flex;
      justify-content: center;
      padding-top: 3rem;
    }
  }
`
const LogoS = styled('div')`
  cursor: pointer;
  img {
    margin: auto;
    width: 100%;
    max-width: 300px;
  }
`
