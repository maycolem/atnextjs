import { useState } from 'react'
import { CalimacoClient } from '@calimaco/base'
import { CONST_CONFIG } from 'utils/constants'
import configCalimaco from 'utils/configCalimaco'

function useGeolocation() {
  const calimacoClient = new CalimacoClient(configCalimaco)
  const [departments, setDepartments] = useState([])

  const getDepartments = async () => {
    const response = await calimacoClient.getStates(CONST_CONFIG.COUNTRY)

    setDepartments(response.states)
  }

  return { getDepartments, departments }
}
export default useGeolocation
