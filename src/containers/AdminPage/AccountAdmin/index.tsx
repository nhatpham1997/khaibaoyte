import { GlobalContext } from 'contexts'
import { useContext } from 'react'
import AccountManagement from '../../../components/accountManagement'

function AccountAdmin() {
  const { admins } = useContext(GlobalContext)

  return <AccountManagement data={admins} name="Admin" />
}

export default AccountAdmin
