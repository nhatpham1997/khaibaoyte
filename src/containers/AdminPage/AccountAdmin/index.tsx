import adminApi from 'apis/adminApi'
import { GlobalContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'
import AccountManagement from '../../../components/accountManagement'

function AccountAdmin() {
  // const [admins, setAdmins] = useState<any>([])
  const { admins } = useContext(GlobalContext)
  // console.log(users)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await adminApi.getAll()
  //       setAdmins(response)
  //     } catch (error) {
  //       console.log('Failed to fetch post list: ', error)
  //     }
  //   }
  //   fetchData()
  // },[])
  return <AccountManagement data={admins} name="Admin" />
}

export default AccountAdmin
