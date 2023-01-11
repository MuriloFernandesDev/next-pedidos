import Container from '../../components/Container'
import React, { useContext, useEffect, useState } from 'react'
import CardOrder from '../../components/CardOrder'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { setupAPIClient } from '../../service/api'
import { IOpportunities } from '../../types/user'
import MatchModal from '../../components/Modals/MatchModal'
import { toast } from 'react-toastify'
import { deleteCookie } from 'cookies-next'
import axios from 'axios'
import Router from 'next/router'
import { AuthContext } from '../../contexts/AuthContext'

interface OrdersProps {
  Orders: Array<IOpportunities> | null
}

export default function Orders({ Orders }: OrdersProps) {
  const [ordersVariant, setOrdersVariant] = useState(Orders) //state para controlar os dados de Orders

  useEffect(() => {
    async function verifyVariablesFromServer() {
      if (!ordersVariant) {
        try {
          const { data: Opportunities } = await axios.get('/api/opportunities')
          setOrdersVariant(Opportunities.data)
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
    verifica se os dados de Orders foram carregados pelo lado do servidor,
    se não foi carregado tenta carregar pelo lado do cliente,
    se não conseguir desloga o usuário pois tem algo de errado com o token dos cookies 
    */
  }, [])

  return (
    <>
      <Container title="Pedidos disponíveis">
        <React.Fragment>
          <div className="flex flex-col gap-4 mt-6 text-primary">
            {ordersVariant &&
              ordersVariant.map((res) => (
                <CardOrder key={res.code} data={res} />
              ))}
          </div>
        </React.Fragment>
      </Container>
      {ordersVariant &&
        ordersVariant.map((res) => {
          return <MatchModal key={res.order_id} data={res} />
        })}
    </>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const api = setupAPIClient(ctx)
  try {
    const { data: Opportunities } = await api.get('/opportunities')

    return {
      props: {
        Orders: Opportunities.data,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        Orders: null,
      },
    }
  }
}, '/orders')
