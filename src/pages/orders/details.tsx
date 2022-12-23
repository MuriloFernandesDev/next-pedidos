import Container from '../../components/Container'
import React from 'react'

export default function Details() {
  return (
    <Container title="Detalhes do pedido">
      <div className="px-4">
        <div className="card shadow-md mt-11">
          <div className="card-body text-black gap-4">
            <div>
              <span>ID do pedido</span>
              <p className="text-black/60">#c15c6165</p>
            </div>
            <div>
              <span>Produto</span>
              <p className="text-black/60">iPhone 12 Apple Branco 64Gb</p>
            </div>
            <div>
              <span>Valor do pedido</span>
              <p className="text-black/60">R$3.430,00</p>
            </div>
            <div>
              <span>Pecentual retido BuyPhone</span>
              <p className="text-black/60">7,5%</p>
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
              <p className="text-black/60">R$3.172,75</p>
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
