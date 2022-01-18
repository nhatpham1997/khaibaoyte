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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

type createData = {
  id: number
  username: string
  full_name: string
  year_of_birth: string
  citizen_identificatio: string //căn cước
  sex: string
  nationality: string //quốc tịch
  address: string
  phone: string
  email: string
  createDate: string
}[]

const rows: createData = [
  {
    id: 1,
    username: 'NguyenDuy',
    full_name: 'Nguyen Van Duy',
    year_of_birth: '15/06/1999',
    citizen_identificatio: '1234567890', //căn cước
    sex: 'Nam',
    nationality: 'Việt Nam', //quốc tịch
    address: 'Liên Hà - Đan Phượng',
    phone: '0123456789',
    email: 'duy124678@gmail.com',
    createDate: '01/01/2022',
  },
  {
    id: 2,
    username: 'NguyenDuy',
    full_name: 'Nguyen Van Duy',
    year_of_birth: '15/06/1999',
    citizen_identificatio: '1234567890', //căn cước
    sex: 'Nam',
    nationality: 'Việt Nam', //quốc tịch
    address: 'Liên Hà - Đan Phượng',
    phone: '0123456789',
    email: 'duy124678@gmail.com',
    createDate: '01/01/2022',
  },
]

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#ccc',
  borderRadius: '10px',
  margin: '0 20px',
}

export default function UserDetail() {
  const params = useParams()
  const data = rows.filter((data) => data.id.toString() === params.id)[0]
  return (
    <>
      <Box sx={headerStyle}>
        <Box>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={data.full_name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Tài khoản
                  </Typography>
                  {' — Quản trị viên'}
                </React.Fragment>
              }
            />
          </ListItem>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '20px',
          }}
        >
          <TravelSchedule name="Lịch sử di chuyển" />
          <TravelSchedule name="Yêu cầu đã xác nhận" />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, margin: '0 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <h3>Thông tin chi tiết</h3>
            </Box>
            <AccountInformation data={data} />
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <h3>Yêu cầu xác nhận</h3>
            </Box>
            <Item>Không có yêu cầu nào!</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
