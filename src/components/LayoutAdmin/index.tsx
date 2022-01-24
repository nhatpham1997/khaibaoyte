import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { GlobalContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import LoginAdmin from 'containers/AdminPage/LoginAdmin'
import { locationApi } from 'apis/covid'
import userApi from 'apis/userApi'
import adminApi from 'apis/adminApi'
import movingDeclarationApi from 'apis/movingDeclaration'
import movingRegisterApi from 'apis/movingRegister'

const SidebarAnimation = styled(Box)(() => ({
  animatedItem: {
    animation: `$myEffect 3000ms cubic-bezier(0.4, 0, 0.2, 1)`,
  },
  '@keyframes slideIn': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-200%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
    '@keyframes slideOut': {
      '0%': {
        opacity: 1,
        transform: 'translateX(0)',
      },
      '100%': {
        opacity: 0,
        transform: 'translateX(-200%)',
      },
    },
  },
}))

function LayoutAdmin() {
  const {
    miniSideNav,
    dataCovidLocations,
    isLogin,
    setLogin,
    dataUsers,
    dataAdmins,
    dataMovingDeclaration,
    dataMovingRegister,
  } = useContext(GlobalContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const name = localStorage.getItem('admin')
    if (name) {
      setLogin(name)
    }
    console.log(name)
    setLoading(false)
  }, [])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationApi.getAll()
        dataCovidLocations(response.data.locations)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchLocations()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getAll()
        dataUsers(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await adminApi.getAll()
        dataAdmins(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
      console.log(1)
    }
    fetchAdmin()
  }, [])

  useEffect(() => {
    const fetchMovingDeclaration = async () => {
      try {
        const response = await movingDeclarationApi.getAll()
        dataMovingDeclaration(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchMovingDeclaration()
  }, [])

  useEffect(() => {
    const fetchMovingRegister = async () => {
      try {
        const response = await movingRegisterApi.getAll()
        dataMovingRegister(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchMovingRegister()
  }, [])

  return (
    <>
      {!loading && isLogin === '' ? (
        <LoginAdmin />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(5, 1fr)"
          gap={1}
          sx={{
            fontSize: '1rem',
          }}
        >
          <Box
            gridColumn="span 1"
            sx={{
              display: { xs: `${miniSideNav === true ? 'block' : 'none'}`, lg: 'block' },
              zIndex: 10,
            }}
          >
            <SidebarAnimation>
              <Sidebar />
            </SidebarAnimation>
          </Box>
          <Box
            sx={{
              gridColumn: {
                xs: 'span 5',
                lg: 'span 4',
              },
              '& .MuiTableCell-root': { fontSize: '1.6rem' },
            }}
          >
            <Navbar />
            <Box>
              <Outlet />
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default LayoutAdmin
