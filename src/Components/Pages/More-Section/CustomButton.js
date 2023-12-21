import React from 'react'
import { Button } from '@mui/material'
import WestIcon from '@mui/icons-material/West'
import EastIcon from '@mui/icons-material/East'
import { motion } from 'framer-motion'

const CustomPrevButton = ({ onClick, disabled }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <Button color="error" onClick={onClick} disabled={disabled}>
      PREV
      <WestIcon />
    </Button>
  </motion.div>
)

const CustomNextButton = ({ onClick, disabled }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <Button color="error" onClick={onClick} disabled={disabled}>
      NEXT
      <EastIcon />
    </Button>
  </motion.div>
)

export { CustomPrevButton, CustomNextButton }
