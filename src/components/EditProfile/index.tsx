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
import Noti from 'components/Noti'
import SendIcon from '@mui/icons-material/Send'

const theme = createTheme()

export default function EditProfile() {
  const today = new Date()
  const navigate = useNavigate()
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()

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
    createdDate: date,
  })

  const [dataUser, setDataUser] = useState<any>({})

  const id = localStorage.getItem('userId')

  useEffect(() => {
    fetch(`https://dbkhaibaoyte.herokuapp.com/user?id=${id}`)
      .then((res) => res.json())
      .then((dataUsers) => {
        setDataUser(dataUsers[0])
      })
  }, [])

  const [showNoti, setShowNoti] = useState(false)

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
  const [payloadNoti, setPayloadNoti] = useState({
    status: 'success',
    text: '',
  })

  const handleSubmit = () => {
    if (
      data.fullName !== '' &&
      data.yearOfBirth !== '' &&
      data.gender !== '' &&
      data.phone !== '' &&
      data.province !== '' &&
      data.district !== '' &&
      data.specificAddress !== '' &&
      data.specificAddress !== '' &&
      data.ward !== ''
    ) {
      axios
        .put(`https://dbkhaibaoyte.herokuapp.com/user/${id}/`, { ...dataUser, ...data })
        .then((res) => {
          console.log('res', res)
        })
      navigate('/user')
    } else {
      alert('Vui l??ng nh???p ?????y ????? th??ng tin!')
    }
  }

  const [error, setError] = useState({
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
      <TextField
        margin="normal"
        required
        fullWidth
        id="fullname"
        label="H??? v?? t??n"
        name="fullname"
        autoComplete="fullname"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
          fontSize: '3rem',
        }}
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
        autoFocus
        onChange={handleChangeName}
        error={error.name.val}
        helperText={error.name.val === false ? '' : 'Vui l??ng nh???p tr?????ng n??y'}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="yearOfBirth"
        label="N??m sinh"
        name="yearofbirth"
        autoComplete="yearofbirth"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
          fontSize: '3rem',
        }}
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
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
        margin="normal"
        required
        fullWidth
        id="citizenIdentification"
        label="CMND/CCCD"
        name="citizen_identification"
        autoComplete="citizen_identification"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
          fontSize: '3rem',
        }}
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
        autoFocus
        onChange={handleChangeCitizen}
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
        name="Gi???i T??nh"
        onChange={(e) =>
          setData((old: any) => {
            return { ...old, gender: Number(e.target.value) }
          })
        }
      >
        Gi???i t??nh:
        <FormControlLabel sx={{ marginLeft: '10px' }} value="1" control={<Radio />} label="Nam" />
        <FormControlLabel value="2" control={<Radio />} label="N???" />
        <FormControlLabel value="3" control={<Radio />} label="Kh??c" />
      </RadioGroup>
      <TextField
        margin="normal"
        fullWidth
        required
        id="phone"
        label="S??? ??i???n Tho???i"
        name="phone"
        autoComplete="phone"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
          fontSize: '3rem',
        }}
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
        autoFocus
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
      <div className="row">
        <TextField
          id="province-residence"
          label="T???nh/Th??nh ph???"
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
          error={error.provinceResidence}
          helperText={error.provinceResidence === false ? '' : 'B???n ch??a ch???n t???nh/th??nh ph???'}
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
          label="Qu???n/Huy???n"
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
          id="ward-residence"
          label="Ph?????ng/X??"
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
        margin="normal"
        required
        fullWidth
        id="specificAddress"
        label="S??? nh??, ph???, t??? d??n ph???/th??n/?????i"
        name="specificAddress"
        autoComplete="specificAddress"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
          fontSize: '3rem',
        }}
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
        autoFocus
        onChange={handleChangeSpecificAddressResidence}
        error={error.specificAddressResidence}
        helperText={error.specificAddressResidence === false ? '' : 'Vui l??ng nh???p tr?????ng n??y'}
      />

      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={handleSubmit}
          sx={{
            fontSize: '1.4rem',
            marginTop: '2rem',
            textAlign: 'center',
            textTransform: 'initial',
            padding: '1rem 3rem',
            borderRadius: '2rem',
          }}
          variant="contained"
        >
          {' L??U '}
        </Button>
      </div>
      <Noti payload={payloadNoti} showNoti={showNoti} setShowNoti={setShowNoti} />
    </Box>
  )
}
