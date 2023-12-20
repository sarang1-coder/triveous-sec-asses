import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import '../../assets/styles/navbar.css';

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <div className="brand-and-menu">
        <Link to="/" className="brand-name">
          THE OUTPOST
        </Link>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <MenuIcon />
        </button>
      </div>

      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul className="centered-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <AccountCircleIcon />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
