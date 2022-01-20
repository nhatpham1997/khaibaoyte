import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import styled from '@emotion/styled'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import { Link } from 'react-router-dom'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '10px 20px',
    border: 0,
    justifyContent: 'flex-start',
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: '8px',
    },
    '&:first-of-type': {
      borderRadius: '8px',
    },
    '& p': {
      fontSize: '0.9em',
    },
  },
}))

const StyledToggleButton = styled(ToggleButton)(() => ({
  color: 'white',
  borderRadius: '8px',
  padding: 0,
  '&.Mui-selected': {
    backgroundColor: '#2196f3',
    color: 'whitesmoke',
    '&:hover': { backgroundColor: '#2196f3' },
  },
  '&:hover': { backgroundColor: 'gray' },
}))

const LinkNavbar = styled(Link)(() => ({
  textDecoration: 'none',
  display: 'flex',
  color: 'white',
  alignItems: 'center',
  padding: '5px 10px',
  width: '100%',
  height: '100%',
  '& p': {
    width: '100%',
    textAlign: 'start',
  },
}))

function Sidebar() {
  const [alignment, setAlignment] = useState('1')

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  return (
    <Box
      sx={{
        bgcolor: 'text.primary',
        borderRadius: 4,
        textAlign: 'center',
        minWidth: '250px',
        minHeight: '95vh',
        boxSizing: 'content-box',
        top: '10px',
        left: '10px',
        position: 'fixed',
        mt: 1,
        ml: 1,
        fontSize: '50px !important',
      }}
      color="white"
    >
      <Box sx={{ pt: 2 }}>
        <Typography>Menu Dashboard</Typography>
      </Box>
      <Divider
        sx={{
          bgcolor: 'white',
          mx: 5,
          my: 2,
          textAlign: 'center',
        }}
      />
      <StyledToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        orientation="vertical"
        sx={{
          justifyContent: 'flex-start',
        }}
        color="primary"
      >
        <StyledToggleButton value="1">
          <LinkNavbar to="/admin/">
            <SupervisorAccountIcon sx={{ pr: 2, fontSize: '2.5rem' }} />
            <Typography>Trang chủ</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="2">
          <LinkNavbar to="/admin/account-admin">
            <SupervisorAccountIcon sx={{ pr: 2, fontSize: '2.5rem' }} />
            <Typography>Quản lý Admin</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="3">
          <LinkNavbar to="/admin/account-user">
            <SupervisorAccountIcon sx={{ pr: 2, fontSize: '2.5rem' }} />
            <Typography>Quản lý User</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="4">
          <LinkNavbar to="/admin/application-for-moving">
            <AirplanemodeActiveIcon sx={{ pr: 2, fontSize: '2.5rem' }} />
            <Typography>Quản lý di chuyển</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="5">
          <LinkNavbar to="/admin/epidemic-area">
            <ListAltIcon sx={{ pr: 2, fontSize: '2.5rem' }} />
            <Typography>Danh sách vùng dịch</Typography>
          </LinkNavbar>
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  )
}

export default Sidebar
