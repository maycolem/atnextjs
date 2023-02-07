export interface Lobby {
    machine: number
    name: string
    web_name: string
    provider: string
    sub_provider: string
    external_id: string
    type: string
    tags: string
    lobby_tag: null
    logo: string
    favourite?: boolean
}

export interface Provider {
    provider: string
    name: string
}
