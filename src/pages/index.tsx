import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import {
  faCalendarDays,
  faNewspaper,
} from '@fortawesome/free-regular-svg-icons'
import {
  faStore,
  faTags,
  faDollar,
  faBookBookmark,
  faChartPie,
  faBeerMugEmpty,
  faExclamationCircle,
  faExclamation,
  faHeart,
  faHeartCircleExclamation,
  faSackDollar,
  faCommentsDollar,
  faWallet,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'
import CircleOption from '../components/CircleOption'
import Container from '../components/Container'
import CardMatch from '../components/CardMatch'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import {
  faCoins,
  faHome,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/styles.module.css'
import ToolTip from '../components/ToolTip'
import { Tooltip } from 'react-daisyui'

export default function Home() {
  const currentRefCarroussel = useRef<any>()
  const [currentSlide, setCurrentSlide] = useState(1)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { collapsed } = useProSidebar()

  function next() {
    const maxCurrent = currentRefCarroussel.current?.itemsRef.length

    if (currentSlide >= maxCurrent) {
      setCurrentSlide(1)
      return
    }
    setCurrentSlide(currentSlide + 1)
  }

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState)
  }

  return (
    <div className="relative max-w-md md:max-w-none mx-auto">
      <div className="flex">
        <Sidebar
          collapsedWidth="70px"
          width="300px"
          className="hidden md:flex h-screen top-0 fixed"
        >
          <Menu>
            <Menu>
              <MenuItem
                className="pt-3 "
                icon={
                  <img
                    className="mask mask-circle"
                    src="https://placeimg.com/180/180/arch"
                  />
                }
              >
                <div className="text-primary">
                  <p className="text-xs">Bem-vindo, </p>
                  <p className="text-2xl font-medium">Murilo</p>
                </div>
              </MenuItem>

              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={<FontAwesomeIcon icon={faHome} className="w-6 h-6" />}
              >
                Página inicial
                <ToolTip title="Página inicial" />
              </MenuItem>

              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={<FontAwesomeIcon icon={faTags} className="w-6 h-6" />}
              >
                Pedidos
                <ToolTip title="Pedidos" />
              </MenuItem>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={
                  <div className="relative">
                    <FontAwesomeIcon icon={faStore} className="w-6 h-6" />
                    <span
                      className={`badge p-1 left-4 -top-2 badge-warning absolute ${
                        !collapsed && 'hidden'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faExclamation}
                        className="w-3 h-3 text-[#955B04] "
                      />
                    </span>
                  </div>
                }
              >
                Estoque
                <ToolTip title="Estoque" />
                <span className="badge badge-warning bg-warning gap-1 text-[#955B04] ml-3">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  Em breve
                </span>
              </MenuItem>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={
                  <div className="relative">
                    <FontAwesomeIcon icon={faCoins} className="w-6 h-6" />
                    <span
                      className={`badge p-1 left-4 -top-2 badge-warning absolute ${
                        !collapsed && 'hidden'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faExclamation}
                        className="w-3 h-3 text-[#955B04]"
                      />
                    </span>
                  </div>
                }
              >
                Financeiro
                <ToolTip title="Financeiro" />
                <span className="badge badge-warning gap-1 text-[#955B04] ml-3">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  Em breve
                </span>
              </MenuItem>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={<FontAwesomeIcon icon={faHome} className="w-6 h-6" />}
              >
                Boas práticas
                <ToolTip title="Boas práticas" />
              </MenuItem>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={
                  <FontAwesomeIcon icon={faNewspaper} className="w-6 h-6" />
                }
              >
                Tutorial
                <ToolTip title="Tutorial" />
              </MenuItem>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={<FontAwesomeIcon icon={faUser} className="w-6 h-6" />}
              >
                Minha Conta
                <ToolTip title="Minha Conta" />
              </MenuItem>
              <MenuItem
                className={`text-black/50 relative ${styles.hoverToolTip} `}
                icon={<FontAwesomeIcon icon={faPhone} className="w-6 h-6" />}
              >
                Fale com a gente
                <ToolTip title="Fale com a gente" />
              </MenuItem>
            </Menu>
          </Menu>
        </Sidebar>

        <div
          className={`flex flex-col w-full transition-all duration-300  ${
            !collapsed ? 'md:ml-[300px]' : 'md:ml-[70px]'
          }`}
        >
          <Header toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
          <div className="flex justify-between w-full items-center px-6 mt-7 md:hidden">
            <CircleOption icon={faTags} title={'Pedido'} link="/orders" />
            <CircleOption
              icon={faDollar}
              title={'Matches'}
              link="/orders/matches"
            />
            <CircleOption icon={faStore} title={'Estoque'} link={''} />
            <CircleOption
              icon={faNewspaper}
              title={'Tutorial'}
              link="/tutorial"
            />
          </div>
          <div className="md:max-w-5xl md:mx-auto w-full hidden md:flex flex-col mt-5">
            <h1 className="text-primary text-xl font-bold">Dados</h1>
            <div className="shadow-xl md:flex stats w-full mb-5">
              <div className="stat py-8">
                <div className="stat-figure text-secondary">
                  <FontAwesomeIcon icon={faHeart} className="w-12 h-12" />
                </div>
                <div className="stat-title">Matches Reservados</div>
                <div className="stat-value">0</div>
              </div>
              <div className="stat py-8">
                <div className="stat-figure text-info">
                  <FontAwesomeIcon
                    icon={faHeartCircleExclamation}
                    className="w-12 h-12"
                  />
                </div>
                <div className="stat-title">Matches em Análise</div>
                <div className="stat-value">0</div>
              </div>
              <div className="stat py-8">
                <div className="stat-figure text-warning">
                  <FontAwesomeIcon icon={faSackDollar} className="w-12 h-12" />
                </div>
                <div className="stat-title">Vendas Recebidas</div>
                <div className="stat-value">0</div>
              </div>
              <div className="stat py-8">
                <div className="stat-figure text-success">
                  <i className="ml-4 icon ion-ios-calendar text-6xl"></i>
                  <FontAwesomeIcon icon={faWallet} className="w-12 h-12" />
                </div>
                <div className="stat-title">Vendas a Receber</div>
                <div className="stat-value">0</div>
              </div>
            </div>
          </div>
          <Container home={true}>
            <>
              <h1 className="text-xl font-semibold mb-5">Oportunidades</h1>
              <CardMatch next={next} />
            </>
          </Container>
        </div>
      </div>
    </div>
  )
}
