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
  // H??m x??? l?? ch???n qu???n/huy???n c?? tr??
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
  // H??m x??? l?? ch???n ph?????ng/x?? c?? tr??
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
      e.target.value.match(/^[A-Za-z???????????????????????????????????????????????????????????????????????????????????????????-??? ]{3,}$/g) ===
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
      e.target.value.match(/^[A-Za-z???????????????????????????????????????????????????????????????????????????????????????????-??? ]{3,}$/g) ===
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

  // H??m thay ?????i n??i ??? hi???n t???i
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
                ????ng k?? t??i kho???n
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  autoFocus
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChangeEmail}
                  error={error.email.val}
                  helperText={
                    error.email.val === true && error.email.code === 1
                      ? 'B???n ch??a nh???p email'
                      : error.email.val === true && error.email.code === 2
                      ? 'Email kh??ng h???p l???'
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
                  label="M???t kh???u"
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
                      ? 'B???n ch??a nh???p t??n'
                      : error.password.val === true && error.password.code === 2
                      ? 'T??n kh??ng h???p l???'
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
                  label="H??? v?? t??n"
                  name="fullname"
                  autoComplete="fullname"
                  onChange={handleChangeName}
                  error={error.name.val}
                  helperText={error.name.val === false ? '' : 'Vui l??ng nh???p tr?????ng n??y'}
                />
                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="yearOfBirth"
                  label="N??m sinh"
                  name="yearofbirth"
                  autoComplete="yearofbirth"
                  autoFocufa-stack
                  onChange={handleChangeYOB}
                  error={error.yearOfBirth.val}
                  helperText={
                    error.yearOfBirth.val === true && error.yearOfBirth.code === 1
                      ? 'B???n ch??a nh???p n??m sinh'
                      : error.yearOfBirth.val === true && error.yearOfBirth.code === 2
                      ? 'N??m sinh kh??ng h???p l???'
                      : error.yearOfBirth.val === true && error.yearOfBirth.code === 3
                      ? 'N??m sinh kh??ng th??? l???n h??n n??m hi???n t???i'
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
                  onChange={handleChangeCitizen}
                />

                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  id="gender"
                  name="Gi???i T??nh"
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
                  Gi???i t??nh:
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
                    label="N???"
                  />
                  <FormControlLabel
                    sx={{ fontSize: '1.4rem' }}
                    value="3"
                    control={<Radio />}
                    label="Kh??c"
                  />
                </RadioGroup>

                <div className="row">
                  <TextField
                    InputProps={{ style: { fontSize: '1.4rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                    id="province-residence"
                    label="T???nh/Th??nh ph???"
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
                      error.provinceResidence === false ? '' : 'B???n ch??a ch???n t???nh/th??nh ph???'
                    }
                  >
                    {provinceResidences.map((provinceResidence) => (
                      <MenuItem
                        sx={{ fontSize: '1.4rem' }}
                        key={provinceResidence.code}
                        value={provinceResidence.code}
                      >
                        {provinceResidence.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    InputProps={{ style: { fontSize: '1.4rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                    id="district-residence"
                    label="Qu???n/Huy???n"
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
                    helperText={error.districtResidence === false ? '' : 'B???n ch??a ch???n qu???n/huy???n'}
                  >
                    {districtResidences.map((districtResidence) => (
                      <MenuItem
                        sx={{ fontSize: '1.4rem' }}
                        key={districtResidence.code}
                        value={districtResidence.code}
                      >
                        {districtResidence.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    InputProps={{ style: { fontSize: '1.4rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                    id="ward-residence"
                    label="Ph?????ng/X??"
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
                    helperText={error.wardResidence === false ? '' : 'B???n ch??a ch???n ph?????ng/x??'}
                  >
                    {wardResidences.map((wardResidence) => (
                      <MenuItem
                        sx={{ fontSize: '1.4rem' }}
                        key={wardResidence.code}
                        value={wardResidence.code}
                      >
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
                  label="S??? nh??, ph???, t??? d??n ph???/th??n/?????i"
                  name="specificAddress"
                  autoComplete="specificAddress"
                  onChange={handleChangeSpecificAddressResidence}
                  error={error.specificAddressResidence}
                  helperText={
                    error.specificAddressResidence === false ? '' : 'Vui l??ng nh???p tr?????ng n??y'
                  }
                />

                <TextField
                  InputProps={{ style: { fontSize: '1.4rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="S??? ??i???n Tho???i"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChangePhone}
                  error={error.phone.val}
                  helperText={
                    error.phone.val === true && error.phone.code === 1
                      ? 'B???n ch??a nh???p s??? ??i???n tho???i'
                      : error.phone.val === true && error.phone.code === 2
                      ? 'S??? ??i???n tho???i kh??ng h???p l???'
                      : ''
                  }
                />

                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: '1.4rem' }}
                >
                  ????ng k??
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink style={{ fontSize: '1.4rem' }} to="/">
                      {' B???n ???? c?? t??i kho???n? ????ng nh???p '}
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
