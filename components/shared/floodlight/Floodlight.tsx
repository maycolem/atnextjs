import React from 'react'

type FloodlightProps = {
    CAT: string
    NUMBER_RANDOM: string | number
}

const Floodlight = React.memo(({ CAT, NUMBER_RANDOM }: FloodlightProps) => {
    // const url = window.location.href
    // const OREF = encodeURIComponent(url)
    // const GTM = '2wg1n0'

    return (
        <iframe
            style={{ display: 'none', width: 1, height: 1 }}
            // src={`https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=${CAT};ord=${NUMBER_RANDOM};gtm=${GTM};oref=${OREF}?`}
            src={`https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=${CAT};ord=${NUMBER_RANDOM}?`}
        ></iframe>
    )
})

export default Floodlight
