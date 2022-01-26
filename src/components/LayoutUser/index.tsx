import React, { useState } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const LayoutUser = () => {
  const [titleHeader, setTitleHeader] = useState(
    localStorage.getItem('title') || 'Khai báo di chuyển'
  )

  return (
    <div className="app">
      {/* <Box sx={{ display: { xs: 'none', lg: 'unset' } }}>
      </Box> */}
      <Nav setTitleHeader={setTitleHeader} />
      <div className="wrap">
        <Header titleHeader={titleHeader} />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutUser
