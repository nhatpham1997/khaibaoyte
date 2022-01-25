import { GlobalContext } from 'contexts'
import { useContext } from 'react'
import AccountManagement from '../../../components/accountManagement'

function AccountUser() {
  const { users } = useContext(GlobalContext)

  return <AccountManagement data={users} name="User" />
}

export default AccountUser
