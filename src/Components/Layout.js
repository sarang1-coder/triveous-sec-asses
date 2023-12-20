import React from 'react'
import Navbar from './Pages/Navbar'
import Footer from './Pages/Footer'
import Home from './Pages/Home'

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <Home />
      </div>
      <Footer />
    </>
  )
}

export default Layout
