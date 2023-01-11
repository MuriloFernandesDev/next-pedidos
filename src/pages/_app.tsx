import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyBottomNavigation from '../components/MyBottomNavigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Theme } from 'react-daisyui'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { AuthProvider } from '../contexts/AuthContext'
import BodyContainer from '../components/BodyContainer'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  const [showMyBottom, setShowMyBottom] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  useEffect(() => {
    if (
      router.asPath === '/register/home' ||
      router.asPath === '/register/name' ||
      router.asPath === '/register/document' ||
      router.asPath === '/register/email' ||
      router.asPath === '/register/confirm' ||
      router.asPath === '/register/password' ||
      router.asPath === '/register/terms' ||
      router.asPath === '/account/login'
    ) {
      setShowMyBottom(false)
    } else {
      setShowMyBottom(true)
    }
  }, [router.asPath])

  return (
    <AuthProvider>
      <Theme
        className={`${showMyBottom && 'bg-primary md:bg-base-100 w-full'}`}
      >
        <ProSidebarProvider>
          <BodyContainer>
            <div className={`${showMyBottom && 'pb-14 md:pb-0'}`}>
              <Component {...pageProps} />
              <ToastContainer />
            </div>
          </BodyContainer>
          <div className="md:hidden">
            {!!showMyBottom && <MyBottomNavigation />}
          </div>
        </ProSidebarProvider>
      </Theme>
    </AuthProvider>
  )
}

export default MyApp
