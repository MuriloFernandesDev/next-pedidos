import Container from '../../components/Container'
import React from 'react'
import CardOrder from '../../components/CardOrder'

export default function Orders() {
  return (
    <Container bgColor="bg-[#F9F9F9]" title="Pedidos disponíveis">
      <React.Fragment>
        <div className="flex flex-col gap-4 mt-6 text-primary">
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
        </div>
      </React.Fragment>
    </Container>
  )
}
