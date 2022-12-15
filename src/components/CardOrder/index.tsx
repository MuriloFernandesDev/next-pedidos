import Link from 'next/link'
import { moneyMask } from '../../utils/masks'

interface ICardOrder {
  cod: string
  name: string
  receive: string | number
  price: string | number
  date: string
}

const CardOrder = ({ cod, name, receive, price, date }: ICardOrder) => {
  return (
    <div className="card shadow-md">
      <div className="card-body">
        <Link href="/orders/details">
          <div className="flex justify-between items-center text-black">
            <div className="flex flex-col gap-3">
              <span className="text-black/50 text-xs">{cod}</span>
              <span className="text-lg font-semibold">{name}</span>
              <span className="font-normal text-sm ">Receba em 30 dias</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-black/50">{date}</span>
              <span className="text-lg font-semibold">
                R${moneyMask(price.toString())}
              </span>
              <span className="text-xl font-semibold text-success">
                R$ {moneyMask(receive.toString())}
              </span>
            </div>
          </div>
        </Link>
        <button className="btn btn-outline hover:btn-primary">
          Reservar pedido
        </button>
      </div>
    </div>
  )
}

export default CardOrder
