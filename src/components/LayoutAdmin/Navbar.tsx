import Box, { BoxProps } from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Breadcrumbs from './Breadcrumbs'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import React, { useContext } from 'react'
import { GlobalContext } from 'contexts'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

function Item(props: BoxProps) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        m: 1,
        ...sx,
      }}
      {...other}
    />
  )
}

function Navbar() {
  const { miniSideNav, setMiniSideNav } = useContext(GlobalContext)
  const { setLogin } = React.useContext(GlobalContext)
  const navigate = useNavigate()

  const handleMenuButton = () => {
    setMiniSideNav(!miniSideNav)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin')
    setLogin('')
    navigate('/admin')
  }

  return (
    <Box color="inherit" position={'sticky'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ p: 1, '& .MuiTypography-root': { fontSize: '1.8rem' } }}>
          <Breadcrumbs />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <Item>
            <TextField label="Search here" size="small" />
          </Item>
          <Item sx={{ '& .MuiSvgIcon-root': { fontSize: '2.5rem' } }}>
            <AccountCircleIcon />
          </Item>
          <Item
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiSvgIcon-root': { fontSize: '2.5rem' },
            }}
            onClick={handleMenuButton}
          >
            {miniSideNav === false ? <MenuIcon /> : <MenuOpenIcon />}
          </Item>
          <Item sx={{ '& .MuiSvgIcon-root': { fontSize: '2.5rem' } }}>
            <SettingsIcon />
          </Item>
          <Item
            onClick={handleLogout}
            sx={{ '& .MuiSvgIcon-root': { fontSize: '2.5rem' }, cursor: 'pointer' }}
          >
            <LogoutIcon />
          </Item>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
