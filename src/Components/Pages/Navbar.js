import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import '../../assets/styles/navbar.css'
import { Button } from '@mui/material'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    const auth = getAuth()
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error.message)
    }
  }
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <nav className="navigation">
      <div className="brand-and-menu">
        <Link to="/" className="brand-name">
          THE OUTPOST
        </Link>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
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
          <li>
            {user ? (
              <span
                color="inherit"
                style={{ cursor: 'pointer' }}
                onClick={handleSignOut}
              >
                Logout
              </span>
            ) : (
              <span
                color="inherit"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/signin')}
              >
                Login
              </span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
