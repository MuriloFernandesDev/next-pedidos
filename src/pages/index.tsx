import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  faExclamationCircle,
  faHeart,
  faHeartCircleExclamation,
  faSackDollar,
  faUser,
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
import {
  IconBrandAppgallery,
  IconCurrencyDollar,
  IconNews,
  IconTags,
} from '@tabler/icons'
import MatchModal from '../components/Modals/MatchModal'
import axios from 'axios'
import { toast } from 'react-toastify'
import { deleteCookie } from 'cookies-next'
import { AuthContext } from '../contexts/AuthContext'
import LoadingComponent from '../components/LoadingComponent'

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

export default function Home({ dashStatus, Opportunities }: HomeProps) {
  const currentRefCarroussel = useRef<any | null>(null) //state para pegar ref do carrossel
  const [currentSlide, setCurrentSlide] = useState(1) //state para controlar item ativo do carrossel
  const [dashStatusVariant, setDashStatusVariant] = useState(dashStatus) //state para carregar dados da dash
  const [opportunitiesVariant, setOpportunitiesVariant] =
    useState(Opportunities) //state para carregar dados de oportunidades de match
  const [loading, setLoading] = useState(
    dashStatus && Opportunities ? false : true
  ) //state para controlar o componente de Loading

  useEffect(() => {
    async function verifyVariablesFromServer() {
      if (!dashStatusVariant) {
        setLoading(true)
        try {
          const { data: dashStatus } = await axios.get('/api/stats')
          setDashStatusVariant(dashStatus)
          setLoading(false)
        } catch {
          toast.error(
            'Não foi possível carregar os dados, faça login novamente...'
          )
          deleteCookie('@BuyPhone:Token')
          Router.push('/account/login')
        }
      } else if (!opportunitiesVariant) {
        try {
          const { data: Opportunities } = await axios.get('/api/opportunities')
          setOpportunitiesVariant(Opportunities.data)
          setLoading(false)
        } catch {
          toast.error(
            'Não foi possível carregar os dados, faça login novamente...'
          )
          deleteCookie('@BuyPhone:Token')
          Router.push('/account/login')
        }
      }
    }
    verifyVariablesFromServer()
    /*
      verifica se os dados foram carregados no servidor /
      se foi, não faz nada, se não foi tenta carregar pelo lado do cliente,
      se não conseguir desloga o usuário pois tem algo de errado com o token nos cookies
    */
  }, [])

  function next() {
    const maxCurrent = currentRefCarroussel.current?.itemsRef.length

    if (currentSlide >= maxCurrent) {
      setCurrentSlide(1)
      return
    }
    setCurrentSlide(currentSlide + 1)
  } /*  chama o próximo item do carrossel de oportunidades de match  */

  const { user } = useContext(AuthContext)

  return (
    <>
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
          link="/orders/match"
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

      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="md:max-w-5xl md:mx-auto w-full flex flex-col mt-5">
            <h1 className="text-primary text-xl font-bold">Dados</h1>
            <div className="shadow-xl md:flex stats w-full mb-5">
              <div className="stat py-8">
                <div className="stat-figure text-secondary">
                  <FontAwesomeIcon icon={faHeart} className="w-12 h-12" />
                </div>
                <div className="stat-title">Matches Reservados</div>
                <div className="stat-value">{dashStatusVariant.reserved}</div>
              </div>
              <div className="stat py-8">
                <div className="stat-figure text-info">
                  <FontAwesomeIcon
                    icon={faHeartCircleExclamation}
                    className="w-12 h-12"
                  />
                </div>
                <div className="stat-title">Matches em Análise</div>
                <div className="stat-value">{dashStatusVariant.analyzing}</div>
              </div>
              <div className="stat py-8">
                <div className="stat-figure text-warning">
                  <FontAwesomeIcon icon={faSackDollar} className="w-12 h-12" />
                </div>
                <div className="stat-title">Vendas Recebidas</div>
                <div className="stat-value">{dashStatusVariant.done}</div>
              </div>
              <div className="stat py-8">
                <div className="stat-figure text-success">
                  <i className="ml-4 icon ion-ios-calendar text-6xl"></i>
                  <FontAwesomeIcon icon={faWallet} className="w-12 h-12" />
                </div>
                <div className="stat-title">Vendas a Receber</div>
                <div className="stat-value">{dashStatusVariant.completed}</div>
              </div>
            </div>
          </div>

          <Container home={true}>
            <>
              <h1 className="text-xl font-semibold mb-5">Oportunidades</h1>
              {opportunitiesVariant.length > 0 ? (
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
                  {opportunitiesVariant.map((res) => {
                    return (
                      <CardMatch key={res.cart_id} data={res} next={next} />
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
                        Você será notificado assim que tivermos pedidos
                        disponíves
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
        </>
      )}
      {opportunitiesVariant &&
        opportunitiesVariant.map((res) => {
          return <MatchModal key={res.cart_id} data={res} />
        })}
    </>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const api = setupAPIClient(ctx)

  try {
    const { data: dashStatus } = await api.get('/stats')
    const { data: Opportunities } = await api.get('/opportunities')

    return {
      props: {
        dashStatus: dashStatus,
        Opportunities: Opportunities.data,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        dashStatus: null,
        Opportunities: null,
      },
    }
  }
})
