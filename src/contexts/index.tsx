/* eslint-disable @typescript-eslint/no-empty-function */
import { locationApi } from 'apis/covid'
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

type InitialStateContextType = {
  covidLocations: Location[]
  miniSideNav: boolean
  setMiniSideNav: (miniSideNav: boolean) => void
}

const initialStateContextValue: InitialStateContextType = {
  covidLocations: [],
  miniSideNav: false,
  setMiniSideNav: () => {},
}

export const GlobalContext = createContext<InitialStateContextType>(initialStateContextValue)

export default function GlobalProvider({ children }: Props) {
  const [covidLocations, setCovidLocations] = useState<Location[]>([])
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

  return (
    <GlobalContext.Provider value={{ covidLocations, miniSideNav, setMiniSideNav }}>
      {children}
    </GlobalContext.Provider>
  )
}
