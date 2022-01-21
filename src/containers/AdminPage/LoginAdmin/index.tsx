import { GlobalContext } from 'contexts'
import React, { useContext } from 'react'
import LoginForm from '../../../components/LoginForm'

function LoginAdmin() {
  const { admins } = useContext(GlobalContext)

  const checkLogin = () => {
    console.log()
  }
  return (
    <>
      <LoginForm />
    </>
  )
}

export default LoginAdmin
