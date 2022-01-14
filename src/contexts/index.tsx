import { createContext, ReactNode, useState } from 'react'

type todosObj = {
  number: number
  handleNumber: () => void
}
// The Soft UI Dashboard PRO Material main context
export const context = createContext<todosObj>({
  number: 0,
  handleNumber: () => {
    //nothing
  },
})

type Props = {
  children: ReactNode
}

// Material Dashboard 2 PRO React context provider
function ContextProvider({ children }: Props) {
  const [number, setNumber] = useState(0)

  const handleNumber = () => {
    setNumber(number + 1)
  }

  const value = {
    number,
    handleNumber,
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

export default ContextProvider

// Context module functions
