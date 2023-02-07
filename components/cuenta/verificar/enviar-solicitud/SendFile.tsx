import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { uploadFileVerificate } from 'states/uploadFile/uploadFile'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { LoadingButton } from '@mui/lab'
import { onOpen } from 'states/slice/layout/SnackBar'
import { delay } from '@helpers/delay'
import CheckIcon from '@mui/icons-material/Check'
interface Props {
    refetch?: () => void
}
const SendFile = ({ refetch }: Props) => {
    const user = useSelector(userSelector)
    const [previews, setPreviews] = useState([])
    const [files, setFiles] = useState<File[]>()
    const router = useRouter()
    const [loadingInputFileUpload, setLoadingInputFileUpload] = useState(false)
    const dispatch = useDispatch()

    const handleOnclickInput = (e: React.MouseEvent<HTMLInputElement>) => {
        const input = document.getElementById('InputFileS-file')
        input.click()
    }
    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList
        const allowed = ['jpeg', 'png', 'jpg']
        for (let index = 0; index < files.length; index++) {
            const element = files[index]
            if (!element.type.match('image/jpeg|image/png|image/jpeg')) {
                dispatch(
                    onOpen({
                        message: 'Formato no permitido$$- Solo se aceptan .jpg, .jpeg y .png.',
                        severity: 'error',
                        open: true,
                        autoHideDuration: 10000,
                    })
                )
                return
            }
        }

        if (files) {
            const _arrPreview = []
            Array.from(files)
                .slice(0, 2)
                .map((file) => {
                    const _preview = URL.createObjectURL(file)
                    return _arrPreview.push({
                        url: _preview,
                        name: file.name,
                        type: file.type,
                    })
                })
            setPreviews(_arrPreview)
            setFiles(Array.from(files).slice(0, 2))
        }
    }
    const handleRemovePreview = () => {
        setPreviews([])
        setFiles([])
    }

    const uploadImagen = async () => {
        if (!user) {
            return
        }
        let okCounts = 0
        setLoadingInputFileUpload(true)
        const icons = document.querySelectorAll('span.icon-534543543')
        if (icons.length > 0) {
            icons.forEach((icon) => {
                icon.classList.remove('complete')
                icon.classList.remove('error')
            })
        }

        for (let i = 0; i < files.length; i++) {
            const data = {
                session: user.session,
                company: 'ATP',
                myFile: files[i],
                type: 'IDENTITY',
            }
            const selector = `#icon-534543543-${i}`
            const icon = document.querySelector(selector)
            const response = await uploadFileVerificate(data)
            if (response && 'result' in response && response.result === 'OK') {
                okCounts += 1
                icon.classList.add('complete')
                await delay(300)
                continue
            }
            icon.classList.add('error')
            await delay(300)
            continue
        }

        await delay(2000)
        handleRemovePreview()
        setLoadingInputFileUpload(false)
        if (okCounts < 1) {
            const message = `No se pudo enviar ninguna imagen.`
            dispatch(onOpen({ message }))
            return
        }
        if (okCounts > 0) {
            if (refetch) {
                refetch()
            } else {
                await router.push(PATHS.CUENTA_VERIFICAR_ESTADO.url)
            }
        }
    }

    return (
        <Styled>
            {previews.length > 0 ? (
                <>
                    <StyledPreview>
                        {previews.map((p, i) => {
                            return (
                                <div className="wrapper" key={i}>
                                    <div className="wrapper-image">
                                        {p?.type?.includes('pdf') ? <AttachFileIcon></AttachFileIcon> : <img alt="" src={p.url} />}
                                    </div>
                                    <StyledText>
                                        <>
                                            <p>{p?.name}</p>
                                            <span className="icon-534543543" id={`icon-534543543-${i}`}>
                                                <CheckIcon></CheckIcon>
                                            </span>
                                        </>
                                    </StyledText>
                                </div>
                            )
                        })}
                    </StyledPreview>
                    <SendSolicitudS>
                        <LoadingButton
                            disabled={loadingInputFileUpload}
                            loading={loadingInputFileUpload}
                            onClick={handleRemovePreview}
                            variant="outlined"
                        >
                            Eliminar
                        </LoadingButton>
                        <LoadingButton
                            disabled={loadingInputFileUpload}
                            loading={loadingInputFileUpload}
                            onClick={uploadImagen}
                            variant="contained"
                        >
                            Enviar Solicitud
                        </LoadingButton>
                    </SendSolicitudS>
                </>
            ) : (
                <>
                    <label className="label-file" htmlFor="file">
                        <span>
                            Agregar aquí la imagen de tu documento de identidad, Puedes subir una o hasta dos imágenes (ambos lados).
                        </span>
                        <Button onClick={handleOnclickInput} variant="outlined">
                            Subir imagen
                        </Button>
                    </label>
                    <input accept=".png, .jpg, .jpeg" hidden id="InputFileS-file" multiple onChange={handleOnChangeInput} type="file" />
                </>
            )}
        </Styled>
    )
}

export default SendFile
const StyledText = styled.div`
    display: flex;
    align-items: center;

    > p {
        white-space: nowrap;
        display: block;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100px + 5vw);
    }
    > span {
        border: 2px solid #878787;
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    > span.complete {
        border: 2px solid #66bb6a;
    }
    > span > svg {
        font-size: 25px;
        color: #878787;
    }
    > span.complete > svg {
        color: #66bb6a;
    }

    > span.error {
        border: 2px solid red;
        > svg {
            color: red;
        }
    }
`
const StyledPreview = styled.div`
    & {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
        .wrapper {
            flex: 1 1 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            .wrapper-image {
                flex: 1;
                min-width: 80px;
                max-width: calc(150px + 4vw);
                svg {
                    font-size: calc(80px + 4vw);
                }
            }
        }
    }
`
const SendSolicitudS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 0.5rem;
        > button {
            width: 100%;
            max-width: 200px;
            text-transform: capitalize;
            padding: calc(0.7vmax + 0.1rem) calc(1vw + 0.5rem);
        }
    }
`

const Styled = styled.div`
    & {
        position: relative;
        display: flex;
        border: thin dashed black;
        background: ${(p) => p.theme.palette.light.main};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
        /* height: 40vh; */
        /* max-height: calc(300px + 5vmax); */
        min-height: 40vh;
        pointer-events: all;
        .label-file {
            /* font-size: clamp(1rem, 2vw, 1.6rem); */
            font-size: 1rem;
            text-align: center;
            display: block;
            width: 100%;
            display: grid;
            place-items: center;
            gap: 1rem;
            max-width: 700px;
            cursor: pointer;
            color: ${(p) => p.theme.palette.alternate13.main};
            pointer-events: none;
            button {
                text-transform: capitalize;
                padding: 0.5rem 2rem;
                pointer-events: all;
            }
        }
        > input {
            width: 0;
            height: 0;
        }

        animation-name: null;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        transition: 250ms;
    }
`
