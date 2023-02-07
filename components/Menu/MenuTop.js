import styled from '@emotion/styled'
import ExternalLink from './ExternalLink'
import LoginLink from './LoginLink'

const MenuTop = () => {
  return (
    <MenuTopS>
      <ExternalLink />
      <LoginLink />
    </MenuTopS>
  )
}

export default MenuTop
const MenuTopS = styled('div')`
  position: relative;
  padding: 0.3rem 0rem;
  padding-bottom: 0.4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & {
    ::after {
      content: '';
      background: #ebebeb;
      position: absolute;
      width: calc(100% + 2rem);
      max-width: 1404px;
      top: 0;
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
      z-index: -1;
      @media (min-width: 768px) {
        width: calc(100% + 4rem);
      }
    }
  }
`
