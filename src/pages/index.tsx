import React, { useRef, useState } from 'react'
import {
  faExclamationCircle,
  faHeart,
  faHeartCircleExclamation,
  faSackDollar,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import CircleOption from '../components/CircleOption'
import Container from '../components/Container'
import CardMatch from '../components/CardMatch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PersistentLogin } from '../utils/PersistentLogin'
import { setupAPIClient } from '../service/api'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import BlurImage from '../components/BlurImage'
import noOpportunitiesImg from '../assets/images/noOpportunities.webp'
import Router from 'next/router'
import { IDashboard, IOpportunities } from '../types/user'
import { destroyCookie } from 'nookies'
import {
  IconBrandAppgallery,
  IconCurrencyDollar,
  IconNews,
  IconTags,
} from '@tabler/icons'
import MatchModal from '../components/Modals/MatchModal'

interface HomeProps {
  Opportunities: Array<IOpportunities>
  dashStatus: IDashboard
}

export interface IMatch {
  order_id: number
  price: number
  receive: number
  forecast: number
}

export default function Home({ Opportunities, dashStatus }: HomeProps) {
  const currentRefCarroussel = useRef<any | null>(null)
  const [currentSlide, setCurrentSlide] = useState(1)

  function next() {
    const maxCurrent = currentRefCarroussel.current?.itemsRef.length

    if (currentSlide >= maxCurrent) {
      setCurrentSlide(1)
      return
    }
    setCurrentSlide(currentSlide + 1)
  }

  return (
    <>
      <div className="flex justify-between w-full items-center px-6 mt-7 md:hidden">
        <CircleOption
          icon={<IconTags size={24} stroke={2} strokeLinejoin="miter" />}
          title={'Pedido'}
          link="/orders"
        />
        <CircleOption
          icon={
            <IconCurrencyDollar size={24} stroke={2} strokeLinejoin="miter" />
          }
          title={'Matches'}
          link="/orders/matches"
        />
        <CircleOption
          icon={
            <IconBrandAppgallery size={24} stroke={2} strokeLinejoin="miter" />
          }
          title={'Estoque'}
          link={''}
        />
        <CircleOption
          icon={<IconNews size={24} stroke={2} strokeLinejoin="miter" />}
          title={'Tutorial'}
          link="/tutorial"
        />
      </div>

      <div className="md:max-w-5xl md:mx-auto w-full flex flex-col mt-5">
        <h1 className="text-primary text-xl font-bold">Dados</h1>
        <div className="shadow-xl md:flex stats w-full mb-5">
          <div className="stat py-8">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faHeart} className="w-12 h-12" />
            </div>
            <div className="stat-title">Matches Reservados</div>
            <div className="stat-value">{dashStatus.reserved}</div>
          </div>
          <div className="stat py-8">
            <div className="stat-figure text-info">
              <FontAwesomeIcon
                icon={faHeartCircleExclamation}
                className="w-12 h-12"
              />
            </div>
            <div className="stat-title">Matches em Análise</div>
            <div className="stat-value">{dashStatus.analyzing}</div>
          </div>
          <div className="stat py-8">
            <div className="stat-figure text-warning">
              <FontAwesomeIcon icon={faSackDollar} className="w-12 h-12" />
            </div>
            <div className="stat-title">Vendas Recebidas</div>
            <div className="stat-value">{dashStatus.done}</div>
          </div>
          <div className="stat py-8">
            <div className="stat-figure text-success">
              <i className="ml-4 icon ion-ios-calendar text-6xl"></i>
              <FontAwesomeIcon icon={faWallet} className="w-12 h-12" />
            </div>
            <div className="stat-title">Vendas a Receber</div>
            <div className="stat-value">{dashStatus.completed}</div>
          </div>
        </div>
      </div>

      <Container home={true}>
        <>
          <h1 className="text-xl font-semibold mb-5">Oportunidades</h1>
          {Opportunities.length > 0 ? (
            <Carousel
              ref={currentRefCarroussel}
              swipeable={false}
              showIndicators={false}
              swipeScrollTolerance={3000}
              showStatus={false}
              showThumbs={false}
              showArrows={false}
              emulateTouch={false}
              infiniteLoop={true}
              centerSlidePercentage={80}
              selectedItem={currentSlide}
            >
              {Opportunities &&
                Opportunities.map((res) => {
                  return (
                    <CardMatch key={res.expires_at} data={res} next={next} />
                  )
                })}
            </Carousel>
          ) : (
            <div className="card">
              <div className="card-body items-center justify-center gap-4">
                <div className="text-center">
                  <h1 className="text-black/50 text-lg font-medium">
                    Nenhum pedido disponível
                  </h1>
                  <span className="alert alert-success gap-1 bg-success/20 text-success font-medium text-sm">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="w-4 h-4"
                    />
                    Você será notificado assim que tivermos pedidos disponíves
                  </span>
                </div>
                <div className="md:w-3/4 flex flex-col items-center text-center">
                  <span>
                    Enquanto isso, tire todas as suas dúvidas sobre como
                    utilizar a BuyPhone
                  </span>
                  <BlurImage src={noOpportunitiesImg} />
                </div>
                <button
                  onClick={() => Router.push('/tutorial')}
                  className="btn btn-primary w-full"
                >
                  Ir para o tutorial
                </button>
              </div>
            </div>
          )}
        </>
      </Container>
      {Opportunities &&
        Opportunities.map((res) => {
          return <MatchModal data={res} />
        })}
    </>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const api = setupAPIClient(ctx)

  try {
    const { data: Opportunities } = await api.get('/opportunities')
    const { data: dashStatus } = await api.get('/stats')

    return {
      props: {
        Opportunities: Opportunities.data,
        dashStatus: dashStatus,
      },
    }
  } catch {
    destroyCookie(ctx, '@BuyPhone:Token')
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    }
  }
})
