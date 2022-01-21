import apiCore from './apiCore'

interface movingRegisterType {
  fullName: string
  yearOfBirth: number
  gender: number
  citizenIdentification: string
  email: string
  phone: string
  provinceResidence: number
  districtResidence: number
  wardResidence: number
  specificAddressResidence: string
  userId: number
  time: string
  province: number
  district: number
  ward: number
  specificAddress: string
  status: boolean
  confirm: boolean
  id: number
  createdAt: number
}

const movingRegisterApi = {
  getAll: () => {
    const url = '/moving_register'
    return apiCore.get(url)
  },
  edit: (id: number, data: movingRegisterType) => {
    const url = `/moving_register/${id}`
    return apiCore.put(url, data)
  },
}

export default movingRegisterApi
