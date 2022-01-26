import React, { useEffect, useState } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Nav from './Nav'
import { Outlet, useNavigate } from 'react-router-dom'

const LayoutUser = () => {
  const [showNav, setShowNav] = useState(false)

  const [titleHeader, setTitleHeader] = useState(
    localStorage.getItem('title') || 'Khai báo di chuyển'
  )
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setLoading(false)
    } else {
      navigate('/')
    }
  }, [])
  return (
    <>
      {!loading && (
        <div className="app">
          <Nav showNav={showNav} setTitleHeader={setTitleHeader} />
          <div className="wrap">
            <Header showNav={showNav} setShowNav={setShowNav} titleHeader={titleHeader} />
            <Content>
              <Outlet />
            </Content>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default LayoutUser
