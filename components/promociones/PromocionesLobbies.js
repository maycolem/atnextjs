import { Parser } from 'html-to-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { PATHS } from 'routes/paths/PATHS'
import { usePromotionLobbiesQuery } from 'states/calimaco/calimacoContentApi'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { GoogleTagManager } from 'google/TagManager'

const PromocionesLobbies = ({ className }) => {
    const { data } = usePromotionLobbiesQuery({ lobby: 'MAIN' })
    
    useEffect(() => {
        const lobby = data?.lobby
        const view = []

        if (lobby) {
            lobby?.forEach(function (v, i, a) {
                const prom = {
                    item_name: v.title.toLowerCase(),
                    item_list_name: 'promociones',
                    item_category: v.promotion.replace(/-/g, ' '),
                    index: i
                }
                view.push(prom)
            })

            GoogleTagManager.push({
                event: 'atm.ecommerce',
                eventName: 'view_promotion',
                ecommerce: {
                    items: view,
                },
            })
        }
    }, [])

    
    const viewPromos = []
    const dtPromoView = ({title, promotion}, index) => {
        const newPromo = {
            item_name: title.toLowerCase(),
            item_list_name: 'promociones',
            item_category: promotion.replace(/-/g, ' '),
            index: index
        }
        viewPromos.push(newPromo)

        GoogleTagManager.push({
            event: 'atm.ecommerce',
            eventName: 'view_promotion',
            ecommerce: { items: viewPromos }
        })
    }
    const dtPromoSel = ({title, promotion}, index) => {
        const prom = {
            item_name: title.toLowerCase(),
            item_list_name: 'promociones',
            item_category: promotion.replace(/-/g, ' '),
            index: index
        }

        GoogleTagManager.push({
            event: 'atm.ecommerce',
            eventName: 'select_promotion',
            ecommerce: {
                items: prom,
            },
        })
    }

    return (
        <PromocionesS className={className}>
            {data?.lobby?.map((item, i) => {
                return (
                    <Link
                        href={{
                            pathname: PATHS.PROMOCIONES_DETALLES.url,
                            query: {
                                promotion: item.promotion,
                            },
                        }}
                        key={i}
                        legacyBehavior
                    >
                        <PromocionS>
                            <div className="wrapper-img">
                                <div className="wrap">
                                    <img
                                        alt={item.image}
                                        onLoad={() => dtPromoView(item, i)}
                                        onClick={() => dtPromoSel(item, i)}
                                        src={`${process.env.REACT_APP_WEB_BASE}/${item.image}`}
                                    />
                                </div>
                            </div>
                            <div className="body">
                                <h2>{item.title}</h2>
                                {Parser().parse(item.body)}
                            </div>
                        </PromocionS>
                    </Link>
                )
            })}
        </PromocionesS>
    )
}

export default PromocionesLobbies
const PromocionS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
        cursor: pointer;
        background: white;
        padding-bottom: 1rem;
        > .wrapper-img {
            width: 100%;
            > .wrap {
                > img {
                    object-fit: contain;
                }
            }
        }
        > .body {
            flex: 1;
            > h2,
            > p {
                color: ${(p) => p.theme.palette.dark3.main};
                text-align: center;
                font-size: 1rem;
                font-weight: 500;
            }
            > p {
                font-weight: 400;
                color: #6e6e73;
            }
        }
    }
`
const PromocionesS = styled.div`
    & {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 0 1rem;
        ${MEDIA_QUERIES.min_width.tabletL} {
            grid-template-columns: 1fr 1fr;
        }
    }
`
