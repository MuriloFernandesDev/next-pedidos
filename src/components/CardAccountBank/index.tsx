const CardAccountBank = () => {
  return (
    <div className="card">
      <div className="card-body bg-primary text-white">
        <div className="flex gap-3">
          <input
            className="checkbox checkbox-accent bg-white"
            type={'checkbox'}
          />
          <div className="flex flex-col text-xs text-white/60">
            <span className="text-sm text-white">Conta PJ BB (Principal)</span>
            <span>CPF/CNPJ 42424424000155</span>
            <span>Banco do Brasil</span>
            <span>Ag 3341-3 CC 32320-9</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardAccountBank
