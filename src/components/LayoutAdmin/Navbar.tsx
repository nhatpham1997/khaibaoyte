import Box, { BoxProps } from '@mui/material/Box'
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
    localStorage.removeItem('adminId')
    setLogin('')
    navigate('/admin')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <Item
        onClick={handleLogout}
        sx={{ '& .MuiSvgIcon-root': { fontSize: '2.5rem' }, cursor: 'pointer' }}
      >
        <LogoutIcon />
      </Item>
    </Box>
  )
}

export default Navbar
