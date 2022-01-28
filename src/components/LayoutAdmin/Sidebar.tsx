import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import { Link } from 'react-router-dom'
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
    icon: <ListAltIcon fontSize="large" />,
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
  return (
    <>
      {SIDEBAR_ITEMS.map((item, index) => (
        <Link key={index} to={item.href || '#'}>
          <ListItem button sx={{ py: 3 }}>
            <ListItemIcon sx={{ width: '30px' }}>{item.icon}</ListItemIcon>
            <ListItemText
              sx={{ margin: 0, color: 'black', '& .MuiTypography-root': { fontSize: '1.6rem' } }}
              primary={item.label}
            />
          </ListItem>
        </Link>
      ))}
    </>
  )
}

export default Sidebar
