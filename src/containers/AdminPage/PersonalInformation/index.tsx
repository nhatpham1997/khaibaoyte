import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { CssBaseline, Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

export default function AdminPersonalInformation() {
  const today = new Date()
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()

  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [provinces, setProvinces] = useState<any[]>([])
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidences, setWardResidences] = useState<any[]>([])

  const [dataUser, setDataUser] = useState<any>({})
  const navigate = useNavigate()

  const [data, setData] = useState({
    fullName: '',
    yearOfBirth: '',
    citizenIdentification: '',
    gender: '',
    province: '',
    district: '',
    ward: '',
    specificAddress: '',
    phone: '',
  })
  const id = localStorage.getItem('adminId')

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((res) => res.json())
      .then((data) => {
        setProvinceResidences(data)
        setProvinces(data)
      })
  }, [])

  useEffect(() => {
    fetch(`https://dbkhaibaoyte.herokuapp.com/admin?id=${id}`)
      .then((res) => res.json())
      .then((dataUsers) => {
        console.log(dataUsers[0])
        setDataUser(dataUsers[0])
      })
  }, [])

  const handleSubmit = () => {
    if (
      data.fullName !== '' &&
      data.yearOfBirth !== '' &&
      data.citizenIdentification !== '' &&
      data.province !== '' &&
      data.gender !== '' &&
      data.district !== '' &&
      data.ward !== '' &&
      data.specificAddress !== '' &&
      data.phone !== ''
    ) {
      axios
        .put(`https://dbkhaibaoyte.herokuapp.com/admin/${id}/`, { ...dataUser, ...data })
        .then((res) => {
          navigate('/admin')
        })
    } else {
      alert('Vui lòng nhập đủ thông tin!')
    }
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>Thay Đổi Thông Tin Cá Nhân</span>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
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
            id="fullname"
            label="Họ và tên"
            name="fullname"
            type="text"
            autoComplete="fullname"
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
            id="yearofbirth"
            label="Năm Sinh"
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
            id="citizen_identification"
            label="Số hộ chiếu/CMND/CCCD"
            name="citizen_identification"
            autoComplete="citizen_identification"
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
            sx={{ '& .MuiTypography-root': { fontSize: '1.4rem' } }}
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
              // InputProps={{ style: { fontSize: '1.2rem' } }}
              // InputLabelProps={{ style: { fontSize: '1.2rem' } }}
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
              // InputProps={{ style: { fontSize: '1.2rem' } }}
              // InputLabelProps={{ style: { fontSize: '1.2rem' } }}
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
              // InputProps={{ style: { fontSize: '1.2rem' } }}
              // InputLabelProps={{ style: { fontSize: '1.2rem' } }}
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
            Thay đổi
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
