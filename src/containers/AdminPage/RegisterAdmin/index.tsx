import { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MenuItem } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { GlobalContext } from 'contexts'

const theme = createTheme()

export default function RegisterAdmin() {
  const { isLogin } = useContext(GlobalContext)
  const navigate = useNavigate()
  const today = new Date()
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  const [data, setData] = useState({
    email: '',
    password: '',
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
    createdDate: date,
  })

  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [provinces, setProvinces] = useState<any[]>([])
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidences, setWardResidences] = useState<any[]>([])

  if (isLogin.toString() !== '1') {
    navigate('/admin')
  }

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
    if (
      data.email !== '' &&
      data.password !== '' &&
      data.fullName !== '' &&
      data.yearOfBirth !== '' &&
      data.citizenIdentification !== '' &&
      data.province !== '' &&
      data.provinceName !== '' &&
      data.gender !== '' &&
      data.district !== '' &&
      data.ward !== '' &&
      data.specificAddress !== '' &&
      data.phone !== ''
    ) {
      axios.post('https://dbkhaibaoyte.herokuapp.com/admin/', data).then((res) => {
        navigate('/admin')
      })
    } else {
      alert('Vui lòng nhập đủ thông tin!')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>Thêm tài khoản Admin</span>

        <Box
          component="form"
          noValidate
          sx={{
            mt: 1,
            '& input': { fontSize: '1.4rem' },
            '& .MuiOutlinedInput-input': { fontSize: '1.4rem' },
          }}
        >
          <TextField
            InputProps={{ style: { fontSize: '1.4rem' } }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            autoComplete="email"
            // value={email}
            onChange={(e) =>
              setData((old) => {
                return { ...old, email: e.target.value }
              })
            }
          />
          <TextField
            InputProps={{ style: { fontSize: '1.4rem' } }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
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
            InputProps={{ style: { fontSize: '1.4rem' } }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Họ và tên"
            name="fullname"
            autoComplete="fullname"
            // value={fullname}
            onChange={(e) =>
              setData((old) => {
                return { ...old, fullName: e.target.value }
              })
            }
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
            onChange={(e) =>
              setData((old) => {
                return { ...old, yearOfBirth: e.target.value }
              })
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
            onChange={(e) =>
              setData((old) => {
                return { ...old, citizenIdentification: e.target.value }
              })
            }
          />
          <RadioGroup
            sx={{
              '& .MuiTypography-root': { fontSize: '1.4rem' },
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.6rem',
            }}
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
            Giới tính:
            <FormControlLabel
              sx={{ marginLeft: '10px' }}
              value="1"
              control={<Radio />}
              label="Nam"
            />
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
              InputProps={{ style: { fontSize: '1.4rem' } }}
              InputLabelProps={{ style: { fontSize: '1.4rem' } }}
              required
              select
              value={data.province}
              onChange={handleChangeProvinceResidence}
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
              id="district-residence"
              label="Quận/Huyện"
              sx={{
                marginBottom: '1rem',
                marginTop: '1rem',
                minWidth: 'calc(calc(100%/4) - 1.5rem)',
              }}
              size="medium"
              InputProps={{ style: { fontSize: '1.4rem' } }}
              InputLabelProps={{ style: { fontSize: '1.4rem' } }}
              required
              select
              value={data.district}
              onChange={handleChangeDistrictResidence}
            >
              {districtResidences?.map((districtResidence) => (
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
              id="ward-residence"
              label="Phường/Xã"
              sx={{
                marginBottom: '1rem',
                marginTop: '1rem',
                minWidth: 'calc(calc(100%/4) - 1.5rem)',
              }}
              size="medium"
              InputProps={{ style: { fontSize: '1.4rem' } }}
              InputLabelProps={{ style: { fontSize: '1.4rem' } }}
              required
              select
              // value={data.ward}
              onChange={handleChangeWardResidence}
            >
              {wardResidences?.map((wardResidence) => (
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
            label="Số nhà, phố, tổ dân phố/thôn/đội"
            name="specificAddress"
            autoComplete="specificAddress"
            onChange={(e) =>
              setData((old) => {
                return { ...old, specificAddress: e.target.value }
              })
            }
          />

          <TextField
            InputProps={{ style: { fontSize: '1.4rem' } }}
            InputLabelProps={{ style: { fontSize: '1.4rem' } }}
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Số Điện Thoại"
            name="phone"
            autoComplete="phone"
            // value={phone}
            onChange={(e) =>
              setData((old) => {
                return { ...old, phone: e.target.value }
              })
            }
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: '1.4rem' }}
          >
            Thêm tài khoản
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
