import React, { useState } from 'react'
import About from './About'
import OverView from './Overview'
import { Button } from '@mui/material'
import '../../../assets/styles/info.css'

const Information = () => {
  const [content, setContent] = useState('')

  const handleAboutClick = () => {
    setContent('about')
  }

  const handleOverviewClick = () => {
    setContent('overview')
  }
  return (
    <>
      <div className="switch-container">
        <div className="switch-button">
          <Button className="btn" onClick={handleAboutClick}>
            About
          </Button>
          <Button className="btn" onClick={handleOverviewClick}>
            Overview
          </Button>
        </div>
        <div className='component'>
          {content === 'about' && <About />}
          {content === 'overview' && <OverView />}
        </div>
      </div>
    </>
  )
}

export default Information
