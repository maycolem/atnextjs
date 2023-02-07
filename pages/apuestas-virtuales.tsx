import { Meta } from '@components/Meta'
import React, { useEffect } from 'react'
import { AltenarClient } from '@calimaco/components'
import { useSelector } from 'react-redux'
import cfg from 'config/config'
import { userSessionSelector } from '@states/features/slices/userSlice'
interface customWindow extends Window {
    ASb?: any
}
declare const window: customWindow

const Index = () => {
    const session = useSelector(userSessionSelector)

    useEffect(() => {
        return () => {
            window?.ASb?.destroy()
        }
    }, [])

    return (
        <>
            <Meta title="Apuestas virtuales" />
            {session ? (
                <div key="99715f96781c0e8ac17d42f46e0dd943b521559a">
                    <AltenarClient cfg={cfg} page="virtuals" />
                </div>
            ) : (
                <div key="5be122e47ba33120df7cc57d7aa3ed968fb6f1ec">
                    <AltenarClient cfg={cfg} page="virtuals" />
                </div>
            )}
        </>
    )
}

export default Index
