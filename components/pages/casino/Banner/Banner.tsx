import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { useEffect, useState } from 'react'
import { Button, useMediaQuery } from '@mui/material'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Slider from 'react-slick'
import axios from 'axios'
import { useRouter } from 'next/router'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { GoogleTagManager } from 'google/TagManager'
import { dtBannerView, dtPromoView } from '../index'

const SETTINGS_DEFAULT = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
}
const initialPadding = '20px'

export const Banner = ({ container, section }) => {
    const [settings, setSettings] = useState(SETTINGS_DEFAULT)
    // const [banners, setBanners] = useState([])
    const [banners, setBanners] = useState([])
    const [padding, setPadding] = useState(initialPadding)
    const router = useRouter()
    const [loadingBanner, setLoadingBanner] = useState(false)
    const [needFeetching, setNeedFeetching] = useState(true)
    const viewBanners = []

    // router.push({
    //   pathname: PATHS.APUESTAS_EN_VIVO.url,
    //   hash: '#/live/sport/66/byleague',
    // })

    const mobileM = useMediaQuery(MEDIA_QUERIES.min_width.mobileM)
    const tabletS = useMediaQuery(MEDIA_QUERIES.min_width.tabletS)
    const tabletL = useMediaQuery(MEDIA_QUERIES.min_width.tabletL)
    const desktopS = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)
    const desktopM = useMediaQuery(MEDIA_QUERIES.min_width.desktopM)
    const desktopL = useMediaQuery(MEDIA_QUERIES.min_width.desktopL)
    const desktopXXL = useMediaQuery(MEDIA_QUERIES.min_width.desktopXXL)
    const desktopXL = useMediaQuery(MEDIA_QUERIES.min_width.desktopXL)
    let drag = false
    useEffect(() => {
        let mounted = true
        if (mounted && needFeetching) {
            setLoadingBanner(true)
            axios.get(`${process.env.REACT_APP_CALIMACO_API_BASE}/contents/getBanners?company=ATP&container=${container}`).then((res) => {
                if (mounted) {
                    setBanners(res?.data?.banners)
                    setLoadingBanner(false)
                    setNeedFeetching(false)
                }
            })
        }
        return () => {
            mounted = false
        }
    }, [needFeetching])
    useEffect(() => {
        let mounted = true
        if (mounted) {
            switch (true) {
                case desktopXL:
                    setPadding('170px')
                    break
                case desktopXXL:
                    setPadding('130px')
                    break
                case desktopL:
                    setPadding('100px')
                    break
                case desktopM:
                    setPadding('70px')
                    break
                case desktopS:
                    setPadding('40px')
                    break
                case tabletL:
                    setPadding('90px')
                    break
                case tabletS:
                    setPadding('70px')
                    break
                case mobileM:
                    setPadding('50px')
                    break
                default:
                    setPadding(initialPadding)
                    break
            }
        }
        return () => {
            mounted = false
        }
    }, [tabletS, mobileM, tabletL, desktopS, desktopM, desktopL, desktopXXL, desktopXL])

    const handleOnclick = (url: string, name: string, section: string, index: number) => {
        // window.open(url, '_blank')
        router.push(url)
        GoogleTagManager.push({
            event: 'atm.event',
            title: name.toLowerCase().replace(/'/g, ''),
            eventName: 'banner_click',
            section: section,
            action: 'click',
        })
        GoogleTagManager.push({
            event: 'atm.ecommerce',
            eventName: 'select_promotion',
            ecommerce: {
                items: {
                    item_name: name.toLowerCase(),
                    item_list_name: section,
                    item_category: 'juego testingg',
                    index: index,
                },
            } as any,
        })
    }

    if (loadingBanner) {
        return <LoadingDefault loading={loadingBanner} minHeight="300px"></LoadingDefault>
    }

    const onMouseEvents = (url: string, name: string, section: string, index: number) => ({
        onMouseDown: () => (drag = false),
        onMouseMove: () => {
            drag = true
        },
        onMouseUp: () => {
            if (!drag) {
                handleOnclick(url, name, section, index)
            }
        },
    })

    const dtCasinoBannersView = (title, section, index) => {
        if (!viewBanners.includes(title)) {
            viewBanners.push(title)
            dtBannerView(title, section) // slice 47
            dtPromoView(title, section, index)
        }
    }

    return (
        <>
            <HomeBannerS className="react-slick-at">
                <StyledSlides
                    {...settings}
                    appendDots={(dots) => <CustomDotsS>{dots}</CustomDotsS>}
                    autoplaySpeed={5000}
                    centerMode={true}
                    centerPadding={padding}
                >
                    {banners?.length > 0 &&
                        banners?.map(({ config }, i) => (
                            <StyledSlide
                                key={i}
                                // onClick={() => handleOnclick(config?.url, config?.title, section, i + 1)}
                                {...onMouseEvents(config?.url, config?.title, section, i + 1)}
                            >
                                <img
                                    alt="Banner Apuesta Total"
                                    onLoad={() => dtCasinoBannersView(config?.title, section, i + 1)}
                                    src={`${process.env.REACT_APP_WEB_BASE}/${config?.image}`}
                                ></img>
                                <StyledShadow />
                                <StyledButton
                                    color="secondary"
                                    onClick={() => handleOnclick(config?.url, config?.title, section, i + 1)}
                                    // {...onMouseEvents(config?.url, config?.title)}
                                    title="jugar"
                                    variant="contained"
                                >
                                    Juega aquí {'>'}
                                </StyledButton>
                            </StyledSlide>
                        ))}
                </StyledSlides>
            </HomeBannerS>
        </>
    )
}

const StyledShadow = styled.div`
    & {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(1.05turn, rgba(0, 0, 0, 0.884534534), transparent, transparent);
        left: 0;
        top: 0;
        z-index: 2;
        border-radius: 1rem;
        opacity: 0;
    }
`

const StyledButton = styled(Button)`
    & {
        padding: 0;
        font-size: 0.8rem;
        text-transform: capitalize;
        width: fit-content;
        height: auto;
        max-height: min-content;
        cursor: pointer;
        padding: 0.3rem 1rem;
        position: absolute;
        bottom: calc(1rem + 5%);
        left: calc(1rem + 5%);
        display: flex;
        white-space: nowrap;
        cursor: pointer;
        font-size: 0.9rem;
        z-index: 3;
        font-weight: 500;
        /* opacity: 0.6; */
        & {
            /* background-image: linear-gradient(
        to right,
        #ff512f 0%,
        ${(p) => p.theme.palette.secondary.main} 51%,
        #ff512f 100%
      ); */
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
    }
`

const HomeBannerS = styled.div`
    position: relative;
    display: flex;
    min-width: 320px;
    overflow: hidden;
    min-height: 100%;
`
const StyledSlides = styled(Slider)`
    /* width: calc(100% - 50px - 10vw); */
    width: 100%;
    padding-bottom: 35px;
    position: relative;

    & {
        .slick-list,
        .slick-track {
            overflow: initial;
            height: 100%;
        }

        .slick-track > .slick-slide > div {
            height: 100%;
        }
        .slick-dots {
            z-index: 2;
        }

        ::after {
            z-index: 1;
            position: absolute;
            height: 35px;
            width: 100%;
            content: '';
            bottom: 0;
            left: 0;
            background: ${(p) => p.theme.palette.alternate4.main};
        }
    }
`

const StyledSlide = styled.div`
    & {
        cursor: pointer;
        display: block !important;
        position: relative;
        height: auto;
        max-height: 415px;
        overflow: initial;
        height: 100%;
        max-height: 100%;

        img {
            object-fit: contain;
            display: block;
        }
    }
`
const CustomDotsS = styled.div`
    display: flex;
    justify-content: center;
    height: 25px !important ;
    align-items: center;
    bottom: 0 !important;
    & {
        li {
            display: flex;
            align-items: center;
            margin: 0;
            justify-content: center;
            width: 25px;
            pointer-events: none;
            height: 100%;

            button {
                width: 100%;
                height: 100%;
                pointer-events: all;
                padding: 0;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                ::before {
                    content: '' !important;
                    position: relative;
                    border-radius: 50%;
                    opacity: 1 !important;
                    width: 7px !important;
                    height: 7px !important;
                    background: ${(p) => p.theme.palette.alternate8.main};
                }
            }
        }
        li.slick-active {
            width: 35px;
            button {
                padding: 0 5px;
                ::before {
                    width: 100% !important;
                    border-radius: 10px;
                    background: ${(p) => p.theme.palette.primary.main};
                }
            }
        }
    }
`
