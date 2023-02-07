import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserFilesQuery } from 'states/calimaco/calimacoDataApi'
import { userSelector } from 'states/features/slices/userSlice'
import styled, { css } from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import SendFile from 'components/cuenta/verificar/enviar-solicitud/SendFile'
import { PATHS } from 'routes/paths/PATHS'
import { useRouter } from 'next/router'
import Status from 'components/cuenta/verificar/estado/Status'
import { File, User } from '@interfaces/index'
const Estado = () => {
    const user: User = useSelector(userSelector)
    const { data, refetch, isLoading, isFetching } = useGetUserFilesQuery(
        { session: user?.session },
        { skip: !user?.session || Boolean(user?.verified) }
    )
    const router = useRouter()
    const [status, setStatus] = useState('')

    const handleIsVerified = async (user: User) => {
        if (user.verified === 1) {
            await router.push({
                pathname: PATHS.HOME.url,
            })
        }
    }

    useEffect(() => {
        if (user) {
            handleIsVerified(user)
        }
    }, [user])

    const handleExistDenied = async (files: File[]) => {
        if (files.length > 0) {
            const firstFile = files[0]
            setStatus(firstFile.status)
        }
    }
    useEffect(() => {
        if (user && user.verified === 0 && data && 'files' in data) {
            handleExistDenied(data.files)
        }
    }, [data, user])

    useEffect(() => {
        if (isLoading || isFetching) {
            setStatus('')
        }
    }, [isLoading, isFetching])

    return (
        <EstadoS>
            {status === 'DENIED' ? (
                <AlertS>
                    Hola, te recordamos que tu <span className="warning">documento ha sido rechazado</span>. Únicamente las cuentas
                    verificadas pueden retirar sus ganancias. Verificamos las cuentas para asegurarnos que seas tú el titular de la misma.
                </AlertS>
            ) : (
                <AlertS>
                    Hola, te recordamos que tu cuenta aún <span className="warning">no ha sido verificada</span>. Únicamente las cuentas
                    verificadas pueden retirar sus ganancias. Verificamos las cuentas para asegurarnos que seas tú el titular de la misma.
                </AlertS>
            )}

            <div className="wrapper-desk">
                <Status status={status} />
                {status === 'PENDING' && (
                    <AlertS className="alert-bottom">
                        <span className="warning">La imagen enviada se encuentra en evaluación</span>, En un plazo no mayor a 24 horas tu
                        cuenta será verificada. En caso de haber alguna observación, te enviaremos un correo con nuestros comentarios.
                    </AlertS>
                )}

                {status === 'DENIED' && (
                    <AlertS className="alert-bottom">
                        <span className="warning">La imagen enviada no fue aceptada.</span> Para poder verificar tu cuenta te recomendamos
                        subir un imagen nítida de tu documento de identidad. Peso máximo 2 Mb, formatos aceptados jpg y png.
                    </AlertS>
                )}
            </div>

            {status === 'DENIED' ? (
                <div className="wrapper-inputArea">
                    <SendFile refetch={refetch} />
                </div>
            ) : null}
        </EstadoS>
    )
}

export default Estado

const EstadoS = styled.div`
    & {
        background: white;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: ${(p) => p.theme.palette.alternate12.main};
        padding: 2rem 0;
        flex: 1;
        ${MEDIA_QUERIES.min_width.tabletL} {
            padding: 3rem clamp(1rem, 3vw, 70px);
            .wrapper-desk {
                padding: 0 clamp(1rem, 3vw, 60px);
            }
        }
    }
`
const AlertS = styled(Alert)`
    & {
        &.MuiPaper-root {
            color: ${(p) => p.theme.palette.alternate13.main};
            background: white;
            box-shadow: none;
            border-radius: 0;
            outline: none;
            .MuiAlert-message {
                font-size: 1rem;
            }
            .warning {
                color: ${(p) => p.theme.palette.primary.main};
                font-weight: 600;
            }
            svg {
                color: ${(p) => p.theme.palette.dark.main};
            }
        }
        &.alert-bottom {
            background: transparent;
        }
    }
`
