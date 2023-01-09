import Container from '../../components/Container'
import React from 'react'
import CardOrder from '../../components/CardOrder'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { setupAPIClient } from '../../service/api'
import { IOpportunities, IOrder } from '../../types/user'
import { destroyCookie } from 'nookies'
import MatchModal from '../../components/Modals/MatchModal'

interface OrdersProps {
  Orders: Array<IOpportunities> | null
}

export default function Orders({ Orders }: OrdersProps) {
  console.log(Orders)
  return (
    <>
      <Container title="Pedidos disponíveis">
        <React.Fragment>
          <div className="flex flex-col gap-4 mt-6 text-primary">
            {Orders &&
              Orders.map((res) => (
                <CardOrder
                  key={res.code}
                  cod={res.code}
                  date={res.expires_at}
                  name={res.product.name}
                  price={res.price}
                  receive={res.will_receive}
                  order_id={res.order_id}
                />
              ))}
          </div>
        </React.Fragment>
      </Container>
      {Orders &&
        Orders.map((res) => {
          return <MatchModal data={res} />
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
  } catch {
    destroyCookie(ctx, '@BuyPhone:Token')
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    }
  }
}, '/orders')
