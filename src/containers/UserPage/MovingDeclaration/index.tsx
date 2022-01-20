import { TextField } from '@mui/material'
import LabelHeading from 'components/LabelHeading'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import BasicDatePicker from 'components/BasicDatePicker'
import BasicTimePicker from 'components/BasicTimePicker'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

function MovingDeclaration() {
  const userAPI = 'http://localhost:3000/user'

  const [provinceResidence, setProvinceResidence] = useState('')
  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [districtResidence, setDistrictResidence] = useState('')
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidence, setWardResidence] = useState('')
  const [wardResidences, setWardResidences] = useState<any[]>([])

  const [province, setProvince] = useState('')
  const [provinces, setProvinces] = useState<any[]>([])
  const [district, setDistrict] = useState('')
  const [districts, setDistricts] = useState<any[]>([])
  const [ward, setWard] = useState('')
  const [wards, setWards] = useState<any[]>([])

  const sexs = [
    {
      value: '1',
      label: 'Nam',
    },
    {
      value: '2',
      label: 'Nữ',
    },
    {
      value: '0',
      label: 'Khác',
    },
  ]

  // Lấy ra id tài khoản lưu ở local storage
  const userId = localStorage.getItem('userId')
  console.log(userId)

  // Lấy ra thông tin tài khoản

  interface IUser {
    fullName?: string
    yearOfBirth?: string
    gender?: string
    citizenIdentification?: string
    email?: string
    phone?: string
  }

  const [currentUser, setCurrentUser] = useState<IUser>({})

  useEffect(() => {
    fetch(`${userAPI}/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        setCurrentUser(user)
      })
  }, [])

  const [sex, setSex] = useState('1')

  console.log(currentUser)

  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((res) => res.json())
      .then((data) => {
        setProvinceResidences(data)
        setProvinces(data)
      })
  }, [])

  // Hàm xử lý thay đổi tên
  /**
   * kjf
   * ai
   * nagy
   * @param e hàm
   */
  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentUser((prev) => {
      return { ...prev, fullName: e.target.value }
    })
  }

  // Hàm thay đổi năm sinh
  function handleChangeYOB(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentUser((prev) => {
      return { ...prev, yearOfBirth: e.target.value }
    })
  }

  // Hàm thay đổi CMT
  function handleChangeCitiIden(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentUser((prev) => {
      return { ...prev, citizenIdentification: e.target.value }
    })
  }
  // Hàm thay đổi email
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentUser((prev) => {
      return { ...prev, email: e.target.value }
    })
  }
  // Hàm thay đổi số điện thoại
  function handleChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentUser((prev) => {
      return { ...prev, phone: e.target.value }
    })
  }

  // Hàm xử lý chọn giới tính
  function handleChangeSex(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentUser((prev) => {
      return { ...prev, gender: e.target.value }
    })
  }

  // Hàm xử lý chọn tỉnh/thành phố cư trú
  function handleChangeProvinceResidence(e: React.ChangeEvent<HTMLInputElement>) {
    setDistrictResidence('')
    setDistrictResidences([])
    setWardResidence('')
    setWardResidences([])
    const codeProvinceResidence = e.target.value
    provinceResidences.forEach((provinceResidence) => {
      if (provinceResidence.code === codeProvinceResidence) {
        setDistrictResidences(provinceResidence.districts)
      }
    })
    setProvinceResidence(codeProvinceResidence)
  }

  // Hàm xử lý chọn quận/huyện cư trú
  function handleChangeDistrictResidence(e: React.ChangeEvent<HTMLInputElement>) {
    setWardResidence('')
    setWardResidences([])
    const codeDistrictResidence = e.target.value
    districtResidences.forEach((districtResidence) => {
      if (districtResidence.code === codeDistrictResidence) {
        setWardResidences(districtResidence.wards)
      }
    })
    setDistrictResidence(codeDistrictResidence)
  }

  // Hàm xử lý chọn phường/xã cư trú
  function handleChangeWardResidence(e: React.ChangeEvent<HTMLInputElement>) {
    setWardResidence(e.target.value)
  }

  // Hàm xử lý chọn tỉnh/thành phố di chuyển
  function handleChangeProvince(e: React.ChangeEvent<HTMLInputElement>) {
    setDistrict('')
    setDistricts([])
    setWard('')
    setWards([])
    const codeProvince = e.target.value
    provinces.forEach((province) => {
      if (province.code === codeProvince) {
        setDistricts(province.districts)
      }
    })
    setProvince(codeProvince)
  }

  // Hàm xử lý chọn quận/huyện di chuyển
  function handleChangeDistrict(e: React.ChangeEvent<HTMLInputElement>) {
    setWard('')
    setWards([])
    const codeDistrict = e.target.value
    districts.forEach((district) => {
      if (district.code === codeDistrict) {
        setWards(district.wards)
      }
    })
    setDistrict(codeDistrict)
  }

  // Hàm xử lý chọn phường/xã di chuyển
  function handleChangeWard(e: React.ChangeEvent<HTMLInputElement>) {
    setWard(e.target.value)
  }

  return (
    <>
      <div className="row">
        <LabelHeading text="Thông tin cá nhân" />
      </div>
      <TextField
        ref={nameRef}
        id="name"
        label="Họ và tên"
        variant="outlined"
        sx={{ marginBottom: '1rem', marginTop: '1rem', fontSize: '3rem' }}
        InputProps={{ style: { fontSize: '1.2rem' } }}
        InputLabelProps={{ style: { fontSize: '1.2rem' } }}
        required
        fullWidth
        value={currentUser.fullName || ''}
        onChange={handleChangeName}
      />
      <div className="row">
        <TextField
          id="year-of-birth"
          label="Năm sinh"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          value={currentUser.yearOfBirth || ''}
          onChange={handleChangeYOB}
        />
        <TextField
          id="sex"
          label="Giới tính"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          select
          value={currentUser.gender || ''}
          onChange={handleChangeSex}
        >
          {sexs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <TextField
        id="citizen-identification"
        label="Số hộ chiếu/CMND/CCCD"
        variant="outlined"
        sx={{ marginBottom: '1rem', marginTop: '1rem' }}
        size="medium"
        InputProps={{ style: { fontSize: '1.2rem' } }}
        InputLabelProps={{ style: { fontSize: '1.2rem' } }}
        required
        fullWidth
        value={currentUser.citizenIdentification || ''}
        onChange={handleChangeCitiIden}
      />
      <div className="row">
        <TextField
          id="email"
          label="Email"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          value={currentUser.email || ''}
          onChange={handleChangeEmail}
        />
        <TextField
          id="phone"
          label="Số điện thoại"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          value={currentUser.phone || ''}
          onChange={handleChangePhone}
        />
      </div>
      <div className="row">
        <LabelHeading text="Nơi cư trú" />
      </div>
      <div className="row">
        <TextField
          id="province-residence"
          label="Tỉnh/Thành phố"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          select
          value={provinceResidence}
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
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          select
          value={districtResidence}
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
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          select
          value={wardResidence}
          onChange={handleChangeWardResidence}
        >
          {wardResidences.map((wardResidence) => (
            <MenuItem key={wardResidence.code} value={wardResidence.code}>
              {wardResidence.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="detail-address-residence"
          label="Số nhà, phố, tổ dân phố/thôn/đội"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
        />
      </div>
      <div className="row">
        <LabelHeading text="Địa điểm di chuyển" />
      </div>
      <div className="row">
        <BasicDatePicker />
        <BasicTimePicker />
        <TextField
          id="detail-address"
          label="Số nhà, phố, tổ dân phố/thôn/đội"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/3) - 1.33rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
        />
      </div>
      <div className="row">
        <TextField
          id="province-residence"
          label="Tỉnh/Thành phố"
          sx={{
            marginBottom: '1rem',
            marginTop: '1rem',
            minWidth: 'calc(calc(100%/3) - 1.333rem)',
          }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          select
          value={province}
          onChange={handleChangeProvince}
        >
          {provinces.map((province) => (
            <MenuItem key={province.code} value={province.code}>
              {province.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="district-residence"
          label="Quận/Huyện"
          sx={{
            marginBottom: '1rem',
            marginTop: '1rem',
            minWidth: 'calc(calc(100%/3) - 1.333rem)',
          }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          select
          value={district}
          onChange={handleChangeDistrict}
        >
          {districts.map((district) => (
            <MenuItem key={district.code} value={district.code}>
              {district.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="ward-residence"
          label="Phường/Xã"
          sx={{
            marginBottom: '1rem',
            marginTop: '1rem',
            minWidth: 'calc(calc(100%/3) - 1.333rem)',
          }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          select
          value={ward}
          onChange={handleChangeWard}
        >
          {wards.map((ward) => (
            <MenuItem key={ward.code} value={ward.code}>
              {ward.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          sx={{
            fontSize: '1.4rem',
            marginTop: '2rem',
            textAlign: 'center',
            textTransform: 'initial',
            padding: '1rem 3rem',
            borderRadius: '2rem',
          }}
          variant="contained"
          startIcon={<SendIcon />}
        >
          Gửi tờ khai
        </Button>
      </div>
    </>
  )
}

export default MovingDeclaration
