import { useRouter } from 'next/router'
import { IOpportunities } from '../../types/user'
import { moneyMask } from '../../utils/masks'
import { setCookies } from '../../utils/useCookies'

interface ICardOrder {
  data: IOpportunities
}

const CardOrder = ({ data }: ICardOrder) => {
  const router = useRouter()

  function handleOrderDetails() {
    const dataCookies = {
      ...data,
    }
    setCookies('@BuyPhone:OrderDetails', dataCookies, undefined)
    router.push('/orders/details')
  }

  return (
    <div className="card shadow-md w-full">
      <div className="card-body">
        <div className="flex justify-between items-center text-black">
          <div className="flex flex-col gap-3">
            <span className="text-black/50 text-xs">{data.code}</span>
            <span className="text-lg font-semibold">{data.product.name}</span>
            <span className="font-normal text-sm ">Receba em 30 dias</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-black/50">{data.expires_at}</span>
            <span className="text-lg font-semibold">
              R${moneyMask(data.price.toString())}
            </span>
            <span className="text-xl font-semibold text-success">
              R$ {moneyMask(data.miles.miles_money.toString())}
            </span>
          </div>
        </div>

        <label
          className="btn btn-outline hover:btn-primary normal-case"
          htmlFor={data.order_id.toString()}
        >
          Reservar pedido
        </label>
        <button
          className="btn btn-primary normal-case"
          onClick={handleOrderDetails}
        >
          Ver detalhes do pedido
        </button>
      </div>
    </div>
  )
}

export default CardOrder
