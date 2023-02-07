import styled from '@emotion/styled'
import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import { BsTelegram } from 'react-icons/bs'
import { EXTERNAL_LINKS } from 'utils/urls'

const ExternalLink = () => {
    return (
        <div className="flex items-center space-x-8 text-6 text-gray-500 font-600">
            {EXTERNAL_LINKS.map((link) => (
                <Link as={link.as} href={link.url} key={link.name} legacyBehavior>
                    <LinkS>{link.name}</LinkS>
                </Link>
            ))}
            <Link href={PATHS.HOME.url}>
                <BsTelegram color="#06B6D4" size="20px" />
            </Link>
        </div>
    )
}

export default ExternalLink
const LinkS = styled.div`
    & {
        cursor: pointer;
        font-size: 0.7rem;
        font-weight: 400;
        color: #848484;
    }
`
