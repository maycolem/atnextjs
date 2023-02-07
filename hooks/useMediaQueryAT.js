import { useEffect, useState } from 'react'
import { ResizeObserver } from 'resize-observer'

function useMediaQueryAT(query) {
    const [matches, setMatches] = useState(() => getMatches(query))

    function getMatches(query) {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query.substring(7)).matches
        }
        return undefined
    }

    function handleChange() {
        setMatches(getMatches(query))
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query)

        // Triggered at the first client-side load and if query changes
        handleChange()

        // Listen matchMedia
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange)
        } else {
            matchMedia.addEventListener('change', handleChange)
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange)
            } else {
                matchMedia.removeEventListener('change', handleChange)
            }
        }
    }, [])

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            const regex = /\d+/g
            const string = query
            const matches = string.match(regex) // creates array from matches
            const matchesWidth = Number(matches[0])
            if (matchesWidth >= window.innerWidth) {
                setMatches(getMatches(query))
            }
            if (matchesWidth < window.innerWidth) {
                setMatches(getMatches(query))
            }
            // console.log(query)
            // console.log(matchesWidth)
            // console.log(window.innerWidth)
        })
        resizeObserver.observe(document.body)

        return () => {
            resizeObserver.unobserve(document.body)
            resizeObserver.disconnect()
        }
    }, [])

    return matches
}

export default useMediaQueryAT
