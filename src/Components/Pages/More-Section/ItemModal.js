import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ItemModal = ({ isOpen, closeModal, selectedItem }) => {
  const smallScreenModalStyles = {
    width: '80%',
    maxWidth: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const largeScreenModalStyles = {
    width: '50%',
    maxWidth: '600px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const modalStyles =
    window.innerWidth < 768 ? smallScreenModalStyles : largeScreenModalStyles

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            ...modalStyles,
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
          }}
        >
          <h2>{selectedItem.title}</h2>
          <p>{selectedItem.description}</p>
          <img
            src={selectedItem.urlToImage}
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
            alt="img"
          />
          <br />
          <button style={{ border: 'none' }} onClick={closeModal}>
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ItemModal
