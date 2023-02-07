import React, { PropsWithChildren, useEffect, useState } from 'react'
import axios from 'axios'
import { PATHS } from '@routes/paths/PATHS'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import tutorialbg from './assets/tutorialbg.png'
import iconVideo from './assets/iconVideo.png'

interface Props extends PropsWithChildren {
    className?: string
    title: string
    description: string
    pathnameKey: string
    src: string
    img: string
}

const curtText = (text: string) => {
    let shortText = text
    if (text.length > 60) {
        shortText = `${text.slice(0, 60).trim()}... `
    }
    return {
        result: shortText,
        length: shortText.length,
    }
}

const TextContent = ({ text }: { text: string }) => {
    const { result, length } = curtText(text)
    if (length > 10) {
        return (
            <>
                {result} <span className="vermas">ver más</span>
            </>
        )
    }
    return <>{result}</>
}

const Tutorial = ({ className = '', title, description, pathnameKey, src, img }: Props) => {
    console.log(src)
    console.log(img)

    const { push } = useRouter()
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const handlePushPage = async (pathnameKey = '') => {
        await push({
            pathname: PATHS.TURORIALES_TUTORIAL.url,
            query: {
                tutorial: pathnameKey,
            },
        })
    }
    useEffect(() => {
        let mounted = true

        if (src) {
            axios.get(`https://vimeo.com/api/oembed.json?url=${src}`).then((data) => {
                if (data.status === 200) {
                    const underscore = data.data.thumbnail_url.lastIndexOf('_')
                    const newUrl = data.data.thumbnail_url.substring(0, underscore)
                    if (mounted) {
                        setThumbnailUrl(newUrl)
                    }
                }
            })
        }
        return () => {
            mounted = false
        }
    }, [src])

    return (
        <Styled className={className} onClick={() => handlePushPage(pathnameKey)}>
            <StyledVideoPrev>
                {thumbnailUrl ? <StyledVideoPrevIMG loading="lazy" src={img}></StyledVideoPrevIMG> : null}
                <StyledIconVide>
                    <img src={iconVideo.src} alt="play icon video" />
                </StyledIconVide>
            </StyledVideoPrev>
            <StyledContent>
                <p className="title">{title}</p>
                <p className="paragraph">
                    <TextContent text={description} />
                </p>
            </StyledContent>
        </Styled>
    )
}

export default Tutorial
const StyledIconVide = styled.div`
    position: absolute;
    width: 35px;
    height: 35px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 50%;
    overflow: hidden;
    transition: 150ms;
`
const truncateParagraph = (lineClamp = 3) => {
    return css`
        overflow: hidden;
        -webkit-line-clamp: ${lineClamp};
        display: -webkit-box;
        -webkit-box-orient: vertical;
    `
}
const StyledVideoPrev = styled.div`
    // aspect-ratio: 4/5;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;
    position: relative;
    &:hover {
        ${StyledIconVide} {
            transform: scale(1.2);
        }
    }
`
const StyledVideoPrevIMG = styled.img`
    width: 100%;
    height: 100%;
`
const StyledContent = styled.div`
    box-shadow: rgba(131, 121, 121, 0.2) 0px 2px 2px 0px;
    flex: 1 0 30%;
    background: #f7f7f7;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    > p.title {
        margin-top: 1rem;
        color: ${(p) => p.theme.palette.dark3.main};
        margin-bottom: 5px;
        font-weight: 500;
        font-size: 0.95rem;
        text-transform: lowercase;
    }
    > p.title::first-letter {
        text-transform: uppercase;
    }

    > .paragraph {
        flex: 1;
        display: flex;
        ${truncateParagraph(4)};
        /* white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            max-width: 35ch; */
        color: ${(p) => p.theme.palette.alternate13.main};
        > .vermas {
            color: ${(p) => p.theme.palette.primary.main};
            font-weight: 500;
        }
    }
`
const Styled = styled.div`
    display: flex;
    flex-direction: column;
    /* overflow: hidden; */
    cursor: pointer;
    min-height: 100%;
    /* padding-bottom: 14px; */
`
