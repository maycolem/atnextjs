// path file tempory, for path casino-be98867001f70b94097d/shorts component
import Link from 'next/link'
import { Button } from '@mui/material'
import { IoArrowBack } from 'react-icons/io5'
import styled from 'styled-components'
import data from './dataShorts'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import VideoPlayer from './Video'
import hexAlpha from 'hex-alpha'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface ShortProps {
    pathname: string
}

const Short: React.FC<ShortProps> = ({ pathname }) => {

    return (
        <Container>
            <Link href={pathname}>
                <BackIcon>
                    <IoArrowBack />
                    <span>Atras</span>
                </BackIcon>
            </Link>
            <>
                <Swiper slidesPerView={1} direction={'vertical'} style={{ height: '100vh' }}>
                    {data.map((item) => (
                        <SwiperSlide key={item.id} id={item.id}>
                            <Item>
                                <VideoPlayer src={item.url} description={item.description} id={item.id} />
                            </Item>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        </Container>
    )
}

export default Short

const Container = styled.div`
    background: ${(p) => p.theme.layout.footer.background};
    height: 100vh;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;

    ::-webkit-scrollbar {
        display: none;
    }

    ${(MEDIA_QUERIES.max_width.mobileM, MEDIA_QUERIES.max_width.mobileS)} {
        height: 100vh;
        width: 100vw;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    > div {
        ${MEDIA_QUERIES.max_width.mobileM} {
            height: 100vh;
        }
    }
`

const Item = styled.div`
    margin-top: 20px;
    margin-bottom: 35px;
    flex: 0 0 100%;
    height: 95vh;
    scroll-snap-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    ${MEDIA_QUERIES.max_width.mobileL} {
        align-items: flex-start;
        margin: 0;
        height: 100vh;
    }
`

const BackIcon = styled(Button)`
    && {
        position: absolute;
        z-index: 3;
        margin: 10px 15px;
        background: ${(p) => hexAlpha(p.theme.casino.scrollTabButtons.background, 0.5)};
        color: ${(p) => p.theme.casino.slider.contrastText};
        text-transform: none;
        font-size: 1rem;
        svg {
            margin-right: 10px;
            color: ${(p) => p.theme.casino.slider.contrastText};
            font-size: 1.5rem;
        }
        &:hover {
            background: ${(p) => p.theme.palette.alternate20.contrastText};
            color: ${(p) => p.theme.palette.alternate7.main};
            svg {
                color: ${(p) => p.theme.layout.header.masActive.contrastText};
            }
        }
    }
    ${MEDIA_QUERIES.max_width.tabletS} {
        && {
            min-width: 50px;
            position: absolute;
            aspect-ratio: 1/1;
            border-radius: 50%;
            margin: 15px;
            /* background: ${(p) => p.theme.casino.scrollTabButtons.background}; */
            svg {
                margin-right: 2px;
                font-size: 2rem;
            }
            span {
                display: none;
            }
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        }
    }
`
