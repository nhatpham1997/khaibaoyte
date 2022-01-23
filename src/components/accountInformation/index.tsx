import Box from '@mui/material/Box'
import React from 'react'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

type data = {
  data: {
    id: number
    username: string
    full_name: string
    year_of_birth: string
    citizen_identificatio: string
    sex: string
    nationality: string
    address: string
    phone: string
    email: string
    createDate: string
  }
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const styleSpan = {
  marginRight: '20px',
  fontWeight: '500',
  display: 'inline',
}

const styleBox = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  '&:last-child': { borderBottom: 'none' },
}

const AccountInformation = () => {
  const [data, setData] = useState<any>({})
  const [address, setAddress] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const match = useLocation()
  let responseProvince: any
  let responseDistrict: any
  let responseWard: any
  if (address.length > 0) {
    responseProvince = address.filter((item: any) => data.province === item.code)[0] || {}
    responseDistrict =
      responseProvince.districts?.filter((item: any) => data.district === item.code)[0] || {}
    responseWard = responseDistrict.wards?.filter((item: any) => data.ward === item.code)[0] || {}
  }

  const fetchDataAddress = async () => {
    try {
      const dataAddress = await addressApi.getAll()
      setAddress(dataAddress.data)
      setLoading(false)
    } catch (error) {
      console.log('Failed to fetch post list: ', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (match.pathname.includes('account-admin')) {
        try {
          const response = await axios.get(
            `https://dbkhaibaoyte.herokuapp.com/admin?id=${params.id}`
          )
          setData(response.data[0])
          fetchDataAddress()
        } catch (error) {
          console.log('Failed to fetch post list: ', error)
        }
      } else {
        try {
          const response = await axios.get(
            `https://dbkhaibaoyte.herokuapp.com/user?id=${params.id}`
          )
          setData(response.data[0])
          fetchDataAddress()
        } catch (error) {
          console.log('Failed to fetch post list: ', error)
        }
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      {!loading && (
        <Item sx={{ display: 'flex', flexDirection: 'column', textAlign: 'start', boxShadow: 3 }}>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Tên tài khoản:
            </Typography>
            {data.email || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Ngày tạo tài khoản:
            </Typography>
            {data.createdDate || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Tên người dùng:
            </Typography>
            {data.fullName || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Ngày sinh:
            </Typography>
            {data.yearOfBirth || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Giới tính:
            </Typography>
            {data.gender === 1 ? 'Nam' : data.gender === 2 ? 'Nữ' : 'Khác'}
          </Box>

          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Điện thoại:
            </Typography>
            {data.phone || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              CMND/CCCD:
            </Typography>
            {data.citizenIdentification || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Quê quán:
            </Typography>
            {data.provinceName || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Nơi ở hiện tại:
            </Typography>
            {data.specificAddress || ''}
          </Box>
          <Box sx={styleBox}>
            <Typography component="span" sx={styleSpan}>
              Địa chỉ hiện tại:
            </Typography>
            {responseWard.name || data.ward || ''} - {responseDistrict.name || data.district || ''}{' '}
            - {responseProvince.name || data.provinceName || ''}
          </Box>
        </Item>
      )}
    </div>
  )
}

export default AccountInformation
