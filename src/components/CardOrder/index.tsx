import Link from 'next/link'

const CardOrder = () => {
  return (
    <div className="card shadow-md">
      <div className="card-body">
        <Link href="/orders/details">
          <div className="flex justify-between items-center text-black">
            <div className="flex flex-col gap-3">
              <span className="text-black/50 text-xs">#C1215S1C5</span>
              <span className="text-lg font-semibold">
                iPhone 12 Apple Branco 64Gb
              </span>
              <span className="font-normal text-sm ">Receba em 30 dias</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-black/50">29/08/22</span>
              <span className="text-lg font-semibold">R$5.198,60</span>
              <span className="text-xl font-semibold text-success">
                R$4.198,60
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
