import Box, { BoxProps } from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Breadcrumbs from './Breadcrumbs'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useContext } from 'react'
import { GlobalContext } from 'contexts'

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

  const handleMenuButton = () => {
    setMiniSideNav(!miniSideNav)
  }

  return (
    <Box color="inherit" position={'sticky'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ p: 1 }}>
          <Breadcrumbs />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <Item>
            <TextField label="Search here" size="small" />
          </Item>
          <Item>
            <AccountCircleIcon />
          </Item>
          <Item sx={{ display: { xs: 'block', lg: 'none' } }} onClick={handleMenuButton}>
            {miniSideNav === false ? <MenuIcon /> : <MenuOpenIcon />}
          </Item>
          <Item>
            <SettingsIcon />
          </Item>
          <Item>
            <NotificationsIcon />
          </Item>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
