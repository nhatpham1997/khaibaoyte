import { useState, useEffect, useContext } from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import { Link, useLocation } from 'react-router-dom'
import { GlobalContext } from 'contexts'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'

export interface SidebarItem {
  name?: string
  label: string
  subLabel?: string
  children?: Array<SidebarItem>
  href?: string
  icon: JSX.Element
}

const SIDEBAR_ITEMS: Array<SidebarItem> = [
  {
    label: 'Trang Chủ',
    href: '/admin',
    icon: <HomeIcon fontSize="large" />,
  },
  {
    label: 'Quản lý Admin',
    href: '/admin/account-admin',
    icon: <SupervisorAccountIcon fontSize="large" />,
  },
  {
    label: 'Quản lý User',
    href: '/admin/account-user',
    icon: <ListAltIcon />,
  },
  {
    label: 'Quản lý di chuyển',
    href: '/admin/application-for-moving',
    icon: <AirplanemodeActiveIcon fontSize="large" />,
  },
  {
    label: 'Danh sách vùng dịch',
    href: '/admin/epidemic-area',
    icon: <ListAltIcon fontSize="large" />,
  },
]

function Sidebar() {
  const route = useLocation().pathname
  const [alignment, setAlignment] = useState('/admin')
  const { isLogin } = useContext(GlobalContext)

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  useEffect(() => {
    setAlignment(route)
  }, [])

  return (
    <>
      {SIDEBAR_ITEMS.map((item, index) => (
        <Link key={index} to={item.href || '#'}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              sx={{ margin: 0, color: 'black', '& .MuiTypography-root': { fontSize: '16px' } }}
              primary={item.label}
            />
          </ListItem>
        </Link>
      ))}
    </>
  )
}

export default Sidebar
