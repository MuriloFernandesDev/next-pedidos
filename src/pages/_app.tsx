import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyBottomNavigation from '../components/MyBottomNavigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Theme } from 'react-daisyui'
import { ProSidebarProvider } from 'react-pro-sidebar'

function MyApp({ Component, pageProps }: AppProps) {
  const [showMyBottom, setShowMyBottom] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (
      router.asPath === '/register/home' ||
      router.asPath === '/register/name' ||
      router.asPath === '/register/document' ||
      router.asPath === '/register/email' ||
      router.asPath === '/register/confirm' ||
      router.asPath === '/register/password' ||
      router.asPath === '/register/terms'
    ) {
      setShowMyBottom(false)
    } else {
      setShowMyBottom(true)
    }
  }, [router.asPath])

  return (
    <Theme className="bg-primary md:bg-base-100 w-full">
      <ProSidebarProvider>
        <div className="pb-14">
          <Component {...pageProps} />
        </div>
        <div className="md:hidden">
          {!!showMyBottom && <MyBottomNavigation />}
        </div>
      </ProSidebarProvider>
    </Theme>
  )
}

export default MyApp
