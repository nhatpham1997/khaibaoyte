import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Link, useParams } from 'react-router-dom'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import AccountInformation from 'components/accountInformation'
import { GlobalContext } from 'contexts'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: 3,
}

export default function AdminDetail() {
  const { admins } = useContext(GlobalContext)
  const params = useParams()

  const admin = admins.filter((item: any) => item.id.toString() === params.id)[0]
  const arrAdmins = admins.filter((item: any) => item.id.toString() !== params.id)

  return (
    <>
      {admins.length > 0 && (
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
                  primary={admin.fullName}
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ margin: '20px 0', fontSize: '1.6rem', fontWeight: 'bold' }}>
                    Thông tin chi tiết
                  </span>
                </Box>
                <AccountInformation />
              </Grid>
              <Grid item xs={0} md={5} sx={{ boxShadow: 'none' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ margin: '20px 0', fontSize: '1.6rem', fontWeight: 'bold' }}>
                    Quản trị viên
                  </span>
                </Box>
                <Item
                  sx={{
                    maxHeight: '47rem',
                    width: '100%',
                    boxShadow: 'none',
                    padding: 0,
                    overflowY: 'auto',
                  }}
                >
                  {arrAdmins.map((item: any, index: number) => (
                    <Link
                      key={index}
                      style={{ display: 'block', margin: '0 0 2rem 0' }}
                      to={`/admin/account-admin/${item.id}`}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          color: '#000',
                          minWidth: { lg: '400px' },
                          margin: '0 0 20px 0',
                          alignItems: 'flex-start',
                          boxShadow: 3,
                          '&:last-child': { marginBottom: '0' },
                          '&:hover': { backgroundColor: 'rgb(25,118,210,0.1)' },
                        }}
                      >
                        <ListItem
                          alignItems="flex-start"
                          sx={{ '& .MuiListItemText-primary': { fontSize: '1.4rem' } }}
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
