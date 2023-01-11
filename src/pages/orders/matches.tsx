import Container from '../../components/Container'
import React from 'react'
import CardActivities from '../../components/CardActivities'

export default function Matches() {
  return (
    <Container title="Matches">
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
