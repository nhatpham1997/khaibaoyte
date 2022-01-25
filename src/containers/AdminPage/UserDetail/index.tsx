import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import AccountInformation from 'components/accountInformation'
import TravelSchedule from 'components/travelSchedule'
import Confirmation from 'components/confirmation'
import { Fragment, useContext } from 'react'
import { GlobalContext } from 'contexts'

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#ccc',
  borderRadius: '10px',
  margin: '0 20px',
  boxShadow: 3,
}

export default function UserDetail() {
  const { users } = useContext(GlobalContext)
  const params = useParams()

  const user = users.filter((item: any) => item.id.toString() === params.id)[0]

  return (
    <>
      {users.length > 0 && (
        <Box>
          <Box sx={headerStyle}>
            <Box>
              <ListItem
                alignItems="flex-start"
                sx={{ '& .MuiListItemText-primary': { fontSize: '1.6rem' } }}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={user.fullName}
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: 'inline', fontSize: '1.3rem' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Tài khoản — Người dùng
                      </Typography>
                    </Fragment>
                  }
                />
              </ListItem>
            </Box>
            <Box
              sx={{
                display: { md: 'flex', xs: 'none' },
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                '& .MuiButton-root': { fontSize: '1.3rem' },
              }}
            >
              <TravelSchedule name="Lịch sử di chuyển" />
              <TravelSchedule name="Yêu cầu đã xác nhận" />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, margin: '0 20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <h3 style={{ margin: '20px 0', fontSize: '1.6rem' }}>Thông tin chi tiết</h3>
                </Box>
                <AccountInformation />
              </Grid>
              <Grid item xs={0} md={5}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <h3 style={{ margin: '20px 0', fontSize: '1.6rem' }}>Yêu cầu xác nhận</h3>
                </Box>
                <Confirmation />
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  )
}
