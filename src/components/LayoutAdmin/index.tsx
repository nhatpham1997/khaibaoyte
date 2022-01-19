import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { GlobalContext } from 'contexts'
import { useContext } from 'react'
import styled from '@emotion/styled'

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
  const { miniSideNav } = useContext(GlobalContext)
  return (
    <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1}>
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
      <Box sx={{ gridColumn: { xs: 'span 5', lg: 'span 4' } }}>
        <Navbar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutAdmin
