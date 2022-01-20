/* eslint-disable @typescript-eslint/no-empty-function */
import { type } from '@testing-library/user-event/dist/type'
import adminApi from 'apis/adminApi'
import { locationApi } from 'apis/covid'
import movingDeclarationApi from 'apis/movingDeclaration'
import userApi from 'apis/userApi'
import { createContext, ReactNode, useState, useEffect } from 'react'

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
  email: string
  password: string
  fullName: string
  yearOfBirth: string
  citizenIdentification: string
  gender: string
  province: string
  district: string
  ward: string
  phone: string
  createdDate: string
  id: number
}

type movingDeclaration = {
  userId: string
  time: string
  province: string
  district: string
  ward: string
  id: 1
}

type InitialStateContextType = {
  covidLocations: Location[]
  users: userType[]
  admins: userType[]
  movingDeclaration: movingDeclaration[]
  miniSideNav: boolean
  setMiniSideNav: (miniSideNav: boolean) => void
}

const initialStateContextValue: InitialStateContextType = {
  covidLocations: [],
  users: [],
  admins: [],
  movingDeclaration: [],
  miniSideNav: false,
  setMiniSideNav: () => {},
}

export const GlobalContext = createContext<InitialStateContextType>(initialStateContextValue)

export default function GlobalProvider({ children }: Props) {
  const [covidLocations, setCovidLocations] = useState<Location[]>([])
  const [users, setUsers] = useState<any>([])
  const [admins, setAdmins] = useState<any>([])
  const [movingDeclaration, setMovingDeclaration] = useState<any>([])
  const [miniSideNav, setMiniSideNav] = useState(false)

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

  return (
    <GlobalContext.Provider
      value={{ covidLocations, miniSideNav, setMiniSideNav, users, admins, movingDeclaration }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
