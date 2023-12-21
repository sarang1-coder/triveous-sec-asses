import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarouselCard from './CarouselCard';
import ItemModal from './ItemModal';

const ListView = ({ items, selectedTitle, setSelectedTitle }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isBlur, setIsBlur] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768) {
        setVisibleItems(items.slice(0, 4));
      } else if (screenWidth < 768 && screenWidth >= 500) {
        setVisibleItems(items.slice(0, 2));
      } else {
        setVisibleItems([]);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
    setIsBlur(true);
    setBackgroundOpacity(0.7);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsBlur(false);
    setBackgroundOpacity(0);
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <motion.div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsBlur(false)}
      >
        {visibleItems.map((item) => (
          <motion.div
            key={item.title}
            onClick={() => handleItemClick(item)}
            style={{
              marginRight: '20px',
              border: selectedTitle === item.title ? '1px solid blue' : 'none',
              borderRadius: '4px',
              filter: isBlur ? 'blur(5px)' : 'none',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <CarouselCard content={item} />
          </motion.div>
        ))}
      </motion.div>

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
              backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
              zIndex: 999,
            }}
          >
            <ItemModal
              isOpen={modalIsOpen}
              closeModal={closeModal}
              selectedItem={selectedItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListView;
