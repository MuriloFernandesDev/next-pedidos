import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import dynamic from 'next/dynamic'
const DrawerComponent = dynamic(() => import('../DrawerComponent'), {
  ssr: false,
})
import Link from 'next/link'
import BlurImage from '../BlurImage'
import LogoImg from '../../assets/images/LogoWhite.webp'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/free-regular-svg-icons'
import { useProSidebar } from 'react-pro-sidebar'
import { IUser } from '../../types/user'
import { IconBell, IconMenu2 } from '@tabler/icons'

export interface DrawerProps {
  toggleDrawer: () => void
  openDrawer: boolean
  user: IUser | null
  signOut: () => void
}

const Header = ({ toggleDrawer, openDrawer, user, signOut }: DrawerProps) => {
  const { collapseSidebar } = useProSidebar()
  return (
    <React.Fragment>
      <div className="flex justify-between items-center text-white p-5 md:p-2 md:px-4 bg-primary">
        <button className="btn btn-sm bg-transparent border-transparent">
          <IconMenu2
            onClick={toggleDrawer}
            size={28}
            className="text-primary-content md:hidden"
            stroke={2}
            strokeLinejoin="miter"
          />

          <IconMenu2
            onClick={() => collapseSidebar()}
            size={28}
            className="text-primary-content hidden md:block"
            stroke={2}
            strokeLinejoin="miter"
          />
        </button>
        <div className="w-[50%] md:w-[10%] mr-5">
          <BlurImage
            src={LogoImg}
            layout="responsive"
            className="object-contain"
          />
        </div>
        <Link href="/" passHref>
          <div className="w-auto  cursor-pointer z-50 ease-in-out transition-all duration-300 ">
            <IconBell size={20} stroke={2} strokeLinejoin="miter" />
          </div>
        </Link>
      </div>
      <div className="pt-5 pb-4 border-b-2 border-primary-content/50 md:hidden">
        <div className="flex justify-between items-center px-6">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full relative flex justify-center items-center bg-primary-content">
              <FontAwesomeIcon
                icon={faUser}
                className="w-6 h-6 text-primary absolute"
              />
            </div>

            <div className="text-primary-content">
              <p className="text-xs">Bem-vindo, </p>
              <p className="text-2xl font-medium">{user && user.name}</p>
            </div>
          </div>
        </div>
      </div>
      <DrawerComponent
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        user={user}
        signOut={signOut}
      />
    </React.Fragment>
  )
}

export default Header
