import { Banner } from '@interfaces/banner'
import { Button } from '@mui/material'
import { useGetBannersQuery } from '@states/calimaco/calimacoContentApi'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dtBannerClick, dtBannerView } from '../index'

interface Props {
    container: string
    section: string
}

export const BannerRight = ({ container, section }: Props) => {
    const { data: dataGetBanner } = useGetBannersQuery({ container })
    const [banners, setBanners] = useState<Banner[]>([])
    const router = useRouter()

    const handleOnClickBanner = async (url: string, name: string) => {
        dtBannerClick(name, section)
        await router.push(url)
    }
    useEffect(() => {
        if (dataGetBanner && 'banners' in dataGetBanner) {
            setBanners(dataGetBanner.banners)
        }
    }, [dataGetBanner])

    if (banners?.length > 0) {
        return (
            <>
                {banners.map(({ config }, i) => {
                    return (
                        <div className="wrap-image" key={i} onClick={() => handleOnClickBanner(config?.url, config?.title)}>
                            <img
                                alt=""
                                onLoad={() => dtBannerView(config?.title, section)}
                                src={`${process.env.REACT_APP_WEB_BASE}/${config?.image}`}
                                loading="lazy"
                            />
                            <StyledButton
                                color="secondary"
                                onClick={() => handleOnClickBanner(config?.url, config?.title)}
                                title="jugar"
                                variant="contained"
                            >
                                Juega aquí {'>'}
                            </StyledButton>
                        </div>
                    )
                })}
            </>
        )
    }

    return <></>
}

const StyledButton = styled(Button)`
    && {
        padding: 0;
        font-size: 0.8rem;
        text-transform: capitalize;
        width: fit-content;
        height: auto;
        max-height: min-content;
        cursor: pointer;
        padding: 0.3rem 1rem;
        position: absolute;
        bottom: calc(0.5rem + 1%);
        left: calc(0.5rem + 1%);
        display: flex;
        white-space: nowrap;
        cursor: pointer;
        font-size: 0.9rem;
        z-index: 3;
        font-weight: 500;

        text-align: center;
        transition: 0.5s;
        background-size: 200% auto;
        box-shadow: 0 0 20px #000;
        display: block;
    }

    &:hover {
        background-position: right center; /* change the direction of the change here */
        text-decoration: none;
    }
`
