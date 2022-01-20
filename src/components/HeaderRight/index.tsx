import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './HeaderRight.css'
import { Box } from '@mui/system'
import Chip from '@mui/material/Chip'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'

function HeaderRight() {
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
      <Chip sx={{ fontSize: '1.3rem' }} label="Đinh Ngọc Định" />
      <Button
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
