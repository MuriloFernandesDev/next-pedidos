import Image from 'next/image'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { useProSidebar } from 'react-pro-sidebar'
import { AuthContext } from '../../contexts/AuthContext'
import Header from '../Header'
import SideBarDesktop from '../SideBarDesktop'
import { useRouter } from 'next/router'
import LoadingScreen from '../LoadingScreen'

interface Props {
  children: ReactElement
}

const BodyContainer = ({ children }: Props) => {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const { collapsed } = useProSidebar()

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState)
  }

  const { user, signOut, isLookingUser } = useContext(AuthContext)

  return (
    <>
      {isLookingUser === true ? (
        <LoadingScreen />
      ) : (
        <div className="relative max-w-md md:max-w-none mx-auto">
          <div className="flex">
            {/* sideBar para desktop */}
            {router.asPath === '/register/home' ||
              router.asPath === '/register/name' ||
              router.asPath === '/register/document' ||
              router.asPath === '/register/email' ||
              router.asPath === '/register/confirm' ||
              router.asPath === '/register/password' ||
              router.asPath === '/register/terms' ||
              (router.asPath === '/account/login' ? null : (
                <SideBarDesktop
                  user={user}
                  signOut={signOut}
                  collapsed={collapsed}
                />
              ))}
            {/* ------------ */}
            {/* home mobile e carrossel */}
            <div
              className={`flex flex-col w-full transition-all duration-300  ${
                router.asPath === '/register/home' ||
                router.asPath === '/register/name' ||
                router.asPath === '/register/document' ||
                router.asPath === '/register/email' ||
                router.asPath === '/register/confirm' ||
                router.asPath === '/register/password' ||
                router.asPath === '/register/terms' ||
                router.asPath === '/account/login'
                  ? null
                  : !collapsed
                  ? 'md:ml-[300px]'
                  : 'md:ml-[70px]'
              }`}
            >
              {router.asPath === '/' ? (
                <Header
                  toggleDrawer={toggleDrawer}
                  openDrawer={openDrawer}
                  user={user}
                  signOut={signOut}
                />
              ) : null}
              <>{children}</>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BodyContainer
