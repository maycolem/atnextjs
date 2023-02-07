/* eslint-disable camelcase */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetTagsQuery } from 'states/calimaco/calimacoContentApi'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { setCategoria } from 'states/slice/casino/CasinoLobbies'
import { dtQuickLink } from '../index'
import fakeGif from '../assets/fake/trofeo_animate.png'

interface Props {
    filterTags: string[]
    section: string
}

export const CategoryTabs = ({ filterTags, section }: Props) => {
    const { data, isLoading } = useGetTagsQuery(null)
    const [active, setActive] = useState('Todos')
    const dispatch = useDispatch()
    const handleChangue = (cat) => (e) => {
        const banner = document.getElementById('casino-banner')
        const nameCategory = cat ? cat.toLowerCase().replace(/_/g, ' ') : 'sin titulo'
        setActive(cat)
        if (cat === 'Todos') {
            window?.scrollTo({
                top: 0,
                // behavior: 'smooth',
            })
            dispatch(setCategoria(''))
            dtQuickLink(nameCategory, section)
            return
        }

        const clear = setTimeout(() => {
            window?.scrollTo({
                top: banner.offsetHeight,
                // behavior: 'smooth',
            })
            clearTimeout(clear)
        }, 100)
        if (cat === 'Favoritos') {
            dispatch(setCategoria('Favoritos'))
            dtQuickLink(nameCategory, section)
            return
        }
        dispatch(setCategoria(cat))

        if (cat !== 'Todos' && cat !== 'Favoritos') {
            dtQuickLink(nameCategory, section)
            return
        }
    }
    const computedData = (tags) => {
        return tags
            ?.filter((item) => filterTags.includes(item?.tag))
            .sort(function (a, b) {
                return filterTags.indexOf(a.tag) - filterTags.indexOf(b.tag)
            })
    }
    if (isLoading) {
        return <div className="Loading">LOADING</div>
    }
    if (data?.tags?.length < 1) {
        return <div className="Loading">NO DATA</div>
    }
    return (
        <CategoryScrollS>
            <ul>
                <li className={classNames({ active: active === 'Favoritos' })} onClick={handleChangue('Favoritos')}>
                    <img alt={'FAVORITOS'} loading="lazy" src={fakeGif.src} />
                    <span>Favoritos</span>
                </li>

                <li className={classNames({ active: active === 'Todos' })} onClick={handleChangue('Todos')}>
                    <img alt={'TODOS'} loading="lazy" src={fakeGif.src} />
                    <span>Todos</span>
                </li>
                {data?.tags &&
                    computedData(data?.tags).map((item, i) => {
                        // const Icon = IconsOBJ[tag]
                        return (
                            <li className={classNames({ active: active === item?.tag })} key={i} onClick={handleChangue(item?.tag)}>
                                <img loading="lazy" alt={item?.name} src={fakeGif.src} />
                                <span>{item?.name}</span>
                            </li>
                        )
                    })}
            </ul>
        </CategoryScrollS>
    )
}

const CategoryScrollS = styled.div`
    & {
        padding: 1.2rem 0;
        padding-bottom: 0;
        > ul {
            display: flex;

            > li {
                cursor: pointer;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
                transition: 200ms;
                color: ${(p) => p.theme.palette.alternate13.main};
                > img {
                    /* max-width: 20px; */
                    height: 30px;
                    max-height: 30px;
                    object-fit: contain;
                    filter: grayscale(100%) opacity(0.6);
                    transition: 200ms;
                }
                svg {
                    transition: 200ms;
                    color: ${(p) => p.theme.palette.alternate15.main};
                }
                &:hover {
                    opacity: 0.7;
                    color: ${(p) => p.theme.palette.primary.main};
                    svg {
                        color: ${(p) => p.theme.palette.primary.main};
                    }
                    > img {
                        filter: grayscale(0%) opacity(1);
                    }
                }
                &.active {
                    color: ${(p) => p.theme.palette.primary.main};
                    span {
                        text-decoration: underline;
                    }
                    > img {
                        filter: grayscale(0%) opacity(1);
                    }
                    svg {
                        color: ${(p) => p.theme.palette.primary.main};
                    }
                }
            }
        }
    }
`
