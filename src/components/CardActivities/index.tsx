const CardActivities = () => {
  return (
    <div className="card shadow-md">
      <div className="card-body">
        <div className="flex justify-between">
          <span className="text-info">#C122222A12</span>
          <span className="badge bg-transparent font-semibold border-[#FF316A] text-[#FF316A]">
            Reservado
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">
              iPhone 12 Apple Branco 64Gb
            </span>
            <span>Valor a receber</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-lg font-semibold">R$5.198,60</span>
            <span className="text-xl font-semibold text-success">
              R$4.198,60
            </span>
            <p className="text-black/50 text-xs">29/08/22</p>
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
