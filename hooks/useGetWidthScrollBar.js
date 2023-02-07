import { delay } from '@helpers/delay'
import React, { useEffect, useState } from 'react'

const isBrowser = () => typeof window !== 'undefined'

const useGetWidthScrollBar = () => {
    const [scrollBardWidth, setScrollBardWidth] = useState(0)

    const getWidthScrollBar = async () => {
        const widthBar = window.innerWidth - document.body.clientWidth
        setScrollBardWidth(widthBar)
    }
    useEffect(() => {
        getWidthScrollBar()
        window.addEventListener('resize', getWidthScrollBar)

        return () => {
            window.removeEventListener('resize', getWidthScrollBar)
        }
    }, [])
    return { scrollBardWidth }
}

export default useGetWidthScrollBar
