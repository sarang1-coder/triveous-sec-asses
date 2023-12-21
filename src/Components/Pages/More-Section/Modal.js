// import React from 'react'
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
// } from '@mui/material'
// import { motion } from 'framer-motion'

// const Modal = ({ title, description, date, image, onClose }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       style={{
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         backgroundColor: 'wheat',
//         borderRadius: '1rem',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         padding: '20px',
//         zIndex: 999,
//       }}
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           left: '10px',
//           background: 'none',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '18px',
//           padding: '4px',
//         }}
//       >
//         <b>x</b>
//       </button>
//       <div
//         style={{
//           flex: '1',
//           padding: '0 20px',
//           fontFamily: 'Nanum Myeongjo serif',
//         }}
//       >
//         <h2>
//           <u>{title}</u>
//         </h2>
//         <p>{description}</p>
//         <p>
//           <b>PUBLISHED ON:</b>&emsp;{date}
//         </p>
//       </div>
//       <div style={{ flex: '1' }}>
//         <img
//           src={image}
//           alt={title}
//           style={{
//             maxWidth: '100%',
//             maxHeight: '100%',
//             objectFit: 'cover',
//             overflowBlock: 'none',
//             borderRadius: '1rem',
//           }}
//         />
//       </div>
//     </motion.div>
//   )
// }

// const Backdrop = ({ onClick }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.7 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.4)',
//         backdropFilter: 'blur(4px)',
//         zIndex: 99,
//       }}
//       onClick={onClick}
//     ></motion.div>
//   )
// }

// export { Modal, Backdrop }

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  addDoc,
  collection,
  Timestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { addToFirestore, deleteFromFirestore } from '../../../utils/api/dbCall'
import { db } from '../../../utils/firebase'
import { toast } from 'react-hot-toast'

const Modal = ({ title, description, date, image, onClose }) => {
  const [isSavedToFirestore, setIsSavedToFirestore] = useState(false)

  const saveToFirestore = async () => {
    try {
      if (isSavedToFirestore) {
        await deleteFromFirestore(title)
        setIsSavedToFirestore(false)
        toast.success('Information removed successfully')
        return
      }

      const added = await addToFirestore(title, description, image)
      if (added) {
        setIsSavedToFirestore(true)
        toast.success('Information added successfully')
      } else {
        toast.error('Error in adding data')
      }
    } catch (error) {
      console.error('Error saving/deleting data:', error)
      toast.error('Error in saving/deleting data')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'wheat',
        borderRadius: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        zIndex: 999,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          padding: '4px',
        }}
      >
        <b>x</b>
      </button>
      <div
        style={{
          flex: '1',
          padding: '0 20px',
          fontFamily: 'Nanum Myeongjo serif',
        }}
      >
        <h2>
          <u>{title}</u>
        </h2>
        <p>{description}</p>
        <p>
          <b>PUBLISHED ON:</b>&emsp;{date}
        </p>
      </div>
      <div style={{ flex: '1' }}>
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
            overflowBlock: 'none',
            borderRadius: '1rem',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          cursor: 'pointer',
        }}
        onDoubleClick={() => {
          deleteFromFirestore()
        }}
      >
        {isSavedToFirestore ? (
          <FavoriteIcon style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon
            onClick={() => {
              saveToFirestore()
            }}
            style={{ color: 'red' }}
          />
        )}
      </div>
    </motion.div>
  )
}

const Backdrop = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 99,
      }}
      onClick={onClick}
    ></motion.div>
  )
}

export { Modal, Backdrop }
