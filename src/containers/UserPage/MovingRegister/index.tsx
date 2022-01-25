import { TextField } from '@mui/material'
import LabelHeading from 'components/LabelHeading'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useRef, useState } from 'react'
import DateRegister from 'components/DateRegister'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

function MovingRegister() {
  const userAPI = 'https://dbkhaibaoyte.herokuapp.com/user'
  const movingRegisterAPI = 'https://dbkhaibaoyte.herokuapp.com/moving_register'

  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidences, setWardResidences] = useState<any[]>([])

  const [dayMY, setDayMY] = useState<any>(null)
  const [specificAddress, setSpecificAddress] = useState('')

  const [province, setProvince] = useState('')
  const [provinces, setProvinces] = useState<any[]>([])
  const [district, setDistrict] = useState('')
  const [districts, setDistricts] = useState<any[]>([])
  const [ward, setWard] = useState('')
  const [wards, setWards] = useState<any[]>([])

  // const [showNoti, setShowNoti] = useState(false)

  const [error, setError] = useState({
    name: false,
    yearOfBirth: false,
    sex: false,
    email: false,
    phone: false,
  })

  let time = ''

  const sexes = [
    {
      value: 1,
      label: 'Nam',
    },
    {
      value: 2,
      label: 'Nữ',
    },
    {
      value: 3,
      label: 'Khác',
    },
  ]

  // Lấy ra id tài khoản lưu ở local storage
  const userId = localStorage.getItem('userId')

  // Lấy ra thông tin tài khoản

  interface IUser {
    id?: number
    fullName?: string
    yearOfBirth?: number
    gender?: number
    email?: string
    phone?: string
    specificAddress?: string
    province?: number
    district?: number
    ward?: number
  }

  const [currentUser, setCurrentUser] = useState<IUser>({})

  useEffect(() => {
    fetch(`${userAPI}/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        delete user.password
        delete user.createdDate
        delete user.provinceName
        delete user.districtName
        delete user.wardName
        setCurrentUser(user)
      })
  }, [])

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

  useEffect(() => {
    provinceResidences.forEach((item) => {
      if (item.code === currentUser.province) {
        setDistrictResidences(item.districts)
      }
    })
  })

  useEffect(() => {
    districtResidences.forEach((item) => {
      if (item.code === currentUser.district) {
        setWardResidences(item.wards)
      }
    })
  })

  // Hàm xử lý thay đổi tên
  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, name: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, fullName: e.target.value }
    })
  }

  // Hàm thay đổi năm sinh
  function handleChangeYOB(e: React.ChangeEvent<HTMLInputElement>) {
    if (
      !e.target.value ||
      parseInt(e.target.value) < 1900 ||
      parseInt(e.target.value) > new Date().getFullYear()
    ) {
      setError((prev) => ({ ...prev, yearOfBirth: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, yearOfBirth: parseInt(e.target.value) }
    })
  }

  // Hàm thay đổi email
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, email: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, email: e.target.value }
    })
  }
  // Hàm thay đổi số điện thoại
  function handleChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, phone: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, phone: e.target.value }
    })
  }

  // Hàm thay đổi địa chỉ cụ thể
  function handleChangeSpecificAddressResidence(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, specificAddress: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, specificAddress: e.target.value }
    })
  }
  // Hàm thay đổi địa chỉ cụ thể

  function handleChangeSpecificAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setSpecificAddress(e.target.value)
  }

  // Hàm xử lý chọn giới tính
  function handleChangeSex(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, gender: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, gender: parseInt(e.target.value) }
    })
  }

  // Hàm xử lý chọn tỉnh/thành phố cư trú
  function handleChangeProvinceResidence(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, province: true }))
    }
    setCurrentUser((prev) => {
      setWardResidences([])
      return { ...prev, province: parseInt(e.target.value), district: 0, ward: 0 }
    })
  }

  // Hàm xử lý chọn quận/huyện cư trú
  function handleChangeDistrictResidence(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, district: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, district: parseInt(e.target.value) }
    })
  }

  // Hàm xử lý chọn phường/xã cư trú
  function handleChangeWardResidence(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, ward: true }))
    }
    setCurrentUser((prev) => {
      return { ...prev, ward: parseInt(e.target.value) }
    })
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

  if (dayMY) {
    console.log(dayMY.getDate())
    console.log(dayMY.getMonth() + 1)
    console.log(dayMY.getFullYear())
    time = `${dayMY.getDate() < 10 ? '0' + dayMY.getDate() : dayMY.getDate()}/${
      dayMY.getMonth() + 1 < 10 ? '0' + (dayMY.getMonth() + 1) : dayMY.getMonth() + 1
    }/${dayMY.getFullYear()}`
  }

  function handleSubmitForm() {
    // Validation dữ liệu

    let provinceName = ''
    provinces.forEach((element) => {
      if (element.code === province) {
        provinceName = element.name
      }
    })
    let districtName = ''
    districts.forEach((element) => {
      if (element.code === district) {
        districtName = element.name
      }
    })
    let wardName = ''
    wards.forEach((element) => {
      if (element.code === ward) {
        wardName = element.name
      }
    })
    let provinceResidenceName = ''
    provinceResidences.forEach((element) => {
      if (element.code === currentUser.province) {
        provinceResidenceName = element.name
      }
    })
    let districtResidenceName = ''
    districtResidences.forEach((element) => {
      if (element.code === currentUser.district) {
        districtResidenceName = element.name
      }
    })
    let wardResidenceName = ''
    wardResidences.forEach((element) => {
      if (element.code === currentUser.ward) {
        wardResidenceName = element.name
      }
    })
    // if (error) {
    //   alert('Lỗi')
    // } else {
    const data = {
      ...currentUser,
      provinceResidence: currentUser.province,
      districtResidence: currentUser.district,
      wardResidence: currentUser.ward,
      specificAddressResidence: currentUser.specificAddress,
      userId: currentUser.id,
      time: time,

      province: province,
      district: district,
      ward: ward,
      specificAddress: specificAddress,
      provinceName: provinceName,
      districtName: districtName,
      wardName: wardName,
      provinceResidenceName: provinceResidenceName,
      districtResidenceName: districtResidenceName,
      wardResidenceName: wardResidenceName,
      status: 0,
    }
    // Xóa trường id không cần thiết
    delete data.id
    console.log('submit', data)
    // hiển thị thông báo
    // setShowNoti(true)
    console.log('error', error)
    // Call api
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    fetch(movingRegisterAPI, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log('Lỗi' + err))
  }

  return (
    <>
      <div className="row">
        <LabelHeading text="Thông tin cá nhân" />
      </div>
      <TextField
        autoComplete="off"
        ref={nameRef}
        id="name"
        label="Họ và tên"
        variant="outlined"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
          fontSize: '3rem',
        }}
        InputProps={{ style: { fontSize: '1.2rem' } }}
        InputLabelProps={{ style: { fontSize: '1.2rem' } }}
        required
        fullWidth
        value={currentUser.fullName || ''}
        onChange={handleChangeName}
        error={
          currentUser.fullName &&
          /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{3,}$/g.test(
            currentUser.fullName
          )
            ? false
            : true
        }
        helperText={
          !currentUser.fullName
            ? 'Bạn chưa nhập họ tên'
            : /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{3,}$/g.test(
                currentUser.fullName
              )
            ? ''
            : 'Họ tên không hợp lệ'
        }
      />
      <div className="row">
        <TextField
          autoComplete="off"
          id="year-of-birth"
          label="Năm sinh"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          value={currentUser.yearOfBirth || ''}
          onChange={handleChangeYOB}
          error={
            currentUser.yearOfBirth &&
            currentUser.yearOfBirth <= new Date().getFullYear() &&
            currentUser.yearOfBirth >= 1900
              ? false
              : true
          }
          helperText={
            !currentUser.yearOfBirth
              ? 'Bạn chưa nhập năm sinh'
              : currentUser.yearOfBirth > new Date().getFullYear()
              ? 'Năm sinh không thể lớn hơn năm hiện tại'
              : currentUser.yearOfBirth < 1900
              ? 'Năm sinh không hợp lệ'
              : ''
          }
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
          error={currentUser.gender ? false : true}
          helperText={currentUser.gender ? '' : 'Bạn chưa chọn giới tính'}
        >
          {sexes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

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
          error={
            currentUser.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(currentUser.email)
              ? false
              : true
          }
          helperText={
            !currentUser.email
              ? 'Bạn chưa nhập email'
              : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(currentUser.email)
              ? ''
              : 'email không hợp lệ'
          }
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
          error={
            currentUser.phone && /((09|03|07|08|05)+([0-9]{8})\b)/i.test(currentUser.phone)
              ? false
              : true
          }
          helperText={
            !currentUser.phone
              ? 'Bạn chưa nhập số điện thoại'
              : /((09|03|07|08|05)+([0-9]{8})\b)/i.test(currentUser.phone)
              ? ''
              : 'số điện thoại không hợp lệ'
          }
        />
      </div>
      <div className="row">
        <LabelHeading text="Nơi ở hiện tại" />
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
          value={currentUser.province || ''}
          onChange={handleChangeProvinceResidence}
          error={currentUser.province ? false : true}
          helperText={currentUser.province ? '' : 'Bạn chưa chọn tỉnh/thành phố'}
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
          value={currentUser.district || ''}
          onChange={handleChangeDistrictResidence}
          error={currentUser.district ? false : true}
          helperText={currentUser.district ? '' : 'Bạn chưa chọn quận/huyện'}
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
          value={currentUser.ward || ''}
          onChange={handleChangeWardResidence}
          error={currentUser.ward ? false : true}
          helperText={currentUser.ward ? '' : 'Bạn chưa chọn phường/xã'}
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
          value={currentUser.specificAddress || ''}
          onChange={handleChangeSpecificAddressResidence}
          error={currentUser.specificAddress ? false : true}
          helperText={currentUser.specificAddress ? '' : 'Vui lòng nhập trường này'}
        />
      </div>
      <div className="row">
        <LabelHeading text="Nơi di chuyển đến" />
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
          error={province ? false : true}
          helperText={province ? '' : 'Bạn chưa chọn tỉnh/thành phố di chuyển'}
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
          error={district ? false : true}
          helperText={district ? '' : 'Bạn chưa chọn quận/huyện di chuyển'}
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
          error={ward ? false : true}
          helperText={ward ? '' : 'Bạn chưa chọn phường/xã di chuyển'}
        >
          {wards.map((ward) => (
            <MenuItem key={ward.code} value={ward.code}>
              {ward.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="row">
        <DateRegister value={dayMY} setValue={setDayMY} />
        <TextField
          id="detail-address"
          label="Số nhà, phố, tổ dân phố/thôn/đội"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.2rem' } }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          value={specificAddress}
          onChange={handleChangeSpecificAddress}
          error={specificAddress ? false : true}
          helperText={specificAddress ? '' : 'Vui lòng điền trường này'}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={handleSubmitForm}
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
          ĐĂNG KÝ
        </Button>
      </div>
    </>
  )
}

export default MovingRegister
