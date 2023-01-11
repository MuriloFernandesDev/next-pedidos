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

  const setLookingUser = async (time: number) => {
    await new Promise((resolve) => setTimeout(resolve, time))
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
    try {
      await axios.post('/api/logout')
      deleteCookie('@BuyPhone:Token')
      setUser(null)
      Router.push('/account/login')
    } catch (err) {
      deleteCookie('@BuyPhone:Token')
      setUser(null)
      Router.push('/account/login')
    }

    await setLookingUser(2000)
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
      await setLookingUser(1000)
    }
    userSearch()
  }, []) //effect para buscar usuário pelo token

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLookingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
