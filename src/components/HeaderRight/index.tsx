import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './HeaderRight.css'
import { Box } from '@mui/system'
import Chip from '@mui/material/Chip'

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
    </Box>
  )
}

export default HeaderRight
