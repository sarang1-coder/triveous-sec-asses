import React from 'react'
import CarouselCard from './CarouselCard'
import styled from 'styled-components'

const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftColumn = styled.div`
  flex: 0 0 50%;
`

const GridView = ({ items, selectedId, setSelectedId }) => {
  const halfIndex = Math.ceil(items.length / 2)
  const leftColumn = items.slice(0, halfIndex)
  const rightColumn = items.slice(halfIndex)

  return (
    <GridContainer>
      <LeftColumn>
        {leftColumn.map((item) => (
          <div key={item.id}>
            <CarouselCard content={item} />
          </div>
        ))}
      </LeftColumn>
      <div style={{ marginLeft: '10px' }}>
        {rightColumn.map((item) => (
          <div key={item.id} onClick={() => setSelectedId(item.id)}>
            <CarouselCard content={item} />
          </div>
        ))}
      </div>
    </GridContainer>
  )
}

export default GridView
