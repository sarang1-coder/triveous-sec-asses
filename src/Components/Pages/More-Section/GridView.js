import React, { useState } from 'react'
import CarouselCard from './CarouselCard'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

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

const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`

const ModalContent = styled.div`
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h6 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto 20px;
  }

  button {
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 30vw; /* Set modal width to 30vw */
  max-width: 90%; /* Limit the width to prevent overflow on smaller screens */
`

const GridView = ({ items }) => {
  const halfIndex = Math.ceil(items.length / 2)
  const leftColumn = items.slice(0, halfIndex)
  const rightColumn = items.slice(halfIndex)

  const [selectedItem, setSelectedItem] = useState(null)

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

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
          <div key={item.id}>
            <div onClick={() => openModal(item)}>
              <CarouselCard content={item} />
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ModalBackground
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <ModalContent>
                <h2>{selectedItem.title}</h2>
                <h6>{selectedItem.description}</h6>
                <img
                  src={selectedItem.urlToImage}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                  alt="img"
                />
                <button style={{ border: 'none' }} onClick={closeModal}>
                  Close
                </button>
              </ModalContent>
            </motion.div>
          </ModalBackground>
        )}
      </AnimatePresence>
    </GridContainer>
  )
}

export default GridView
