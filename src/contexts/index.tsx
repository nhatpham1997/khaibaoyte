/* eslint-disable @typescript-eslint/no-empty-function */
import adminApi from '../apis/adminApi'
import { locationApi } from '../apis/covid'
import movingDeclarationApi from '../apis/movingDeclaration'
import movingRegisterApi from '../apis/movingRegister'
import userApi from '../apis/userApi'
import { createContext, ReactNode, useState, useEffect, useContext } from 'react'

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
  userId: string
  time: string
  province: string
  district: string
  ward: string
  id: number
}

type movingRegister = {
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
  status: number
  id: number
  createdAt: number
}

type InitialStateContextType = {
  covidLocations: Location[]
  users: userType[]
  admins: userType[]
  movingDeclaration: movingDeclaration[]
  movingRegister: movingRegister[]
  miniSideNav: boolean
  setMiniSideNav: (miniSideNav: boolean) => void
  editMovingRegister: (data: movingRegister[]) => void
}

const initialStateContextValue: InitialStateContextType = {
  covidLocations: [],
  users: [],
  admins: [],
  movingDeclaration: [],
  movingRegister: [],
  miniSideNav: false,
  setMiniSideNav: () => {},
  editMovingRegister: () => {},
}

export const GlobalContext = createContext<InitialStateContextType>(initialStateContextValue)

export default function GlobalProvider({ children }: Props) {
  const [covidLocations, setCovidLocations] = useState<Location[]>([])
  const [users, setUsers] = useState<any>([])
  const [admins, setAdmins] = useState<any>([])
  const [movingDeclaration, setMovingDeclaration] = useState<any>([])
  const [movingRegister, setMovingRegister] = useState<any>([])
  const [miniSideNav, setMiniSideNav] = useState(false)

  const editMovingRegister = (data: movingRegister[]) => {
    console.log(data)
    console.log(movingRegister)
    setMovingRegister(data)
  }

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationApi.getAll()
        setCovidLocations(response.data.locations)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchLocations()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getAll()
        setUsers(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await adminApi.getAll()
        setAdmins(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
      console.log(1)
    }
    fetchAdmin()
  }, [])

  useEffect(() => {
    const fetchMovingDeclaration = async () => {
      try {
        const response = await movingDeclarationApi.getAll()
        setMovingDeclaration(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchMovingDeclaration()
  }, [])

  useEffect(() => {
    const fetchMovingRegister = async () => {
      try {
        const response = await movingRegisterApi.getAll()
        setMovingRegister(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchMovingRegister()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        covidLocations,
        miniSideNav,
        setMiniSideNav,
        users,
        admins,
        movingDeclaration,
        movingRegister,
        editMovingRegister,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
