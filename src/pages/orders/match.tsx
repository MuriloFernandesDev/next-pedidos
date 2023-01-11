import Container from '../../components/Container'
import React, { useEffect, useState } from 'react'
import CardActivities from '../../components/CardActivities'
import { setupAPIClient } from '../../service/api'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { IOrder } from '../../types/user'
import axios from 'axios'
import NotFoundBella from '../../components/NotFoundBella'
import LoadingComponent from '../../components/LoadingComponent'

interface MatchProps {
  Orders: Array<IOrder>
}

export default function Match({ Orders }: MatchProps) {
  const [ordersVariant, setOrdersVariant] = useState(Orders)
  const [loading, setLoading] = useState(Orders ? false : true)

  useEffect(() => {
    async function loadOrders() {
      if (!ordersVariant) {
        setLoading(true)
        try {
          const { data: orders } = await axios.get('/api/orders')
          setLoading(false)
          setOrdersVariant(orders.data)
        } catch (error) {
          setLoading(false)
        }
      }
    }
    loadOrders()
  }, [])

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Container title="Match's">
          <React.Fragment>
            <div className="flex flex-col gap-4 mt-6 text-primary">
              {ordersVariant && ordersVariant.length >= 1 ? (
                ordersVariant.map((order) => <CardActivities order={order} />)
              ) : (
                <NotFoundBella title="Você ainda não possui nenhum match." />
              )}
            </div>
          </React.Fragment>
        </Container>
      )}
    </>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const api = setupAPIClient(ctx)
  try {
    const { data: Orders } = await api.get('/orders')

    return {
      props: {
        Orders: Orders.data,
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
