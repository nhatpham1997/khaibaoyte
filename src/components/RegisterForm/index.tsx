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
import { MenuItem } from '@mui/material'

const theme = createTheme()

export default function RegisterForm() {
  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
  // const [fullname, setFullname] = useState()
  // const [yearofbirth, setYearofbirth] = useState()
  // const [citizen_identification, setCitizen_identification] = useState()
  // const [gender, setGender] = useState()
  // const [province, setProvince] = useState()
  // const [district, setDistrict] = useState()
  // const [ward, setWard] = useState()
  // const [phone, setPhone] = useState()

  const [data, setData] = useState({
    email: '',
    password: '',
    fullname: '',
    yearofbirth: '',
    citizen_identification: '',
    gender: '',
    province: '',
    district: '',
    phone: '',
  })

  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [provinces, setProvinces] = useState<any[]>([])
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidences, setWardResidences] = useState<any[]>([])

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((res) => res.json())
      .then((data) => {
        setProvinceResidences(data)
        setProvinces(data)
      })
  }, [])

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

  const handleSubmit = () => {
    axios.post('https://dbkhaibaoyte.herokuapp.com/user/', data).then((res) => {
      console.log('res', res)
    })
  }

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo-Rikkei.png)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              width: '500px',
              height: '500px',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  // value={email}
                  onChange={(e) =>
                    setData((old) => {
                      return { ...old, email: e.target.value }
                    })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  // value={password}
                  onChange={(e) =>
                    setData((old) => {
                      return { ...old, password: e.target.value }
                    })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="fullname"
                  name="fullname"
                  autoComplete="fullname"
                  autoFocus
                  // value={fullname}
                  onChange={(e) =>
                    setData((old) => {
                      return { ...old, fullname: e.target.value }
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
                  // value={yearofbirth}
                  onChange={(e) =>
                    setData((old) => {
                      return { ...old, yearofbirth: e.target.value }
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
                  // value={citizen_identification}
                  onChange={(e) =>
                    setData((old) => {
                      return { ...old, citizen_identification: e.target.value }
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
                  // value={gender}
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
                    // value={data.ward}
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
                  id="phone"
                  label="Phone_Number"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  // value={phone}
                  onChange={(e) =>
                    setData((old) => {
                      return { ...old, phone: e.target.value }
                    })
                  }
                />

                <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink to="/">{' you have an account? Sign in '}</NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  )
}
