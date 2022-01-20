import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'

const theme = createTheme()

export default function EditProfile() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            EditProfile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="fullname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="yearofbirth"
              label="Year Of Birth"
              name="yearofbirth"
              autoComplete="yearofbirth"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="citizen_identification"
              label="Citizen_Identification"
              name="citizen_identification"
              autoComplete="citizen_identification"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="province"
              label="Province"
              name="province"
              autoComplete="province"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="district"
              label="District"
              name="district"
              autoComplete="district"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ward"
              label="Ward"
              name="ward"
              autoComplete="ward"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone_Number"
              name="phone"
              autoComplete="phone"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="create_date"
              label="Create_Date"
              type="create_date"
              id="create_date"
              autoComplete="create_date"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  )
}
