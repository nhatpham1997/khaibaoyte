import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

const theme = createTheme()

export default function EditProfile() {
  const today = new Date()
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   })
  // }
  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [provinces, setProvinces] = useState<any[]>([])
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidences, setWardResidences] = useState<any[]>([])

  // const [error, setError] = useState({
  //   name: { val: false, code: 0 },
  //   yearOfBirth: { val: false, code: 0 },
  //   sex: false,
  //   email: { val: false, code: 0 },
  //   phone: { val: false, code: 0 },
  //   provinceResidence: false,
  //   districtResidence: false,
  //   wardResidence: false,
  //   specificAddressResidence: false,
  //   date: { val: false, code: 0 },
  //   province: false,
  //   district: false,
  //   ward: false,
  //   specificAddress: false,
  // })

  const [user, setUser] = useState<any>()
  const [dataUser, setDataUser] = useState<any>({})

  const [data, setData] = useState({
    fullName: '',
    yearOfBirth: '',
    citizenIdentification: '',
    gender: Number,
    province: '',
    district: '',
    ward: '',
    specificAddress: '',
    phone: '',
  })
  const id = localStorage.getItem('userId')

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((res) => res.json())
      .then((data) => {
        setProvinceResidences(data)
        setProvinces(data)
      })
  }, [])

  useEffect(() => {
    fetch(`https://dbkhaibaoyte.herokuapp.com/user?id=${id}`)
      .then((res) => res.json())
      .then((dataUsers) => {
        console.log(dataUsers[0])
        setDataUser(dataUsers[0])
      })

    axios
      .post(`https://dbkhaibaoyte.herokuapp.com/user`, {
        email: 'phuhoang1111111@gmail.com',
        password: '123456',
        fullname: 'Phú1111',
        yearofbirth: '123222',
        citizenIdentification: '111111111111111',
        gender: 1,
        province: 26,
        provinceName: 'Hà Nội 1111',
        district: 243,
        ward: 8710,
        specificAddress: '11122',
        phone: '111111111111111131',
        createdDate: date,
        createdAt: 1643182987203,
        fullName: 'ssssssssassss',
        yearOfBirth: '11211',
      })
      .then((res) => {
        console.log('res', res)
      })
  }, [])

  const handleSubmit = () => {
    axios
      .put(`https://dbkhaibaoyte.herokuapp.com/user/${id}/`, { ...dataUser, ...data })
      .then((res) => {
        console.log('res', res)
      })
  }
  // Hàm xử lý chọn tỉnh/thành phố cư trú
  function handleChangeProvinceResidence(e: React.ChangeEvent<HTMLInputElement>) {
    const codeProvinceResidence = e.target.value
    provinceResidences.forEach((provinceResidence) => {
      if (provinceResidence.code === codeProvinceResidence) {
        console.log({ provincesName: provinceResidence.name })
        setDistrictResidences(provinceResidence.districts)
      }
    })
    setData((old) => {
      return {
        ...old,
        province: codeProvinceResidence,
      }
    })
  }
  // Hàm xử lý chọn quận/huyện cư trú
  function handleChangeDistrictResidence(e: React.ChangeEvent<HTMLInputElement>) {
    const codeDistrictResidence = e.target.value
    districtResidences.forEach((districtResidence) => {
      if (districtResidence.code === codeDistrictResidence) {
        setWardResidences(districtResidence.wards)
      }
    })
    setData((old) => {
      return {
        ...old,
        district: codeDistrictResidence,
      }
    })
  }
  // Hàm xử lý chọn phường/xã cư trú
  function handleChangeWardResidence(e: React.ChangeEvent<HTMLInputElement>) {
    setData((old) => {
      return {
        ...old,
        ward: e.target.value,
      }
    })
  }
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Thay Đổi Thông Tin Cá Nhân
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Họ và tên"
              name="fullname"
              autoComplete="fullname"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, fullName: e.target.value }
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="yearofbirth"
              label="Năm Sinh"
              name="yearofbirth"
              autoComplete="yearofbirth"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, yearOfBirth: e.target.value }
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="citizen_identification"
              label="Số hộ chiếu/CMND/CCCD"
              name="citizen_identification"
              autoComplete="citizen_identification"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, citizenIdentification: e.target.value }
                })
              }
            />

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              id="gender"
              name="Giới Tính"
              onChange={(e) =>
                setData((old: any) => {
                  return { ...old, gender: Number(e.target.value) }
                })
              }
            >
              <FormControlLabel value="1" control={<Radio />} label="Nam" />
              <FormControlLabel value="2" control={<Radio />} label="Nữ" />
              <FormControlLabel value="3" control={<Radio />} label="Khác" />
            </RadioGroup>

            <div className="row">
              <TextField
                id="province-residence"
                label="Tỉnh/Thành phố"
                sx={{
                  marginBottom: '1rem',
                  marginTop: '1rem',
                  minWidth: 'calc(calc(100%/4) - 1.5rem)',
                }}
                size="medium"
                InputProps={{ style: { fontSize: '1.2rem' } }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                required
                select
                value={data.province}
                onChange={handleChangeProvinceResidence}
              >
                {provinceResidences.map((provinceResidence) => (
                  <MenuItem key={provinceResidence.code} value={provinceResidence.code}>
                    {provinceResidence.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="district-residence"
                label="Quận/Huyện"
                sx={{
                  marginBottom: '1rem',
                  marginTop: '1rem',
                  minWidth: 'calc(calc(100%/4) - 1.5rem)',
                }}
                size="medium"
                InputProps={{ style: { fontSize: '1.2rem' } }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                required
                select
                value={data.district}
                onChange={handleChangeDistrictResidence}
              >
                {districtResidences.map((districtResidence) => (
                  <MenuItem key={districtResidence.code} value={districtResidence.code}>
                    {districtResidence.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="ward-residence"
                label="Phường/Xã"
                sx={{
                  marginBottom: '1rem',
                  marginTop: '1rem',
                  minWidth: 'calc(calc(100%/4) - 1.5rem)',
                }}
                size="medium"
                InputProps={{ style: { fontSize: '1.2rem' } }}
                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                required
                select
                value={data.ward}
                onChange={handleChangeWardResidence}
              >
                {wardResidences.map((wardResidence) => (
                  <MenuItem key={wardResidence.code} value={wardResidence.code}>
                    {wardResidence.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="specificAddress"
              label="Số nhà, phố, tổ dân phố/thôn/đội"
              name="specificAddress"
              autoComplete="specificAddress"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, specificAddress: e.target.value }
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Số Điện Thoại"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, phone: e.target.value }
                })
              }
            />

            <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  )
}
