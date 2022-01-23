import { Box, Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import CoronavirusIcon from '@mui/icons-material/Coronavirus'
import './f2.jpg'

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

const HomePage = () => {
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

  const data1 = [
    {
      src: 'f2.jpg',
      title: 'Khai báo y tế',
      channel: 'Don Diablo',
      views: '396 k views',
      createdAt: 'a week ago',
    },
    {
      src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
      title: 'Queen - Greatest Hits',
      channel: 'Queen Official',
      views: '40 M views',
      createdAt: '3 years ago',
    },
    {
      src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
      title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
      channel: 'Calvin Harris',
      views: '130 M views',
      createdAt: '10 months ago',
    },
  ]

  return (
    <>
      <h3 style={{ margin: '0 20px', fontSize: '1.8rem' }}>Thống kê</h3>
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

      <h3 style={{ margin: '20px 20px 0', fontSize: '1.8rem' }}>Xem thêm</h3>
      <Grid container spacing={3} px={1}>
        {data1.map((item, index) => (
          <Grid item xs={12} md={4} lg={4} key={index} sx={{ width: '100%', my: 3 }}>
            {item ? (
              <img
                style={{ width: '100%', maxHeight: '20rem', objectFit: 'cover' }}
                alt={item.title}
                src={item.src}
              />
            ) : (
              <Skeleton variant="rectangular" width={210} height={118} />
            )}
            {item ? (
              <Box sx={{ pr: 2, mt: 1, '& .MuiTypography-root': { fontSize: '1.4rem' } }}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography display="block" variant="caption" color="text.secondary">
                  {item.channel}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`${item.views} • ${item.createdAt}`}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HomePage
