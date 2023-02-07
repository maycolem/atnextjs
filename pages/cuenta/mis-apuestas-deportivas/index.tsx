import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { set } from 'states/slice/layout/PannelBackArrowURL'
import { Meta } from '@components/Meta'
import Main from '@components/pages/cuenta/mis-apuestas-deportivas/Main'
interface customWindow extends Window {
    ASb?: any
}
declare const window: customWindow
const ApuestasDeportivas = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(set(''))
        return () => {
            if (window && 'ASb' in window) {
                window.ASb.destroy()
            }
        }
    }, [])

    return (
        <>
            <Meta canonical="/cuenta/mis-apuestas-deportivas/" title="Apuestas Deportivas" />
            <Main />
        </>
    )
}

export default ApuestasDeportivas
