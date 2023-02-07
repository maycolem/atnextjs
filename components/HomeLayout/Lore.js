import logofullIMG from 'public/assets/logofull.png'
import { DEVICE_SIZE } from 'styles/DEVICE_SIZE'
import useGetWidthScrollBar from 'hooks/useGetWidthScrollBar'
import styled from 'styled-components'
import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { Parser } from 'html-to-react'
import Head from 'next/head'
import { useEffect } from 'react'
import { GoogleTagManager } from 'google/TagManager'
import hexAlpha from 'hex-alpha'
import { delay } from '@helpers/delay'
const JSONES = [
    {
        name: 'es entretenimiento',
        url: PATHS.HOME.url,
    },
    {
        name: 'es deportes',
        url: PATHS.APUESTAS_DEPORTIVAS.url,
    },
    {
        name: 'es casino',
        url: PATHS.CASINO.url,
    },
    {
        name: 'es juegos virtuales',
        url: PATHS.MAS_DIVERSION_JUEGOS_VIRTUALES.url,
    },
    {
        name: 'es diversión',
        url: PATHS.TORNEO.url,
    },
    {
        name: 'es casino en vivo',
        url: PATHS.CASINO_EN_VIVO.url,
    },
    {
        name: 'es pagos rápidos',
        url: PATHS.CUENTA_RETIRO.url,
    },
    {
        name: 'es los reyes del ajuste',
        url: PATHS.PROMOCIONES.url,
    },
]

const Lore = () => {
    const dtHomeClick = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            option: name.toLowerCase(),
            eventName: 'home_click',
        })
    }
    useEffect(() => {
        const words = [
            'entretenimiento',
            'deportes',
            'casino',
            'juegos virtuales',
            'diversión',
            'casino en vivo',
            'pagos rápidos',
            'los reyes del ajuste',
        ]

        const abecedario = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'ñ',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
            ',',
            '.',
            'á',
            'é',
            'í',
            'ó',
            'ú',
        ]

        const prev = document.querySelector('.prev')
        const next = document.querySelector('.next')

        prev.innerHTML = 'es&nbsp;'

        const avansarAsync = async (word) =>
            new Promise((resolve) => {
                let i = 0
                const searchLetter = setInterval(async () => {
                    if (abecedario[i]) {
                        if (word[0] === ' ') {
                            next.innerHTML = ''
                            prev.innerHTML = prev.innerHTML + ' '
                            word = word.slice(1)
                            i = 0
                            return
                        }
                        if (!word[0]) {
                            await delay(1500)
                            clearInterval(searchLetter)
                            resolve('AVANZA')
                            // const timeout = setTimeout(() => {
                            //     clearTimeout(timeout)
                            // }, 500);
                            return
                        }
                        if (abecedario[i].toLocaleLowerCase() === word[0].toLocaleLowerCase()) {
                            next.innerHTML = ''
                            prev.innerHTML = prev.innerHTML + word[0]
                            word = word.slice(1)
                            i = 0
                            return
                        }
                        next.innerHTML = abecedario[i]
                        i = i + 1
                    } else {
                        await delay(1500)
                        clearInterval(searchLetter)
                        resolve('AVANZA')
                        // const timeout = setTimeout(() => {
                        //     clearTimeout(timeout)
                        // }, 500);
                    }
                }, 1)
            })

        const retrocederAsync = async (word) =>
            new Promise((resolve) => {
                let i = 0
                prev.innerHTML = prev.innerHTML + word.slice(0, -1)
                next.innerHTML = prev.innerHTML.slice(prev.innerHTML.length - 1)
                const searchLetter2 = setInterval(() => {
                    if (word === '') {
                        next.innerHTML = ''
                    }
                    if (abecedario[i]) {
                        if (word[0] === ' ') {
                            next.innerHTML = prev.innerHTML.slice(prev.innerHTML.length - 1)
                            prev.innerHTML = prev.innerHTML + ' '
                            word = word.slice(1)
                            i = 0
                            return
                        }
                        if (!word[0]) {
                            clearInterval(searchLetter2)
                            resolve('RETROCEDER')
                            // const timeout = setTimeout(() => {
                            //     clearTimeout(timeout)
                            // }, 500);
                            return
                        }
                        if (abecedario[i].toLocaleLowerCase() === word[0].toLocaleLowerCase()) {
                            next.innerHTML = prev.innerHTML.slice(prev.innerHTML.length - 1)
                            prev.innerHTML = 'es&nbsp;'
                            prev.innerHTML = prev.innerHTML + word.slice(0, -1)
                            word = word.slice(0, -1)
                            i = 0
                            return
                        }
                        next.innerHTML = abecedario[i]
                        i = i + 1
                    } else {
                        clearInterval(searchLetter2)
                        resolve('RETROCEDER')
                        // const timeout = setTimeout(() => {
                        //     clearTimeout(timeout)
                        // }, 500);
                    }
                }, 1)
            })
        const loop = async (value) => {
            let switchCase = ''
            const continuaplease = true
            // eslint-disable-next-line no-unmodified-loop-condition
            while (continuaplease) {
                if (switchCase === 'AVANZA') {
                    // continuaplease = false
                    const result = await retrocederAsync(words[0])
                    switchCase = result
                    if (result === 'RETROCEDER') {
                        const deleted = words.shift()
                        words.push(deleted)
                    }
                    continue
                }
                const result = await avansarAsync(words[0])
                switchCase = result
                prev.innerHTML = 'es&nbsp;'
            }
        }

        loop()
    }, [])

    return (
        <LoreS>
            <LogoS>
                <img alt="logo apuesta total" src={logofullIMG.src} />
            </LogoS>
            <TextS className="text">
                <div className="prev"></div>
                <div className="next"></div>
            </TextS>

            {/* <EsEntreteniemtnoS>
        {JSONES.map((item, i) => {
          return (
            <Link href={item.url} key={i}>
              <AnimateTextS $anime={i + 1}>{item.name}</AnimateTextS>
            </Link>
          )
        })}
      </EsEntreteniemtnoS> */}
            <LoreTextS>
                <span>Apuesta Total ¡Para ganar, hay que creer! </span>
                Juega y gana mientras disfrutas de tus deportes favoritos. Todas las ligas y eventos deportivos más importantes del mundo,
                los mejores mercados de apuestas y ofertas de cuotas, apuestas prematch y en vivo, juegos virtuales, casino online y en
                vivo, y mucho más.
            </LoreTextS>
            <Link href={PATHS.NOSOTROS.url}>
                <ButtonS onClick={() => dtHomeClick('conocenos mas')}>
                    <div>
                        Conócenos <span className="black">más</span>
                    </div>
                </ButtonS>
            </Link>
        </LoreS>
    )
}

export default Lore
const TextS = styled.div`
    & {
        background: transparent;
        display: flex;
        width: 100%;
        padding-left: 12vw;
        overflow: hidden;
        max-width: 600px;
        margin: auto;
        ${MEDIA_QUERIES.min_width.mobileL} {
            padding-left: 15vw;
        }
        ${MEDIA_QUERIES.min_width.tabletS} {
            padding-left: 18vw;
        }
        ${MEDIA_QUERIES.min_width.tabletL} {
            padding-left: 15vw;
        }
        ${MEDIA_QUERIES.min_width.desktopXS} {
            padding-left: 150px;
        }
        .prev,
        .next {
            font-family: Rubik;
            white-space: nowrap;
            font-size: 1.5rem;
            font-weight: 700;
            transform: scaleY(1.1);
            color: ${(p) => hexAlpha(p.theme.contrastText, 1)};
            ${MEDIA_QUERIES.min_width.mobileL} {
                font-size: 2rem;
            }
        }

        .next {
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.8)};
        }
    }
`

const LoreS = styled.div`
    && {
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 20px;
        padding-top: 70px;
        margin-top: -50px;
        padding-bottom: 4rem;
        min-width: ${DEVICE_SIZE.mobileS};
        max-width: ${DEVICE_SIZE.desktopXXL};
        z-index: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: calc(100% + 28px);
        position: relative;
        right: 14px;
        padding-left: 1rem;
        padding-right: 1rem;
        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            right: 50px;
        }
    }
`
const ButtonS = styled('button')`
    & {
        padding: 0.8rem 2rem;
        text-transform: uppercase;
        outline: 1px solid #ff0000;
        background: transparent;
        color: #ff0000;
        font-weight: 500;
        border-radius: 0.7rem;
        font-size: 13px;
        line-height: 1;
        transition: 100ms;
        position: relative;
        overflow: hidden;
        min-width: 240px;
        &:hover {
            outline: 1px solid #ff0000;

            background: #ff0000;
            color: white;
        }
        /* ::before,
    span.letter-logo {
      content: '';
      width: 50px;
      height: 100%;
      background: transparent;
      pointer-events: none;
      position: absolute;
      left: -50px;
      top: 0;
      transition: 150ms, transform 0s linear 0s;
      color: black;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      text-transform: lowercase;
      font-weight: 900;
      font-size: 1.8rem;
      background: white;
      letter-spacing: -4px;
      text-transform: capitalize;
    }
    ::before {
      transform: skew(-15deg);
      width: 60px;
    }
    span.letter-logo {
      content: 'at';
      padding-left: 7px;
      display: grid;
      text-transform: lowercase;
      > span {
        display: block;
        &::first-letter {
          color: red;
        }
      }
    }

    :hover {
      background: #ff2323;
      outline: 1px solid #ff2323;
      color: white;
      box-shadow: rgb(255, 35, 35) 0px 20px 30px -10px;
      padding-left: 6rem;
      letter-spacing: -1px;
      word-spacing: -1px;
      font-weight: 700;
      > .black {
        color: black;
      }

      span.letter-logo,
      ::before {
        opacity: 1;
        left: 0;
        color: black;
        border-top-left-radius: 0.7rem;
        border-bottom-left-radius: 0.7rem;
      }
    } */
    }
`
const LoreTextS = styled('p')`
    font-size: 1.1rem;
    text-align: center;
    padding: 1.5rem 0.5rem;
    max-width: 900px;
    color: ${(p) => hexAlpha(p.theme.contrastText, 0.7)};

    > span {
        color: ${(p) => p.theme.primary};
        font-weight: 500;
    }
`

const LogoS = styled('div')`
    img {
        margin: auto;
        width: 100%;
        max-width: 450px;
    }
`
