import React, { useState } from 'react';
import CarouselCard from './CarouselCard';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ItemModal from './ItemModal';

const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 0 0 50%;
`;

const GridView = ({ items }) => {
  const halfIndex = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, halfIndex);
  const rightColumn = items.slice(halfIndex);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  return (
    <GridContainer>
      <LeftColumn>
        {leftColumn.map((item) => (
          <div key={item.id} onClick={() => openModal(item)}>
            <CarouselCard content={item} />
          </div>
        ))}
      </LeftColumn>
      <div style={{ marginLeft: '10px' }}>
        {rightColumn.map((item) => (
          <div key={item.id} onClick={() => openModal(item)}>
            <CarouselCard content={item} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
            onClick={closeModal}
          >
            <ItemModal
              isOpen={modalIsOpen}
              closeModal={closeModal}
              selectedItem={selectedItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </GridContainer>
  );
};

export default GridView;
