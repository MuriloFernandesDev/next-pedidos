import { createContext, ReactNode, useEffect, useState } from 'react'

type LookingContextType = {
  isLooking: boolean
  setLookingTrue: () => void
  setLookingFalse: () => void
}

type LookingProviderProps = {
  children: any
}

export const LookingContext = createContext({} as LookingContextType)

export function LookingProvider({ children }: LookingProviderProps) {
  const [isLooking, setIsLooking] = useState(true)

  const setLookingTrue = async () => {
    setIsLooking(true)
  } //função para setar usuário como true

  const setLookingFalse = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLooking(false)
  } //função para setar usuário como true

  return (
    <LookingContext.Provider
      value={{ isLooking, setLookingTrue, setLookingFalse }}
    >
      {children}
    </LookingContext.Provider>
  )
}
