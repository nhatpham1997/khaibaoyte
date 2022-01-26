import * as React from 'react'
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
import { GlobalContext } from 'contexts'

const theme = createTheme()

export default function LoginAdmin() {
  const [validEmail, setValidEmail] = React.useState(false)
  const [messEmail, setMessEmail] = React.useState('')
  const [validPass, setValidPass] = React.useState(false)
  const [messPass, setMessPass] = React.useState('')
  const { setLogin, admins } = React.useContext(GlobalContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const response = admins.filter((item) => item.email === data.get('email'))

    if (response.length > 0) {
      setValidEmail(false)
      setMessEmail('')
      if (response[0].password === data.get('password')) {
        localStorage.setItem('adminId', `${response[0].id}`)
        setLogin(response[0].id)
      } else {
        setValidPass(true)
        setMessPass('Passs error!')
      }
    } else {
      setValidEmail(true)
      setMessEmail('Email error!')
      setValidPass(true)
      setMessPass('Passs error!')
      return
    }
    // if (response.length > 0 && response[0].password === data.get('password')) {
    //   localStorage.setItem('adminId', `${response[0].id}`)
    //   setLogin(response[0].id)
    // } else {
    //   alert('Tài khoản hoặc mật khẩu không chính xác! Vui lòng nhập lại!')
    // }
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
            backgroundImage: 'url(https://source.unsplash.com/random)',
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
            <Typography component="h1" variant="h5" sx={{ fontSize: '2rem' }}>
              Đăng nhập Admin
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                '& input': { fontSize: '1.6rem' },
                '& .MuiOutlinedInput-input': { fontSize: '1.6rem' },
              }}
            >
              <TextField
                inputProps={{ style: { fontSize: '1.4rem' } }} // font size of input text
                InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                error={validEmail}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={messEmail}
              />
              <TextField
                inputProps={{ style: { fontSize: '1.4rem' } }} // font size of input text
                InputLabelProps={{ style: { fontSize: '1.4rem' } }}
                helperText={messPass}
                error={validPass}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontSize: '1.6rem' }}
              >
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
