import { TextField } from '@mui/material'
import LabelHeading from 'components/LabelHeading'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useRef, useState } from 'react'
import DateRegister from 'components/DateRegister'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Noti from 'components/Noti'

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

  const [showNoti, setShowNoti] = useState(false)
  const [payloadNoti, setPayloadNoti] = useState({
    status: 'success',
    text: '',
  })

  const [error, setError] = useState({
    name: { val: false, code: 0 },
    yearOfBirth: { val: false, code: 0 },
    sex: false,
    email: { val: false, code: 0 },
    phone: { val: false, code: 0 },
    provinceResidence: false,
    districtResidence: false,
    wardResidence: false,
    specificAddressResidence: false,
    date: { val: false, code: 0 },
    province: false,
    district: false,
    ward: false,
    specificAddress: false,
  })

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

  let date = ''

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
        delete user.createdAt
        delete user.provinceName
        setCurrentUser(user)
      })
  }, [])

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
      setError((prev) => ({ ...prev, citizenIdentification: { val: true, code: 1 } }))
    } else if (
      e.target.value.match(/^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{3,}$/g) ===
      null
    ) {
      setError((prev) => ({ ...prev, citizenIdentification: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, citizenIdentification: { val: false, code: 0 } }))
    }
    setCurrentUser((prev) => {
      return { ...prev, citizenIdentification: e.target.value }
    })
  }

  // Hàm thay đổi năm sinh
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
    setCurrentUser((prev) => {
      return { ...prev, yearOfBirth: parseInt(e.target.value) }
    })
  }

  // Hàm thay đổi email
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, email: { val: true, code: 1 } }))
    } else if (e.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) === null) {
      setError((prev) => ({ ...prev, email: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, email: { val: false, code: 0 } }))
    }
    setCurrentUser((prev) => {
      return { ...prev, email: e.target.value }
    })
  }
  // Hàm thay đổi số điện thoại
  function handleChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, phone: { val: true, code: 1 } }))
    } else if (e.target.value.match(/((09|03|07|08|05)+([0-9]{8})\b)/i) === null) {
      setError((prev) => ({ ...prev, phone: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, phone: { val: false, code: 0 } }))
    }
    setCurrentUser((prev) => {
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
    setCurrentUser((prev) => {
      return { ...prev, specificAddress: e.target.value }
    })
  }
  // Hàm thay đổi nơi di chuyển đến

  function handleChangeSpecificAddress(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, specificAddress: true }))
    } else {
      setError((prev) => ({ ...prev, specificAddress: false }))
    }
    setSpecificAddress(e.target.value)
  }

  // Hàm xử lý chọn giới tính
  function handleChangeSex(e: React.ChangeEvent<HTMLInputElement>) {
    setError((prev) => ({ ...prev, sex: false }))
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
    setError((prev) => ({ ...prev, province: false }))
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
    setError((prev) => ({ ...prev, district: false }))
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
    setError((prev) => ({ ...prev, ward: false }))
    setWard(e.target.value)
  }

  function handleSubmitForm() {
    if (!currentUser.fullName) {
      setError((prev) => {
        return { ...prev, name: { val: true, code: 1 } }
      })
    }
    if (!currentUser.yearOfBirth) {
      setError((prev) => {
        return { ...prev, yearOfBirth: { val: true, code: 1 } }
      })
    }
    if (!currentUser.gender) {
      setError((prev) => {
        return { ...prev, sex: true }
      })
    }

    if (!currentUser.email) {
      setError((prev) => {
        return { ...prev, email: { val: true, code: 1 } }
      })
    }
    if (!currentUser.phone) {
      setError((prev) => {
        return { ...prev, phone: { val: true, code: 1 } }
      })
    }
    if (!currentUser.province) {
      setError((prev) => {
        return { ...prev, provinceResidence: true }
      })
    }
    if (!currentUser.district) {
      setError((prev) => {
        return { ...prev, districtResidence: true }
      })
    }
    if (!currentUser.ward) {
      setError((prev) => {
        return { ...prev, wardResidence: true }
      })
    }
    if (!currentUser.specificAddress) {
      setError((prev) => {
        return { ...prev, specificAddressResidence: true }
      })
    }
    if (!dayMY) {
      setError((prev) => {
        return { ...prev, date: { val: true, code: 1 } }
      })
    }

    if (!province) {
      setError((prev) => {
        return { ...prev, province: true }
      })
    }
    if (!district) {
      setError((prev) => {
        return { ...prev, district: true }
      })
    }
    if (!ward) {
      setError((prev) => {
        return { ...prev, ward: true }
      })
    }
    if (!specificAddress) {
      setError((prev) => {
        return { ...prev, specificAddress: true }
      })
    }

    // Check trường hợp tất cả các field có lỗi hay không? nếu có, thì hiển thị thông báo lỗi. nếu không, thì hiển thị thông báo thêm mới tờ khai thành công

    const conditions = []
    conditions.push(error.name.val)
    conditions.push(error.yearOfBirth.val)
    conditions.push(error.sex)
    conditions.push(error.email.val)
    conditions.push(error.phone.val)
    conditions.push(error.provinceResidence)
    conditions.push(error.districtResidence)
    conditions.push(error.wardResidence)
    conditions.push(error.specificAddressResidence)
    conditions.push(error.date.val)
    conditions.push(error.province)
    conditions.push(error.district)
    conditions.push(error.ward)
    conditions.push(error.specificAddress)

    const check = conditions.some((item) => {
      return item
    })

    // Hiên thị thông báo lỗi, thêm tờ khai thất bại
    if (
      check === true ||
      !currentUser.fullName ||
      !currentUser.yearOfBirth ||
      !currentUser.gender ||
      !currentUser.email ||
      !currentUser.phone ||
      !currentUser.province ||
      !currentUser.district ||
      !currentUser.ward ||
      !currentUser.specificAddress ||
      !dayMY ||
      !province ||
      !district ||
      !ward ||
      !specificAddress
    ) {
      setPayloadNoti({
        status: 'error',
        text: 'Vui lòng nhập đủ thông tin',
      })
      setShowNoti(true)
    } else {
      if (dayMY) {
        date = `${dayMY.getDate() < 10 ? '0' + dayMY.getDate() : dayMY.getDate()}/${
          dayMY.getMonth() + 1 < 10 ? '0' + (dayMY.getMonth() + 1) : dayMY.getMonth() + 1
        }/${dayMY.getFullYear()}`
      }

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
      const data = {
        ...currentUser,
        provinceResidence: currentUser.province,
        districtResidence: currentUser.district,
        wardResidence: currentUser.ward,
        specificAddressResidence: currentUser.specificAddress,
        userId: currentUser.id,
        time: date,
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
      console.log('error', error)
      // Call api
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      }
      fetch(movingRegisterAPI, options)
        .then((res) => res.json())
        .then((data) => {
          setPayloadNoti({
            status: 'success',
            text: 'Khai báo di chuyển thành công',
          })
          setShowNoti(true)
        })
        .catch((err) => {
          console.log('Lỗi' + err)
          setPayloadNoti({
            status: 'error',
            text: 'Khai báo di chuyển thất bại. Hệ thống bị lỗi',
          })
          setShowNoti(true)
        })
      setProvince('')
      setDistrict('')
      setWard('')
      setSpecificAddress('')
      setDayMY('')
    }
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
        error={error.name.val}
        helperText={
          error.name.val === true && error.name.code === 1
            ? 'Bạn chưa nhập tên'
            : error.name.val === true && error.name.code === 2
            ? 'Tên không hợp lệ'
            : ''
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
          error={error.sex}
          helperText={error.sex === false ? '' : 'Bạn chưa chọn giới tính'}
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
          onChange={handleChangeEmail}
          value={currentUser.email || ''}
          error={error.email.val}
          helperText={
            error.email.val === true && error.email.code === 1
              ? 'Bạn chưa nhập email'
              : error.email.val === true && error.email.code === 2
              ? 'email không hợp lệ'
              : ''
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
          error={error.phone.val}
          helperText={
            error.phone.val === true && error.phone.code === 1
              ? 'Bạn chưa nhập số điện thoại'
              : error.phone.val === true && error.phone.code === 2
              ? 'Số điện thoại không hợp lệ'
              : ''
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
          error={error.provinceResidence}
          helperText={error.provinceResidence === false ? '' : 'Bạn chưa chọn tỉnh/thành phố'}
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
          error={error.wardResidence}
          helperText={error.wardResidence === false ? '' : 'Bạn chưa chọn phường/xã'}
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
          error={error.specificAddressResidence}
          helperText={error.specificAddressResidence === false ? '' : 'Vui lòng nhập trường này'}
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
          error={error.province}
          helperText={error.province === false ? '' : 'Bạn chưa chọn tỉnh/thành phố di chuyển'}
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
          error={error.district}
          helperText={error.district === false ? '' : 'Bạn chưa chọn quận/huyện di chuyển'}
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
          error={error.ward}
          helperText={error.ward === false ? '' : 'Bạn chưa chọn phường/xã di chuyển'}
        >
          {wards.map((ward) => (
            <MenuItem key={ward.code} value={ward.code}>
              {ward.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="row">
        <DateRegister error={error} setError={setError} value={dayMY} setValue={setDayMY} />

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
          error={error.specificAddress}
          helperText={error.specificAddress === false ? '' : 'Vui lòng điền trường này'}
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
      <Noti payload={payloadNoti} showNoti={showNoti} setShowNoti={setShowNoti} />
    </>
  )
}

export default MovingRegister
