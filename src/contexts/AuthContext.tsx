import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { parseCookies, destroyCookie } from 'nookies'
import axios, { AxiosError } from 'axios'
import Router, { useRouter } from 'next/router'
import { IUser } from '../types/user'
import { setCookies } from '../utils/useCookies'
import { toast } from 'react-toastify'
import { deleteCookie } from 'cookies-next'
import { LookingContext } from './isLookingData'

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  // isAuthenticated: boolean
  user: IUser | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
}

type AuthProviderProps = {
  children: any
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const { setLookingFalse } = useContext(LookingContext)
  const router = useRouter()

  async function signIn({ email, password }: SignInData) {
    try {
      const { data } = await axios.post('/api/login', {
        email,
        password,
      })

      setCookies('@BuyPhone:Token', data.authorization.token, 60 * 60 * 24 * 30)

      setUser(data.user)
      setLookingFalse()
      router.push('/')
    } catch (error) {
      console.log(error)
      setLookingFalse()
      const errorData = (error as AxiosError)?.response?.data as Error
      toast.error(errorData?.message)
    }
  } //função para realizar login

  async function signOut() {
    deleteCookie('@BuyPhone:Token')
    setUser(null)
    Router.push('/account/login')
    setLookingFalse()
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
            console.log('Token destruido no useEffect do context')
            Router.push('/account/login')
          })
      }
      setLookingFalse()
    }
    userSearch()
  }, []) //effect para buscar usuário pelo token

  return (
    <AuthContext.Provider
      value={{ user, /*isAuthenticated,*/ signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
