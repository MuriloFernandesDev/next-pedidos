import Container from '../../components/Container'
import React from 'react'
import CardOrder from '../../components/CardOrder'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { setupAPIClient } from '../../service/api'
import { IOrder } from '../../types/user'
import { destroyCookie } from 'nookies'

interface OrdersProps {
  Orders: Array<IOrder> | null
}

export default function Orders({ Orders }: OrdersProps) {
  return (
    <Container title="Pedidos disponíveis">
      <React.Fragment>
        <div className="flex flex-col gap-4 mt-6 text-primary">
          {Orders &&
            Orders.map((res) => (
              <CardOrder
                key={res.code}
                cod={res.code}
                date={res.date}
                name={res.product.name}
                price={res.price}
                receive={res.will_receive}
              />
            ))}
        </div>
      </React.Fragment>
    </Container>
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
