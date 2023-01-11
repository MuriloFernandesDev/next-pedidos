import Container from '../../components/Container'
import React from 'react'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { useCookies } from '../../utils/useCookies'
import { IOpportunities } from '../../types/user'
import { moneyMask } from '../../utils/masks'

interface DetailsProps {
  OrderDetails: IOpportunities
}

export default function Details({ OrderDetails }: DetailsProps) {
  const resultDiscount = OrderDetails.price - OrderDetails.will_receive
  const resultDiscountPercent = (
    (resultDiscount / OrderDetails.price) *
    100
  ).toFixed(1)

  return (
    <Container title="Detalhes do pedido">
      <div className="px-4">
        <div className="card shadow-md mt-11">
          <div className="card-body text-black gap-4">
            <div>
              <span>ID do pedido</span>
              <p className="text-black/60">{OrderDetails.code}</p>
            </div>
            <div>
              <span>Produto</span>
              <p className="text-black/60">
                {OrderDetails.product.name} {OrderDetails.product.color}{' '}
                {OrderDetails.product.memory}
              </p>
            </div>
            <div>
              <span>Valor do pedido</span>
              <p className="text-black/60">
                R$ {moneyMask(OrderDetails.price.toString())}
              </p>
            </div>
            <div>
              <span>Percentual retido pela BuyPhone</span>
              <p className="text-black/60">{resultDiscountPercent}%</p>
            </div>
            <div className="flex gap-10 items-center">
              <div>
                <span>Data pedido</span>
                <p className="text-black/60">12/12/2022</p>
              </div>
              <div>
                <span>Data do recebimento</span>
                <p className="text-black/60">12/12/2023</p>
              </div>
            </div>
            <div>
              <span>Valor que recebe</span>
              <p className="text-black/60">
                R$ {moneyMask(OrderDetails.will_receive.toString())}
              </p>
            </div>
            <div>
              <span>Tipo do match</span>
              <p className="text-black/60">Comprando o produto</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const details = useCookies('@BuyPhone:OrderDetails', ctx)

  if (details) {
    return {
      props: {
        OrderDetails: details,
      },
    }
  } else {
    return {
      redirect: {
        destination: '/orders',
        permanent: false,
      },
    }
  }
}, '/orders/details')
