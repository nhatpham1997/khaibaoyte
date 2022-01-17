import AccountManagement from '../../../components/accountManagement'

type createData = {
  id: number
  username: string
  full_name: string
  year_of_birth: string
  citizen_identificatio: string //căn cước
  sex: string
  nationality: string //quốc tịch
  address: string
  phone: string
  email: string
  createDate: string
}[]

const rows: createData = [
  {
    id: 1,
    username: 'NguyenDuysssssss',
    full_name: 'Nguyen Van Duy ssss',
    year_of_birth: '15/06/1999',
    citizen_identificatio: '1234567890ss', //căn cước
    sex: 'Nam',
    nationality: 'Việt Nam sss', //quốc tịch
    address: 'Liên Hà - Đan Phượng sss',
    phone: '0123456789 sss',
    email: 'duy124678@gmail.comsss',
    createDate: '01/01/2022',
  },
  {
    id: 2,
    username: 'NguyenDuy',
    full_name: 'Nguyen Van Duy',
    year_of_birth: '15/06/1999',
    citizen_identificatio: '1234567890', //căn cước
    sex: 'Nam',
    nationality: 'Việt Nam', //quốc tịch
    address: 'Liên Hà - Đan Phượng',
    phone: '0123456789',
    email: 'duy124678@gmail.com',
    createDate: '01/01/2022',
  },
]

function AccountUser() {
  return <AccountManagement data={rows} name="User" />
}

export default AccountUser
