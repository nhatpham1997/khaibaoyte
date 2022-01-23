import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import AccountInformation from 'components/accountInformation'
import Button from '@mui/material/Button'
import TravelSchedule from 'components/travelSchedule'
import userApi from 'apis/userApi'
import axios from 'axios'
import Confirmation from 'components/confirmation'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#ccc',
  borderRadius: '10px',
  margin: '0 20px',
  boxShadow: 3,
}

export default function UserDetail() {
  const [users, setUsers] = React.useState<any>({})
  const params = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dbkhaibaoyte.herokuapp.com/user?id=${params.id}`)
        setUsers(response.data[0])
        console.log(response)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
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
              primary={users.fullName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline', fontSize: '1.3rem' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Tài khoản — Người dùng
                  </Typography>
                </React.Fragment>
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
    </>
  )
}
