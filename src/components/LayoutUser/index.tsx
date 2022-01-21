import LoginPage from 'containers/UserPage/LoginForm'
import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <div className="app">
      <Nav />
      <div className="wrap">
        <Header />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutUser
