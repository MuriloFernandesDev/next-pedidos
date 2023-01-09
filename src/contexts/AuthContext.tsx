import { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies, destroyCookie } from 'nookies'
import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { IUser } from '../types/user'
import { setCookies } from '../utils/useCookies'
import { toast } from 'react-toastify'
import { deleteCookie } from 'cookies-next'

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  // isAuthenticated: boolean
  user: IUser | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
  isLookingUser: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLookingUser, setIsLookingUser] = useState(true)
  // const isAuthenticated = !!user

  const setLookingUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLookingUser(false)
  } //função para setar usuário como true

  async function signIn({ email, password }: SignInData) {
    try {
      const { data } = await axios.post('/api/login', {
        email,
        password,
      })

      setCookies('@BuyPhone:Token', data.authorization.token, 60 * 60 * 24 * 30)

      setUser(data.user)
      setIsLookingUser(false)
      Router.push('/')
    } catch (error) {
      const errorData = (error as AxiosError)?.response?.data as Error
      toast.error(errorData?.message)
    }
  } //função para realizar login

  async function signOut() {
    setIsLookingUser(true)
    deleteCookie('@BuyPhone:Token')
    setUser(null)
    Router.push('/account/login')
    await setLookingUser()
  } //função para realizar o logout

  useEffect(() => {
    const userSearch = async () => {
      const { '@BuyPhone:Token': token } = parseCookies()

      if (token) {
        axios
          .get('/api/me')
          .then((response) => {
            setUser(response.data)
          })
          .catch(() => {
            destroyCookie(null, '@BuyPhone:Token')
            Router.push('/account/login')
          })
      }
      await setLookingUser()
    }
    userSearch()
  }, []) //effect para buscar usuário pelo token

  return (
    <AuthContext.Provider
      value={{ user, /*isAuthenticated,*/ signIn, signOut, isLookingUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
