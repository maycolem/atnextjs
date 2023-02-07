import styled from '@emotion/styled'
import { Avatar } from '@mui/material'
import React from 'react'

const AvatarInfo = ({ src, id, fullName }) => {
  return (
    <AvatarInfoS>
      <AvatarS src={src} variant="circular">
        <InitialS>{fullName.slice(0, 1)}</InitialS>
      </AvatarS>
      <InfoS>
        <p>{fullName}</p>
        <p className="id">
          <span>ID:</span>
          {id}
        </p>
      </InfoS>
    </AvatarInfoS>
  )
}

export default AvatarInfo
const AvatarInfoS = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: calc(20px + 0.5vmax) 20px;
`
const AvatarS = styled(Avatar)`
  & {
    width: 50px;
    height: 50px;

    outline: 1px solid ${(p) => p.theme.palette.primary.main};
    outline-offset: 2px;
  }
`
const InitialS = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  background-color: ${(p) => p.theme.palette.primary.main};
  border-radius: 50%;
  color: white;
  text-transform: capitalize;
  font-size: 25px;
`
const InfoS = styled.div`
  & {
    p:first-of-type {
      margin-bottom: 2px;
    }
    p {
      text-transform: capitalize;
      font-weight: 700;
      color: #595959;
    }
    p.id {
      color: #969696;
      font-weight: 400;
    }
  }
`
