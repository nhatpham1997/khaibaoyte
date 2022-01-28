import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './HeaderRight.css'
import { Box } from '@mui/system'
import Chip from '@mui/material/Chip'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import DehazeIcon from '@mui/icons-material/Dehaze'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'

interface props {
  setShowNav: any
  showNav: any
}

function HeaderRight({ setShowNav, showNav }: props) {
  const userId = localStorage.getItem('userId')
  const userAPI = 'https://dbkhaibaoyte.herokuapp.com/user/'
  const navigate = useNavigate()

  interface IUser {
    fullName?: string
  }

  const [currentUser, setCurrentUser] = useState<IUser>({})

  useEffect(() => {
    fetch(`${userAPI}/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        setCurrentUser(user)
      })
      .catch((error) => {
        // console.log('error', error)
      })
  }, [])

  function handleClick() {
    localStorage.removeItem('title')
    localStorage.removeItem('userId')
    localStorage.removeItem('tabIndex')
    navigate('/')
  }

  function handleClickToggleMenu() {
    setShowNav(!showNav)
  }

  return (
    <Box className="header-right">
      <AccountCircleIcon
        className="avatar-header"
        sx={{
          fontSize: 20,
          color: '#7b809a',
          marginLeft: '1rem',
          marginRight: '1rem',
          cursor: 'pointer',
        }}
      />
      <Chip sx={{ fontSize: '1.4rem' }} label={currentUser?.fullName} />
      <Button
        onClick={handleClick}
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          borderRadius: '2rem',
          marginLeft: '1rem',
          textTransform: 'initial',
        }}
        variant="contained"
        endIcon={<LogoutIcon />}
      >
        Đăng xuất
      </Button>
      <IconButton
        onClick={handleClickToggleMenu}
        className="toggle-menu"
        sx={{ fontSize: '2.4rem', marginLeft: '2rem' }}
      >
        <DehazeIcon sx={{ fontSize: '2.4rem' }} />
      </IconButton>
    </Box>
  )
}

export default HeaderRight
