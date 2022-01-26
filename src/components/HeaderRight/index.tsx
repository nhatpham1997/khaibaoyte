import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './HeaderRight.css'
import { Box } from '@mui/system'
import Chip from '@mui/material/Chip'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HeaderRight() {
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
        console.log('error', error)
      })
  }, [])

  function handleClick() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <Box className="header-right">
      <AccountCircleIcon
        sx={{
          fontSize: 20,
          color: '#7b809a',
          marginLeft: '1rem',
          marginRight: '1rem',
          cursor: 'pointer',
        }}
      />
      <Chip sx={{ fontSize: '1.3rem' }} label={currentUser?.fullName} />
      <Button
        onClick={handleClick}
        sx={{
          fontSize: '1.1rem',
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
    </Box>
  )
}

export default HeaderRight
