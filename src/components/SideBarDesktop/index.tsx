import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import {
  faBrain,
  faCoins,
  faExclamation,
  faExclamationCircle,
  faHome,
  faNewspaper,
  faPhone,
  faRightFromBracket,
  faStore,
  faTags,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ToolTip from '../ToolTip'
import styles from '../../styles/styles.module.css'
import { IUser } from '../../types/user'
import FunctionDeferModal from '../FunctionDefer'
import Link from 'next/link'
import {
  IconBrain,
  IconBrandAppgallery,
  IconBrandTelegram,
  IconBuildingStore,
  IconCoin,
  IconExclamationCircle,
  IconExclamationMark,
  IconHome2,
  IconLogout,
  IconNews,
  IconPigMoney,
  IconTags,
  IconUser,
} from '@tabler/icons'

interface SideBarProps {
  user: IUser | null
  signOut: () => void
  collapsed: boolean
}

const SideBarDesktop = ({ user, signOut, collapsed }: SideBarProps) => {
  return (
    <>
      <Sidebar
        collapsedWidth="70px"
        width="300px"
        className="hidden md:flex h-screen top-0 fixed"
      >
        <Menu>
          <Menu>
            {user && (
              <MenuItem
                className="pt-3 "
                icon={
                  <img
                    className="mask mask-circle"
                    src={user.profile_photo_path}
                  />
                }
              >
                <div className="text-primary">
                  <p className="text-xs">Bem-vindo, </p>
                  <p className="text-2xl font-medium">{user && user.name}</p>
                </div>
              </MenuItem>
            )}
            <Link href={'/'}>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} pt-4 `}
                icon={<IconHome2 size={24} stroke={2} strokeLinejoin="miter" />}
              >
                Página inicial
                <ToolTip title="Página inicial" />
              </MenuItem>
            </Link>

            <Link href={'/orders'}>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={<IconTags size={24} stroke={2} strokeLinejoin="miter" />}
              >
                Pedidos
                <ToolTip title="Pedidos" />
              </MenuItem>
            </Link>

            <label htmlFor="my-modal-4">
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={
                  <div className="relative">
                    <IconBrandAppgallery
                      size={24}
                      stroke={2}
                      strokeLinejoin="miter"
                    />
                    <span
                      className={`badge p-1 left-4 -top-2 badge-warning absolute ${
                        !collapsed && 'hidden'
                      }`}
                    >
                      <IconExclamationMark
                        size={12}
                        className="text-[#955B04]"
                        stroke={2}
                        strokeLinejoin="miter"
                      />
                    </span>
                  </div>
                }
              >
                Estoque
                <ToolTip title="Estoque" />
                <span className="badge badge-warning bg-warning gap-1 text-[#955B04] ml-3">
                  <IconExclamationCircle
                    size={17}
                    className="text-[#955B04]"
                    stroke={2}
                    strokeLinejoin="miter"
                  />
                  Em breve
                </span>
              </MenuItem>
            </label>
            <label htmlFor="my-modal-4">
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={
                  <div className="relative">
                    <IconPigMoney size={24} stroke={2} strokeLinejoin="miter" />
                    <span
                      className={`badge p-1 left-4 -top-2 badge-warning absolute ${
                        !collapsed && 'hidden'
                      }`}
                    >
                      <IconExclamationMark
                        size={12}
                        className="text-[#955B04]"
                        stroke={2}
                        strokeLinejoin="miter"
                      />
                    </span>
                  </div>
                }
              >
                Financeiro
                <ToolTip title="Financeiro" />
                <span className="badge badge-warning gap-1 text-[#955B04] ml-3">
                  <IconExclamationCircle
                    size={17}
                    className="text-[#955B04]"
                    stroke={2}
                    strokeLinejoin="miter"
                  />
                  Em breve
                </span>
              </MenuItem>
            </label>
            <Link href={'https://pedidos.buyphone.com.br/Boas_Praticas.pdf'}>
              <a target={'_blank'}>
                <MenuItem
                  className={`text-black/50 relative ${styles.hoverToolTip} `}
                  icon={
                    <IconBrain size={24} stroke={2} strokeLinejoin="miter" />
                  }
                >
                  Boas práticas
                  <ToolTip title="Boas práticas" />
                </MenuItem>
              </a>
            </Link>
            <Link href={'/tutorial'}>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={<IconNews size={24} stroke={2} strokeLinejoin="miter" />}
              >
                Tutorial
                <ToolTip title="Tutorial" />
              </MenuItem>
            </Link>
            <MenuItem
              className={`text-black/50 relative ${styles.hoverToolTip} `}
              icon={<IconUser size={24} stroke={2} strokeLinejoin="miter" />}
            >
              Minha Conta
              <ToolTip title="Minha Conta" />
            </MenuItem>
            <MenuItem
              className={`text-black/50 relative ${styles.hoverToolTip} `}
              icon={
                <IconBrandTelegram
                  size={24}
                  stroke={2}
                  strokeLinejoin="miter"
                />
              }
            >
              Fale com a gente
              <ToolTip title="Fale com a gente" />
            </MenuItem>
            <MenuItem
              onClick={signOut}
              className={`text-black/50 relative ${styles.hoverToolTip} `}
              icon={<IconLogout size={24} stroke={2} strokeLinejoin="miter" />}
            >
              Sair
              <ToolTip title="Sair" />
            </MenuItem>
          </Menu>
        </Menu>
      </Sidebar>
      <FunctionDeferModal />
    </>
  )
}

export default SideBarDesktop
