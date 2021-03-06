import { TextField } from '@mui/material'
import LabelHeading from 'components/LabelHeading'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState, useRef } from 'react'
import BasicDatePicker from 'components/BasicDatePicker'
import BasicTimePicker from 'components/BasicTimePicker'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Noti from 'components/Noti'
import './MovingDeclaration.css'

function MovingDeclaration() {
  const userAPI = 'https://dbkhaibaoyte.herokuapp.com/user/'
  const movingDeclarationAPI = 'https://dbkhaibaoyte.herokuapp.com/moving_declaration'

  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidences, setWardResidences] = useState<any[]>([])

  const [dayMY, setDayMY] = useState<any>(null)
  const [hourMS, setHourMS] = useState<any>(null)

  const [province, setProvince] = useState('')
  const [provinces, setProvinces] = useState<any[]>([])
  const [district, setDistrict] = useState('')
  const [districts, setDistricts] = useState<any[]>([])
  const [ward, setWard] = useState('')
  const [wards, setWards] = useState<any[]>([])
  const [specificAddress, setSpecificAddress] = useState('')

  const [showNoti, setShowNoti] = useState(false)

  const [payloadNoti, setPayloadNoti] = useState({
    status: 'success',
    text: '',
  })

  const [error, setError] = useState({
    name: false,
    yearOfBirth: { val: false, code: 0 },
    sex: false,
    citizenIdentification: { val: false, code: 0 },
    email: { val: false, code: 0 },
    phone: { val: false, code: 0 },
    provinceResidence: false,
    districtResidence: false,
    wardResidence: false,
    specificAddressResidence: false,
    date: { val: false, code: 0 },
    time: { val: false, code: 0 },
    province: false,
    district: false,
    ward: false,
    specificAddress: false,
  })

  let time = ''

  const sexs = [
    {
      value: 1,
      label: 'Nam',
    },
    {
      value: 2,
      label: 'N???',
    },
    {
      value: 3,
      label: 'Kh??c',
    },
  ]

  // L???y ra id t??i kho???n l??u ??? local storage
  const userId = localStorage.getItem('userId')

  // L???y ra th??ng tin t??i kho???n

  interface IUser {
    id?: number
    fullName?: string
    yearOfBirth?: number
    gender?: number
    citizenIdentification?: string
    email?: string
    phone?: string
    specificAddress?: string
    province?: number
    district?: number
    ward?: number
  }

  const [currentUser, setCurrentUser] = useState<IUser>({})

  // H??m g???i API l???y ra th??ng tin t??i kho???n ??ang ????ng nh???p
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
      .catch((error) => {
        setPayloadNoti({
          status: 'error',
          text: 'Kh??ng l???y ???????c th??ng tin c???a t??i kho???n',
        })
        setShowNoti(true)
      })
  }, [])

  // H??m g???i API l???y ra danh s??ch t???nh
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((res) => res.json())
      .then((data) => {
        setProvinceResidences(data)
        setProvinces(data)
      })
  }, [])

  // H??m l???y ra danh s??ch qu???n c?? tr??
  useEffect(() => {
    provinceResidences.forEach((item) => {
      if (item.code === currentUser.province) {
        setDistrictResidences(item.districts)
      }
    })
  })

  // H??m l???y ra danh s??ch x?? c?? tr??
  useEffect(() => {
    districtResidences.forEach((item) => {
      if (item.code === currentUser.district) {
        setWardResidences(item.wards)
      }
    })
  })

  // H??m x??? l?? thay ?????i t??n
  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    // N???u r???ng th?? set l???i ????? check validate
    if (!e.target.value) {
      setError((prev) => ({ ...prev, name: true }))
    } else {
      setError((prev) => ({ ...prev, name: false }))
    }
    // two way binding
    setCurrentUser((prev) => {
      return { ...prev, fullName: e.target.value }
    })
  }

  // H??m thay ?????i n??m sinh
  function handleChangeYOB(e: React.ChangeEvent<HTMLInputElement>) {
    // validate
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
    // two way binding
    setCurrentUser((prev) => {
      return { ...prev, yearOfBirth: parseInt(e.target.value) }
    })
  }

  // H??m x??? l?? ch???n gi???i t??nh
  function handleChangeSex(e: React.ChangeEvent<HTMLInputElement>) {
    setError((prev) => ({ ...prev, sex: false }))
    setCurrentUser((prev) => {
      return { ...prev, gender: parseInt(e.target.value) }
    })
  }

  // H??m thay ?????i CMT
  function handleChangeCitiIden(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, citizenIdentification: { val: true, code: 1 } }))
    } else if (e.target.value.match(/^[a-zA-Z0-9_.-]*$/) === null) {
      setError((prev) => ({ ...prev, citizenIdentification: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, citizenIdentification: { val: false, code: 0 } }))
    }
    setCurrentUser((prev) => {
      return { ...prev, citizenIdentification: e.target.value }
    })
  }
  // H??m thay ?????i email
  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, email: { val: true, code: 1 } }))
    } else if (e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
      setError((prev) => ({ ...prev, email: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, email: { val: false, code: 0 } }))
    }
    setCurrentUser((prev) => {
      return { ...prev, email: e.target.value }
    })
  }
  // H??m thay ?????i s??? ??i???n tho???i
  function handleChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, phone: { val: true, code: 1 } }))
    } else if (e.target.value.match(/^\d+$/) === null) {
      setError((prev) => ({ ...prev, phone: { val: true, code: 2 } }))
    } else {
      setError((prev) => ({ ...prev, phone: { val: false, code: 0 } }))
    }
    setCurrentUser((prev) => {
      return { ...prev, phone: e.target.value }
    })
  }

  // H??m x??? l?? ch???n t???nh/th??nh ph??? c?? tr??
  function handleChangeProvinceResidence(e: React.ChangeEvent<HTMLInputElement>) {
    setError((prev) => ({ ...prev, provinceResidence: false }))
    setCurrentUser((prev) => {
      setWardResidences([])
      return { ...prev, province: parseInt(e.target.value), district: 0, ward: 0 }
    })
  }

  // H??m x??? l?? ch???n qu???n/huy???n c?? tr??
  function handleChangeDistrictResidence(e: React.ChangeEvent<HTMLInputElement>) {
    setError((prev) => ({ ...prev, districtResidence: false }))
    setCurrentUser((prev) => {
      return { ...prev, district: parseInt(e.target.value) }
    })
  }

  // H??m x??? l?? ch???n ph?????ng/x?? c?? tr??
  function handleChangeWardResidence(e: React.ChangeEvent<HTMLInputElement>) {
    setError((prev) => ({ ...prev, wardResidence: false }))
    setCurrentUser((prev) => {
      return { ...prev, ward: parseInt(e.target.value) }
    })
  }

  // H??m thay ?????i ?????a ch??? c?? tr?? c??? th???
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

  // H??m x??? l?? ch???n t???nh/th??nh ph??? di chuy???n
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

  // H??m x??? l?? ch???n qu???n/huy???n di chuy???n
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

  // H??m x??? l?? ch???n ph?????ng/x?? di chuy???n
  function handleChangeWard(e: React.ChangeEvent<HTMLInputElement>) {
    setError((prev) => ({ ...prev, ward: false }))
    setWard(e.target.value)
  }

  // H??m thay ?????i ?????a ch??? di chuy???n c??? th???
  function handleChangeSpecificAddress(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError((prev) => ({ ...prev, specificAddress: true }))
    } else {
      setError((prev) => ({ ...prev, specificAddress: false }))
    }
    setSpecificAddress(e.target.value)
  }

  // H??m x??? l?? g???i t??? khai di chuy???n
  function handleSubmitForm() {
    // Validation d??? li???u l???n ?????u n???u kh??ng nh???p g?? v?? ???n lu??n submit
    if (!currentUser.fullName) {
      setError((prev) => {
        return { ...prev, name: true }
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
    if (!currentUser.citizenIdentification) {
      setError((prev) => {
        return { ...prev, citizenIdentification: { val: true, code: 1 } }
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
    if (!hourMS) {
      setError((prev) => {
        return { ...prev, time: { val: true, code: 1 } }
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

    // Check tr?????ng h???p t???t c??? c??c field c?? l???i hay kh??ng? n???u c??, th?? hi???n th??? th??ng b??o l???i. n???u kh??ng, th?? hi???n th??? th??ng b??o th??m m???i t??? khai th??nh c??ng

    const conditions = []
    conditions.push(error.name)
    conditions.push(error.yearOfBirth.val)
    conditions.push(error.sex)
    conditions.push(error.citizenIdentification.val)
    conditions.push(error.email.val)
    conditions.push(error.phone.val)
    conditions.push(error.provinceResidence)
    conditions.push(error.districtResidence)
    conditions.push(error.wardResidence)
    conditions.push(error.specificAddressResidence)
    conditions.push(error.date.val)
    conditions.push(error.time.val)
    conditions.push(error.province)
    conditions.push(error.district)
    conditions.push(error.ward)
    conditions.push(error.specificAddress)

    const check = conditions.some((item) => {
      return item
    })

    // Hi??n th??? th??ng b??o l???i, th??m t??? khai th???t b???i
    if (
      check === true ||
      !currentUser.fullName ||
      !currentUser.yearOfBirth ||
      !currentUser.gender ||
      !currentUser.citizenIdentification ||
      !currentUser.email ||
      !currentUser.phone ||
      !currentUser.province ||
      !currentUser.district ||
      !currentUser.ward ||
      !currentUser.specificAddress ||
      !dayMY ||
      !hourMS ||
      !province ||
      !district ||
      !ward ||
      !specificAddress
    ) {
      setPayloadNoti({
        status: 'error',
        text: 'B???n ch??a nh???p ?????y ????? c??c th??ng tin c???n thi???t',
      })
      setShowNoti(true)
    }
    // th??m t??? khai th??nh c??ng
    else {
      // L??u bi???n time c?? ?????nh d???ng MM/dd/yyyy hh:mm (a|p)m
      if (dayMY && hourMS) {
        time = `${
          dayMY.getMonth() + 1 < 10 ? '0' + (dayMY.getMonth() + 1) : dayMY.getMonth() + 1
        }/${
          dayMY.getDate() < 10 ? '0' + dayMY.getDate() : dayMY.getDate()
        }/${dayMY.getFullYear()} ${
          hourMS.getHours() < 10 ? '0' + hourMS.getHours() : hourMS.getHours()
        }:${hourMS.getMinutes() < 10 ? '0' + hourMS.getMinutes() : hourMS.getMinutes()}`
      }

      // Bi???n provinceName l??u cho admin s??? d???ng
      let provinceName = ''
      provinces.forEach((element) => {
        if (element.code === province) {
          provinceName = element.name
        }
      })

      // data post
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
      }
      // X??a tr?????ng id kh??ng c???n thi???t
      delete data.id
      // Call api
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      }
      fetch(movingDeclarationAPI, options)
        .then((res) => res.json())
        .then((data) => {
          setPayloadNoti({
            status: 'success',
            text: 'Khai b??o di chuy???n th??nh c??ng',
          })
          setShowNoti(true)
          // Sau khi khai b??o di chuy???n th??nh c??ng th?? x??a h???t th??ng tin khai b??o di chuy???n
          setSpecificAddress('')
          setProvince('')
          setDistrict('')
          setDistricts([])
          setWard('')
          setWards([])
          setDayMY(null)
          setHourMS(null)
        })
        .catch((err) => {
          // console.log('L???i' + err)
          setPayloadNoti({
            status: 'error',
            text: 'Khai b??o di chuy???n th???t b???i. H??? th???ng b??? l???i',
          })
          setShowNoti(true)
        })
    }
  }

  return (
    <>
      <div className="row">
        <LabelHeading text="Th??ng tin c?? nh??n" />
      </div>
      <TextField
        autoComplete="off"
        id="name"
        label="H??? v?? t??n"
        variant="outlined"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
        fullWidth
        required
        value={currentUser.fullName || ''}
        onChange={handleChangeName}
        error={error.name}
        helperText={error.name === false ? '' : 'B???n ch??a nh???p h??? t??n'}
      />
      <div className="row">
        <TextField
          type="number"
          autoComplete="off"
          className="year-of-birth"
          variant="outlined"
          label="N??m sinh"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          value={currentUser.yearOfBirth || ''}
          onChange={handleChangeYOB}
          error={error.yearOfBirth.val}
          helperText={
            error.yearOfBirth.val === true && error.yearOfBirth.code === 1
              ? 'B???n ch??a nh???p n??m sinh'
              : error.yearOfBirth.val === true && error.yearOfBirth.code === 2
              ? 'N??m sinh kh??ng th??? nh??? h??n 1900'
              : error.yearOfBirth.val === true && error.yearOfBirth.code === 3
              ? 'N??m sinh kh??ng th??? l???n h??n n??m hi???n t???i'
              : ''
          }
        />
        <TextField
          className="sex"
          label="Gi???i t??nh"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          select
          value={currentUser.gender || ''}
          onChange={handleChangeSex}
          error={error.sex}
          helperText={error.sex === false ? '' : 'B???n ch??a ch???n gi???i t??nh'}
        >
          {sexs.map((option) => (
            <MenuItem sx={{ fontSize: '1.4rem' }} key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <TextField
        autoComplete="off"
        id="citizen-identification"
        label="S??? h??? chi???u/CMND/CCCD"
        variant="outlined"
        sx={{ marginBottom: '1rem', marginTop: '1rem' }}
        size="medium"
        InputProps={{ style: { fontSize: '1.4rem' } }}
        InputLabelProps={{ style: { fontSize: '1.4rem' } }}
        required
        fullWidth
        value={currentUser.citizenIdentification || ''}
        onChange={handleChangeCitiIden}
        error={error.citizenIdentification.val}
        helperText={
          error.citizenIdentification.val === true && error.citizenIdentification.code === 1
            ? 'B???n ch??a nh???p s??? h??? chi???u/CMND/CCCD'
            : error.citizenIdentification.val === true && error.citizenIdentification.code === 2
            ? 'Ch??? ???????c ch???a ch??? v?? s???'
            : ''
        }
      />
      <div className="row">
        <TextField
          autoComplete="nope"
          className="email"
          label="Email"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          value={currentUser.email || ''}
          onChange={handleChangeEmail}
          error={error.email.val}
          helperText={
            error.email.val === true && error.email.code === 1
              ? 'B???n ch??a nh???p email'
              : error.email.val === true && error.email.code === 2
              ? 'Sai ?????nh d???ng email'
              : ''
          }
        />
        <TextField
          autoComplete="off"
          className="phone"
          label="S??? ??i???n tho???i"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/2) - 1rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          value={currentUser.phone || ''}
          onChange={handleChangePhone}
          error={error.phone.val}
          helperText={
            error.phone.val === true && error.phone.code === 1
              ? 'B???n ch??a nh???p s??? ??i???n tho???i'
              : error.phone.val === true && error.phone.code === 2
              ? 'S??? ??i???n tho???i ch??? ???????c ch???a k?? t??? l?? s???'
              : ''
          }
        />
      </div>
      <div className="row">
        <LabelHeading text="N??i c?? tr??" />
      </div>
      <div className="row">
        <TextField
          className="province-residence"
          label="T???nh/Th??nh ph???"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          select
          value={currentUser.province || ''}
          onChange={handleChangeProvinceResidence}
          error={error.provinceResidence}
          helperText={error.provinceResidence === false ? '' : 'B???n ch??a ch???n t???nh c?? tr??'}
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
          className="district-residence"
          label="Qu???n/Huy???n"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          select
          value={currentUser.district || ''}
          onChange={handleChangeDistrictResidence}
          error={error.districtResidence}
          helperText={error.districtResidence === false ? '' : 'B???n ch??a ch???n huy???n c?? tr??'}
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
          className="ward-residence"
          label="Ph?????ng/X??"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          select
          value={currentUser.ward || ''}
          onChange={handleChangeWardResidence}
          error={error.wardResidence}
          helperText={error.wardResidence === false ? '' : 'B???n ch??a ch???n x?? c?? tr??'}
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
        <TextField
          autoComplete="off"
          className="detail-address-residence"
          label="S??? nh??, ph???, t??? d??n ph???/th??n/?????i"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/4) - 1.5rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          value={currentUser.specificAddress || ''}
          onChange={handleChangeSpecificAddressResidence}
          error={error.specificAddressResidence}
          helperText={
            error.specificAddressResidence === false ? '' : 'B???n ch??a nh???p ?????a ch??? c?? tr?? c??? th???'
          }
        />
      </div>
      <div className="row">
        <LabelHeading text="?????a ??i???m di chuy???n" />
      </div>
      <div className="row">
        <BasicDatePicker error={error} setError={setError} value={dayMY} setValue={setDayMY} />
        <BasicTimePicker error={error} setError={setError} value={hourMS} setValue={setHourMS} />
        <TextField
          autoComplete="off"
          className="detail-address"
          label="S??? nh??, ph???, t??? d??n ph???/th??n/?????i"
          sx={{ marginBottom: '1rem', marginTop: '1rem', minWidth: 'calc(calc(100%/3) - 1.33rem)' }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          value={specificAddress}
          onChange={handleChangeSpecificAddress}
          error={error.specificAddress}
          helperText={
            error.specificAddress === false ? '' : 'B???n ch??a nh???p ?????a ch??? di chuy???n c??? th???'
          }
        />
      </div>
      <div className="row">
        <TextField
          className="province"
          label="T???nh/Th??nh ph???"
          sx={{
            marginBottom: '1rem',
            marginTop: '1rem',
            minWidth: 'calc(calc(100%/3) - 1.333rem)',
          }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          select
          value={province}
          onChange={handleChangeProvince}
          error={error.province}
          helperText={error.province === false ? '' : 'B???n ch??a ch???n t???nh di chuy???n'}
        >
          {provinces.map((province) => (
            <MenuItem sx={{ fontSize: '1.4rem' }} key={province.code} value={province.code}>
              {province.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className="district"
          label="Qu???n/Huy???n"
          sx={{
            marginBottom: '1rem',
            marginTop: '1rem',
            minWidth: 'calc(calc(100%/3) - 1.333rem)',
          }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          select
          value={district}
          onChange={handleChangeDistrict}
          error={error.district}
          helperText={error.district === false ? '' : 'B???n ch??a ch???n qu???n di chuy???n'}
        >
          {districts.map((district) => (
            <MenuItem sx={{ fontSize: '1.4rem' }} key={district.code} value={district.code}>
              {district.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className="ward"
          label="Ph?????ng/X??"
          sx={{
            marginBottom: '1rem',
            marginTop: '1rem',
            minWidth: 'calc(calc(100%/3) - 1.333rem)',
          }}
          size="medium"
          InputProps={{ style: { fontSize: '1.4rem' } }}
          InputLabelProps={{ style: { fontSize: '1.4rem' } }}
          required
          select
          value={ward}
          onChange={handleChangeWard}
          error={error.ward}
          helperText={error.ward === false ? '' : 'B???n ch??a ch???n x?? di chuy???n'}
        >
          {wards.map((ward) => (
            <MenuItem sx={{ fontSize: '1.4rem' }} key={ward.code} value={ward.code}>
              {ward.name}
            </MenuItem>
          ))}
        </TextField>
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
          G???i t??? khai
        </Button>
      </div>
      <Noti payload={payloadNoti} showNoti={showNoti} setShowNoti={setShowNoti} />
    </>
  )
}

export default MovingDeclaration
