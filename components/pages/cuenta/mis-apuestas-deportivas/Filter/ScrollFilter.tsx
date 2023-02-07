import { Button, Divider, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import styled from 'styled-components'
import { delay } from '@helpers/delay'
import useWindowSize from '@hooks/useWindowSize'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import classNames from 'classnames'
import { Advanced } from './Advanced'
import { ButtonAdvanced } from './ButtonAdvanced'
interface Items {
    value: string
    descripcion: string
    filter?: string
    advanced?: boolean
}
interface OnActiveObjProps {
    status: string
    type: string
    game: string
    dateObj: {
        init: string
        end: string
    }
}
interface OnActiveProps {
    value: string
    obj?: OnActiveObjProps
}
interface Props {
    items: Array<Items>
    onActive?: (props: string | OnActiveProps) => void
}
export const ScrollFilter = ({ items, onActive = () => null }: Props) => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const { width, height } = useWindowSize()
    const [activeButton, setActiveButton] = useState(items[0]?.value)
    const [showButtonLeft, setShowButtonLeft] = useState(false)
    const [showButtonRight, setShowButtonRight] = useState(false)
    const [countChekedFilter, setCountChekedFilter] = useState(0)
    const [openModalAdvanced, setOpenModalAdvanced] = useState(false)

    const itemNormalized = items.filter((item) => !item.advanced)

    useEffect(() => {
        if (ref) {
            handleOnResize(ref).then(() => {
                handleOnScroll(ref)
            })
        }
    }, [ref, width])

    useEffect(() => {
        if (ref) {
            ref.onscroll = (e) => {
                handleOnScroll(ref)
            }
        }
    }, [ref, showButtonLeft, showButtonRight])

    const handleOnResize = async (element: HTMLDivElement) => {
        element.style.width = `${0}px`
        await delay(200)
        const width = element.parentElement.clientWidth
        element.style.width = `${width}px`
        await delay(50)
        if (element.clientWidth === element.parentElement.clientWidth) {
            setShowButtonLeft(false)
            setShowButtonRight(false)
        }
    }

    const handleOnScroll = async (element: HTMLDivElement) => {
        await delay(100)
        const x = element.scrollLeft || 0

        if (x === 0) {
            setShowButtonLeft(false)
        }
        if (x > 0) {
            setShowButtonLeft(true)
        }
        // SI LLEGO AL LIMITE TRUE
        const resta = element.scrollLeft - (element.scrollWidth - element.clientWidth)

        if (Math.abs(resta) < 50 || Math.abs(element.scrollLeft) === element.scrollWidth - element.clientWidth) {
            setShowButtonRight(false)
        } else {
            setShowButtonRight(true)
        }
    }

    const handleOnClickButtonScroll = (value: string) => {
        const containerScroll = ref
        const vw = (window.innerWidth / 100) * 2
        let left = 0
        if (value === 'L') {
            left = containerScroll.scrollLeft - 160 - vw
        } else {
            left = containerScroll.scrollLeft + 160 + vw
        }
        containerScroll.scroll({
            top: 0,
            left,
            behavior: 'smooth',
        })
    }

    const handleClick = (value: string, obj?: OnActiveObjProps) => {
        setActiveButton(value)
        if (value === 'CUSTOM_FILTER') {
            onActive({ value: value, obj: obj })
            return
        }
        onActive(value)
    }

    return (
        <ScrollWrapper>
            <div>
                <StyledWrapperButton
                    className={classNames('left', { hidden: !showButtonLeft })}
                    onClick={() => handleOnClickButtonScroll('L')}
                >
                    <StyledIconButton disabled={!showButtonLeft}>
                        <ChevronLeftIcon></ChevronLeftIcon>
                    </StyledIconButton>
                </StyledWrapperButton>
                <StyledWrapperButton
                    className={classNames('right', { hidden: !showButtonRight })}
                    onClick={() => handleOnClickButtonScroll('R')}
                >
                    <StyledIconButton disabled={!showButtonRight}>
                        <ChevronRight></ChevronRight>
                    </StyledIconButton>
                </StyledWrapperButton>

                <StyledScrollContainer ref={(currentRef) => setRef(currentRef)} className="scroll-container">
                    <>
                        <ButtonAdvanced
                            countChekedFilter={countChekedFilter}
                            activeButton={activeButton}
                            setActiveButton={setActiveButton}
                            setOpenModalAdvanced={setOpenModalAdvanced}
                            openModalAdvanced={openModalAdvanced}
                        />

                        <StyledDivider orientation="vertical" flexItem variant="middle" />
                        <StyledContent>
                            {itemNormalized.length > 0
                                ? itemNormalized.map(({ descripcion, value }, i) => {
                                      return (
                                          <StyledButton
                                              key={i}
                                              onClick={() => {
                                                  handleClick(value)
                                                  setOpenModalAdvanced(false)
                                              }}
                                              variant="contained"
                                              color={activeButton === value ? 'primary' : 'alternate4'}
                                          >
                                              <p>{descripcion}</p>
                                          </StyledButton>
                                      )
                                  })
                                : null}
                        </StyledContent>
                    </>
                </StyledScrollContainer>
            </div>
            <Advanced
                handleClick={handleClick}
                setCountChekedFilter={setCountChekedFilter}
                open={openModalAdvanced}
                setOpenModalAdvanced={setOpenModalAdvanced}
                types={items.filter((item) => item.filter === 'type')}
                statusData={items.filter((item) => item.filter === 'status')}
            />
        </ScrollWrapper>
    )
}

const StyledDivider = styled(Divider)`
    && {
        margin-left: 8px;
        margin-right: 8px;
        border-color: ${(p) => p.theme.palette.alternate20.main};
    }
`

const StyledWrapperButton = styled.div`
    && {
        position: absolute;
        top: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        cursor: pointer;
        height: calc(100% + 2px);
        background: white;
        transition: 150ms;
        &::after {
            content: '';
            position: absolute;
            width: 125%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            transition: 150ms;
        }
        &.left {
            left: 0;
            &::after {
                left: 100%;
                background: linear-gradient(to right, white, transparent);
            }
            &.hidden {
                left: -35px;
                opacity: 0;
                &::after {
                    left: 0%;
                }
            }
        }
        &.right {
            right: 0;
            &::after {
                right: 100%;
                background: linear-gradient(to left, white, transparent);
            }
            &.hidden {
                right: -35px;
                opacity: 0;
                &::after {
                    right: 0%;
                }
            }
        }
    }
`
const StyledIconButton = styled(IconButton)`
    && {
        flex: 1;
        height: 35px;
        width: 35px;
        padding: 0 !important;
        > svg {
            font-size: 30px;
        }
    }
`
const ScrollWrapper = styled.div`
    position: relative;
    > div:first-of-type {
        padding-bottom: 0;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
`
const StyledScrollContainer: any = styled(ScrollContainer)`
    position: relative;
    display: flex;
    width: 0;
    z-index: 1;
    padding: 0 14px;
`
const StyledContent = styled.div`
    display: flex;
    gap: 8px;
    flex: 1;
`

const StyledButton = styled(Button)`
    && {
        border-radius: 10px;
        white-space: nowrap;
        box-shadow: none;
        text-transform: initial;
        font-weight: 400;
        font-size: 0.95rem;
        transition: 250ms;
        width: max-content;
        border: 1px solid transparent;
        display: block;
        min-width: initial;
        padding: 5px 10px;
        position: relative;
        &:not(.MuiButton-containedPrimary) {
            border: 1px solid #ebebeb;
        }

        &:hover:not(.MuiButton-containedPrimary) {
            box-shadow: none;
        }
        &:focus {
            box-shadow: none;
        }
        > p {
            display: flex;
            align-items: center;
        }
        span.count-filter {
            color: ${(p) => p.theme.palette.light.main};
            font-weight: 500;
        }
    }
`
