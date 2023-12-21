import React, { useState, useEffect } from 'react';
import CarouselCard from './CarouselCard';

const ListView = ({ items, selectedTitle, setSelectedTitle }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [fontSize, setFontSize] = useState('16px');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setVisibleItems(items.slice(0, 2));
        setFontSize('14px');
      } else {
        setVisibleItems(items);
        setFontSize('16px');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  const handleItemClick = (title) => {
    if (selectedTitle === title) {
      setSelectedTitle(null); // If the clicked item is already selected, deselect it
    } else {
      setSelectedTitle(title); // Select the clicked item
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          fontSize: fontSize,
        }}
      >
        {visibleItems.map((item) => (
          <div
            key={item.title}
            onClick={() => handleItemClick(item.title)}
            style={{
              marginRight: '20px',
              border: selectedTitle === item.title ? '1px solid blue' : 'none',
              borderRadius: '4px',
            }}
          >
            <CarouselCard content={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
