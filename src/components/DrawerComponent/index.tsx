import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from 'react-daisyui'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { DrawerProps } from '../Header'
import Link from 'next/link'
import FunctionDeferModal from '../FunctionDefer'
import { IconLogout, IconUser } from '@tabler/icons'

const DrawerComponent = ({
  openDrawer,
  toggleDrawer,
  user,
  signOut,
}: DrawerProps) => {
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer}
        direction="left"
        duration={400}
        className="w-auto rounded-r-2xl"
      >
        <ul className="menu p-4 overflow-x-hidden w-80 rounded-r-2xl h-full bg-base-100 text-primary">
          <li>
            <button className="flex w-full justify-between">
              <div className="flex gap-3 justify-center items-center">
                {/* {user.profile_photo_path ? (
                  <BlurImage
                    src={user.profile_photo_path}
                    width={32}
                    height={32}
                    layout="fixed"  
                  />
                ) : ( */}
                {/* <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8" /> */}
                <IconUser size={32} stroke={2} strokeLinejoin="miter" />
                {/* )} */}

                <div className="flex flex-col items-start">
                  <h1 className="text-md font-semibold">{user && user.name}</h1>
                </div>
              </div>
              <div onClick={toggleDrawer}>
                <div>
                  <svg
                    className="swap-off fill-current text-info-content z-20"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </div>
              </div>
            </button>
          </li>
          <li>
            <Link href="/orders">
              <button className="flex pl-14 w-full justify-between">
                <h1>Pedidos</h1>
              </button>
            </Link>
          </li>
          <li>
            <Link href="/">
              <button className="flex pl-14 w-full justify-between">
                <h1>Página inicial</h1>
              </button>
            </Link>
          </li>
          <li>
            <label
              htmlFor="my-modal-4"
              className="flex pl-14 w-full text-error"
            >
              <div className="flex gap-3 justify-center items-center">
                <h1 className="text-md">Estoque</h1>
                <span className="text-error flex gap-1 items-center">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="h-4 w-4"
                  />
                  Em breve
                </span>
              </div>
            </label>
          </li>
          <li>
            <label
              htmlFor="my-modal-4"
              className="flex pl-14 w-full text-error"
            >
              <h1>Financeiro</h1>

              <span className="text-error flex gap-1 items-center">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="h-4 w-4"
                />
                Em breve
              </span>
            </label>
          </li>
          <li>
            <Link href="https://pedidos.buyphone.com.br/Boas_Praticas.pdf">
              <a
                className="flex pl-14 w-full justify-between"
                target={'_blank'}
              >
                <h1>Boas práticas</h1>
              </a>
            </Link>
          </li>
          <li>
            <button className="flex pl-14 w-full justify-between">
              <h1>Tutorial</h1>
            </button>
          </li>
          <li>
            <button className="flex pl-14 w-full justify-between">
              <h1>Minha conta</h1>
            </button>
          </li>
          <li>
            <Link href="https://t.me/maxwelcavallin">
              <a
                className="flex pl-14 w-full justify-between"
                target={'_blank'}
              >
                <h1>Fale com a gente</h1>
              </a>
            </Link>
          </li>
          <Divider />
          <li onClick={() => signOut()}>
            <button
              onClick={toggleDrawer}
              className="flex w-full justify-between"
            >
              <div className="flex gap-3 justify-center items-center">
                <IconLogout size={28} stroke={2} strokeLinejoin="miter" />

                <h1 className="text-md">Sair</h1>
              </div>
            </button>
          </li>
        </ul>
      </Drawer>
      <FunctionDeferModal />
    </>
  )
}
export default DrawerComponent
