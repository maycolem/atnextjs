import React, { useEffect, useState } from 'react'
import 'styles/globals.css'
import 'helpers/i18n'
import { ThemeProvider as ThemeProviderMui } from '@mui/material'
import store, { useAppSelector } from '@states/store'
import { GoogleTagManager } from 'google/TagManager'
import GlobalCss from 'styles/GlobalCss'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { InitAuthentication } from '@components/InitAuthentication'
import { ProviderLayout, RequireAuthentication } from '@routes/index'
import { SocketCalimaco } from '@components/Socket/SocketCalimaco'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import useRedirectBy404 from '@hooks/useRedirectBy404'
import { Provider } from 'react-redux'
import { themeDarkMui, themeDarkStyled } from '@styles/themes/dark'
import { themeLightMui, themeLightStyled } from '@styles/themes/white'
import { ThemeWebSelector } from '@states/slice/themes/WebThemes'
const Chat = dynamic(() => import('@components/Chat'))
const NextNProgress = dynamic(() => import('nextjs-progressbar'))

const ThemeWebProvider = ({ setTheme }) => {
    const themeWeb = useAppSelector(ThemeWebSelector)
    setTheme(themeWeb)
    return null
}

const GlobalStyled = createGlobalStyle`
 :root {
    --primary : ${(p) => p.theme.primary};
    --secondary: ${(p) => p.theme.secondary};
    --background: ${(p) => p.theme.background};
    --contrastText: ${(p) => p.theme.contrastText};
    --link: ${(p) => p.theme.link};
 }
  `

function App({ Component, pageProps }: AppProps) {
    // TODO: ambiente dev
    useRedirectBy404()
    const [theme, setTheme] = useState('')
    useEffect(() => {
        if (typeof window !== 'undefined' && GoogleTagManager) {
            GoogleTagManager?.inizialtion()
        }
    }, [])

    return (
        <>
            <NextNProgress color="#e53935" options={{ showSpinner: false }} height={2} />
            <Chat />
            <Provider store={store}>
                <SocketCalimaco />
                <InitAuthentication>
                    <>
                        <ThemeWebProvider setTheme={setTheme} />
                        <ThemeProviderMui theme={theme === 'dark' ? themeDarkMui : themeLightMui}>
                            <ThemeProvider theme={theme === 'dark' ? themeDarkStyled : themeLightStyled}>
                                <GlobalStyled />
                                <GlobalCss />
                                <RequireAuthentication>
                                    <ProviderLayout>
                                        <Component {...pageProps} />
                                    </ProviderLayout>
                                </RequireAuthentication>
                            </ThemeProvider>
                        </ThemeProviderMui>
                    </>
                </InitAuthentication>
            </Provider>
        </>
    )
}

export default dynamic(() => Promise.resolve(App), {
    ssr: false,
})
