import React, { useState, useEffect } from 'react'
import './Login.css'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'

const theme = createTheme()

export default function LoginForm() {
  const [validEmail, setValidEmail] = useState(false)
  const [messEmail, setMessEmail] = useState('')
  const [validPass, setValidPass] = useState(false)
  const [messPass, setMessPass] = useState('')
  const [dataUser, setDataUser] = useState<any>([])
  const history = useNavigate()
  console.log(dataUser)

  useEffect(() => {
    fetch('https://dbkhaibaoyte.herokuapp.com/user')
      .then((response) => response.json())
      .then((dataUsers) => {
        setDataUser(dataUsers)
      })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    // checkLogin({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // })
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })

    const response = dataUser.filter((item: any) => item.email === data.get('email'))
    console.log(response)
    if (response.length > 0) {
      setValidEmail(false)
      setMessEmail('')
      if (response[0].password === data.get('password')) {
        localStorage.setItem('userId', response[0].id)
        history('/user')
      } else {
        setValidPass(true)
        setMessPass('Mật khẩu không đúng!')
      }
    } else {
      setValidEmail(true)
      setMessEmail('Email không đúng!')
      setValidPass(true)
      setMessPass('Mật khẩu không đúng!')
      return
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://dtcfurniture.vn/uploads/projects/banner-web-show.jpg?fbclid=IwAR3uyd-iw66sJwELVYE9lSiX0sCphZRYmqwGqxc9SXA1guNRtPKc-mjasmI)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontSize: '20px' }}>
              Sign in
            </Typography>
            <Box
              className="body"
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                inputProps={{ style: { fontSize: '14px' } }}
                InputLabelProps={{ style: { fontSize: '14px' } }}
                error={validEmail}
                margin="normal"
                required
                fullWidth
                id="email"
                label="nhập địa chỉ email"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={messEmail}
              />
              <TextField
                inputProps={{ style: { fontSize: '14px' } }}
                InputLabelProps={{ style: { fontSize: '14px' } }}
                helperText={messPass}
                error={validPass}
                margin="normal"
                required
                fullWidth
                name="password"
                label="nhập mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize: '14px', py: '10px' }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item>
                  <Link className="register" to="/register">
                    {' Bạn chưa có tài khoản? Đăng Kí '}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
