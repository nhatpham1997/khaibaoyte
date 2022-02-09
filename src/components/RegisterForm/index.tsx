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
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MenuItem } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

const theme = createTheme()

export default function RegisterForm() {
  const navigate = useNavigate()
  const today = new Date()
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  const [data, setData] = useState({
    email: '',
    password: '',
    fullName: '',
    yearOfBirth: '',
    citizenIdentification: '',
    gender: Number,
    province: '',
    provinceName: '',
    district: '',
    ward: '',
    specificAddress: '',
    phone: '',
    createdDate: date,
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
        setData({ ...data, provinceName: provinceResidence.name })
      }
    })
    if (!e.target.value) {
      setError((prev) => ({ ...prev, province: true }))
    }
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
    if (!e.target.value) {
      setError((prev) => ({ ...prev, district: true }))
    }
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
    if (!e.target.value) {
      setError((prev) => ({ ...prev, ward: true }))
    }
  }

  const handleSubmit = () => {
    axios.post('https://dbkhaibaoyte.herokuapp.com/user/', data).then((res) => {
      navigate('/')
    })
    if (!data.fullName) {
      setError((prev) => {
        return { ...prev, name: { val: true, code: 1 } }
      })
    }
    if (!data.yearOfBirth) {
      setError((prev) => {
        return { ...prev, yearOfBirth: { val: true, code: 1 } }
      })
    }
    if (!data.gender) {
      setError((prev) => {
        return { ...prev, gerder: true }
      })
    }

    if (!data.email) {
      setError((prev) => {
        return { ...prev, email: { val: true, code: 1 } }
      })
    }
    if (!data.phone) {
      setError((prev) => {
        return { ...prev, phone: { val: true, code: 1 } }
      })
    }
    if (!data.province) {
      setError((prev) => {
        return { ...prev, provinceResidence: true }
      })
    }
    if (!data.district) {
      setError((prev) => {
        return { ...prev, districtResidence: true }
      })
    }
    if (!data.ward) {
      setError((prev) => {
        return { ...prev, wardResidence: true }
      })
    }
    if (!data.specificAddress) {
      setError((prev) => {
        return { ...prev, specificAddressResidence: true }
      })
    }

    if (!data.specificAddress) {
      setError((prev) => {
        return { ...prev, specificAddress: true }
      })
    }
  }

  const [error, setError] = useState({
    email: { val: false, code: 0 },
    password: { val: false, code: 0 },
    name: { val: false, code: 0 },
    yearOfBirth: { val: false, code: 0 },
    gerder: false,
    phone: { val: false, code: 0 },
    provinceResidence: false,
    districtResidence: false,
    wardResidence: false,
    specificAddressResidence: false,
    specificAddress: false,
  })

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, email: { val: true, code: 1 } }))
    } else if (e.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) === null) {
      setError((prev) => ({ ...prev, email: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, email: { val: false, code: 0 } }))
    }
    setData((prev) => {
      return { ...prev, email: e.target.value }
    })
  }
  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, fullName: { val: true, code: 1 } }))
    } else if (
      e.target.value.match(/^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{3,}$/g) ===
      null
    ) {
      setError((prev) => ({ ...prev, fullName: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, fullName: { val: false, code: 0 } }))
    }
    setData((old) => {
      return { ...old, fullName: e.target.value }
    })
  }

  function handleChangeCitizen(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, citizenIdentification: { val: true, code: 1 } }))
    } else if (
      e.target.value.match(/^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{3,}$/g) ===
      null
    ) {
      setError((prev) => ({ ...prev, citizenIdentification: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, citizenIdentification: { val: false, code: 0 } }))
    }
    setData((old) => {
      return { ...old, citizenIdentification: e.target.value }
    })
  }
  function handleChangeYOB(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, yearOfBirth: { val: true, code: 1 } }))
    } else if (parseInt(e.target.value) < 1900) {
      setError((prev) => ({
        ...prev,
        yearOfBirth: { val: true, code: 2 },
      }))
    } else if (parseInt(e.target.value) > new Date().getFullYear()) {
      setError((prev) => ({
        ...prev,
        yearOfBirth: { val: true, code: 3 },
      }))
    } else {
      setError((prev) => ({ ...prev, yearOfBirth: { val: false, code: 0 } }))
    }
    setData((old) => {
      return { ...old, yearOfBirth: e.target.value }
    })
  }
  function handleChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, phone: { val: true, code: 1 } }))
    } else if (e.target.value.match(/((09|03|07|08|05)+([0-9]{8})\b)/i) === null) {
      setError((prev) => ({ ...prev, phone: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, phone: { val: false, code: 0 } }))
    }
    setData((prev) => {
      return { ...prev, phone: e.target.value }
    })
  }

  // Hàm thay đổi nơi ở hiện tại
  function handleChangeSpecificAddressResidence(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, specificAddressResidence: true }))
    } else {
      setError((prev) => ({ ...prev, specificAddressResidence: false }))
    }
    setData((prev) => {
      return { ...prev, specificAddress: e.target.value }
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
                'url(https://dtcfurniture.vn/uploads/projects/banner-web-show.jpg?fbclid=IwAR3uyd-iw66sJwELVYE9lSiX0sCphZRYmqwGqxc9SXA1guNRtPKc-mjasmI)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
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
              <Typography sx={{ fontSize: '2rem' }} component="h1" variant="h5">
                Đăng ký tài khoản
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChangeEmail}
                  error={error.email.val}
                  helperText={
                    error.email.val === true && error.email.code === 1
                      ? 'Bạn chưa nhập email'
                      : error.email.val === true && error.email.code === 2
                      ? 'Email không hợp lệ'
                      : ''
                  }
                />
                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setData((old) => {
                      return { ...old, password: e.target.value }
                    })
                  }
                  error={error.password.val}
                  helperText={
                    error.password.val === true && error.password.code === 1
                      ? 'Bạn chưa nhập tên'
                      : error.password.val === true && error.password.code === 2
                      ? 'Tên không hợp lệ'
                      : ''
                  }
                />
                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Họ và tên"
                  name="fullname"
                  autoComplete="fullname"
                  autoFocus
                  onChange={handleChangeName}
                  error={error.name.val}
                  helperText={error.name.val === false ? '' : 'Vui lòng nhập trường này'}
                />
                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="yearOfBirth"
                  label="Năm sinh"
                  name="yearofbirth"
                  autoComplete="yearofbirth"
                  autoFocufa-stack
                  onChange={handleChangeYOB}
                  error={error.yearOfBirth.val}
                  helperText={
                    error.yearOfBirth.val === true && error.yearOfBirth.code === 1
                      ? 'Bạn chưa nhập năm sinh'
                      : error.yearOfBirth.val === true && error.yearOfBirth.code === 2
                      ? 'Năm sinh không hợp lệ'
                      : error.yearOfBirth.val === true && error.yearOfBirth.code === 3
                      ? 'Năm sinh không thể lớn hơn năm hiện tại'
                      : ''
                  }
                />
                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="citizenIdentification"
                  label="CMND/CCCD"
                  name="citizen_identification"
                  autoComplete="citizen_identification"
                  autoFocus
                  onChange={handleChangeCitizen}
                />

                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  id="gender"
                  name="Giới Tính"
                  sx={{
                    '& .MuiTypography-root': { fontSize: '1.4rem' },
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.6rem',
                  }}
                  onChange={(e) =>
                    setData((old: any) => {
                      return { ...old, gender: Number(e.target.value) }
                    })
                  }
                >
                  Giới tính:
                  <FormControlLabel
                    sx={{ fontSize: '1.4rem', marginLeft: '10px' }}
                    value="1"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    sx={{ fontSize: '1.4rem' }}
                    value="2"
                    control={<Radio />}
                    label="Nữ"
                  />
                  <FormControlLabel
                    sx={{ fontSize: '1.4rem' }}
                    value="3"
                    control={<Radio />}
                    label="Khác"
                  />
                </RadioGroup>

                <div className="row">
                  <TextField
                    InputProps={{ style: { fontSize: '1.4rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                    id="province-residence"
                    label="Tỉnh/Thành phố"
                    sx={{
                      marginBottom: '1rem',
                      marginTop: '1rem',
                      minWidth: 'calc(calc(100%/4) - 1.5rem)',
                    }}
                    size="medium"
                    required
                    select
                    value={data.province}
                    onChange={handleChangeProvinceResidence}
                    error={error.provinceResidence}
                    helperText={
                      error.provinceResidence === false ? '' : 'Bạn chưa chọn tỉnh/thành phố'
                    }
                  >
                    {provinceResidences.map((provinceResidence) => (
                      <MenuItem key={provinceResidence.code} value={provinceResidence.code}>
                        {provinceResidence.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    InputProps={{ style: { fontSize: '1.4rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                    id="district-residence"
                    label="Quận/Huyện"
                    sx={{
                      marginBottom: '1rem',
                      marginTop: '1rem',
                      minWidth: 'calc(calc(100%/4) - 1.5rem)',
                    }}
                    size="medium"
                    required
                    select
                    value={data.district}
                    onChange={handleChangeDistrictResidence}
                    error={error.districtResidence}
                    helperText={error.districtResidence === false ? '' : 'Bạn chưa chọn quận/huyện'}
                  >
                    {districtResidences.map((districtResidence) => (
                      <MenuItem key={districtResidence.code} value={districtResidence.code}>
                        {districtResidence.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    InputProps={{ style: { fontSize: '1.4rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                    id="ward-residence"
                    label="Phường/Xã"
                    sx={{
                      marginBottom: '1rem',
                      marginTop: '1rem',
                      minWidth: 'calc(calc(100%/4) - 1.5rem)',
                    }}
                    size="medium"
                    required
                    select
                    onChange={handleChangeWardResidence}
                    error={error.wardResidence}
                    helperText={error.wardResidence === false ? '' : 'Bạn chưa chọn phường/xã'}
                  >
                    {wardResidences.map((wardResidence) => (
                      <MenuItem key={wardResidence.code} value={wardResidence.code}>
                        {wardResidence.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="specificAddress"
                  label="Số nhà, phố, tổ dân phố/thôn/đội"
                  name="specificAddress"
                  autoComplete="specificAddress"
                  autoFocus
                  onChange={handleChangeSpecificAddressResidence}
                  error={error.specificAddressResidence}
                  helperText={
                    error.specificAddressResidence === false ? '' : 'Vui lòng nhập trường này'
                  }
                />

                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  style={{ width: '200px' }}
                  id="phone"
                  label="Số Điện Thoại"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  onChange={handleChangePhone}
                  error={error.phone.val}
                  helperText={
                    error.phone.val === true && error.phone.code === 1
                      ? 'Bạn chưa nhập số điện thoại'
                      : error.phone.val === true && error.phone.code === 2
                      ? 'Số điện thoại không hợp lệ'
                      : ''
                  }
                />

                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: '1.4rem' }}
                >
                  Đăng ký
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink style={{ fontSize: '1.4rem' }} to="/">
                      {' Bạn đã có tài khoản? Đăng nhập '}
                    </NavLink>
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
