import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import CarouselCard from './CarouselCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../utils/slice/dataSlice';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Button, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomPrevButton, CustomNextButton } from './CustomButton.js';
import ListView from './ListView';
import GridView from './GridView';
import { Modal, Backdrop } from './Modal.js';

const itemsPerPage = 4;

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
);

const CarouselHelper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const data = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.loading);
  let info = data?.indianNews?.TopNews?.articles;
  console.log('data', info);

  const [currentPage, setCurrentPage] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null); // Modified state to store the selected title
  const [selectedItemInfo, setSelectedItemInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (title) => { // Update to receive title instead of ID
    setSelectedTitle(title); // Set the selected title
    setIsModalOpen(true);
    const selectedItemInfo = {
      title: info.find(item => item.title === title)?.title,
      description: info.find(item => item.title === title)?.description,
      date: info.find(item => item.title === title)?.publishedAt,
      image: info.find(item => item.title === title)?.urlToImage,
    };
    setSelectedItemInfo(selectedItemInfo);
  };

  const closeModal = () => {
    setSelectedTitle(null);
    setIsModalOpen(false);
  };

  const totalPages = Math.ceil(info?.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = info
    ? info.slice(startIndex, startIndex + itemsPerPage)
    : [];
  const itemsInRows = [];
  for (let i = 0; i < visibleItems.length; i += 4) {
    itemsInRows.push(visibleItems?.slice(i, i + 4));
  }

  const toggleGridView = () => {
    setIsGridView((prev) => !prev);
  };

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
        <Button
          className="toggle-btn"
          variant="outlined"
          onClick={toggleGridView}
        >
          {isGridView ? 'ONE COLUMN VIEW' : 'TWO COLUMN VIEW'}
        </Button>
      </div>

      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <motion.div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CustomPrevButton onClick={handlePrev} disabled={currentPage === 0} />
          {isGridView ? (
            <GridView
              items={visibleItems}
              selectedTitle={selectedTitle}
              setSelectedTitle={setSelectedTitle}
            />
          ) : (
            <ListView
              items={visibleItems}
              selectedTitle={selectedTitle}
              setSelectedTitle={setSelectedTitle}
            />
          )}
          <CustomNextButton
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          />
          <AnimatePresence>
            {isModalOpen && selectedItemInfo && (
              <>
                <Modal
                  title={selectedItemInfo.title}
                  description={selectedItemInfo.description}
                  date={selectedItemInfo.publishedAt}
                  image={selectedItemInfo.urlToImage}
                  onClose={closeModal}
                />
                <Backdrop onClick={closeModal} />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};

export default CarouselHelper;
