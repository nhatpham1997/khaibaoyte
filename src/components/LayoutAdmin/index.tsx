import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { GlobalContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'
import LoginAdmin from 'containers/AdminPage/LoginAdmin'
// import { locationApi } from 'apis/covid'
import userApi from 'apis/userApi'
import adminApi from 'apis/adminApi'
import movingDeclarationApi from 'apis/movingDeclaration'
import movingRegisterApi from 'apis/movingRegister'
import { addressApi } from 'apis/addressApi'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Breadcrumbs from './Breadcrumbs'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

function LayoutAdmin() {
  const {
    dataCovidLocations,
    isLogin,
    setLogin,
    dataUsers,
    dataAdmins,
    dataMovingDeclaration,
    dataMovingRegister,
    dataAddress,
  } = useContext(GlobalContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = localStorage.getItem('adminId')
    if (id) {
      setLogin(id)
    }
    setLoading(false)
  }, [])

  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     try {
  //       const response = await locationApi.getAll()
  //       dataCovidLocations(response.data.locations)
  //     } catch (error) {
  //       console.log('Failed to fetch post list: ', error)
  //     }
  //   }
  //   fetchLocations()
  // }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getAll()
        dataUsers(response)
      } catch (error) {
        // console.log('Failed to fetch post list: ', error)
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
        // console.log('Failed to fetch post list: ', error)
      }
    }
    fetchAdmin()
  }, [])

  useEffect(() => {
    const fetchMovingDeclaration = async () => {
      try {
        const response = await movingDeclarationApi.getAll()
        dataMovingDeclaration(response)
      } catch (error) {
        // console.log('Failed to fetch post list: ', error)
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
        // console.log('Failed to fetch post list: ', error)
      }
    }
    fetchMovingRegister()
  }, [])

  useEffect(() => {
    const fetchDataAddress = async () => {
      try {
        const response = await addressApi.getAll()
        dataAddress(response.data)
      } catch (error) {
        // console.log('Failed to fetch post list: ', error)
      }
    }
    fetchDataAddress()
  }, [])

  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      {!loading && isLogin === '' ? (
        <LoginAdmin />
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Breadcrumbs />
                <Navbar />
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{ fontSize: '18px' }}>
              <img src="/Logo2.png" alt="logo" style={{ width: '100px', margin: '0 auto' }} />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon fontSize="large" />
                ) : (
                  <ChevronLeftIcon fontSize="large" />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <Sidebar />
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, padding: '1.2rem' }}>
            <DrawerHeader />
            <Typography component="div">
              <Outlet />
            </Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

export default LayoutAdmin
