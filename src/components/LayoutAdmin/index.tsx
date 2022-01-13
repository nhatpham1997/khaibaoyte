import { ReactNode, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import Box, { BoxProps } from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Divider from '@mui/material/Divider'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Typography from '@mui/material/Typography'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import styled from '@emotion/styled'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

function Item(props: BoxProps) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        m: 1,
        ...sx,
      }}
      {...other}
    />
  )
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '10px 5px',
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
  },
}))

const StyledToggleButton = styled(ToggleButton)(() => ({
  color: 'white',
  borderRadius: '8px',
  '&.Mui-selected': {
    backgroundColor: '#2196f3',
    color: 'whitesmoke',
    '&:hover': { backgroundColor: '#2196f3' },
  },
  '&:hover': { backgroundColor: 'gray' },
}))

type LayoutProps = {
  children: ReactNode
}

function LayoutAdmin({ children }: LayoutProps) {
  const [alignment, setAlignment] = useState('1')

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }
  return (
    <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
      <Box
        gridColumn="span 1"
        sx={{
          bgcolor: 'text.primary',
          borderRadius: 4,
          textAlign: 'center',
          minHeight: '95vh',
          boxSizing: 'content-box',
          mt: 1,
          ml: 1,
        }}
        color="white"
      >
        <Box sx={{ mt: 4 }}>
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
            <SupervisorAccountIcon sx={{ pr: 2 }} />
            <Typography>Quản lý tài khoản</Typography>
          </StyledToggleButton>
          <StyledToggleButton value="2">
            <AirplanemodeActiveIcon sx={{ pr: 2 }} />
            <Typography>Quản lý di chuyển</Typography>
          </StyledToggleButton>
          <StyledToggleButton value="3">
            <ListAltIcon sx={{ pr: 2 }} />
            <Typography>Danh sách vùng dịch</Typography>
          </StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box gridColumn="span 4">
        <Box color="inherit">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Breadcrumbs />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
              <Item>
                <TextField label="Search here" size="small" />
              </Item>
              <Item>
                <NotificationsIcon />
              </Item>
              <Item>
                <SettingsIcon />
              </Item>
              <Item>
                <AccountCircleIcon />
              </Item>
            </Box>
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}

export default LayoutAdmin
