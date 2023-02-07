// path file tempory, for path casino-be98867001f70b94097d/shorts component
import { Button } from '@mui/material'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import hexAlpha from 'hex-alpha'
import NextNProgress from 'nextjs-progressbar'
import React, { useRef, useEffect, useState, useContext } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { IoVolumeHighSharp, IoVolumeMuteOutline, IoVolumeMuteSharp } from 'react-icons/io5'
import styled from 'styled-components'

interface VideoPlayerProps {
    src: string
    description: string
    id: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, description, id }) => {
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const videoRef = useRef(null)

    const onMuteClick = () => {
        setMuted(!muted)
        videoRef.current.muted = !muted
    }

    const onVideoPress = () => {
        if (playing) {
            videoRef.current.pause()
            setPlaying(false)
        } else {
            videoRef.current.play()
            setPlaying(true)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (playing) {
                            videoRef.current.play()
                            setPlaying(true)
                        }
                    } else {
                        if (playing) {
                            videoRef.current.pause()
                            videoRef.current.currentTime= 0;
                        }
                    }
                })
            },
            { threshold: 0.4 }
        )

        observer.observe(videoRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        videoRef.current.addEventListener('loadedmetadata', () => {
            setDuration(videoRef.current?.duration)
        })

        videoRef.current.addEventListener('timeupdate', () => {
            setCurrentTime(videoRef.current?.currentTime)
        })
    }, [])

    const handleEndedVideo = () => {
        const refContainerVideo = document.querySelector(`#${ id }`).nextSibling as HTMLDivElement
        refContainerVideo?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <ShortContent className='content_video'>
                <Video 
                    loop={false} 
                    ref={videoRef}
                    src={src}
                    onClick={onVideoPress}
                    onEnded={handleEndedVideo}
                />
                <VideoDescription maxWidth={videoRef.current?.offsetWidth}>
                    <span>{ description }</span>
                </VideoDescription>
                <SeekbarContainer>
                    <SeekbarFill style={{ width: `${(currentTime / duration) * 100}%` }} className="seekbar-fill" />
                </SeekbarContainer>
            </ShortContent>
            <ContentIcons>
                <ButtonIcon onClick={onVideoPress}>{playing ? <FaPause /> : <FaPlay />}</ButtonIcon>
                <ButtonIcon onClick={onMuteClick}>{muted ? <IoVolumeMuteSharp /> : <IoVolumeHighSharp />}</ButtonIcon>
            </ContentIcons>
        </>
    )
}

export default VideoPlayer

const ShortContent = styled.div`
    height: 100%;
    position: relative;
`

const Video = styled.video`
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
    cursor: pointer;
    z-index: 1;
    ${(MEDIA_QUERIES.max_width.mobileS, MEDIA_QUERIES.max_width.mobileM, MEDIA_QUERIES.max_width.mobileL)} {
        border-radius: 0;
        object-fit: contain;
        max-width: 100vw;
    }
`

const SeekbarContainer = styled.div`
    position: relative;
    width: auto;
    height: 3px;
    background-color: ${(p) => p.theme.casino.scrollTabButtons.background};
    bottom: 8rem;
    margin: 0 10px;
    ${MEDIA_QUERIES.max_width.mobileL} {
        bottom: 8.5rem;
        margin: 0;
    }
`

const SeekbarFill = styled.div`
    position: absolute;
    height: 100%;
    background-color: ${(p) => p.theme.casino.carousel.arrowActive};
    width: 0;
`

const ButtonIcon = styled(Button)`
    && {
        background: ${(p) => hexAlpha(p.theme.casino.scrollTabButtons.background, 0.5)};
        color: ${(p) => p.theme.casino.slider.contrastText};
        left: 10px;
        top: 200px;
        min-width: 50px;
        margin-top: 10px;
        bottom: 10px;
        aspect-ratio: 1/1;
        font-size: 18px;
        border-radius: 50%;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        
        ${MEDIA_QUERIES.max_width.mobileL} {
            margin-left: 10px;
            left: 0;
            top: 0;
            bottom: 0;
        }
    }
`

const ContentIcons = styled.div`
    z-index: 2;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${MEDIA_QUERIES.max_width.mobileL} {
        display: flex;
        flex-direction: row;
        position: absolute;
        right: 1rem;
    }
`
const VideoDescription = styled.div<{maxWidth: number}>`
    max-width: ${(p) => p.maxWidth}px;
    position: relative;
    top: -8rem;
    background: linear-gradient(transparent, ${(p) => p.theme.casino.scrollTabButtons.background});
    height: 8rem;
    border-radius: 0 0 12px 12px;
    ${MEDIA_QUERIES.max_width.mobileL, MEDIA_QUERIES.max_width.desktopXS} {
        border-radius: 0;
        width: auto;
    }
    > span {
        color: ${(p) => hexAlpha(p.theme.contrastText, 0.8)};
        display: block;
        padding: 4rem 2rem 0;
        font-size: 1.2rem;

        @supports (-webkit-line-clamp: 2) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: initial;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
`
