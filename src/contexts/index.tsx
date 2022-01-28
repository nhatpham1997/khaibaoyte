/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useState, useContext } from 'react'

type Props = {
  children: ReactNode
}

type Location = {
  name: string
  cases: number
  casesToday: number
  death: number
  recovered: number
  treating: number
}

type userType = {
  citizenIdentification?: string
  createdDate?: string
  district?: number
  email?: string
  fullName?: string
  gender?: number
  id?: number
  password?: string
  phone?: string
  province?: number
  provinceName?: string
  specificAddress?: string
  ward?: number
  yearOfBirth?: number
}

type movingDeclaration = {
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
  provinceName: string
  district: number
  ward: number
  specificAddress: string
  id: number
}

type movingRegister = {
  email: string
  fullName: string
  yearOfBirth: number
  citizenIdentification: string
  gender: number
  province: number
  district: number
  ward: number
  specificAddress: string
  phone: string
  provinceResidence: number
  districtResidence: number
  wardResidence: number
  specificAddressResidence: string
  userId: number
  time: string
  provinceName: string
  districtName: string
  wardName: string
  provinceResidenceName: string
  districtResidenceName: string
  wardResidenceName: string
  status: number
  createdAt: number
  id: number
}

type InitialStateContextType = {
  covidLocations: Location[]
  isLogin: string
  setLogin: (data: any) => void
  users: userType[]
  dataUsers: (data: any) => void
  admins: userType[]
  dataAdmins: (data: any) => void
  movingDeclaration: movingDeclaration[]
  dataMovingDeclaration: (data: any) => void
  movingRegister: movingRegister[]
  dataMovingRegister: (data: any) => void
  showConfirm: boolean
  setShowConfirm: (showConfirm: boolean) => void
  editMovingRegister: (data: movingRegister[]) => void
  dataCovidLocations: (data: any) => void
  address: any[]
  dataAddress: (data: any) => void
}

const initialStateContextValue: InitialStateContextType = {
  covidLocations: [],
  isLogin: '',
  setLogin: () => {},
  users: [],
  dataUsers: () => {},
  admins: [],
  dataAdmins: () => {},
  movingDeclaration: [],
  dataMovingDeclaration: () => {},
  movingRegister: [],
  dataMovingRegister: () => {},
  showConfirm: false,
  setShowConfirm: () => {},
  editMovingRegister: () => {},
  dataCovidLocations: () => {},
  address: [],
  dataAddress: () => {},
}

export const GlobalContext = createContext<InitialStateContextType>(initialStateContextValue)

export default function GlobalProvider({ children }: Props) {
  const [covidLocations, setCovidLocations] = useState<Location[]>([])
  const [users, setUsers] = useState<any>([])
  const [address, setAddress] = useState<any>([])
  const [admins, setAdmins] = useState<any>([])
  const [movingDeclaration, setMovingDeclaration] = useState<any>([])
  const [movingRegister, setMovingRegister] = useState<any>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLogin, setIsLogin] = useState('')

  const setLogin = (data: string) => {
    setIsLogin(data)
  }

  const editMovingRegister = (data: movingRegister[]) => {
    console.log(data)
    console.log(movingRegister)
    setMovingRegister(data)
  }

  const dataCovidLocations = (data: any) => {
    setCovidLocations(data)
  }

  const dataUsers = (data: any) => {
    setUsers(data)
  }

  const dataAdmins = (data: any) => {
    setAdmins(data)
  }

  const dataMovingDeclaration = (data: any) => {
    setMovingDeclaration(data)
  }

  const dataMovingRegister = (data: any) => {
    setMovingRegister(data)
  }

  const dataAddress = (data: any) => {
    setAddress(data)
  }

  return (
    <GlobalContext.Provider
      value={{
        covidLocations,
        showConfirm,
        setShowConfirm,
        isLogin,
        setLogin,
        users,
        dataUsers,
        admins,
        dataAdmins,
        movingDeclaration,
        dataMovingDeclaration,
        movingRegister,
        dataMovingRegister,
        editMovingRegister,
        dataCovidLocations,
        address,
        dataAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
