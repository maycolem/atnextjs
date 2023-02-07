import { delay } from '@helpers/delay'
import { PATHS } from '@routes/paths/PATHS'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

/* eslint-disable react/no-unescaped-entities */
const HiddenStyle = createGlobalStyle`
#wcx-chat  {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
`
const ShowStyle = createGlobalStyle`
    #wcx-chat  {
      opacity: 1;
      visibility: initial;
      pointer-events: initial;
    }
    `

// declare module 'react' {
//     interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//         // extends React's HTMLAttributes
//         strategy?: string
//     }
// }
const Chat = () => {
    const router = useRouter()
    const [show, setShow] = useState(true)

    const paths = [
        PATHS.CASINO_GAME_PROVIDER_GAME_NAME.url,
        PATHS.CASINO_EN_VIVO_GAME_PROVIDER_GAME_NAME.url,
        PATHS.JUEGOS_VIRTUALES_GAME_PROVIDER_GAME_NAME.url,
        PATHS.LOGIN.url,
        PATHS.REGISTRO.url,
        PATHS.INTERNA_DEPOSITO_EXITOSO.url,
        PATHS.CASINO_be98867001f70b94097d_SHORTS.url,
    ]

    const loadChatElement = async (path: string) => {
        const chatElement = document.getElementById('wcx-chat') as HTMLDivElement
        if (chatElement) {
            if (paths.includes(path)) {
                setShow(false)
                chatElement.style.opacity = '0'
                chatElement.style.visibility = 'hidden'
                chatElement.style.pointerEvents = 'none'
                return
            }
            setShow(true)
            chatElement.style.opacity = '1'
            chatElement.style.visibility = 'initial'
            chatElement.style.pointerEvents = 'initial'
            return
        }
        await delay(500)
        await loadChatElement(path)
    }

    useEffect(() => {
        if (router.pathname) {
            loadChatElement(router.pathname)
        }
    }, [router.pathname])

    return (
        <>
            <Head>
                <style>.async–hide{` {opacity: 0 !important}`}</style>

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function (a, s, y, n, c, h, i, d, e) {
                s.className += ' ' + y;
                h.end = i = function () { s.className = s.className.replace(RegExp(' ?' + y), '') };
                (a[n] = a[n] || []).hide = h; setTimeout(function () { i(); h.end = null }, c);
              })(window, document.documentElement, 'async–hide', 'dataLayer', 2000, { 'GTM-TNCZW2F': true });
              `,
                    }}
                />

                <meta content="Y1jBhCpO2sXijPfIKWdj-bnVpx9fstjsIoaWr2FWlsI" name="google-site-verification" />

                <script type="text/javascript">
                    s=document.createElement("script");s.src="//script.crazyegg.com/pages/scripts/0106/8506.js";document.head.appendChild(s);
                </script>
                <script type="text/javascript">
                    var
                    s=document.createElement("script");s.src="https://api.wcx.cloud/widget/?id=adefe047aa7246fa8f9a51620aa21776";document.head.appendChild(s);
                </script>

                <script type="text/javascript">
                    var
                    s=document.createElement("script");s.src="https://cdn.embluemail.com/pixeltracking/sdk-worker.js";document.head.appendChild(s);
                </script>

                <script type="text/javascript">
                    var
                    s=document.createElement("script");s.src="https://cdn.embluemail.com/pixeltracking/pixeltracking.js?code=9e40b80ef066bab0efe6ef14da8986fb";document.head.appendChild(s);
                </script>

                <Script
                    dangerouslySetInnerHTML={{
                        __html: `
                  !function (f, b, e, v, n, t, s) {
                    if (f.fbq) return; n = f.fbq = function () {
                        n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                    n.queue = []; t = b.createElement(e); t.async = !0;
                    t.src = v; s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window, document, 'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '931574077585385');
                fbq('track', 'PageView');

                !function (f, b, e, v, n, t, s) {
                  if (f.fbq) return; n = f.fbq = function () {
                      n.callMethod ?
                      n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                  };
                  if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                  n.queue = []; t = b.createElement(e); t.async = !0;
                  t.src = v; s = b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t, s)
              }(window, document, 'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1086465511835414');
              fbq('track', 'PageView');

              (function(d,t,u,s,c,f){f=function(m){m=new Date();return m.getFullYear()+''+(m.getMonth()+1)+''+m.getDate()+'T'+m.getHours()+''+m.getMinutes()+''+m.getSeconds()};u='https://widgets-static.embluemail.com/accounts/4285F1728D54DF4C/scripts/sw_428.js?ts='+f();s=d.createElement(t);s.async=1;s.src=u;c=d.getElementsByTagName(t)[0];c.parentNode.insertBefore(s,c);})(document,'script');
              `,
                    }}
                    id="fb-pixel"
                    strategy="afterInteractive"
                />
            </Head>
            {show ? <ShowStyle /> : <HiddenStyle />}
        </>
    )
}

export default Chat
