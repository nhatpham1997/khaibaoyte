import LabelHeading from 'components/LabelHeading'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import './ModalDetailMovingDeclaration.css'

interface props {
  isShow: boolean
  setShowModalDetail: any
  item: any
}

function ModalDetailMovingDeclaration({ isShow, setShowModalDetail, item }: props) {
  const [provinceResidences, setProvinceResidences] = useState<any[]>([])
  const [districtResidences, setDistrictResidences] = useState<any[]>([])
  const [wardResidences, setWardResidences] = useState<any[]>([])

  const [provinces, setProvinces] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [wards, setWards] = useState<any[]>([])

  const sexs = [
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

  // Hàm lấy từ API danh sách tỉnh
  const getAPI = useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=3')
      .then((res) => res.json())
      .then((data) => {
        setProvinceResidences(data)
        setProvinces(data)
      })
  }, [])

  // Hàm lấy ra danh sách quận
  const getDistricts = useEffect(() => {
    provinceResidences.forEach(
      (element) => {
        if (element.code === item.provinceResidence) {
          setDistrictResidences(element.districts)
        }
        if (element.code === item.province) {
          setDistricts(element.districts)
        }
      },
      [provinces, provinceResidences]
    )
  })

  // Hàm lấy ra danh sách xã
  const getWards = useEffect(() => {
    districtResidences.forEach((element) => {
      if (element.code === item.districtResidence) {
        setWardResidences(element.wards)
      }
    })
    districts.forEach((element) => {
      if (element.code === item.district) {
        setWards(element.wards)
      }
    })
  })

  function handleCloseModal() {
    setShowModalDetail(false)
  }

  return (
    <div className={`modal-detail-moving-declaration ${isShow && 'is-show'}`}>
      <div className="modal-detail-moving-declaration-content">
        <div className="row">
          <LabelHeading text="Chi tiết tờ khai di chuyển" />
          <IconButton onClick={handleCloseModal} sx={{ background: 'silver' }} aria-label="delete">
            <CloseIcon />
          </IconButton>
        </div>
        <TextField
          id="name"
          label="Họ và tên"
          variant="outlined"
          sx={{ marginBottom: '1rem', marginTop: '1rem', fontSize: '3rem' }}
          InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          fullWidth
          value={item.fullName || ''}
        />
        <div className="row">
          <TextField
            id="year-of-birth"
            label="Năm sinh"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/2) - 1rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            value={item.yearOfBirth || 0}
          />
          <TextField
            id="sex"
            label="Giới tính"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/2) - 1rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            select
            value={item.gender || 0}
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
          InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
          InputLabelProps={{ style: { fontSize: '1.2rem' } }}
          required
          fullWidth
          value={item.citizenIdentification || ''}
        />
        <div className="row">
          <TextField
            id="email"
            label="Email"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/2) - 1rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            value={item.email || ''}
          />
          <TextField
            id="phone"
            label="Số điện thoại"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/2) - 1rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            value={item.phone || ''}
          />
        </div>
        <div className="row">
          <LabelHeading text="Nơi cư trú" />
        </div>
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
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            select
            value={item.provinceResidence || 0}
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
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            select
            value={item.districtResidence || 0}
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
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            select
            value={item.wardResidence || 0}
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
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/4) - 1.5rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            value={item.specificAddressResidence || ''}
          />
        </div>
        <div className="row">
          <LabelHeading text="Địa điểm di chuyển" />
        </div>
        <div className="row">
          <TextField
            id="province"
            label="Tỉnh/Thành phố"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/4) - 1.5rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            select
            value={item.province || 0}
          >
            {provinces.map((province) => (
              <MenuItem key={province.code} value={province.code}>
                {province.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="district"
            label="Quận/Huyện"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/4) - 1.5rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            select
            value={item.district || 0}
          >
            {districts.map((district) => (
              <MenuItem key={district.code} value={district.code}>
                {district.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="ward"
            label="Phường/Xã"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/4) - 1.5rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            select
            value={item.ward || 0}
          >
            {wards.map((ward) => (
              <MenuItem key={ward.code} value={ward.code}>
                {ward.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="detail-address"
            label="Số nhà, phố, tổ dân phố/thôn/đội"
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
              minWidth: 'calc(calc(100%/4) - 1.5rem)',
            }}
            size="medium"
            InputProps={{ style: { fontSize: '1.2rem' }, readOnly: true }}
            InputLabelProps={{ style: { fontSize: '1.2rem' } }}
            required
            value={item.specificAddress || ''}
          />
        </div>
      </div>
    </div>
  )
}

export default ModalDetailMovingDeclaration
