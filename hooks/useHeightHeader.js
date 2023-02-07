import React, { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

const useHeightHeader = () => {
    const [heightHeader, setHeightHeader] = useState(0)
    const { width } = useWindowSize()
    useEffect(() => {
        const time = setTimeout(() => {
            const header = document.getElementById('layout-default-at-apuesta')
            setHeightHeader(header.offsetHeight)
        }, 200)
        return () => clearTimeout(time)
    }, [window, document, width])
    return { heightHeader }
}

export default useHeightHeader
