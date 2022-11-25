import Container from '../../components/Container'
import React from 'react'
import CardActivities from '../../components/CardActivities'

export default function Matches() {
  return (
    <Container bgColor="bg-[#F9F9F9]" title="Matches">
      <React.Fragment>
        <div className="flex flex-col gap-4 mt-6 text-primary">
          <CardActivities />
          <CardActivities />
          <CardActivities />
          <CardActivities />
        </div>
      </React.Fragment>
    </Container>
  )
}
