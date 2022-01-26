import { useEffect, useState } from 'react'
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
import axios from 'axios'

const theme = createTheme()

export default function ForgotPassword() {
  return <div></div>
  const [dataUser, setDataUser] = useState<any>([])
  const [id, setId] = useState<any>()
  const [validPassCurrent, setValidPassCurrent] = useState(false)
  const [messPassCurrent, setMessPassCurrent] = useState('')
  const [validPassConfirm, setValidPassConfirm] = useState(false)
  const [messPassConfirm, setMessPassConfirm] = useState('')
  const [validPassNew, setValidPassNew] = useState(false)
  const [messPassNew, setMessPassNew] = useState('')

  const data1 = {
    id: 1,
    number1: 2,
    number2: 3,
  }
  const data2 = { ...data1, number2: 11111 }
  console.log(data1, data2)

  useEffect(() => {
    const fetchData = async () => {
      const dataUsers = await axios.get('https://dbkhaibaoyte.herokuapp.com/user')
      setDataUser(dataUsers.data)

      setId(localStorage.getItem('userId'))
    }
    fetchData()
  }, [])

  const handleChangePassword = async (response: any, passwordNew: any) => {
    const result = axios.put(`https://dbkhaibaoyte.herokuapp.com/user/${id}`, {
      ...response,
      fullName: 'Trinh Quoc Hai',
      password: passwordNew,
    })
    console.log(result)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      currentPassword: data.get('current_password'),
      passwordNew: data.get('password_new'),
      passwordConfirm: data.get('password_confirm'),
    })

    const response = dataUser.filter((item: any) => item.id.toString() === id.toString())
    if (response.length < 0) {
      return
    }
    if (response[0].password === data.get('current_password')) {
      setValidPassCurrent(false)
      setMessPassCurrent('')

      if (data.get('password_new') === data.get('current_password')) {
        setValidPassNew(true)
        setMessPassNew('password error!')
      } else {
        if (data.get('password_new') === data.get('password_confirm')) {
          setValidPassNew(false)
          setMessPassNew('')
          setValidPassConfirm(false)
          setMessPassConfirm('')

          console.log(response[0], data.get('password_new'))
          handleChangePassword(response[0], data.get('password_new'))
          alert('successful!')
        } else {
          setValidPassConfirm(true)
          setMessPassConfirm('Mat khau khong khop!')
          setValidPassNew(false)
          setMessPassNew('')
        }
      }
    } else {
      setValidPassCurrent(true)
      setMessPassCurrent('password current error!')
      setValidPassNew(true)
      setMessPassNew('MessPass Error!')
      setValidPassConfirm(true)
      setMessPassConfirm(' MessPassConfirm error!')
    }
  }

  return (
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
          Forgot PassWord
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            helperText={messPassCurrent}
            error={validPassCurrent}
            margin="normal"
            required
            fullWidth
            id="current_password"
            label="Current Password"
            name="current_password"
            autoComplete="current_password"
            autoFocus
            type="password"
          />
          <TextField
            helperText={messPassNew}
            error={validPassNew}
            margin="normal"
            required
            fullWidth
            name="password_new"
            label="New Password"
            type="password"
            id="password_new"
            autoComplete="password_new"
          />
          <TextField
            helperText={messPassConfirm}
            error={validPassConfirm}
            margin="normal"
            required
            fullWidth
            name="password_confirm"
            label="Confirm New Password"
            type="password"
            id="password_confirm"
            autoComplete="password_confirm"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
