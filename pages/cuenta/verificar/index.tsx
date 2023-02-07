import { ConstructionOutlined } from '@mui/icons-material'
import { Alert, Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserFilesQuery } from 'states/calimaco/calimacoDataApi'
import { userSelector } from 'states/features/slices/userSlice'
import { uploadFileVerificate } from 'states/uploadFile/uploadFile'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import SendFile from 'components/cuenta/verificar/enviar-solicitud/SendFile'
import Skeleton from '@mui/material/Skeleton'
import { Session } from 'services/Session'
import { File, User } from '@interfaces/index'
const Verificar = () => {
    const user: User = useSelector(userSelector)
    const { data } = useGetUserFilesQuery({ session: user?.session }, { skip: !user?.session || Boolean(user?.verified) })
    const router = useRouter()

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
            if (['EXPIRED', 'DENIED', 'APPROVED', 'REVISING', 'PENDING'].includes(firstFile.status)) {
                await router.push({
                    pathname: PATHS.CUENTA_VERIFICAR_ESTADO.url,
                })
            }
        }
    }
    useEffect(() => {
        if (user && user.verified === 0 && data && 'files' in data) {
            handleExistDenied(data.files)
        }
    }, [data, user, router.asPath])

    return (
        <SendFileS>
            <AlertS>
                Hola, te recordamos que tu cuenta aún <span className="warning">no ha sido verificada</span>. Únicamente las cuentas
                verificadas pueden retirar sus ganancias. Verificamos las cuentas para asegurarnos que seas tú el titular de la misma.
            </AlertS>
            <ContentS>
                <SendFile />
                <p className="bottom-text">
                    (Sube foto de tu DNI, Pasaporte o Carnet de Extranjería escaneados por ambos lados según aplique, en formato JPG, JPEG y
                    PNG, no mayor a 1 Mb)
                </p>
            </ContentS>
        </SendFileS>
    )
}

export default Verificar
const SkeletonStyled = styled.div`
    & {
        display: flex;
        flex-direction: column;
        align-items: center;
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
    }
`

const SendFileS = styled.div`
    & {
        background: white;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: ${(p) => p.theme.palette.alternate12.main};
        padding: 2rem 0;
        flex: 1;
    }
`
const ContentS = styled.div`
    & {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .bottom-text {
            text-align: center;
            font-size: 1rem;
            color: ${(p) => p.theme.palette.alternate13.main};
            line-height: 1.4rem;
        }
    }
`
