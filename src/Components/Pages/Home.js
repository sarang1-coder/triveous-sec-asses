import React, { useState } from 'react'
import { Button } from '@mui/material'
import '../../assets/styles/home.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import TourIcon from '@mui/icons-material/Tour'
import ShareIcon from '@mui/icons-material/Share'
import Information from './Information/Information'
import CarouselHelper from './More-Section/CarouselHelper'

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="left-content">
          <div className="content">
            <img
              src="https://th.bing.com/th/id/OIP.cATQxRgebYsX8MZC9Iqb4wHaHa?pid=ImgDet&w=195&h=195&c=7"
              alt="chatgpt-logo"
              className="chatgpt-logo"
            />
            <div className="info">
              <p>
                <b>
                  Chat GPT <br />
                  <small>OPEN AI</small>
                </b>
              </p>
              <div className="likes-views">
                <ul className="likes-views-list">
                  <li>
                    <FavoriteIcon />
                    &ensp;700k LIKES
                  </li>
                  <li>
                    <RemoveRedEyeIcon />
                    &ensp;1.2M VIEWS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="buttons">
            <Button variant="contained" style={{ margin: '0 1rem' }}>
              <BookmarkIcon />
              Like
            </Button>
            <Button variant="contained" style={{ margin: '0 1rem' }}>
              <TourIcon />
              Visit-Site
            </Button>
            <Button variant="contained" style={{ margin: '0 1rem' }}>
              <ShareIcon />
              Share
            </Button>
          </div>
        </div>
      </div>
      <Information />
      <CarouselHelper />
    </>
  )
}

export default Home
