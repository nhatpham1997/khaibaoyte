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

const theme = createTheme()

export default function EditProfile() {
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

  const [user, setUser] = useState<any>()
  const [data, setData] = useState({
    fullName: '',
    yearOfBirth: '',
    citizenIdentification: '',
    gender: '',
    province: '',
    provinceName: '',
    district: '',
    ward: '',
    specificAddress: '',
    phone: '',
    createdDate: '',
  })

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((res) => res.json())
      .then((data) => {
        setProvinceResidences(data)
        setProvinces(data)
      })
  }, [])

  const handleSubmit = () => {
    axios.put('https://dbkhaibaoyte.herokuapp.com/user/1/', data).then((res) => {
      console.log('res', res)
    })
  }
  // Hàm xử lý chọn tỉnh/thành phố cư trú
  function handleChangeProvinceResidence(e: React.ChangeEvent<HTMLInputElement>) {
    const codeProvinceResidence = e.target.value
    provinceResidences.forEach((provinceResidence) => {
      if (provinceResidence.code === codeProvinceResidence) {
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
            EditProfile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
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
              label="Year Of Birth"
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
              label="Citizen_Identification"
              name="citizen_identification"
              autoComplete="citizen_identification"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, citizenIdentification: e.target.value }
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, gender: e.target.value }
                })
              }
            />
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
              id="ward"
              label="Ward"
              name="ward"
              autoComplete="ward"
              autoFocus
              onChange={(e) =>
                setData((old) => {
                  return { ...old, ward: e.target.value }
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone_Number"
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
