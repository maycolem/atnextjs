import React from 'react'
import Foot from './foot/Foot'
import Form from './form/Form'
import Head from './head/Head'

const Login = ({ setShowRecuperar }) => {
  return (
    <>
      <Head></Head>
      <Form setShowRecuperar={setShowRecuperar}></Form>
      <Foot></Foot>
    </>
  )
}

export default Login
