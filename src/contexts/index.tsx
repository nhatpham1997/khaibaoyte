import React, { createContext, ReactNode, useState } from 'react'

type Props = {
  children: ReactNode
}

type InitialStateContextType = {
  miniSidenav: boolean
  transparentSidenav: boolean
}

const initialStateContextValue: InitialStateContextType = {
  miniSidenav: false,
  transparentSidenav: false,
}

export const GlobalContext = createContext<InitialStateContextType>(initialStateContextValue)

export default function GlobalProvider({ children }: Props) {
  const [miniSidenav, setMiniSidenav] = useState(false)
  const [transparentSidenav, setTransparentSidenav] = useState(false)

  return (
    <GlobalContext.Provider value={{ miniSidenav, transparentSidenav }}>
      {children}
    </GlobalContext.Provider>
  )
}
