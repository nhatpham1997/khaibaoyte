import { GlobalContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'
import AccountManagement from '../../../components/accountManagement'
import userApi from '../../../apis/userApi'

function AccountUser() {
  const [users, setUsers] = useState<any>([])
  // const { users } = useContext(GlobalContext)
  // console.log(users)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.getAll()
        setUsers(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchData()
  }, [])
  return <AccountManagement data={users} name="User" />
}

export default AccountUser
