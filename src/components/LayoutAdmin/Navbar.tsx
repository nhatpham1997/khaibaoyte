import Box, { BoxProps } from '@mui/material/Box'
import React, { useContext } from 'react'
import { GlobalContext } from 'contexts'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

const options = [
  {
    name: 'Thay đổi thông tin cá nhân',
    path: '/admin/personal-information',
  },
  {
    name: 'Thêm quản trị viên',
    path: '/admin/register-admin',
  },
  {
    name: 'Thay đổi mật khẩu',
    path: '/admin/admin-password',
  },
]

function Navbar() {
  const { setLogin } = React.useContext(GlobalContext)
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const params = localStorage.getItem('adminId')
  let dataNav: any
  if (params !== '1') {
    dataNav = options.filter((option: any) => option.path !== '/admin/register-admin')
  } else {
    dataNav = [...options]
  }

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminId')
    setLogin('')
    navigate('/admin')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <AccountCircleIcon fontSize="large" sx={{ cursor: 'pointer', mr: 2 }} />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            // style={{
            //   transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            // }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {dataNav.map((option: any, index: number) => (
                    <Link to={option.path} key={index}>
                      <MenuItem
                        sx={{ fontSize: '1.4rem', color: 'black' }}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option.name}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <LogoutIcon onClick={handleLogout} sx={{ cursor: 'pointer' }} fontSize="large" />
    </Box>
  )
}

export default Navbar
