import { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies, destroyCookie } from 'nookies'
import axios from 'axios'
import Router from 'next/router'
import { IUser } from '../types/user'
import { setCookies } from '../utils/useCookies'

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: IUser | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { '@BuyPhone:Token': token } = parseCookies()

    if (token) {
      //   recoverUserInformation().then((response) => {
      //     setUser(response.user)
      //   })
      // se possuir um token precisa buscar os dados do usuário pela api
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { data } = await axios.post('/api/login', { email, password })

    setCookies('@BuyPhone:Token', data.authorization.token, 60 * 60 * 24 * 30)

    setUser(data.user)
    Router.push('/')
  }

  async function signOut() {
    setUser(null)
    destroyCookie(null, '@BuyPhone:Token')
    Router.push('/account/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
