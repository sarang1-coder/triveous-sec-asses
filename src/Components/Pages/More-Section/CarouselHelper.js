import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import CarouselCard from './CarouselCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../utils/slice/dataSlice'
import WestIcon from '@mui/icons-material/West'
import EastIcon from '@mui/icons-material/East'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'

const itemsPerPage = 4

const CustomArrow = ({ direction, onClick, disabled }) => (
  <div
    onClick={onClick}
    disabled={disabled}
    style={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [direction === 'left' ? 'left' : 'right']: 0,
      cursor: 'pointer',
      zIndex: 2,
    }}
  >
    {direction === 'left' ? '<' : '>'}
  </div>
)

const CarouselHelper = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const data = useSelector((state) => state.data.data)
  let info = data?.indianNews?.TopNews?.articles
  console.log('data', info)

  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(info?.length / itemsPerPage)

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
  }

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
  }

  const startIndex = currentPage * itemsPerPage
  const visibleItems = info
    ? info.slice(startIndex, startIndex + itemsPerPage)
    : []
  const itemsInRows = []
  for (let i = 0; i < visibleItems.length; i += 4) {
    itemsInRows.push(visibleItems?.slice(i, i + 4))
  }

  return (
    <>
      <div
        className="heading"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: ' 0 4rem',
        }}
      >
        <h3>More on Us</h3>
        <Button className="toggle-btn" variant="outlined">
          GRID VIEW
        </Button>
      </div>
      <motion.div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            color="error"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            PREV
            <WestIcon />
          </Button>
        </motion.div>
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          emulateTouch={true}
          selectedItem={currentPage}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <CustomArrow
                direction="left"
                onClick={onClickHandler}
                disabled={!hasPrev}
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <CustomArrow
                direction="right"
                onClick={onClickHandler}
                disabled={!hasNext}
              />
            )
          }
        >
          {itemsInRows.map((row, index) => (
            <div key={index}>
              <div style={{ display: 'flex' }}>
                {row.map((item) => (
                  <CarouselCard key={item.id} content={item} />
                ))}
              </div>
            </div>
          ))}
        </Carousel>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            color="error"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            NEXT
            <EastIcon />
          </Button>
        </motion.div>
      </motion.div>
    </>
  )
}

export default CarouselHelper
