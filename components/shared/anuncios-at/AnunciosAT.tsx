import React from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import hexAlpha from 'hex-alpha'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const AnunciosAT = ({ show = false, setShow }) => {
    const { data: dataFragment } = useGetFragmentQuery({ fragment: 'HOME_ALERTA' })

    if (!show || !dataFragment) {
        return null
    }

    return (
        <AnunciosATS>
            <div className="title">
                <FragmentCustomAT fragment={dataFragment || ''} />
            </div>
            <div className="action">
                <IconButton
                    onClick={() => {
                        setShow(false)
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>
        </AnunciosATS>
    )
}

export default AnunciosAT
const AnunciosATS = styled.div`
    & {
        background: ${(p) => hexAlpha(p.theme.palette.primary.main, 0.8)};
        display: flex;
        justify-content: center;
        color: white;

        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            right: 50px;
        }
        .title {
            font-size: 1rem;
            text-align: left;
            padding: 0 10px;

            color: white;
            > strong {
                font-weight: 500;
            }
        }
        .action {
            padding-top: 5px;
            padding-right: 7px;

            svg {
                color: white;
            }
        }
    }
`
