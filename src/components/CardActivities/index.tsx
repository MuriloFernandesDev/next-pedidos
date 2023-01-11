import { IOrder } from '../../types/user'

interface CardActivitiesProps {
  order: IOrder
}

const CardActivities = ({ order }: CardActivitiesProps) => {
  return (
    <div className="card shadow-md">
      <div className="card-body">
        <div className="flex justify-between">
          <span className="text-info">{order.code}</span>
          <span className="badge bg-transparent font-semibold border-[#FF316A] text-[#FF316A]">
            {order.dates.match_expires_translated}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">
              {order.product.name} {order.product.color} {order.product.memory}
            </span>
            <span>Valor a receber</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-lg font-semibold">R$ {order.price}</span>
            <span className="text-xl font-semibold text-success">
              R$ {order.will_receive}
            </span>
            <p className="text-black/50 text-xs">{order.dates.invoice_date}</p>
          </div>
        </div>
        <button className="btn btn-outline hover:btn-primary">
          Enviar comprovantes
        </button>
      </div>
    </div>
  )
}

export default CardActivities
