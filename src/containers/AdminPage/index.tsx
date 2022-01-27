import { Box, Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import CoronavirusIcon from '@mui/icons-material/Coronavirus'
import { GlobalContext } from 'contexts'

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
  const { users, admins, movingRegister } = React.useContext(GlobalContext)
  const data = [
    {
      title: 'Quản trị viên',
      total: admins.length,
      path: '/admin/account-admin',
      icon: <AdminPanelSettingsIcon fontSize={'large'} />,
      color: '#242426',
    },
    {
      title: 'Người dùng',
      total: users.length,
      path: '/admin/account-user',
      icon: <PersonIcon fontSize={'large'} />,
      color: '#419bf0',
    },
    {
      title: 'Vùng dịch',
      total: '6',
      path: '/admin/epidemic-area',
      icon: <CoronavirusIcon fontSize={'large'} />,
      color: '#de2668',
    },
    {
      title: 'Thông báo',
      total: movingRegister.filter((item: any) => item.status === 0).length,
      path: '/admin/application-for-moving',
      icon: <NotificationsActiveIcon fontSize={'large'} />,
      color: '#5ab25e',
    },
  ]

  const data1 = [
    {
      src: 'https://baothanhhoa.vn/media/img/420/news/2010/146d2110249t490l2-untitled-infogr-4491.png',
      title: 'Khai báo y tế',
      path: '/',
    },
    {
      src: 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/8/27/covid-19-cap-nhat-moi-nhat-1630022533654284996091-0-0-491-786-crop-1630022545490368129240.png',
      title: 'Bản tin cập nhật thông tin covid-19',
      path: 'https://covid19.gov.vn/',
    },
    {
      src: 'https://cdn.tgdd.vn//GameApp/-1//7-800x450-23.png',
      title: 'Bản đồ dịch Việt Nam',
      path: 'https://covidmaps.langson.gov.vn/langson?locale=vn',
    },
  ]

  return (
    <Box mx={1}>
      <h3 style={{ fontSize: '1.6rem' }}>Thống kê</h3>
      <Grid container spacing={3} mt={3}>
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

      <h3 style={{ fontSize: '1.6rem', marginTop: '2rem' }}>Xem thêm</h3>
      <Grid container spacing={3}>
        {data1.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={4}
            lg={4}
            sx={{ width: '100%', height: '100%', my: 3 }}
          >
            <a href={item.path} target="_ blank" rel="noreferrer">
              {item ? (
                <img
                  style={{ width: '100%', height: '20rem', objectFit: 'cover' }}
                  alt={item.title}
                  src={item.src}
                />
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
              {item ? (
                <Box
                  sx={{
                    pr: 2,
                    mt: 1,
                    '& .MuiTypography-root': { fontSize: '1.4rem' },
                    color: 'blue',
                  }}
                >
                  <Typography gutterBottom variant="body2">
                    {item.title}
                  </Typography>
                  {/* <Typography display="block" variant="caption" color="text.secondary">
                  {item.channel}
                </Typography> */}
                  {/* <Typography variant="caption" color="text.secondary">
                  {`${item.views} • ${item.createdAt}`}
                </Typography> */}
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              )}
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HomePage
