import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import styled from '@emotion/styled'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import { Link, useLocation } from 'react-router-dom'

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
  '& .MuiToggleButton-root': {
    fontSize: '2rem',
  },
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
  const route = useLocation().pathname
  const [alignment, setAlignment] = useState('/admin')

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  useEffect(() => {
    setAlignment(route)
  }, [])

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
      <Box sx={{ pt: 2, '& .MuiTypography-root': { fontSize: '2rem', fontWeight: 600 } }}>
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
          '& .MuiButtonBase-root a p': { fontSize: '1.6rem' },
          '& .MuiButtonBase-root a svg': {
            fontSize: '4rem',
          },
        }}
        color="primary"
      >
        <StyledToggleButton value="/admin">
          <LinkNavbar to="/admin">
            <SupervisorAccountIcon sx={{ pr: 2 }} />
            <Typography>Trang chủ</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="/admin/account-admin">
          <LinkNavbar to="/admin/account-admin">
            <SupervisorAccountIcon sx={{ pr: 2 }} />
            <Typography>Quản lý Admin</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="/admin/account-user">
          <LinkNavbar to="/admin/account-user">
            <SupervisorAccountIcon sx={{ pr: 2 }} />
            <Typography>Quản lý User</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="/admin/application-for-moving">
          <LinkNavbar to="/admin/application-for-moving">
            <AirplanemodeActiveIcon sx={{ pr: 2 }} />
            <Typography>Quản lý di chuyển</Typography>
          </LinkNavbar>
        </StyledToggleButton>
        <StyledToggleButton value="/admin/epidemic-area">
          <LinkNavbar to="/admin/epidemic-area">
            <ListAltIcon sx={{ pr: 2 }} />
            <Typography>Danh sách vùng dịch</Typography>
          </LinkNavbar>
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  )
}

export default Sidebar
