import React, { useContext, useEffect, useState } from 'react'
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import AccountInformation from 'components/accountInformation'
import { GlobalContext } from 'contexts'
import adminApi from 'apis/adminApi'
import axios from 'axios'

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
// }));

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#ccc',
  borderRadius: '10px',
  margin: '0 20px',
}

export default function AdminDetail() {
  const [admins, setAdmins] = useState<any>({})
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dbkhaibaoyte.herokuapp.com/admin?id=${params.id}`)
        setAdmins(response.data[0])
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
              primary={admins.fullName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline', fontSize: '1.3rem' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Tài khoản — Quản trị viên
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, margin: '0 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <h3 style={{ margin: '20px 0', fontSize: '1.6rem' }}>Thông tin chi tiết</h3>
            </Box>
            <AccountInformation />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
