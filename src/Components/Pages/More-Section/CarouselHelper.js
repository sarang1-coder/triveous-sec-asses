import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import CarouselCard from './CarouselCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../utils/slice/dataSlice'

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
  const loading = useSelector((state) => state.data.loading)
  const error = useSelector((state) => state.data.error)
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
    <div style={{ backgroundColor: 'blueviolet', position: 'relative' }}>
      <Carousel
        showArrows={false}
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
      <button onClick={handlePrev} disabled={currentPage === 0}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  )
}

export default CarouselHelper
