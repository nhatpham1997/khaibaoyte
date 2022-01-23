import React, { useContext, useEffect, useState } from 'react'
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'
import { Link, useParams } from 'react-router-dom'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import AccountInformation from 'components/accountInformation'
import { GlobalContext } from 'contexts'
import adminApi from 'apis/adminApi'
import axios from 'axios'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#ccc',
  boxShadow: 3,
  borderRadius: '10px',
  margin: '0 20px',
}

export default function AdminDetail() {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  let admins
  let arrAdmins
  if (data.length > 0) {
    admins = data.filter((item: any) => item.id.toString() === params.id)[0]
    arrAdmins = data.filter((item: any) => item.id.toString() !== params.id)
    console.log(arrAdmins, admins, data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dbkhaibaoyte.herokuapp.com/admin`)
        setData(response.data)
        console.log(response.data)
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch post list: ', error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      {!loading && (
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
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <h3 style={{ margin: '20px 0', fontSize: '1.6rem' }}>Thông tin chi tiết</h3>
                </Box>
                <AccountInformation />
              </Grid>
              <Grid item xs={0} md={5}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <h3 style={{ margin: '20px 0', fontSize: '1.6rem' }}>Quản trị viên</h3>
                </Box>
                <Item sx={{ fontSize: '1.6rem', maxHeight: '47rem', overflowY: 'scroll' }}>
                  {arrAdmins.map((item: any, index: number) => (
                    <Link key={index} to={`/admin/account-admin/${item.id}`}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          color: '#000',
                          border: `2px solid #1976d2`,
                          minWidth: { lg: '400px' },
                          borderRadius: '15px',
                          marginBottom: '20px',
                          alignItems: 'flex-start',
                          boxShadow: 3,
                          '&:last-child': { marginBottom: '0' },
                          '&:hover': { backgroundColor: 'rgb(25,118,210,0.3)' },
                        }}
                      >
                        <ListItem
                          alignItems="flex-start"
                          sx={{ '& .MuiListItemText-primary': { fontSize: '1.6rem' } }}
                        >
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.fullName}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline', fontSize: '1.3rem' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Tài khoản — {item.email}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </Box>
                    </Link>
                  ))}
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  )
}
