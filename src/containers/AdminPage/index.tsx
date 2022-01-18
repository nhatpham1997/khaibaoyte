import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import CoronavirusIcon from '@mui/icons-material/Coronavirus'

const boxContainer = {
  position: 'relative',
  border: '1px solid #ccc',
  borderRadius: '15px',
  height: '120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingRight: '20px',
  color: 'black',
  boxShadow: 3,
}

const data = [
  {
    title: 'Quản trị viên',
    total: '6',
    path: '/admin/account-admin',
    icon: <AdminPanelSettingsIcon fontSize={'large'} />,
    color: '#242426',
  },
  {
    title: 'Người dùng',
    total: '6',
    path: '/admin/account-user',
    icon: <PersonIcon fontSize={'large'} />,
    color: '#419bf0',
  },
  {
    title: 'Vùng dịch',
    total: '6',
    path: '/admin',
    icon: <CoronavirusIcon fontSize={'large'} />,
    color: '#de2668',
  },
  {
    title: 'Thông báo',
    total: '6',
    path: '/admin',
    icon: <NotificationsActiveIcon fontSize={'large'} />,
    color: '#5ab25e',
  },
]

const HomePage = () => {
  return (
    <>
      <h3 style={{ marginTop: 0 }}>Thống kê</h3>
      <Grid container spacing={3} px={1} mt={3}>
        {data.map((item, i) => (
          <Grid key={i} item xs={12} md={6} lg={3}>
            <Link to={item.path} style={{ textDecoration: 'none' }}>
              <Box mb={1.5} sx={boxContainer}>
                <Box
                  sx={{
                    position: 'absolute',
                    backgroundColor: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                  height={64}
                  width={64}
                  left={16}
                  borderRadius={2}
                  top={-20}
                >
                  {item.icon}
                </Box>
                <Typography fontSize={'15px'} fontWeight={400}>
                  {item.title}
                </Typography>
                <Typography fontSize={'32px'} fontWeight={500}>
                  {item.total}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HomePage
